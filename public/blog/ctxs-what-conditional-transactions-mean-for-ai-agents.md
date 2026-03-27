---
layout: minimal
authors:
    - "thegreataxios"
date: 2026-03-04
title: "CTXs: What Conditional Transactions Mean for AI Agents"
description: "Exploring SKALE's Conditional Transactions (CTXs) — encrypted onchain data that decrypts only when smart contract conditions are met, enabling private agent execution."
---

#  What Conditional Transactions (CTXs) Mean for AI Agents

SKALE Network's Blockchain Integrated Threshold Encryption (BITE) Protocol introduced **Encrypted Transactions** which introduced 100% private data in transit for blockchain transactions from wallet to execution.

This was a massive step — removing mempool visibility, eliminating front-running, and giving agents encrypted execution. Encrypted Transactions operate on data in motion. Once data lands in contract storage, it's plaintext. Anyone with a block explorer can read it.

CTXs (Conditional Transactions) change this. Encrypted data can now live inside smart contract state and only decrypt when the contract explicitly triggers it.

For AI agents, this distinction is more important than it initially seems.

## What CTXs Actually Do

Encrypted Transactions encrypt the transaction itself — the calldata, the destination, the intent. Validators reach consensus on the encrypted payload and only decrypt after finalization. That solves MEV and intent leakage.
CTXs introduce a new EVM primitive, **conditional execution**. This allows encrypted data to be stored onchain and decrypted inside a smart contract when a developer-defined condition is met. The mechanism is implemeted as a callback pattern (similiar to Chainlink VRF):

1. A user or agent submits encrypted data to a contract. The data stays encrypted in storage.
2. When conditions are met, the contract calls `BITE.submitCTX(BITE.SUBMIT_CTX_ADDRESS, msg.value / tx.gasprice, encryptedArgs, plaintextArgs);`
3. The transaction queues and in the next block, the validator committee performs threshold decryption in a batch.
4. The decrypted data passes to the developer's `onDecrypt()` callback, which executes the business logic with the sender being an ephemeral wallet.

This is a two-block operation. Block *i* queues the decryption request. Block *i+1* decrypts and executes. This breaks the standard EVM assumption that contract execution is atomic within a single block — more on that below.

## Why This Matters for AI Agents

Encrypted Transactions protect agents intent in transit. CTXs protect agents intent at rest.

An AI agent's value is in what it knows and how it decides. Strategy parameters, pricing models, risk thresholds, coordination state — these are the things that make an agent competitive. On a standard EVM chain, storing any of this onchain means publishing it to the world.

CTXs create a new category of onchain data: encrypted state that is only readable when the contract decides it should be.

| | Encrypted Transactions | CTXs |
| --- | --- | --- |
| What's encrypted | Transaction data (calldata, destination) | Smart contract storage (state, parameters, inputs) |
| When it's decrypted | After block finalization | When contract triggers `BITE.submitCTX()` |
| Protection model | Transit encryption | At-rest encryption with conditional reveal |
| Developer interface | Transparent (automatic) | Callback pattern (`onDecrypt()`) |
| Execution model | Same-block | Two-block (request in *i*, execute in *i+1*) |

For agents, this enables workflows that were previously not possible on any public chain:

**Encrypted strategy parameters.** A trading agent can store its rebalancing thresholds, price triggers, and position limits encrypted onchain. The contract only decrypts and executes when market conditions match. Observers see that something was triggered — they don't see what the thresholds were.

**Sealed agent-to-agent negotiations.** Two agents submit encrypted terms for a task. The contract decrypts both simultaneously when both sides have submitted and executes on the overlap. Neither agent sees the other's terms until reveal, eliminating first-mover disadvantage.

**Conditional autonomous payments.** An agent's payment triggers only fire after a decryption event confirms a condition — delivery of data, completion of compute, verification of a result. This is "if/then" financial logic enforced by the chain instead of a centralized scheduler or human operator.

## The Two-Block Model

This is the part that requires a shift in thinking for EVM developers.

EVM developers are trained on atomicity. You call a function, the state changes, the transaction either succeeds or reverts — all in one block. CTXs break that assumption.

When a contract calls `BITE.submitCTX()`, the decryption does not happen in the current block. It is batched with all other decryption requests from block *i* and executed at the start of block *i+1*.

This means:

- You cannot read the decrypted result in the same transaction that requested it
- Your logic must be structured as a callback, not a synchronous read
- Multiple decryption requests from the same block batch together

The batching is what makes many of the most interesting use cases possible. A sealed-bid auction where all bids decrypt simultaneously in a single batch is fundamentally more fair than sequential reveals. A prediction market where all predictions unseal at the same time eliminates timing advantages entirely.

If you've worked with SKALE's native RNG, the mental model is similar — the value is derived from the consensus process and is available in the next block, not the current one.

## What You Can Build

Here are some concrete patterns that CTXs unlock. Each one is directly relevant to AI agent systems:

### Sealed-Bid Auctions

Agents submit encrypted bids. The contract collects them until a cutoff time. At that point, all bids decrypt in a single batch and the winner is selected. No sniping. No timing advantages. No bid surveillance before the reveal.

An AI procurement agent bidding for compute resources or data access can submit a sealed bid without revealing its budget constraints to competitors.

### Conditional Trading Triggers

An agent encrypts conditions like "If ETH > $5,000, sell 10 ETH." The exchange contract stores the encrypted condition. When a price oracle reports the threshold, the contract triggers `BITE.submitCTX()`, decrypts the condition, and executes.

The strategy is private until the moment it fires.

### Time-Locked Reveals

Encrypted data that automatically decrypts at a specific block timestamp. A research swarm that publishes findings simultaneously, a prediction market where all predictions seal until the event resolves, or an agent that pre-commits to an action but keeps it hidden until execution time.

### Sealed Negotiations

Two agents submit encrypted negotiation terms. The contract only decrypts when both sides have submitted, and both are revealed simultaneously. Execution happens on the overlap of terms.

This is the foundation of private agent-to-agent commerce where neither party has an information advantage. As I explored in [Memory for the Agentic Economy](/blog/memory-for-the-agentic-economy.mdx), agent marketplace transactions need transparent execution and settlement records — but the *terms* can remain private until reveal.

### Encrypted Multisig Updates

An encrypted contract update is submitted. It stays encrypted until a threshold of multisig approvals is reached. Attackers cannot see what the update contains until it is already approved. This protects governance operations from front-running and social manipulation.

## What This Means for SKALE on Base

All of this runs on SKALE on Base — zero gas, instant finality, and now encrypted smart contract state.

For agents operating through x402 payment flows, CTXs mean payment conditions can be encrypted until they fire, keeping agent budgets and spending logic private. Agent coordination state — task assignments, resource allocation, bid history — can live onchain without being readable by the world. x402 facilitators can implement more complex settlement schemes where encrypted conditions govern when funds move.

Combined with SKALE's credit system and sub-second finality, CTXs make SKALE on Base the first environment where AI agents can store state onchain with the same confidentiality expectations they have in private cloud infrastructure.

If you are building agents that need private onchain state, reach out. I'm working on this daily and happy to walk through integration patterns.
