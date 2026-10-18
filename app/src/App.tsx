import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  MessageSquare, 
  BookOpen, 
  ExternalLink,
  Layers,
  Percent,
  Coins
} from 'lucide-react';
import { MarketSimulator } from './components/MarketSimulator';
import { MarketCreator } from './components/MarketCreator';
import { TwitterThreadViewer } from './components/TwitterThreadViewer';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

export function App() {
  const [activeTab, setActiveTab] = useState<'simulator' | 'creator' | 'thread' | 'math'>('simulator');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-4 py-1.5 text-center text-xs font-bold flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 animate-spin" />
        <span>Superteam Earn Bounty Submission: Launch & Trade on Daejin ($620 USDC Prize Pool)</span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-indigo-400">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black text-white tracking-tight">Daejin Engine</h1>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                  Shared-Pool Prediction Markets
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Built on Solana with Superteam</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'simulator'
                  ? 'bg-slate-800 text-indigo-400 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Pool Simulator</span>
            </button>

            <button
              onClick={() => setActiveTab('creator')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'creator'
                  ? 'bg-slate-800 text-indigo-400 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Market</span>
            </button>

            <button
              onClick={() => setActiveTab('thread')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'thread'
                  ? 'bg-slate-800 text-indigo-400 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Twitter Thread (7 Tweets)</span>
            </button>

            <button
              onClick={() => setActiveTab('math')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'math'
                  ? 'bg-slate-800 text-indigo-400 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Mathematical Specs</span>
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="https://daejin.xyz"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30"
            >
              <span>daejin.xyz</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mobile Tab Switcher */}
        <div className="flex md:hidden mb-6 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`flex-1 py-2 rounded-lg font-bold ${
              activeTab === 'simulator' ? 'bg-slate-800 text-indigo-400' : 'text-slate-400'
            }`}
          >
            Simulator
          </button>
          <button
            onClick={() => setActiveTab('creator')}
            className={`flex-1 py-2 rounded-lg font-bold ${
              activeTab === 'creator' ? 'bg-slate-800 text-indigo-400' : 'text-slate-400'
            }`}
          >
            Launch
          </button>
          <button
            onClick={() => setActiveTab('thread')}
            className={`flex-1 py-2 rounded-lg font-bold ${
              activeTab === 'thread' ? 'bg-slate-800 text-indigo-400' : 'text-slate-400'
            }`}
          >
            Thread
          </button>
          <button
            onClick={() => setActiveTab('math')}
            className={`flex-1 py-2 rounded-lg font-bold ${
              activeTab === 'math' ? 'bg-slate-800 text-indigo-400' : 'text-slate-400'
            }`}
          >
            Math
          </button>
        </div>

        {activeTab === 'simulator' && <MarketSimulator />}
        {activeTab === 'creator' && <MarketCreator />}
        {activeTab === 'thread' && <TwitterThreadViewer />}
        {activeTab === 'math' && (
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <span>Daejin Shared-Pool Mathematical Foundations</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-indigo-400">1. Instantaneous Probability Formula</h4>
                <p className="text-xs leading-relaxed text-slate-400">
                  In a shared conviction pool without orderbook counterparties, the implied price of an outcome is strictly defined by the capital distribution:
                </p>
                <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-white">
                  P(YES) = Pool_YES / (Pool_YES + Pool_NO)
                  <br />
                  P(NO) = Pool_NO / (Pool_YES + Pool_NO)
                </div>
              </div>

              <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <h4 className="font-bold text-emerald-400">2. Proportional Payout Distribution</h4>
                <p className="text-xs leading-relaxed text-slate-400">
                  When the market resolves with published on-chain evidence, winning traders split the entire combined pool proportionally to their stake:
                </p>
                <div className="p-3 bg-slate-900 rounded-lg font-mono text-xs text-white">
                  Payout = Total_Pool * (User_Deposit / Winning_Pool)
                </div>
              </div>
            </div>

            <div className="p-5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-2">
              <strong className="text-white block">Why Shared-Pools are Superior for New Markets:</strong>
              <p>
                Traditional orderbooks suffer from the "cold-start" problem: without a designated market maker quoting wide spreads, a new market has 0 liquidity.
                In Daejin, a creator can seed any market with as little as $5 or $20, and the bonding pool guarantees 100% execution availability for any user immediately.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/80 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-400">Daejin Market Engine</span>
            <span>•</span>
            <span>Created for @Daejinxyz & @Superteam</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/markankamaransheogarat-sys/daejin-prediction-market-engine"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Source</span>
            </a>
            <span>•</span>
            <span className="text-indigo-400">0% Market Maker Spread</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
