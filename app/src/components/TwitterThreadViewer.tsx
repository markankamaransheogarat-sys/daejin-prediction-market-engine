import React, { useState } from 'react';
import { Copy, Check, Image } from 'lucide-react';
import { THREAD } from '../thread';

const numbered = (index: number, content: string) => `${index + 1}/ ${content}`;

export const TwitterThreadViewer: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const copy = (text: string) => navigator.clipboard?.writeText(text).catch(() => undefined);

  const handleCopySingle = (index: number) => {
    copy(numbered(index, THREAD[index].content));
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = () => {
    copy(THREAD.map((t, i) => numbered(i, t.content)).join('\n\n---\n\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <span className="text-xs font-mono font-bold text-indigo-400">THE THREAD</span>
          <h3 className="text-xl font-bold text-white">{THREAD.length} posts on how Daejin works</h3>
          <p className="text-xs text-slate-400">Each post fits in 280 characters. Screenshots go where marked.</p>
        </div>

        <button
          onClick={handleCopyAll}
          className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold px-4 py-2.5 rounded-xl text-xs shadow-lg shadow-indigo-500/20 transition-all shrink-0"
        >
          {copiedAll ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copiedAll ? 'Thread copied' : 'Copy full thread'}</span>
        </button>
      </div>

      <div className="space-y-4">
        {THREAD.map((tweet, idx) => (
          <div key={tweet.badge} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 font-mono text-xs font-bold flex items-center justify-center">
                  {idx + 1}
                </span>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                  {tweet.badge}
                </span>
              </div>

              <button
                onClick={() => handleCopySingle(idx)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs transition-colors"
                title="Copy post"
              >
                {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[11px]">{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <p className="text-sm text-slate-200 whitespace-pre-line leading-relaxed font-sans pl-8">{numbered(idx, tweet.content)}</p>
            {tweet.media && (
              <p className="pl-8 text-xs text-amber-300/80 flex items-center gap-1.5">
                <Image className="w-3.5 h-3.5" />
                <span>{tweet.media}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
