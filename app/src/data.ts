// Everything the page shows about the real trade and market lives here, so the
// numbers can be updated in one place once the position and market exist.

/** Daejin fee schedule, from https://www.daejin.xyz/risk-and-rules (Sep 25, 2026). */
export const FEES = {
  /** Charged on realised profit only, when a winning position is closed or redeemed. */
  profitFee: 0.02,
  /** Every share of a voided market redeems at this price. */
  voidPayout: 0.5,
};

export const SOURCES = {
  rules: 'https://www.daejin.xyz/risk-and-rules',
  markets: 'https://www.daejin.xyz/prediction',
};

/** The position taken for the bounty: a featured market created by another user. */
export const POSITION = {
  question: 'Will Solana (SOL) outperform Bitcoin (BTC) in October 2026?',
  url: 'https://www.daejin.xyz/prediction/6ad3bf0e94731a0a263f87ce',
  rule: "CoinGecko USD prices on Oct 1 and Nov 1, 2026 (00:00 UTC). YES if SOL's % change beats BTC's.",
  side: 'NO' as 'YES' | 'NO',
  /** Price paid per share in USDC; update after the fill. */
  price: 0.5,
  stake: 5,
  /** Snapshot used for the thesis (CoinGecko). */
  snapshotDate: 'Oct 21, 2026',
  sol: { start: 118.04, now: 108.26 },
  btc: { start: 83576, now: 84496 },
  /** Daily standard deviation of log(SOL/BTC) over the last 90 days (Binance daily closes). */
  relativeDailyVol: 0.0168,
  daysLeft: 10.5,
};

/** The market designed and launched for the bounty. */
export const MY_MARKET = {
  question: 'Will SOL close above $110 on Binance (SOL/USDT daily candle) on November 30, 2026?',
  /** Filled in once the market is live on Daejin. */
  url: '',
  source: 'Binance SOL/USDT 1D candle for Nov 30, 2026 (UTC), close price',
  sourceUrl: 'https://www.binance.com/en/trade/SOL_USDT',
  fallback: 'If Binance data is unavailable: CoinGecko SOL/USD price at Dec 1, 2026 00:00 UTC',
  closes: 'Nov 30, 2026, 23:00 UTC',
  resolves: 'After the candle closes, Dec 1, 2026 00:00 UTC',
  rules: [
    'YES only if the close is strictly greater than $110.00; exactly $110.00 resolves NO.',
    'Only the Binance SOL/USDT spot pair counts, not perpetuals or other exchanges.',
    'Intraday highs do not count, only the daily close.',
  ],
  why: [
    '$110 sits about 2% above spot (~$108), so the market opens close to 50/50 and both sides have a reason to trade.',
    'One exchange, one pair, one candle, one timezone: nothing to argue about at resolution.',
    'About 40 days to resolution: long enough for a real move, short enough to stay interesting.',
  ],
  /** Seed liquidity in USDC; 0 until deposited. */
  liquidity: 0,
};

export const LINKS = {
  site: 'https://markankamaransheogarat-sys.github.io/daejin-prediction-market-engine/',
  repo: 'https://github.com/markankamaransheogarat-sys/daejin-prediction-market-engine',
};

export function pctChange(start: number, end: number): number {
  return ((end - start) / start) * 100;
}

/** Standard normal upper tail, P(Z > z). */
export function normalTail(z: number): number {
  // Abramowitz-Stegun 7.1.26 approximation of erfc, accurate to ~1e-7.
  const x = Math.abs(z) / Math.SQRT2;
  const t = 1 / (1 + 0.3275911 * x);
  const poly = t * (0.254829592 + t * (-0.284496736 + t * (1.421413741 + t * (-1.453152027 + t * 1.061405429))));
  const erfc = poly * Math.exp(-x * x);
  return z >= 0 ? erfc / 2 : 1 - erfc / 2;
}

/**
 * Rough chance that SOL still ends October ahead of BTC: the SOL/BTC ratio
 * has to climb back above its Oct 1 level, modelled as a driftless random walk.
 */
export function outperformChance(): { gapPts: number; neededPct: number; chance: number } {
  const { sol, btc, relativeDailyVol, daysLeft } = POSITION;
  const ratio = sol.now / sol.start / (btc.now / btc.start);
  const needed = -Math.log(ratio);
  const z = needed / (relativeDailyVol * Math.sqrt(daysLeft));
  return {
    gapPts: pctChange(btc.start, btc.now) - pctChange(sol.start, sol.now),
    neededPct: (1 / ratio - 1) * 100,
    chance: normalTail(z),
  };
}

/** What a position pays in each outcome under Daejin's rules. */
export function payout(stake: number, price: number) {
  const shares = stake / price;
  const gross = shares;
  const profit = gross - stake;
  const fee = profit > 0 ? profit * FEES.profitFee : 0;
  return {
    shares,
    win: gross - fee,
    winProfit: gross - fee - stake,
    fee,
    lose: 0,
    void: shares * FEES.voidPayout,
  };
}
