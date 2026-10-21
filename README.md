# Daejin, explained

An independent, interactive explainer of [Daejin](https://www.daejin.xyz/prediction) prediction markets, written for the
Superteam Earn bounty *Launch & Trade on Daejin: Write a Twitter Thread and Create a Market*. Not affiliated with Daejin.

**Live:** https://markankamaransheogarat-sys.github.io/daejin-prediction-market-engine/

## What's on the page

| Tab | What it shows |
| --- | --- |
| How it works | A payout calculator: pick a YES price, a side and an amount, see shares, payout if right, if wrong and if voided. |
| My trade | The position taken for the bounty and the data behind it. |
| My market | The market launched for the bounty: question, proof source, timing, edge cases and why it is built that way. |
| Thread | The thread, post by post, each under 280 characters, with copy buttons and screenshot slots. |

## How a Daejin market works

Source: [daejin.xyz/risk-and-rules](https://www.daejin.xyz/risk-and-rules), last updated Sep 25, 2026.

- Every market is one YES/NO question with a close time and a resolution source declared up front.
- One YES share plus one NO share are always worth exactly 1 USDC, so a share's price (0.01 to 0.99) is the market's
  implied probability.
- A winning share redeems for 1 USDC, a losing share for 0. Every share is fully backed by USDC locked in the market's
  contract, so the losing side's money is what pays the winners.
- Fees: 0% on buying, selling or losing; 2% of realised profit on a winning exit.
- A voided market redeems every share at 0.5 USDC.

```
shares       = amount / price
if right     = shares x 1 USDC - 2% x (shares - amount)
if wrong     = 0
```

Example: 5 USDC on NO at 0.50 buys 10 shares. If NO wins: 10 - 2% x 5 = 9.90 USDC. If YES wins: 0.

## My trade

NO on [Will Solana (SOL) outperform Bitcoin (BTC) in October 2026?](https://www.daejin.xyz/prediction/6ad3bf0e94731a0a263f87ce)
(resolves on CoinGecko USD prices, Oct 1 vs Nov 1, 2026).

| | Oct 1 | Oct 21 | Change |
| --- | ---: | ---: | ---: |
| SOL | $118.04 | $108.26 | -8.3% |
| BTC | $83,576 | $84,496 | +1.1% |

SOL is 9.4 points behind with about 10 days left; for YES it has to gain ~10% on BTC. Over the last 90 days the daily
standard deviation of log(SOL/BTC) was ~1.7% (Binance daily closes), so a driftless random walk gives YES ~4%. Fat tails
push that higher, but not to the 50% the market was pricing.

## My market

**Will SOL close above $110 on Binance (SOL/USDT daily candle) on November 30, 2026?**

- Proof source: Binance SOL/USDT 1D candle close for Nov 30, 2026 (UTC); fallback CoinGecko SOL/USD at Dec 1 00:00 UTC.
- "Above" is strict: $110.00 resolves NO. Intraday highs, perpetuals and other exchanges do not count.
- $110 is ~2% above spot at launch, so the market opens near 50/50; ~40 days to resolution.

All numbers on the page live in [`app/src/data.ts`](app/src/data.ts), the thread in [`app/src/thread.ts`](app/src/thread.ts).

## Run locally

```bash
cd app
npm install
npm run dev
```

Deploy: `npm run build`, then publish `app/dist` to the `gh-pages` branch.

## License

MIT
