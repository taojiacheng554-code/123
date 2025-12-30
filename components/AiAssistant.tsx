import React, { useState } from 'react';
import { searchGrayCodeInfo } from '../services/gemini';
import { AiResponse } from '../types';
import ReactMarkdown from 'react-markdown';

export const AiAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AiResponse | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResponse(null);
    const result = await searchGrayCodeInfo(query);
    setResponse(result);
    setLoading(false);
  };

  const predefinedQuestions = [
    "What are the practical applications of Gray Code?",
    "Why is Gray Code used in genetic algorithms?",
    "How does Gray Code help in error correction?",
    "Compare Binary Code vs Gray Code."
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
          AI Knowledge Base
        </h2>
        <p className="text-slate-400 mb-6">
          Powered by Gemini 3 Flash with Google Search. Ask detailed questions about Gray codes.
        </p>

        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about Gray codes..."
            className="flex-1 bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 outline-none transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-lg transition flex items-center gap-2"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <span>Search</span>
            )}
          </button>
        </form>

        <div className="flex flex-wrap gap-2 mb-8">
          {predefinedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(q);
                // Auto submit logic requires effect or separate handler, simplifying here to just set
              }}
              className="text-xs bg-slate-700 hover:bg-slate-600 text-blue-200 px-3 py-1.5 rounded-full transition"
            >
              {q}
            </button>
          ))}
        </div>

        {response && (
          <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 animate-fade-in">
            <div className="prose prose-invert prose-sm max-w-none">
              <ReactMarkdown>{response.text}</ReactMarkdown>
            </div>
            
            {response.sources.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-700">
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Sources</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {response.sources.map((src, idx) => (
                    <a
                      key={idx}
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 bg-slate-800 rounded hover:bg-slate-700 transition group"
                    >
                      <span className="bg-blue-500/10 text-blue-400 p-1 rounded text-xs group-hover:bg-blue-500/20">LINK</span>
                      <span className="text-xs text-slate-300 truncate">{src.title}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};