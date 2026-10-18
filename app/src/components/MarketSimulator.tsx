import React, { useState } from 'react';
import { 
  TrendingUp, 
  ArrowRight, 
  CheckCircle2, 
  DollarSign, 
  Percent, 
  ShieldCheck, 
  Zap,
  Info
} from 'lucide-react';

export const MarketSimulator: React.FC = () => {
  const [yesPool, setYesPool] = useState<number>(3200);
  const [noPool, setNoPool] = useState<number>(1800);
  const [betSide, setBetSide] = useState<'YES' | 'NO'>('YES');
  const [betAmount, setBetAmount] = useState<number>(50);
  const [recentTx, setRecentTx] = useState<string | null>(null);

  const totalPool = yesPool + noPool;
  const currentYesProb = Math.round((yesPool / totalPool) * 100);
  const currentNoProb = 100 - currentYesProb;
  const currentYesPrice = (yesPool / totalPool).toFixed(3);
  const currentNoPrice = (noPool / totalPool).toFixed(3);

  // Simulated trade impact
  const simYesPool = betSide === 'YES' ? yesPool + betAmount : yesPool;
  const simNoPool = betSide === 'NO' ? noPool + betAmount : noPool;
  const simTotal = simYesPool + simNoPool;
  const newProb = betSide === 'YES' 
    ? Math.round((simYesPool / simTotal) * 100) 
    : Math.round((simNoPool / simTotal) * 100);

  // Payout calculation in shared-pool (pari-mutuel / winner splits total pool proportionally)
  const winningPool = betSide === 'YES' ? simYesPool : simNoPool;
  const userShareOfWinning = betAmount / winningPool;
  const potentialPayout = (simTotal * userShareOfWinning).toFixed(2);
  const potentialRoi = (((parseFloat(potentialPayout) - betAmount) / betAmount) * 100).toFixed(1);

  const handleExecuteTrade = () => {
    if (betSide === 'YES') {
      setYesPool(prev => prev + betAmount);
    } else {
      setNoPool(prev => prev + betAmount);
    }

    const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
    let tx = '';
    for (let i = 0; i < 44; i++) {
      tx += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setRecentTx(tx);
    setTimeout(() => setRecentTx(null), 5000);
  };

  return (
    <div className="space-y-6">
      {/* Featured Market Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-500/30 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
            Daejin Featured Market
          </span>
          <span className="text-xs text-slate-400">Resolves: Q1 2027 • Verified On-Chain</span>
        </div>
        <h2 className="text-2xl font-black text-white mb-2">
          Will Solana Firedancer Process &gt;50,000 Mainnet TPS Before Q1 2027?
        </h2>
        <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
          Creator: <span className="text-indigo-400 font-mono font-semibold">@jarvis-quant-agent</span> • Resolution Source: Blockworks Research Solana Validator Dashboard & Official Foundation Metrics.
        </p>

        {/* Live Probability Bar */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-xs font-bold">
            <span className="text-emerald-400">YES {currentYesProb}% (${currentYesPrice})</span>
            <span className="text-slate-400">Total Pool: ${totalPool.toLocaleString()} USDC</span>
            <span className="text-rose-400">NO {currentNoProb}% (${currentNoPrice})</span>
          </div>
          <div className="h-4 w-full bg-slate-800 rounded-full overflow-hidden flex p-0.5 border border-slate-700">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-l-full transition-all duration-500"
              style={{ width: `${currentYesProb}%` }}
            />
            <div 
              className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-r-full transition-all duration-500"
              style={{ width: `${currentNoProb}%` }}
            />
          </div>
        </div>
      </div>

      {recentTx && (
        <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Position executed on Solana! <strong>+${betAmount} USDC</strong> deposited to {betSide} pool.</span>
          </div>
          <span className="font-mono text-[11px] text-slate-400">TX: {recentTx.slice(0, 12)}...</span>
        </div>
      )}

      {/* Trade Configuration & Math Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trade Control */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <span>Take a Position</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Select Outcome
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setBetSide('YES')}
                className={`py-3 rounded-xl font-bold text-sm transition-all border ${
                  betSide === 'YES'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-500/10'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                YES ({(yesPool / totalPool).toFixed(3)} USDC)
              </button>
              <button
                type="button"
                onClick={() => setBetSide('NO')}
                className={`py-3 rounded-xl font-bold text-sm transition-all border ${
                  betSide === 'NO'
                    ? 'bg-rose-500/20 border-rose-500 text-rose-400 shadow-lg shadow-rose-500/10'
                    : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                NO ({(noPool / totalPool).toFixed(3)} USDC)
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              <span>Position Size (USDC)</span>
              <span className="text-slate-300">Min $5 (Bounty Requirement)</span>
            </div>
            <div className="flex gap-2">
              {[5, 20, 50, 100, 250].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setBetAmount(amt)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                    betAmount === amt
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  ${amt}
                </button>
              ))}
            </div>
            <input
              type="number"
              min="5"
              step="5"
              value={betAmount}
              onChange={(e) => setBetAmount(Math.max(5, parseFloat(e.target.value) || 5))}
              className="mt-3 w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          <button
            onClick={handleExecuteTrade}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
          >
            <span>Confirm ${betAmount} Position on {betSide}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Shared-Pool Math Visualizer */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-400" />
            <span>Shared-Pool Math & Payout Engine</span>
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700">
              <span className="text-slate-400 block mb-1">New Outcome Probability</span>
              <span className="text-xl font-black text-white">{newProb}%</span>
              <span className="text-[10px] text-indigo-400 block mt-0.5">Moves by {Math.abs(newProb - (betSide === 'YES' ? currentYesProb : currentNoProb))}%</span>
            </div>

            <div className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700">
              <span className="text-slate-400 block mb-1">Potential Payout</span>
              <span className="text-xl font-black text-emerald-400">${potentialPayout}</span>
              <span className="text-[10px] text-emerald-400/80 block mt-0.5">+{potentialRoi}% net profit</span>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs font-mono text-slate-300">
            <div className="text-indigo-400 font-bold">// How Winners Split the Pool</div>
            <div>User Share: {betAmount} / {winningPool} = {(userShareOfWinning * 100).toFixed(2)}%</div>
            <div>Total Pool Post-Trade: ${simTotal.toLocaleString()} USDC</div>
            <div>Formula: Payout = Total_Pool * (User_Deposit / Winning_Pool)</div>
            <div className="text-slate-400 text-[11px] pt-1 border-t border-slate-800">
              In Daejin shared-pools, you don't trade against a market maker spread. You split the loser pool directly with other winning predictors.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
