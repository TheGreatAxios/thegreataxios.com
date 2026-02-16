---
layout: minimal
authors:
    - "thegreataxios"
date: 2025-07-31
title: "Proof-of-Encryption in the Cloud"
---

# Proof-of-Encryption in the Cloud

This article explores the revolutionary BITE Protocol that implements Proof of Encryption using threshold cryptography and multi-party signatures to enable fully encrypted blockchain transactions resistant to MEV attacks. Unlike traditional trusted execution environments, BITE embeds encryption directly into consensus through provable mathematics, requiring zero Solidity changes while offering cloud API accessibility for encrypted transactions across any programming language, with FAIR L1 blockchain pioneering the implementation before broader SKALE Chain adoption.

**BITE** is an innovative protocol from the SKALE Network ecosystem, launching first on the new **FAIR Layer 1 blockchain**. Designed for seamless integration and massive potential, BITE enables a wide range of critical functions—ushering in a new era of encrypted, private, and MEV-resistant blockchain usage.

The following post explores the key benefits of BITE, FAIR, and the upcoming SKALE Network upgrade, including a **unique way to attain Proof of Encryption (PoE) with zero changes required from developers**.

## The Benefits of BITE

While some of these benefits can arrive sooner depending on SDK implementation and adoption, I’ve organized them into **short**, **mid**, and **long-term** buckets.

### 🟢 Short Term
- Fully encrypted transactions with 100% protection against MEV, including back-running
- Onchain traditional finance tools: private and FAIR TWAPs, DCA, and market orders
- Censorship resistance
- Simple integration with **zero changes to Solidity**

### 🟡 Mid Term
- AI-powered onchain trading via enhanced encrypted financial tools
- End-to-end encryption with re-encryption inside a TEE (Trusted Execution Environment), enabling data forwarding to specific parties for private decryption

### 🔵 Long Term
- Fully encrypted private state
- Onchain healthcare and banking use cases
- Fully encrypted **parallel execution** within the EVM

----
## How Proof of Encryption Works

**Proof of Encryption (PoE)** embeds encryption into the consensus layer of a blockchain. Unlike Layer 2 solutions (e.g. Unichain) that use TEEs in isolation, PoE **does not depend on decentralization alone**—it relies on **provable mathematics**.

> The SKALE Network core team has over seven years of experience building the world’s fastest leaderless BFT consensus. They’ve combined real-world application with rigorous mathematical proofs to pioneer PoE.

### 🧠 How It Works
PoE uses:
- **Threshold schemes** +
- **BLS threshold encryption** +
- **Multi-party threshold signatures** +
- **Economic PoS security**

This combo allows encrypted transaction propagation, leaderless/asynchronous consensus, and decryption via supermajority—all secured cryptographically and economically.

The result? **Private, MEV-resistant, decentralized consensus**—unlocking trillions in new financial use cases.

---
## How to use BITE
**BITE Protocol** is the implementation of PoE when used with a compatible blockchain like FAIR or (soon) SKALE Chains.

The best part? **Zero changes to your Solidity contracts**.

### Example Using BITE TypeScript/JavaScript Library

![Image](https://pbs.twimg.com/media/Gwi47chaIAAlWnr?format=jpg&name=small)

```bash
npm add @skalenetwork/bite
```

The library makes it easy to encrypt both transaction data and the `to` address in just a few lines of code.

---
### What's with the Cloud?
Over the last several years of working in blockchain, I’ve realized one thing: **an innovative product is only useful if it’s easy to implement**. That’s why I collaborated with [@0xRetroDev](https://x.com/0xRetroDev) to build a simpler, cloud-based design for broader adoption.

### Background
If you’ve heard of **Flashbots**, **CoW Swap**, or **Jito**, you know they’re tied to **MEV** (Maximal Extractable Value). If not, here’s a simplified breakdown:

- **MEV** is profit gained by reordering or inserting transactions.
- **Bad MEV** = front-running, sandwich attacks, back-running.
- **Good MEV** = arbitrage, liquidations that help price stability or protocol solvency.
- **Some firms (e.g. Jito)** make validators more profitable via MEV.
- **Others (e.g. CoW Swap)** attempt to *protect users* from MEV.

> **Bottom line:** MEV is mostly harmful and extracts value away from users.

### Simplifying Adoption
Widespread usage builds a **network effect**. Just as Jito dominates Solana validators and MEV-blocker RPCs like CoW Swap are spreading, we aim for BITE to be universally accessible—across stacks, devices, and languages.

### Phase I: BITE API

A PoC implementation is already live thanks to [@0xRetroDev](https://github.com/0xRetroDev):  
🔗 [BITE API GitHub Repo](https://github.com/0xRetroDev/bite-api)

This API allows any transaction to be encrypted by calling the endpoint. It’s ideal for:
- Environments without native BITE SDKs
- Languages outside JavaScript/TypeScript
- Setting up early MPC experiments or agentic flows

> ⚠️ **Note:** Because `eth_estimateGas` can't work properly with encrypted transactions, this can unintentionally leak user intent if used via 3rd-party RPCs.

A production-ready version will soon be hosted via [Eidolon.gg](https://eidolon.gg) for the FAIR + SKALE Communities.

---

### Phase II: Private BITE API

To fully solve the **privacy problem**, we propose a unique infrastructure setup modeled on how FAIR and SKALE operate.

#### Infrastructure
1. Run a TEE (Trusted Execution Environment)
2. Generate a private key *inside* the TEE
3. Expose the **public** key via API

#### SDK Flow
4. Client requests public key
5. Client encrypts transaction payload using public key
6. TEE decrypts using internal private key
7. TEE re-encrypts using FAIR/SKALE BLS committee key
8. Returns encrypted payload to client
9. Client signs + broadcasts

This allows **any client**—C++, Kotlin, IoT, etc.—to securely use BITE without needing full Web3 tooling or native SDK support.

Yes, there are risks and trade-offs here. But I believe this is a great **early-stage design** for broader PoE adoption.

---

## 👋 About Me

Hi, I’m **Sawyer**, a software engineer, developer relations lead, and operational consultant with a background in healthcare and blockchain.
