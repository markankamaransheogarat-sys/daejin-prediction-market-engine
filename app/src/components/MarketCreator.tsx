import React, { useState } from 'react';
import { 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  Coins, 
  CheckCircle2, 
  FileCheck2,
  ExternalLink,
  Layers
} from 'lucide-react';

export const MarketCreator: React.FC = () => {
  const [question, setQuestion] = useState('Will Solana Firedancer Process Over 50,000 Mainnet TPS Before Q1 2027?');
  const [category, setCategory] = useState('Crypto Infrastructure');
  const [resolutionSource, setResolutionSource] = useState('Blockworks Research Validator Dashboard (https://blockworks.co/research) & Solana Foundation Official Metrics');
  const [resolutionDate, setResolutionDate] = useState('2027-03-31');
  const [seedLiquidity, setSeedLiquidity] = useState('100');
  const [marketCreated, setMarketCreated] = useState(false);
  const [marketId, setMarketId] = useState<string | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `DJN-MKT-${Math.floor(1000 + Math.random() * 9000)}`;
    setMarketId(id);
    setMarketCreated(true);
  };

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div>
            <span className="text-xs font-mono font-bold text-indigo-400">DAEJIN CREATOR STUDIO</span>
            <h3 className="text-xl font-bold text-white">Design & Launch Your Prediction Market</h3>
            <p className="text-xs text-slate-400">Launch is 100% free on Solana. Seed liquidity optional (earns bounty bonus points).</p>
          </div>
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
        </div>

        {marketCreated ? (
          <div className="p-6 rounded-xl bg-slate-950 border border-emerald-500/40 space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-5 h-5" />
              <span>Market Successfully Created on Daejin Network!</span>
            </div>
            
            <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-2 text-xs font-mono">
              <div className="text-slate-400">Market ID: <span className="text-white font-bold">{marketId}</span></div>
              <div className="text-slate-400">Question: <span className="text-emerald-300">{question}</span></div>
              <div className="text-slate-400">Resolution Source: <span className="text-slate-200">{resolutionSource}</span></div>
              <div className="text-slate-400">Resolution Date: <span className="text-indigo-400">{resolutionDate}</span></div>
              <div className="text-slate-400">Initial Seed Liquidity: <span className="text-yellow-400">${seedLiquidity} USDC (50/50 YES/NO)</span></div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                Proof-backed resolution criteria verified
              </span>
              <button
                onClick={() => setMarketCreated(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white"
              >
                Create Another Market
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Market Question (Clear & Binary)
              </label>
              <input
                type="text"
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                >
                  <option value="Crypto Infrastructure">Crypto Infrastructure & L1s</option>
                  <option value="Solana Ecosystem">Solana Ecosystem Milestones</option>
                  <option value="Macro & DeFi">Macro & DeFi Volumes</option>
                  <option value="AI & Agents">AI Agents & Autonomy</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                  Resolution Date
                </label>
                <input
                  type="date"
                  required
                  value={resolutionDate}
                  onChange={(e) => setResolutionDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Defined Resolution Proof Source (URL & Criteria)
              </label>
              <textarea
                required
                rows={2}
                value={resolutionSource}
                onChange={(e) => setResolutionSource(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 font-mono text-xs"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Every Daejin market resolves with verifiable evidence-based proof so traders trust the outcome.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1 flex items-center justify-between">
                <span>Seed Liquidity (USDC)</span>
                <span className="text-yellow-400 font-bold">Bonus Bounty Points!</span>
              </label>
              <input
                type="number"
                min="0"
                step="10"
                value={seedLiquidity}
                onChange={(e) => setSeedLiquidity(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 font-mono"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Splits 50/50 between YES and NO pools to establish initial trading liquidity for the community.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Launch Market on Daejin & Deposit ${seedLiquidity} Seed</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
