---
layout: minimal
authors:
    - "thegreataxios"
date: 2026-03-26
title: "Confidential MPP on SKALE: Private Payments for AI Agents"
description: "How Confidential MPP enables AI agents to pay and get paid without exposing amounts or balances — private machine-to-machine payments on SKALE."
---

# Confidential MPP on SKALE: Private Payments for AI Agents

The machine economy needs privacy. With Confidential MPP on SKALE, agents pay and get paid without exposing amounts or balances. Financial details stay between the parties, not on the chain.

---

**SKALE** is a blockchain network purpose-built for the Internet of Agents. Unlike general-purpose chains where every transaction is broadcast publicly, SKALE provides configurable privacy through threshold encryption—validator nodes collaborate to decrypt transactions only when protocol conditions are met. Combined with a pre-paid credit system for computation and instant finality, SKALE enables agents to transact thousands of times per day with Web2-like economics and Web3-grade security.

**MPP** (Machine Payments Protocol) is an open standard co-developed by [Stripe](https://stripe.com) and [Tempo](https://tempo.xyz) for machine-to-machine payments. Built on HTTP 402 (Payment Required), MPP defines how autonomous agents discover paid services, negotiate terms, and execute transactions—without manual signup, API keys, or browser automation. Any service can accept payment from any client through a standardized challenge-credential-receipt flow: the server returns a `402 Payment Required` response with available payment options, the client fulfills the payment (via cards, stablecoins, or blockchain), and retries with proof of payment. The resource is delivered with a receipt for verification.

**The problem:** MPP on transparent blockchains exposes everything. Agent spending patterns. Strategic preferences. On public ledgers, your AI agent is effectively publishing its financial diary—visible to competitors, front-runners, and anyone with a block explorer.

**Confidential MPP on [SKALE](https://skale.space)** fixes this. By combining MPP's payment protocol with SKALE's native threshold encryption, agents can pay for services without revealing transaction details to the network. Only the sender and recipient see the actual payment data. Validators process encrypted transactions collaboratively—no single node ever holds the decryption key.

---

## MPP Protocol

MPP addresses a fundamental gap in internet infrastructure: there is no standard way for machines to pay for services programmatically. While humans have optimized checkout flows, browser automation pipelines struggle with visual CAPTCHAs, payment form changes, and session management. This creates friction for AI agents that need to consume paid APIs at scale.

MPP solves this through a simple, extensible core built on an [open IETF specification](https://paymentauth.org):

- **Challenge:** The server returns `402 Payment Required` with a `WWW-Authenticate: Payment` header listing supported methods (Stripe cards, Tempo stablecoins, Solana, Lightning, etc.)
- **Credential:** The client fulfills payment and retries with `Authorization: Payment` containing proof of payment
- **Receipt:** The server verifies payment and returns the resource with `Payment-Receipt` header as proof of delivery

This works with any currency—USD, EUR, USDC, BTC—and any payment network. Developers build MPP clients so their agents can pay for LLM inference, image generation, web search, and data APIs. Service operators integrate MPP servers to accept payments without complex billing infrastructure.

Official SDKs are maintained by [Tempo Labs](https://tempo.xyz) and [Wevm](https://wevm.dev) in [TypeScript](https://mpp.dev/sdk/typescript), [Python](https://mpp.dev/sdk/python), and [Rust](https://mpp.dev/sdk/rust).

---

## SKALE's Privacy Architecture

SKALE provides three native privacy primitives built on the **BITE Protocol** (Blockchain Integrated Threshold Encryption) and integrated directly into the blockchain protocol:

**Encrypted Transactions:** Transactions are encrypted from wallet to execution. The mempool contains only ciphertext—validators cannot see transaction details until a supermajority collaborates to decrypt at execution time. This eliminates MEV and front-running while keeping amounts and payloads private.

**Conditional Transactions (CTX):** Smart contracts can prepare encrypted transactions that execute automatically when predefined conditions are met. Useful for automation workflows and private state transitions—contracts commit to outcomes without revealing inputs until execution triggers.

**Re-encryption:** Encrypted data can be re-encrypted for new recipients onchain. This enables private data sharing where information remains encrypted throughout its lifecycle, accessible only to intended parties without exposing plaintext to the network.

**Confidential Tokens:** A production implementation that combines all three primitives with standard Solidity to create tokens with private balances and amounts. Transfers execute through encrypted transactions, balances remain hidden from the contract itself, and recipients can be designated through re-encryption. The result is fully private stablecoin transfers—neither amounts nor balances visible onchain.

All primitives and the Confidential Token implementation are available on SKALE chains today. Developers use standard Solidity, Hardhat, and Foundry—no custom VMs, no circuit languages, no rewrites required.

---

## How Confidential MPP Works

### Standard MPP

Standard MPP flow on a transparent chain:

```
Alice (Agent) → Bob (Service) → Blockchain
     │                │
     └────────────────┴──────────────────┘
              Everyone sees the payment
```

Alice signs. Bob verifies. The blockchain records amounts and balances publicly. This fails **The Barista Test**: when you buy coffee, the barista doesn't see your bank balance. Your AI agent shouldn't broadcast its wallet state either.

### Confidential MPP

Confidential MPP adds encryption at the protocol level:

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│ Alice (Agent)│─────>│ Bob (Service)│─────>│  Blockchain  │
│              │      │              │      │              │
│  a. Signs    │      │  b. Encrypts │      │  c. Executes │
│     tx       │      │     tx       │      │     private  │
│     ↓        │      │     ↓        │      │     transfer │
│   sends      │      │   submits    │      │              │
│   to Bob     │      │   to chain   │      │              │
└──────────────┘      └──────────────┘      └──────────────┘
        │                     │                     │
        └─────────────────────┴─────────────────────┘
                  Only Alice and Bob see the payment
```

**The flow:**

1. **Signed by Alice** — Alice signs the payment request and sends it to Bob
2. **Encrypted by Bob** — Bob encrypts the transaction details using the network's public key before submitting to the chain
3. **Blockchain execution** — Encrypted data hits the chain. Validators see ciphertext, not plaintext
4. **Threshold decryption** — When conditions are met, a supermajority of validators collaboratively decrypt (no single party ever sees the full plaintext)
5. **Private transfer** — The smart contract executes the private balance transfer with decrypted values

The key: **no single validator can decrypt alone**. A supermajority must collaborate, ensuring decryption only happens when protocol conditions are satisfied.

---

## Using the SDK

Install:

```bash
npm install @skalenetwork/mpp
```

Make a confidential payment:

```typescript
import { mpp } from '@skalenetwork/mpp/client'

const method = mpp.charge({
  chain: 'bite-sandbox',
  currency: 'eUSDC',
  extensions: {
    skale: { encrypted: true, confidentialToken: true },
    gasless: 'eip3009'
  }
})
```

**What this does:**

- `encrypted: true` — Transaction amount is encrypted onchain
- `confidentialToken: true` — Uses eUSDC, where token balances are also encrypted
- `gasless: 'eip3009'` — No gas fees (EIP-3009 permit signature)

Both the payment amount and the token balances remain private. Only the sender and recipient can decrypt their own data.

---

## Why SKALE for Confidential MPP

**Native privacy infrastructure.** Encrypted transactions and confidential tokens are integrated directly into the blockchain protocol—no external proving systems, no third-party dependencies. SKALE chains handle millions of transactions per day each, with infinite horizontal scaling across the network.

**Pre-paid credit system.** SKALE Base uses a credit-based model where developers pre-purchase computation capacity. Agents execute thousands of microtransactions per day with highly efficient costs—no volatile gas fees, no ETH required, and full EVM compatibility maintained.

**EVM-native.** Use existing Solidity contracts, Hardhat, Foundry, and standard tooling. No circuit languages, no custom VMs, no rewrite required.

The infrastructure exists now. SKALE provides the privacy primitives. MPP provides the payment protocol. Together they enable AI agents to transact without broadcasting their financial lives to the world.

---

Sawyer ([TheGreatAxios](https://thegreataxios.com)) is VP Developer Success at SKALE and builds AI systems.
