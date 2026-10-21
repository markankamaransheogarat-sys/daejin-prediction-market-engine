import { LINKS } from './data';

export interface Tweet {
  badge: string;
  content: string;
  /** Screenshot to attach to this tweet, if any. */
  media?: string;
}

// Kept under 280 characters each so the thread works without X Premium.
export const THREAD: Tweet[] = [
  {
    badge: 'HOOK',
    content: `I put $5 on a prediction market and launched my own on @Daejinxyz.

Here's how it works in plain English, the trade I took (with the data behind it), and how I designed my market 🧵`,
  },
  {
    badge: 'WHAT DAEJIN IS',
    content: `Daejin is a prediction market on Solana, part of the @Superteam ecosystem.

Every market is one YES/NO question with a close date and a proof source declared up front.

You buy shares in the outcome you think will happen.`,
  },
  {
    badge: 'HOW PRICES FORM',
    content: `How prices form:

1 YES share + 1 NO share = always $1.

So the price IS the crowd's probability. YES at 30¢ means the market gives it a 30% chance.

More people buying YES pushes it up. No bookmaker sets the odds.`,
  },
  {
    badge: 'HOW WINNERS GET PAID',
    content: `How winners get paid:

Every YES/NO pair is backed by $1 locked in the market's shared USDC pool.

When it resolves, each winning share pays $1 and each losing share pays $0. The losing side's money pays the winners.

Fee: 2% of profit, only if you win.`,
  },
  {
    badge: 'EXAMPLE',
    content: `Example with my own trade:

$5 on NO at 50¢ = 10 shares.

NO wins → $10, minus 2% of the $5 profit = $9.90
YES wins → $0

Max loss is what you paid. And you can sell before close at the current price.`,
  },
  {
    badge: 'MY POSITION',
    content: `My trade: NO on "Will SOL outperform BTC in October 2026?"

CoinGecko, Oct 1 → Oct 21:
SOL $118.04 → $108.26 (−8.3%)
BTC $83,576 → $84,496 (+1.1%)

SOL is 9.4 points behind with ~10 days left, and the market still prices YES at 50%.`,
    media: 'Screenshot: my NO position on Daejin',
  },
  {
    badge: 'THE THESIS',
    content: `For YES, SOL has to gain ~10% on BTC in 10 days.

Over the last 90 days the SOL/BTC ratio moved ~1.7% a day. A 10% catch-up in 10 days is roughly a 1-in-25 shot by that math.

Crypto has fat tails, so call it 1-in-10. Still far from 1-in-2.`,
  },
  {
    badge: 'MY MARKET',
    content: `Then I launched my own market:

"Will SOL close above $110 on Binance (SOL/USDT daily candle) on Nov 30, 2026?"

$110 is ~2% above spot, so it opens near 50/50 and both sides have a reason to trade.`,
    media: 'Screenshot: my market on Daejin',
  },
  {
    badge: 'MARKET DESIGN',
    content: `How I kept it unambiguous:

• one exchange, one pair, one daily close, UTC
• "above" = strictly above, $110.00 resolves NO
• intraday wicks don't count
• fallback source if Binance data is unavailable

A good market is one nobody can argue about at resolution.`,
    media: 'Screenshot: liquidity deposit (if seeded)',
  },
  {
    badge: 'TRY IT',
    content: `Try it: connect a Solana wallet at daejin.xyz, $5 is enough.

Payout calculator + the full math behind this thread: ${LINKS.site}

@Daejinxyz @Superteam`,
  },
];
