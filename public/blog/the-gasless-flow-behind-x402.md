---
layout: minimal
authors:
    - "thegreataxios"
date: 2025-10-27
title: "The Gasless Design Behind x402"
---

# The Gasless Design Behind x402

This article explores the gasless design behind x402, a protocol for internet-native payments that enables seamless transactions across any web service without the need for API keys or accounts.

[x402](https://x402.org) leverages the existing [HTTP 402](https://docs.cdp.coinbase.com/x402/core-concepts/http-402) "Payment Required" status code, which indicates that a payment is necessary to access a resource.

Today, the primary use of x402 is through stablecoins, primarily [USDC](https://usdc.com), which allows payments to move at blockchain speed instead of through traditional financial institutions.  
One key component of USDC is the use of [EIP-3009](https://eips.ethereum.org/EIPS/eip-3009), which enables the transfer of fungible assets through a signed authorization.

This article explores **Transfer with Authorization**, forwarding patterns for existing blockchains, new design opportunities for chains like [SKALE on Base](https://docs.skale.space/welcome/skale-on-base/), and why not all blockchains are created equal when it comes to meta-transaction patterns.

## What is EIP-3009?

For those unfamiliar, EIP stands for Ethereum Improvement Proposal. EIPs are a way for the Ethereum community to propose and discuss new ideas for the protocol. EIP-3009 defines a method to transfer fungible assets through signed authorizations that conform to the [EIP-712](https://eips.ethereum.org/EIPS/eip-712) typed message signing specification.

This enables a user to:

- Delegate the execution and payment of gas fees to another party  
- Cover gas fees in the token being authorized for transfer  
- Perform a series of actions in a single atomic transaction  
- Enable the receiver of a transfer to execute the transfer  
- Create simplified batching mechanics  

Additionally, one of the key benefits of EIP-3009 is that it **does not** require sequential nonces, making it far simpler to implement and process actions on behalf of a user without worrying about transaction ordering.

| Feature | EIP-3009 | EIP-2612 |
| ------- | -------- | -------- |
| Sequential Nonces | No | Yes |
| Pre-Approval (approve/permit) | No | Yes |
| Simple Authorization Flow | Yes | No |

## EIP-3009 and x402

The on-chain transfer portion of x402, in its first version, is built around the use of EIP-3009. While only a few tokens natively support EIP-3009, such as USDC and EURC from Circle and AUSD from Agora, the pattern lends itself well to a "permit-to-use" off-chain approach.  

The flow of an x402 payment is as follows:

**Alice**: the user or AI agent, the buyer  
**Bob**: the web service or another agent, the seller  
**Carol**: the facilitator responsible for verifying and settling the payment  

1. **Alice** requests a resource from a web service or another agent.  
2. **Bob** returns a `402 Payment Required` response that includes a list of accepted payment options.  
3. **Alice** chooses to pay in ERC-3009 compliant AxiosUSD on SKALE Base Chain and signs an authorization using EIP-712 for $0.01. **Bob** requests the resource again, including the `X-Payment` header with his signature base64 encoded.  

:::note
This can be done through a Web3 library like [Viem](https://viem.sh), an invisible wallet like [Privy](https://privy.io), a Web3 wallet like [MetaMask](https://metamask.io), or a custodial wallet such as [Coinbase Developer Platform Server Wallets](https://www.coinbase.com/developer-platform/products/wallets).
:::

4. **Bob** checks for the authorization on every request and, when found, contacts **Carol** to `/verify`.  
5. **Carol** verifies the payment authorization against the payment scheme and network and returns a verification response to **Bob**.  
6. **Bob** receives the verification response and begins the creation/inference process. If using **Carol** to help settle, **Bob** also tells **Carol** to `/settle`.  
7. **Carol** settles the payment on-chain by executing the transfer on behalf of **Bob** and responds with a payment execution response.  
8. **Bob** receives the response from **Carol** and responds with the `X-Payment-Response`.  

:::note
While this may seem complicated, most of the work is actually done by the facilitator (**Carol**), who handles the majority of on-chain operations.
:::

## x402 Across Blockchains

The goal of an open protocol like x402 is to foster adoption and interoperability. The Ethereum Virtual Machine (EVM) version uses EIP-3009 and is extendable across today's ecosystem of many EVM blockchains.  
A Solana implementation also exists and will be explored in a future article.  

It is important to understand the ability to use x402 across blockchains and the ways it can be enabled:

### Native ERC-3009 Implementation

This is the default and preferred method to implement x402, identical to the [Bridged ERC-3009 Implementation](#bridged-erc-3009-implementation) discussed below.  
This is how USDC, EURC, and AUSD are implemented on Base and other EVM chains today. While not all tokens are natively ERC-3009 compatible, existing tokens can upgrade if the pattern is supported and the issuer allows it.  

For tokens that cannot or prefer not to upgrade, the options are ERC-3009 Forwarding or Bridged ERC-3009 Implementation (preferred).

### ERC-3009 Forwarding

ERC-3009 Forwarding is a pattern that existed conceptually but had limited implementation until I tested x402 on FAIR Testnet in late September.  
For an example, see my [EIP-3009 Forwarder](https://github.com/TheGreatAxios/eip3009-forwarder) contract.

:::note
This enables x402 for any token on any EVM blockchain, but it requires user approval for the forwarding contract (an allowance) so it can spend tokens on the user's behalf. While not ideal, it allows x402 to work with minimal server and facilitator changes. With account abstraction becoming more prevalent, this limitation may lessen over time.
:::

### Bridged ERC-3009 Implementation

The preferred way to expand x402 support is to create ERC-3009 compatible tokens on the target chain. The following guidelines generally work for L2s/L3s/AppChains. However, if a chain lacks a technical moat compared to its parent chain or is primarily parasitic, this approach may not make sense.

**Requirements**:

- A secure, fully programmable bridge  
- An ERC-3009 compatible token on the new chain that supports the bridge  

**Recommended chain characteristics**:

- A liquidity-based bridge enabling TVL accrual for apps  
- Programmable bridge functionality for AI agents to interact with the bridge and tokens  
- ERC-3009 compatible bridge hooks to settle x402 transactions directly from the parent chain  
- A technical advantage over the parent chain (e.g., zero gas fees, instant finality)  

SKALE Network is ideal for this. See setup and implementations [here](https://github.com/TheGreatAxios/skale-chain-setup) for SKALE Base Sepolia.  
This setup allows a SKALE chain to natively support x402 for any token bridged from Base.

## Gas Blockchains, Gasless Flows, and the Facilitator

Most blockchains today are gas-based, requiring fees to execute transactions. This conceptually aligns with x402, which allows a single transaction instead of pre-paying for resources. However, many blockchains struggle with transaction spikes, leading to highly variable fees.

Various meta-transaction patterns and account abstraction proposals exist (EIP-3009, EIP-2612, EIP-4337, EIP-7702), but all share the same core problem: **someone must pay the gas fees**.

In x402, verification and settlement are often delegated to a facilitator, offloading complexity and gas fees. However, this makes the facilitator responsible for paying the gas fees for executed transactions.  
As usage grows, this can become a bottleneck unless the facilitator runs their own blockchain and profits from transaction execution, as seen with Coinbase/Base/USDC. This alignment creates a win-win-win-win scenario for clients, servers, facilitators, and blockchains.

### The Solution is Truly Gasless

SKALE Network recently announced [SKALE Expand](https://forum.skale.network/t/skale-growth-manifesto/726?u=thegreataxios), a growth initiative enabling SKALE Manager to deploy its app-like design to other blockchains beyond Ethereum.  
This allows truly gasless x402 flows on other chains while solving finality/rollback problems across L1s/L2s/L3s and appchains.  

SKALE Chains are self-contained EVM-compatible blockchains with high-performance C++ EVM implementations, scalable node architecture, and instant finality.

:::note
SKALE Expand brings truly gasless x402 to any blockchain ecosystem. The native IMA bridge is one of the fastest liquidity bridges globally, secured by the SKALE Chain consensus. For example, deploying on Base turns SKALE into an app that accrues TVL and supports new EIP-3009 tokens while remaining gasless. Other ecosystems could request SKALE deployment to achieve the same setup.
:::

## Conclusion

x402 is powerful, and I have been building on it for a couple of months now. Combining x402 with ERC-8004 trustless agents on a blockchain designed for the machine economy presents exciting possibilities.
Expanding that further into the broader world of agentic systems and the machine economy I think there is a massive opportunity to bring many businesses and people onchain.

Reach out if you are building on x402 or ERC-8004 and want to collaborate, share ideas, or just get some feedback on your project.
