import React, { useState } from 'react';
import { AppTab } from './types';
import { Generator } from './components/Generator';
import { Converter } from './components/Converter';
import { Visualizer } from './components/Visualizer';
import { AiAssistant } from './components/AiAssistant';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.GENERATOR);

  const tabs = [
    { id: AppTab.GENERATOR, label: 'Sequence', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
    )},
    { id: AppTab.CONVERTER, label: 'Converter', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
    )},
    { id: AppTab.VISUALIZER, label: 'Visualize', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
    )},
    { id: AppTab.AI_SEARCH, label: 'Ask AI', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    )},
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500 selection:text-white">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-900/20">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Gray Code Master
              </h1>
            </div>
            
            <nav className="flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {tab.icon}
                  <span className="hidden sm:block">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fade-in-up">
          {activeTab === AppTab.GENERATOR && <Generator />}
          {activeTab === AppTab.CONVERTER && <Converter />}
          {activeTab === AppTab.VISUALIZER && (
             <div className="flex flex-col items-center">
                 <Visualizer bits={5} /> 
                 <p className="mt-8 text-slate-500 text-sm italic">Example shown with 5 bits. Use Generator for custom lists.</p>
             </div>
          )}
          {activeTab === AppTab.AI_SEARCH && <AiAssistant />}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-800 mt-12 py-8 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Gray Code Master. Built with React & Tailwind & Gemini AI.</p>
      </footer>
    </div>
  );
};

export default App;