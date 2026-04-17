---
layout: minimal
authors:
    - "thegreataxios"
date: 2026-04-13
title: "Storing Private Data Onchain"
description: "Re-encryption lets you share encrypted data with new recipients without exposing it publicly onchain — private information sharing, delegation, and confidential tokens."
---

# Storing Private Data Onchain

You encrypted data for one party. Now you need to share it with another — without revealing it to the chain. Re-encryption makes this possible.

SKALE's re-encryption primitive allows encrypted data to be forwarded to new recipients onchain. The data never decrypts in contract storage. Validators re-encrypt using threshold cryptography, enabling private information sharing, secure data delegation, and confidential token patterns.

## The Problem

Once data is encrypted to a specific key, standard encryption traps it. Either the holder decrypts and re-encrypts manually (exposing plaintext) or the data stays locked to the original recipient.

Onchain, this is worse. Smart contracts can't hold secrets — any decrypted state is visible to all validators. Traditional solutions require TEEs (Trusted Execution Environments) or complex multi-party computation offchain.

## What Re-Encryption Enables

Re-encryption uses threshold cryptography to transform ciphertext encrypted to one key into ciphertext decryptable by another — the committee decrypts via CTX, then re-encrypts to the new recipient.

The protocol provides two encryption modes:

- `BITE.encryptTE()` — Threshold encrypt for committee decryption via CTX
- `BITE.encryptECIES()` — Encrypt to a specific viewer key (secp256k1)

Re-encryption bridges these. Data encrypted via TE can be decrypted through a CTX callback, then re-encrypted to any ECIES viewer key within the same callback.

## Use Cases

**Onchain Information Sharing.** Medical records, financial data, or proprietary research stored encrypted onchain can be selectively shared with new parties. The original holder authorizes — the chain executes the re-encryption without seeing content.

**Private Data Delegation.** An agent holding encrypted data can delegate access to another agent without transferring the decryption key. The delegator specifies the new recipient; validators handle the cryptographic transformation.

**Confidential Tokens.** Token balances encrypted to holder keys. Transfers re-encrypt to the recipient's viewer key. The contract never sees plaintext balances — only the sender and recipient can decrypt their own data.

**Encrypted Messaging Patterns.** Messages encrypted onchain that can be forwarded to new participants. Group membership changes without decrypting message history.

## How It Works

The cryptographic foundation is ECIES (Elliptic Curve Integrated Encryption Scheme) combined with BLS threshold encryption.

<div align="center">
  ![Re-encryption Flow](/reencryption-flow.svg)
</div>

```
Original Ciphertext (TE) → Committee CTX Decryption → onDecrypt callback → New Ciphertext (ECIES to viewer key)
```

The committee holds threshold shares of the private key. No single validator can decrypt alone. A supermajority must collaborate to decrypt via CTX, and the contract's `onDecrypt` callback handles re-encryption to the recipient's viewer key.

For developers, the interface is standard Solidity:

```solidity
// Store threshold-encrypted data
bytes memory encryptedData = BITE.encryptTE(BITE.ENCRYPT_TE_ADDRESS, plaintext);

// Later: submit CTX to decrypt and re-encrypt in callback
BITE.submitCTX(BITE.SUBMIT_CTX_ADDRESS, gasLimit, encryptedArgs, plaintextArgs);
// The onDecrypt callback then calls BITE.encryptECIES() with the viewer key
```

The viewer key is a standard secp256k1 public key. The viewer decrypts client-side using their private key — no threshold operation required for the recipient.

## Real Example: Confidential Poker

The [live poker demo](https://confidential-poker.vercel.app) demonstrates re-encryption in practice. Here's how it works:

When cards are dealt, each hole card is:
1. Threshold encrypted (`encryptTE`) for the showdown reveal
2. ECIES encrypted (`encryptECIES`) to the player's viewer key for client-side viewing

During the hand, only the player can see their hole cards — decrypted via their private key. At showdown, a CTX decrypts the threshold-encrypted version to evaluate the winner. No single entity ever sees all cards unencrypted until the protocol triggers reveal.

This pattern applies beyond poker:
- Private document sharing with viewer-key access
- Confidential escrow where terms encrypt to mediator and participants
- Selective disclosure for compliance (re-encrypt to auditor keys)

## Re-Encryption + CTXs

Re-encryption becomes more powerful combined with Conditional Transactions. A contract can:

1. Store threshold-encrypted data
2. Wait for conditions (time, payment, approval)
3. Trigger a CTX that re-encrypts to a new recipient
4. The new recipient receives without ever touching plaintext onchain

This is "encrypted info block over block" — data flows through the chain, transforming in encrypted form, only decrypting at final destinations.

## Building with Re-Encryption

If you're building applications that need private data sharing — onchain info sharing, data delegation, confidential tokens — re-encryption is live on SKALE chains. No external infrastructure. No TEEs. Standard Solidity patterns.

I'm working on confidential data flows daily. Reach out if you want to walk through encryption patterns for your use case.

---

<h2 id="sources">Sources</h2>

1. SKALE BITE Documentation, [https://docs.skale.space](https://docs.skale.space)
2. SKALE BITE Solidity Library, [github.com/skalenetwork/bite-solidity](https://github.com/skalenetwork/bite-solidity)
3. Confidential Poker Implementation, [github.com/TheGreatAxios/confidential-poker](https://github.com/TheGreatAxios/confidential-poker)
