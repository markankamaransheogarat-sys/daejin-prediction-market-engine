# Daejin Prediction Market Simulator & Mathematical Deep Dive ⚡️
### Superteam Earn Bounty: *"Launch & Trade on Daejin: Write a Twitter Thread and Create a Market"*
**Prize Pool:** $620 USDC (1st: $200 | 2nd: $150 | 3rd: $110 | 4th: $90 | 5th: $70)  
**Sponsor:** Daejin (`@Daejinxyz`) & Superteam (`@Superteam`)  
**Live Interactive Simulator:** [https://markankamaransheogarat-sys.github.io/daejin-prediction-market-engine/](https://markankamaransheogarat-sys.github.io/daejin-prediction-market-engine/)  
**GitHub Repository:** [https://github.com/markankamaransheogarat-sys/daejin-prediction-market-engine](https://github.com/markankamaransheogarat-sys/daejin-prediction-market-engine)  
**Author / Contributor:** `@markankamaransheogarat-sys`  

---

## 🎯 Executive Summary & Mission
Prediction markets are the internet's most accurate consensus mechanism. However, legacy orderbook-based markets (Polymarket on Polygon, Augur on Ethereum) suffer from:
1. **Severe Cold-Start Illiquidity:** New markets have 0 volume unless paid market makers quote wide, predatory spreads.
2. **Slow Settlement & High Gas:** Waiting minutes for L2 state transitions and paying substantial fees.

**Daejin (`daejin.xyz`)** re-engineers prediction markets for Solana through **Creator-Owned Shared-Pools**:
- **0% Market-Maker Spread:** Traders do not trade against a market maker; they pool conviction against each other.
- **Sub-Second Solana Execution (~400ms):** Instant position deposits and real-time odds adjustment.
- **Permissionless Creation:** Any creator can spin up a market with clear resolution criteria and seed liquidity.

---

## 📐 How Shared-Pool Markets Work: The Mathematical Engine

In Daejin, every market consists of two segregated conviction pools:
$$\text{Pool}_{\text{YES}} \quad \text{and} \quad \text{Pool}_{\text{NO}}$$

### 1. Dynamic Price & Probability Formation:
The probability (and implied token price between \$0.00 and \$1.00) is determined strictly by the ratio of deposited capital:
$$P(\text{YES}) = \frac{\text{Pool}_{\text{YES}}}{\text{Pool}_{\text{YES}} + \text{Pool}_{\text{NO}}}$$
$$P(\text{NO}) = \frac{\text{Pool}_{\text{NO}}}{\text{Pool}_{\text{YES}} + \text{Pool}_{\text{NO}}}$$

### 2. Proportional Pool-Splitting at Resolution:
When a market resolves via verifiable on-chain evidence, winning predictors split the **entire combined pool** proportionally to their contribution to the winning side:
$$\text{Payout} = \text{Total Pool} \times \left( \frac{\text{User Deposit}}{\text{Winning Pool}} \right)$$

*Example:*  
If Pool_YES has \$3,200 and Pool_NO has \$1,800 (Total Pool = \$5,000; YES = 64%).  
If a user deposits \$50 on YES and YES wins, the user receives their exact proportional share of the entire \$5,050 pool, capturing the entire \$1,800 loser pool without middleman take-rates.

---

## 📊 My Position & Thesis ($50 USDC on YES)
* **Market:** *"Will Solana Firedancer Process Over 50,000 Mainnet TPS Before Q1 2027?"*
* **Stake:** **$50.00 USDC** on **YES**
* **Data-Backed Thesis:**
  1. Jump Crypto's C++ validator client (*Firedancer*) demonstrated 1.08M raw TPS in lab hardware benchmarks.
  2. *Frankendancer* (Firedancer networking + Rust execution) is already active on Solana mainnet with zero consensus breaks.
  3. The current market price of $0.64 implies a 64% probability. Given Solana's hardware scaling roadmap and validator adoption speed, taking YES offers an asymmetric +56% net ROI on capital.

---

## 🛠 My Created Market on Daejin
* **Question:** *"Will Solana Firedancer Process Over 50,000 Mainnet TPS Before Q1 2027?"*
* **Category:** Crypto Infrastructure & L1s
* **Resolution Proof Source:** Blockworks Research Solana Validator Dashboard (`https://blockworks.co/research`) & Solana Foundation Official TPS Metrics.
* **Resolution Date:** `2027-03-31`
* **Seed Liquidity:** $100 USDC ($50 YES / $50 NO) deposited to jumpstart community trading.

---

## 🧵 The Full 7-Tweet Viral Thread

The complete Twitter thread is published below and available to copy with 1-click in the live simulator:

```markdown
1/ Prediction markets are eating the world, but orderbooks on Ethereum & Polygon are still clunky, illiquid, and dominated by market-making bots.

Enter @Daejinxyz — the creator-owned prediction market network built on Solana and part of the @Superteam ecosystem ⚡️

Here is how shared-pools work, why it changes everything, and my first live trade: 🧵👇

2/ How does Daejin actually work in plain English?

Unlike legacy exchanges where you wait for a counterparty on an orderbook, Daejin uses shared-pools (pari-mutuel conviction pools).

There are two pools: Pool_YES and Pool_NO.
Prices reflect the crowd's conviction:
P(YES) = Pool_YES / (Pool_YES + Pool_NO)

If 3,000 USDC is in YES and 1,000 USDC is in NO, YES trades at $0.75 (75% probability). Zero market-maker spread!

3/ The Math: How winners split the pool 💰

When the market resolves, the winners split the ENTIRE combined pool in direct proportion to their stake:

Payout = Total_Pool * (Your_Deposit / Winning_Pool)

If you placed $50 on a 25% underdog and it resolves YES, you don't just win a fixed yield — you split the entire loser pool with other winning predictors. Maximum capital efficiency.

4/ Taking my position ($50 USDC on YES) 📊

I put $50 on "Solana Firedancer Mainnet TPS > 50,000 before Q1 2027".

The thesis:
• Jump Crypto's Firedancer testnet already clocked 1.0M+ raw TPS in laboratory conditions.
• Frankendancer is already live on mainnet validating consensus.
• The current market implies a 64% probability. At these odds, taking YES provides asymmetric risk-to-reward on Solana's scaling curve.

5/ Creating my own market on @Daejinxyz (Free & Permissionless) 🛠

Anyone can become a market architect. I launched:
"Will Solana Firedancer Process Over 50,000 Mainnet TPS Before Q1 2027?"

• Verifiable Proof Source: Blockworks Research Solana Validator Dashboard & Solana Foundation Official TPS Metrics.
• Resolution Date: 2027-03-31
• Seeded with initial liquidity to jumpstart community trading.

6/ Why @Daejinxyz on Solana is a 100x improvement over legacy rails:

⚡️ Sub-second settlement (~400 ms)
💸 Fractions of a cent in gas fees ($0.0005)
🔒 100% On-chain evidence-based resolution — no centralized editorial fiat
🌐 Creator ownership — creators launch markets on any real-world topic and build liquidity

7/ Prediction markets are the purest truth engine on Earth.

You can try Daejin today with just $5:
1. Connect your Phantom / Solflare wallet at https://daejin.xyz
2. Pick an outcome or launch your own market for free.

Built on Solana with @Superteam and powered by @Daejinxyz.

Let's see what the crowd's conviction is! 🚀
```

---

## 💻 Tech Stack & Local Setup
- **Framework:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide Icons
- **Deployment:** GitHub Pages

```bash
cd app
bun install
bun run dev
```

---

## 📄 License
MIT © 2026 `markankamaransheogarat-sys` • Superteam Earn Bounty
