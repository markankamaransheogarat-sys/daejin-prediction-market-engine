import React from 'react';
import { Calendar, CheckCircle2, ExternalLink, FileCheck2, ShieldCheck } from 'lucide-react';
import { MY_MARKET } from '../data';

export const MarketCreator: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
        <span className="text-xs font-mono font-bold text-indigo-400">MY MARKET</span>
        <h2 className="text-2xl font-black text-white">{MY_MARKET.question}</h2>
        {MY_MARKET.url ? (
          <a href={MY_MARKET.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-bold">
            <span>Trade it on Daejin</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <p className="text-xs text-slate-400">Link will appear here once the market is live on Daejin.</p>
        )}
        {MY_MARKET.liquidity > 0 && (
          <p className="text-xs text-emerald-400">Seeded with ${MY_MARKET.liquidity} USDC of liquidity.</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-sm">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-indigo-400" />
            <span>Resolution spec</span>
          </h3>
          <dl className="space-y-3">
            <div>
              <dt className="text-xs text-slate-400 uppercase tracking-wider">Proof source</dt>
              <dd className="text-slate-200">
                <a href={MY_MARKET.sourceUrl} target="_blank" rel="noreferrer" className="hover:text-indigo-300 underline">
                  {MY_MARKET.source}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-400 uppercase tracking-wider">Fallback</dt>
              <dd className="text-slate-200">{MY_MARKET.fallback}</dd>
            </div>
            <div className="flex gap-6">
              <div>
                <dt className="text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Trading closes
                </dt>
                <dd className="text-slate-200">{MY_MARKET.closes}</dd>
              </div>
              <div>
                <dt className="text-xs text-slate-400 uppercase tracking-wider">Resolves</dt>
                <dd className="text-slate-200">{MY_MARKET.resolves}</dd>
              </div>
            </div>
          </dl>
          <ul className="space-y-2 pt-2 border-t border-slate-800">
            {MY_MARKET.rules.map((rule) => (
              <li key={rule} className="flex items-start gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4 text-sm">
          <h3 className="text-lg font-bold text-white">Why it is designed this way</h3>
          <ul className="space-y-3">
            {MY_MARKET.why.map((reason) => (
              <li key={reason} className="flex items-start gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-slate-500 pt-2 border-t border-slate-800">
            Creators can't trade their own market on Daejin, so this one is only there for others to trade.
          </p>
        </div>
      </div>
    </div>
  );
};
