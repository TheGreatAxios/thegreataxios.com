---
layout: minimal
authors:
    - "thegreataxios"
date: 2026-04-17T11:00:00
title: "Programmable Privacy (Part 4/5): Confidential Tokens"
description: "Confidential tokens demonstrate all three privacy primitives working together — encrypted transactions, conditional execution, and re-encryption enable private balances and amounts."
---

# Programmable Privacy (Part 4/5): Confidential Tokens

The barista test: when you buy coffee, the barista doesn't see your bank balance. Confidential tokens bring this privacy to blockchain — private balances, encrypted amounts, and transfers that reveal nothing to observers.

This is not a new primitive. Confidential tokens are an *application* — a pattern that combines encrypted transactions, conditional transactions, and re-encryption into a single use case. eUSDC is one implementation. The pattern works for any token.

## What Confidential Tokens Demonstrate

Standard ERC-20 tokens expose everything. Balances. Transfer amounts. Transaction history. Anyone with a block explorer can trace flows, identify whales, and analyze spending patterns.

Confidential tokens change this:

| Standard Token | Confidential Token |
|----------------|-------------------|
| Balances public | Balances encrypted |
| Transfer amounts visible | Amounts encrypted |
| History traceable | Only sender/recipient see their flows |
| Contract sees all data | Contract executes on encrypted state |
| No privacy guarantees | Threshold cryptography secures data |

The technology isn't new — it's the combination of three existing primitives applied to a standard token interface.

## The Three Primitives

**1. Encrypted Transactions (Part 1/5)**

Transfer calls encrypt the amount. The mempool sees only ciphertext. Validators reach consensus without knowing transfer values.

```solidity
// Standard ERC-20: amount is plaintext
transfer(to, amount)

// Confidential: amount encrypts automatically
transfer(to, encryptedAmount) // SDK encrypts
```

**2. Conditional Transactions (Part 2/5)**

Balance updates execute via CTX callbacks. The contract stores encrypted balances. When a transfer triggers, `submitCTX()` queues the state update. Next block, `onDecrypt()` executes the balance changes.

This ensures atomicity across multiple encrypted state changes. A transfer debits the sender and credits the recipient in the same decryption batch.

**3. Re-Encryption (Part 3/5)**

Recipient balances encrypt to the recipient's viewer key. When a transfer executes, the new balance re-encrypts automatically. Only the recipient can decrypt their updated balance client-side.

## Example: eUSDC

eUSDC is a confidential stablecoin implementation on SKALE. It maintains the USDC peg while adding privacy:

- **Deposits:** Standard USDC → encrypted eUSDC via bridge
- **Transfers:** Amounts and balances stay encrypted
- **Withdrawals:** Encrypted eUSDC → standard USDC with amount reveal

The SDK usage is straightforward:

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

`encrypted: true` — Transaction amount encrypts onchain.
`confidentialToken: true` — Uses eUSDC with encrypted balances.
`gasless: 'eip3009'` — No gas fees (EIP-3009 permit signature).

## Integration with MPP

Confidential tokens combine naturally with MPP (Machine Payments Protocol). I covered this in depth in [Confidential MPP on SKALE](/blog/confidential-mpp-on-skale.mdx) — the summary:

AI agents paying for services via MPP can use confidential tokens to hide both the payment amount and their remaining balance. Only the agent and the service provider see transaction details.

This matters for:
- **Agent spending patterns** — hidden from competitors
- **Strategic preferences** — which services an agent prioritizes stays private
- **Budget constraints** — total holdings not visible onchain

## The Pattern, Not The Product

eUSDC is one example. The confidential token pattern applies broadly:

**Private Payroll.** Companies pay employees without revealing salaries to the world. Each employee sees only their own transfers.

**Agent-to-Agent Payments.** AI agents transact without broadcasting financial positions. Trading bots settle without revealing strategies via payment patterns.

**Sensitive Transfers.** Donations, legal settlements, and personal payments execute without public scrutiny.

**Compliance-Ready Privacy.** Re-encryption enables selective disclosure to auditors without revealing data to the public chain. Threshold decryption can trigger for authorized compliance keys.

Any token can be made confidential using this pattern. These primitives are native to SKALE — no custom VMs, no circuit languages, no rewrites required.

## What This Enables

Confidential tokens prove that programmable privacy isn't theoretical. The primitives work together to solve real problems:

1. Encrypted transactions hide amounts in transit
2. Conditional transactions execute encrypted state updates
3. Re-encryption delivers private balances to recipients

The result is a token with the same functionality as ERC-20 but privacy properties that match traditional banking. The barista test — passed.

## Building Confidential Tokens

If you're issuing tokens that need privacy — for payments, payroll, agent settlements, or compliance — the confidential token pattern is production-ready on SKALE. Standard Solidity. Standard tooling.

I'm working on confidential token integrations. Reach out if you want to explore the pattern for your token.
