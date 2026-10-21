import React, { useState } from 'react';
import { TrendingUp, Coins, Info } from 'lucide-react';
import { FEES, SOURCES, payout } from '../data';

const usd = (n: number) => `$${n.toFixed(2)}`;

export const MarketSimulator: React.FC = () => {
  const [yesCents, setYesCents] = useState<number>(30);
  const [side, setSide] = useState<'YES' | 'NO'>('YES');
  const [stake, setStake] = useState<number>(5);

  const noCents = 100 - yesCents;
  const price = (side === 'YES' ? yesCents : noCents) / 100;
  const p = payout(stake, price);

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-500/30 shadow-2xl space-y-4">
        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
          How a Daejin market prices an outcome
        </span>
        <h2 className="text-2xl font-black text-white">1 YES share + 1 NO share = $1. The price is the probability.</h2>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Drag the slider to set where traders have pushed the YES price. Buying YES pushes it up, buying NO pushes it
          down. Nobody sets the odds; the crowd does.
        </p>

        <div className="space-y-2">
          <div className="flex justify-between text-sm font-bold">
            <span className="text-emerald-400">YES {yesCents}¢ = {yesCents}% chance</span>
            <span className="text-rose-400">NO {noCents}¢ = {noCents}% chance</span>
          </div>
          <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden flex p-0.5 border border-slate-700">
            <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-l-full" style={{ width: `${yesCents}%` }} />
            <div className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-r-full" style={{ width: `${noCents}%` }} />
          </div>
          <input
            type="range"
            min={1}
            max={99}
            value={yesCents}
            onChange={(e) => setYesCents(Number(e.target.value))}
            aria-label="YES price in cents"
            className="w-full accent-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <span>Your position</span>
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {(['YES', 'NO'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setSide(s)}
                aria-pressed={side === s}
                className={`py-3 rounded-xl font-bold text-sm transition-all border ${
                  side === s
                    ? s === 'YES'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                      : 'bg-rose-500/20 border-rose-500 text-rose-400'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                Buy {s} at {s === 'YES' ? yesCents : noCents}¢
              </button>
            ))}
          </div>

          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Amount (USDC)</div>
            <div className="flex gap-2">
              {[5, 10, 25, 100].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setStake(amt)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    stake === amt ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
            <input
              type="number"
              min={1}
              value={stake}
              onChange={(e) => setStake(Math.max(1, Number(e.target.value) || 1))}
              className="mt-3 w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
            <div>
              {usd(stake)} / {price.toFixed(2)} per share = <span className="text-white font-bold">{p.shares.toFixed(2)} shares</span>
            </div>
            <div className="text-slate-500">Each winning share redeems for $1. Each losing share for $0.</div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Coins className="w-5 h-5 text-indigo-400" />
            <span>What you get back</span>
          </h3>

          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
              <span className="text-slate-400 block mb-1">{side} wins</span>
              <span className="text-xl font-black text-emerald-400">{usd(p.win)}</span>
              <span className="text-[10px] text-emerald-400/80 block mt-0.5">+{usd(p.winProfit)} after fee</span>
            </div>
            <div className="p-3.5 bg-rose-500/10 rounded-xl border border-rose-500/30">
              <span className="text-slate-400 block mb-1">{side} loses</span>
              <span className="text-xl font-black text-rose-400">{usd(p.lose)}</span>
              <span className="text-[10px] text-rose-400/80 block mt-0.5">max loss {usd(stake)}</span>
            </div>
            <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700">
              <span className="text-slate-400 block mb-1">Voided</span>
              <span className="text-xl font-black text-white">{usd(p.void)}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">{FEES.voidPayout * 100}¢ per share</span>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono text-slate-300">
            <div className="text-indigo-400 font-bold">// Where the winnings come from</div>
            <div>Every YES/NO pair is backed by $1 USDC locked in the market's shared pool.</div>
            <div>At resolution the pool pays $1 per winning share: the losing side's money pays the winners.</div>
            <div>
              Fee: {FEES.profitFee * 100}% of profit, only on a winning exit ({usd(p.fee)} here). 0% on buying, selling or losing.
            </div>
            <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800">
              You can also sell before close at the current price, which may be higher or lower than what you paid.
            </div>
          </div>

          <p className="text-[11px] text-slate-500 flex items-start gap-1.5">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>
              Mechanics and fees from Daejin's{' '}
              <a href={SOURCES.rules} target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">
                Risk &amp; Rules
              </a>{' '}
              page (Sep 25, 2026). This calculator is an independent explainer, not part of Daejin.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
