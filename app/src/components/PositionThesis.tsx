import React from 'react';
import { BarChart3, ExternalLink } from 'lucide-react';
import { POSITION, outperformChance, payout, pctChange } from '../data';

const pct = (n: number) => `${n > 0 ? '+' : ''}${n.toFixed(1)}%`;

export const PositionThesis: React.FC = () => {
  const { sol, btc } = POSITION;
  const solChange = pctChange(sol.start, sol.now);
  const btcChange = pctChange(btc.start, btc.now);
  const model = outperformChance();
  const p = payout(POSITION.stake, POSITION.price);
  const implied = POSITION.side === 'NO' ? 1 - POSITION.price : POSITION.price;

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
        <span className="text-xs font-mono font-bold text-indigo-400">MY POSITION</span>
        <h2 className="text-2xl font-black text-white">{POSITION.question}</h2>
        <p className="text-sm text-slate-300">
          Buying <strong className="text-rose-400">{POSITION.side}</strong> at {(POSITION.price * 100).toFixed(0)}¢ with ${POSITION.stake}.
          Rule: {POSITION.rule}
        </p>
        <a href={POSITION.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-bold">
          <span>Open the market on Daejin</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-indigo-400" />
            <span>October so far ({POSITION.snapshotDate}, CoinGecko)</span>
          </h3>
          <table className="w-full text-sm font-mono">
            <thead className="text-xs text-slate-400">
              <tr>
                <th className="text-left py-1"></th>
                <th className="text-right">Oct 1</th>
                <th className="text-right">Now</th>
                <th className="text-right">Change</th>
              </tr>
            </thead>
            <tbody className="text-slate-200">
              <tr>
                <td className="py-1">SOL</td>
                <td className="text-right">${sol.start.toFixed(2)}</td>
                <td className="text-right">${sol.now.toFixed(2)}</td>
                <td className="text-right text-rose-400">{pct(solChange)}</td>
              </tr>
              <tr>
                <td className="py-1">BTC</td>
                <td className="text-right">${btc.start.toLocaleString('en-US')}</td>
                <td className="text-right">${btc.now.toLocaleString('en-US')}</td>
                <td className="text-right text-emerald-400">{pct(btcChange)}</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm text-slate-300 leading-relaxed">
            SOL is <strong className="text-white">{model.gapPts.toFixed(1)} points behind</strong> BTC with about{' '}
            {Math.floor(POSITION.daysLeft)} days left. For YES, SOL has to gain about{' '}
            <strong className="text-white">{model.neededPct.toFixed(1)}% on BTC</strong> before Nov 1.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-white">Market price vs. my estimate</h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700">
              <span className="text-slate-400 block mb-1">Market says YES</span>
              <span className="text-2xl font-black text-white">{((1 - implied) * 100).toFixed(0)}%</span>
            </div>
            <div className="p-3.5 bg-indigo-500/10 rounded-xl border border-indigo-500/30">
              <span className="text-slate-400 block mb-1">My model says YES</span>
              <span className="text-2xl font-black text-indigo-300">~{Math.max(1, Math.round(model.chance * 100))}%</span>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Over the last 90 days the SOL/BTC ratio moved about {(POSITION.relativeDailyVol * 100).toFixed(1)}% a day (one standard
            deviation, Binance daily closes). Treating it as a random walk with no drift, a {model.neededPct.toFixed(1)}% catch-up in{' '}
            {Math.floor(POSITION.daysLeft)} days is a long shot. Crypto has fat tails, so the real chance is higher than the model, but
            nowhere near 50%.
          </p>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
            <div>
              ${POSITION.stake} / {POSITION.price.toFixed(2)} = {p.shares.toFixed(2)} {POSITION.side} shares
            </div>
            <div className="text-emerald-400">
              {POSITION.side} wins: ${p.win.toFixed(2)} (profit ${p.winProfit.toFixed(2)} after ${p.fee.toFixed(2)} fee)
            </div>
            <div className="text-rose-400">{POSITION.side} loses: $0.00</div>
          </div>
        </div>
      </div>
    </div>
  );
};
