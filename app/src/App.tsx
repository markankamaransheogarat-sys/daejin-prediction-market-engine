import React, { useState } from 'react';
import { TrendingUp, Sparkles, MessageSquare, BarChart3, ExternalLink } from 'lucide-react';
import { MarketSimulator } from './components/MarketSimulator';
import { MarketCreator } from './components/MarketCreator';
import { PositionThesis } from './components/PositionThesis';
import { TwitterThreadViewer } from './components/TwitterThreadViewer';
import { LINKS, SOURCES } from './data';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

type Tab = 'how' | 'trade' | 'market' | 'thread';

const TABS: { id: Tab; label: string; short: string; icon: React.FC<{ className?: string }> }[] = [
  { id: 'how', label: 'How it works', short: 'How', icon: TrendingUp },
  { id: 'trade', label: 'My trade', short: 'Trade', icon: BarChart3 },
  { id: 'market', label: 'My market', short: 'Market', icon: Sparkles },
  { id: 'thread', label: 'Thread', short: 'Thread', icon: MessageSquare },
];

export function App() {
  const [activeTab, setActiveTab] = useState<Tab>('how');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-4 py-1.5 text-center text-xs font-bold">
        Independent explainer of Daejin prediction markets, not affiliated with Daejin
      </div>

      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5 shadow-lg shadow-indigo-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-indigo-400">
                <TrendingUp className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h1 className="text-base font-black text-white tracking-tight">Daejin, explained</h1>
              <p className="text-[11px] text-slate-400">Prices, payouts, one real trade and one real market</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            {TABS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                aria-pressed={activeTab === id}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeTab === id ? 'bg-slate-800 text-indigo-400 shadow' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          <a
            href="https://www.daejin.xyz/prediction"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-indigo-400 hover:text-indigo-300 font-bold flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30"
          >
            <span>daejin.xyz</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex md:hidden mb-6 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          {TABS.map(({ id, short }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              aria-pressed={activeTab === id}
              className={`flex-1 py-2 rounded-lg font-bold ${activeTab === id ? 'bg-slate-800 text-indigo-400' : 'text-slate-400'}`}
            >
              {short}
            </button>
          ))}
        </div>

        {activeTab === 'how' && <MarketSimulator />}
        {activeTab === 'trade' && <PositionThesis />}
        {activeTab === 'market' && <MarketCreator />}
        {activeTab === 'thread' && <TwitterThreadViewer />}
      </main>

      <footer className="border-t border-slate-800 bg-slate-950/80 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span>
            Made for the Daejin thread bounty on Superteam Earn. Rules quoted from{' '}
            <a href={SOURCES.rules} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white underline">
              daejin.xyz/risk-and-rules
            </a>
            . Not financial advice.
          </span>
          <a href={LINKS.repo} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white flex items-center gap-1 transition-colors">
            <GithubIcon className="w-4 h-4" />
            <span>Source</span>
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
