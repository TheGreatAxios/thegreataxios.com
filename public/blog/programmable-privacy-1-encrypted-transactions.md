---
layout: minimal
authors:
    - "thegreataxios"
date: 2026-04-17T08:00:00
title: "Programmable Privacy (Part 1/5): Encrypted Transactions"
description: "$540.54M extracted from Ethereum users via MEV. Encrypted transactions make this impossible — SKALE embeds threshold encryption directly into consensus."
---

# Programmable Privacy (Part 1/5): Encrypted Transactions

$540.54M extracted from Ethereum users over 32 months. [1] That's the documented cost of mempool visibility — your transactions broadcast in plaintext to every validator, every searcher, every MEV bot. Encrypted transactions change this entirely.

SKALE embeds threshold encryption into consensus. Validators see ciphertext, not calldata. Amounts, destinations, and intents remain encrypted until a supermajority collaborates to decrypt. This is not a Layer 2 add-on or an external oracle — it's protocol-level privacy with zero Solidity changes required.

## The MEV Problem

MEV (Maximal Extractable Value) is profit extracted from transaction ordering. The mempool is a dark forest — every pending transaction is visible and exploitable.

| Attack Type | Documented Impact | Source |
|-------------|-------------------|--------|
| Uniswap Sandwich Attacks | $540.54M over 32 months [1] | Qin et al., arXiv:2101.05511 |
| Generalized Frontrunning | $35.37M extracted [1] | Qin et al. |
| Single Largest BEV | $4.1M in one transaction [1] | Qin et al. |
| Lien Finance Rescue | $9.6M at risk [2] | samczsun, Paradigm |
| Dark Forest Incident | $12K lost [3] | Paradigm |
| Expected BEV (Clockwork) | $56M/month [4] | Babel et al., IEEE S&P 2023 |

The mechanics are straightforward. A bot sees your swap transaction in the mempool. It front-runs with the same trade, driving up the price. Your transaction executes at the worse rate. The bot back-runs to capture the spread. This is a sandwich attack — profitable, legal, and entirely extractive.

Flash Boys 2.0 [5] established the academic foundation. Daian et al. quantified the first systematic MEV extraction in 2019. The research has only accelerated since.

## What Encrypted Transactions Solve

Encrypted transactions make the mempool opaque. Validators reach consensus on encrypted payloads. No one sees amounts, destinations, or function calls until after finalization.

Threshold encryption uses:

- **AES encryption** for transaction data
- **BLS threshold signatures** for committee-based decryption
- **Supermajority consensus** — 11/16 validators required
- **Automatic decryption** post-finalization

The result: 100% mempool privacy. No front-running. No sandwich attacks. No back-running.

## How It Works

A standard transaction flows like this:

```
Wallet → Mempool (visible) → Validator (visible) → Block (visible)
```

With encrypted transactions:

```
Wallet → Encrypt (AES + BLS) → Mempool (ciphertext) → Consensus (ciphertext) → Decrypt at Finalization → Execute
```

The committee public key encrypts. The committee private key — split across validators via threshold cryptography — decrypts. No single validator can decrypt alone. No external infrastructure required.

From a developer perspective, the change is minimal:

```typescript
import { bite } from '@skalenetwork/bite'

const encryptedTx = await bite.encryptTransaction({
  to: contractAddress,
  data: calldata,
  value: amount
})

await wallet.sendTransaction(encryptedTx)
```

That's it. No contract rewrites. No circuit languages. No proving systems.

## Use Cases

**Private DeFi.** Traders execute without broadcasting their positions. Strategies remain hidden until execution. No MEV extraction possible.

**Confidential Intents.** Users express desired outcomes — "swap ETH for USDC at market rate" — without revealing amounts or slippage tolerances. Solvers compete without seeing each other's bids.

**MEV-Resistant Settlement.** DCA (Dollar-Cost Averaging), TWAP (Time-Weighted Average Price), and other automated strategies execute without broadcasting timing or quantities.

**Censorship Resistance.** Encrypted transactions cannot be selectively filtered based on content. Validators see only ciphertext until consensus is reached.

## What This Series Covers

This is Part 1 of 5 on Programmable Privacy:

1. **Encrypted Transactions** — Part 1/5 (this post): Foundation of mempool privacy
2. **Conditional Transactions** — Part 2/5: Encrypted state with callback execution
3. **Re-Encryption** — Part 3/5: Forward encrypted data to new recipients
4. **Confidential Tokens** — Part 4/5: All three primitives working together
5. **Rebuilding Poker Onchain** — Part 5/5: Live demo using CTXs and re-encryption

Each part builds on the previous. Together they demonstrate how SKALE enables programmable privacy — confidentiality as a native primitive, not an add-on.

---

**Sources:**

1. Qin et al., "Quantifying Blockchain Extractable Value: How dark is the forest?" arXiv:2101.05511, 2021. [https://arxiv.org/abs/2101.05511](https://arxiv.org/abs/2101.05511)

2. samczsun, "Escaping the Dark Forest," September 2020. [https://samczsun.com/escaping-the-dark-forest/](https://samczsun.com/escaping-the-dark-forest/)

3. Paradigm, "Ethereum is a Dark Forest," August 2020. [https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest](https://www.paradigm.xyz/2020/08/ethereum-is-a-dark-forest)

4. Babel et al., "Clockwork Finance: Automated Analysis of Economic Security in Smart Contracts," IEEE S&P 2023, arXiv:2109.04347. [https://arxiv.org/abs/2109.04347](https://arxiv.org/abs/2109.04347)

5. Daian et al., "Flash Boys 2.0: Frontrunning in Decentralized Exchanges, Miner Extractable Value, and Consensus Instability," IEEE S&P 2020, arXiv:1904.05234. [https://arxiv.org/abs/1904.05234](https://arxiv.org/abs/1904.05234)
