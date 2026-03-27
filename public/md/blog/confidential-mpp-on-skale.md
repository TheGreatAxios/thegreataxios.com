# Confidential MPP on SKALE: Private Payments for AI Agents

[SKALE](https://skale.space) is a blockchain network designed for the Internet of Agents. It's optimized for the agentic era with zero gas fees, instant finality, and native privacy through BITE (Blockchain Integrated Threshold Encryption). Agents execute micropayments without fees eroding value, with Web2-like UX and encrypted transactions that keep agent actions and logic private. [Docs](https://docs.skale.space) →

The [Machine Payments Protocol (MPP)](https://mpp.dev) is an open standard from Stripe and Tempo for machine-to-machine payments, built on HTTP 402 (Payment Required). It defines how AI agents discover services, negotiate terms, and execute transactions autonomously. MPP turns the "402" status code into a functional payment rail—agents can pay for APIs, compute, and data without human intervention.

**The problem:** MPP on transparent blockchains exposes everything. Agent spending patterns. Service relationships. Strategic preferences. On public ledgers, your AI agent is effectively publishing its financial diary.

**Confidential MPP on SKALE** fixes this. It brings native privacy to machine-to-machine payments through threshold encryption—no single validator can decrypt a transaction alone. Only the sender and recipient see the actual payment details.

---

## How Confidential MPP Works

Standard MPP flow on a transparent chain:

```
Alice (Agent) → Bob (Service) → Blockchain
     │                │
     └────────────────┴──────────────────┘
              Everyone sees the payment
```

Alice signs. Bob verifies. The blockchain records it all—amounts, balances, timing, counterparty relationships. This fails **The Barista Test**: when you buy coffee, the barista doesn't see your bank balance. Your AI agent shouldn't broadcast its wallet state either.

Confidential MPP adds encryption at the protocol level:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│ Alice (Agent)   │───>│   Bob (Service) │───>│   Blockchain    │
│                 │    │                 │    │                 │
│ a. Signs tx     │    │ b. Encrypts     │    │ c. Executes     │
│    (sends to    │    │    (sends to    │    │    private      │
│     Bob)        │    │     chain)      │    │    transfer)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                      │                      │
        └──────────────────────┴──────────────────────┘
                    Only Alice and Bob see the payment
```

**The flow:**

1. **Signed by Alice** — Alice signs the payment request and sends it to Bob
2. **Encrypted by Bob** — Bob encrypts the transaction details using the network's public key before submitting to the chain
3. **Blockchain execution** — Encrypted data hits the chain. Validators see ciphertext, not plaintext
4. **Threshold decryption** — When conditions are met, a threshold of validators collaboratively decrypt (no single party ever sees the full plaintext)
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

- `encrypted: true` — Transaction amount is encrypted on-chain
- `confidentialToken: true` — Uses eUSDC, where token balances are also encrypted
- `gasless: 'eip3009'` — No gas fees (EIP-3009 permit signature)

Both the payment amount and the token balances remain private. Only the sender and recipient can decrypt their own data.

---

## Why SKALE for Confidential MPP

**Native privacy infrastructure.** Encrypted transactions and confidential tokens are built into the protocol at the validator level—no external proving systems or additional infrastructure required.

**Pre-paid credit system.** SKALE Base uses a credit-based model where developers pre-purchase computation capacity. Agents execute thousands of microtransactions per day with highly efficient costs—no volatile gas fees, no ETH required, and full EVM compatibility maintained.

**EVM-native.** Use existing Solidity contracts, Hardhat, Foundry, and standard tooling. No circuit languages, no custom VMs, no rewrite required.

The infrastructure exists now. SKALE provides the privacy primitives. MPP provides the payment protocol. Together they enable AI agents to transact without broadcasting their financial lives to the world.

---

Sawyer ([TheGreatAxios](https://thegreataxios.com)) is VP Developer Success at SKALE and builds AI systems.
