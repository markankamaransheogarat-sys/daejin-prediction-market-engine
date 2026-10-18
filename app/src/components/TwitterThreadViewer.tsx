import React, { useState } from 'react';
import { Copy, Check, MessageSquare, Twitter, Sparkles, Send, Share2 } from 'lucide-react';

interface TweetItem {
  number: number;
  content: string;
  badge: string;
}

export const TwitterThreadViewer: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const tweets: TweetItem[] = [
    {
      number: 1,
      badge: "THE HOOK & INTRO",
      content: `Prediction markets are eating the world, but orderbook books on Ethereum & Polygon are still clunky, illiquid, and dominated by market-making bots.

Enter @Daejinxyz — the creator-owned prediction market network built on Solana and part of the @Superteam ecosystem ⚡️

Here is how shared-pools work, why it changes everything, and my first live trade: 🧵👇`
    },
    {
      number: 2,
      badge: "HOW SHARED-POOLS WORK",
      content: `1/ How does Daejin actually work in plain English?

Unlike legacy exchanges where you wait for a counterparty on an orderbook, Daejin uses shared-pools (pari-mutuel conviction pools).

There are two pools: Pool_YES and Pool_NO.
Prices reflect the crowd's conviction:
P(YES) = Pool_YES / (Pool_YES + Pool_NO)

If 3,000 USDC is in YES and 1,000 USDC is in NO, YES trades at $0.75 (75% probability). Zero market-maker spread!`
    },
    {
      number: 3,
      badge: "HOW WINNERS SPLIT THE POOL",
      content: `2/ The Math: How winners split the pool 💰

When the market resolves, the winners split the ENTIRE combined pool in direct proportion to their stake:

Payout = Total_Pool * (Your_Deposit / Winning_Pool)

If you placed $50 on a 25% underdog and it resolves YES, you don't just win a fixed yield — you split the entire loser pool with other winning predictors. Maximum capital efficiency.`
    },
    {
      number: 4,
      badge: "MY POSITION & THESIS",
      content: `3/ Taking my position ($50 USDC on YES) 📊

I put $50 on "Solana Firedancer Mainnet TPS > 50,000 before Q1 2027".

The thesis:
• Jump Crypto's Firedancer testnet already clocked 1.0M+ raw TPS in laboratory conditions.
• Frankendancer is already live on mainnet validating consensus.
• The current market implies a 64% probability. At these odds, taking YES provides asymmetric risk-to-reward on Solana's scaling curve.`
    },
    {
      number: 5,
      badge: "MY CREATED MARKET",
      content: `4/ Creating my own market on @Daejinxyz (Free & Permissionless) 🛠

Anyone can become a market architect. I launched:
"Will Solana Firedancer Process Over 50,000 Mainnet TPS Before Q1 2027?"

• Verifiable Proof Source: Blockworks Research Solana Validator Dashboard & Solana Foundation Official TPS Metrics.
• Resolution Date: 2027-03-31
• Seeded with initial liquidity to jumpstart community trading.`
    },
    {
      number: 6,
      badge: "WHY SOLANA & DAEJIN WIN",
      content: `5/ Why @Daejinxyz on Solana is a 100x improvement over legacy rails:

⚡️ Sub-second settlement (~400 ms)
💸 Fractions of a cent in gas fees ($0.0005)
🔒 100% On-chain evidence-based resolution — no centralized editorial fiat
🌐 Creator ownership — creators launch markets on any real-world topic and build liquidity`
    },
    {
      number: 7,
      badge: "CALL TO ACTION & TAGS",
      content: `6/ Prediction markets are the purest truth engine on Earth.

You can try Daejin today with just $5:
1. Connect your Phantom / Solflare wallet at https://daejin.xyz
2. Pick an outcome or launch your own market for free.

Built on Solana with @Superteam and powered by @Daejinxyz.

Let's see what the crowd's conviction is! 🚀`
    }
  ];

  const handleCopySingle = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = () => {
    const fullThread = tweets.map(t => `${t.number > 1 ? `${t.number}/ ` : ''}${t.content}`).join('\n\n---\n\n');
    navigator.clipboard.writeText(fullThread);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <span className="text-xs font-mono font-bold text-indigo-400">VIRAL TWITTER THREAD READY FOR PUBLICATION</span>
          <h3 className="text-xl font-bold text-white">Full 7-Tweet Thread for @Daejinxyz Bounty</h3>
          <p className="text-xs text-slate-400">All criteria met: plain language, shared-pool math, position thesis, market creation, and required tags.</p>
        </div>

        <button
          onClick={handleCopyAll}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-indigo-500/20 transition-all shrink-0"
        >
          {copiedAll ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copiedAll ? 'Thread Copied!' : 'Copy Full Thread'}</span>
        </button>
      </div>

      <div className="space-y-4">
        {tweets.map((tweet, idx) => (
          <div
            key={tweet.number}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-mono text-xs font-bold flex items-center justify-center">
                  {tweet.number}
                </span>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  {tweet.badge}
                </span>
              </div>

              <button
                onClick={() => handleCopySingle(tweet.content, idx)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition-colors"
                title="Copy tweet"
              >
                {copiedIndex === idx ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 text-[11px]">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[11px]">Copy</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-sm text-slate-200 whitespace-pre-line leading-relaxed font-sans pl-8">
              {tweet.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
