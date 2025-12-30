import React, { useState, useEffect } from 'react';
import { binaryToGray, grayToBinary, padBinary } from '../utils/math';

export const Converter: React.FC = () => {
  const [decimal, setDecimal] = useState<number>(0);
  const [binary, setBinary] = useState<string>('0');
  const [gray, setGray] = useState<string>('0');
  
  // Update all when decimal changes
  const handleDecimalChange = (val: string) => {
    const num = parseInt(val) || 0;
    setDecimal(num);
    setBinary(num.toString(2));
    setGray(binaryToGray(num).toString(2));
  };

  // Update when binary input changes
  const handleBinaryChange = (val: string) => {
    // Filter non-binary chars
    const bin = val.replace(/[^01]/g, '');
    setBinary(bin);
    const num = parseInt(bin, 2) || 0;
    setDecimal(num);
    setGray(binaryToGray(num).toString(2));
  };

  // Update when gray input changes
  const handleGrayChange = (val: string) => {
    const g = val.replace(/[^01]/g, '');
    setGray(g);
    const num = parseInt(g, 2); // Interpret gray string as bits to get integer value
    if (!isNaN(num)) {
      const decoded = grayToBinary(num);
      setDecimal(decoded);
      setBinary(decoded.toString(2));
    } else {
        setDecimal(0);
        setBinary('0');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
       <div className="bg-slate-800 p-8 rounded-xl border border-slate-700 shadow-lg">
        <h2 className="text-2xl font-bold mb-8 text-center text-white">Universal Converter</h2>
        
        <div className="space-y-8">
          {/* Decimal Input */}
          <div className="relative group">
            <label className="block text-sm font-medium text-slate-400 mb-2">Decimal (Base 10)</label>
            <input
              type="number"
              value={decimal}
              onChange={(e) => handleDecimalChange(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg p-4 text-2xl font-mono text-white focus:ring-2 focus:ring-blue-500 outline-none transition group-hover:border-slate-500"
            />
          </div>

          <div className="flex items-center justify-center text-slate-600">
             <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
          </div>

          {/* Binary Input */}
          <div className="relative group">
            <label className="block text-sm font-medium text-slate-400 mb-2">Binary (Base 2)</label>
            <input
              type="text"
              value={binary}
              onChange={(e) => handleBinaryChange(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded-lg p-4 text-2xl font-mono text-green-400 focus:ring-2 focus:ring-green-500 outline-none transition group-hover:border-slate-500 tracking-widest"
            />
          </div>

          <div className="flex items-center justify-center text-slate-600">
             <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
          </div>

          {/* Gray Code Input */}
          <div className="relative group">
            <label className="block text-sm font-medium text-slate-400 mb-2">Gray Code</label>
            <input
              type="text"
              value={gray}
              onChange={(e) => handleGrayChange(e.target.value)}
              className="w-full bg-slate-900 border border-blue-500/50 rounded-lg p-4 text-2xl font-mono text-blue-400 focus:ring-2 focus:ring-blue-500 outline-none transition shadow-[0_0_15px_rgba(59,130,246,0.2)] tracking-widest"
            />
          </div>
        </div>

        <div className="mt-8 p-4 bg-slate-900/50 rounded border border-slate-700/50 text-xs text-slate-500 text-center">
            Edit any field to see instant conversions.
        </div>
       </div>
    </div>
  );
};