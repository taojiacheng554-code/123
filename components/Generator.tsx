import React, { useState, useMemo } from 'react';
import { generateGrayCodeSequence, padBinary, findChangedBit } from '../utils/math';
import { GrayCodeRow } from '../types';

export const Generator: React.FC = () => {
  const [bits, setBits] = useState<number>(4);

  const sequence: GrayCodeRow[] = useMemo(() => {
    // Limit to 12 bits to prevent crashing the browser UI with too many DOM elements
    const safeBits = Math.min(Math.max(1, bits), 12);
    const rawSeq = generateGrayCodeSequence(safeBits);
    
    return rawSeq.map((val, idx) => {
      const prevVal = idx === 0 ? rawSeq[rawSeq.length - 1] : rawSeq[idx - 1];
      const changedIdx = idx === 0 ? -1 : findChangedBit(prevVal, val);
      return {
        decimal: idx,
        binary: padBinary(idx.toString(2), safeBits),
        gray: padBinary(val.toString(2), safeBits),
        changedBitIndex: changedIdx
      };
    });
  }, [bits]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Sequence Generator</h2>
            <p className="text-slate-400 text-sm">Generate complete N-bit Gray Code tables.</p>
          </div>
          <div className="flex items-center gap-4 bg-slate-900 p-3 rounded-lg border border-slate-700">
            <label className="text-slate-300 font-medium">Bit Count (N):</label>
            <input
              type="number"
              min="1"
              max="12"
              value={bits}
              onChange={(e) => setBits(parseInt(e.target.value) || 1)}
              className="w-20 bg-slate-800 border border-slate-600 rounded px-3 py-1 text-white text-center font-mono focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg border border-slate-700">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-slate-400 text-sm uppercase tracking-wider">
                <th className="p-4 border-b border-slate-700">Index (Decimal)</th>
                <th className="p-4 border-b border-slate-700 font-mono">Binary</th>
                <th className="p-4 border-b border-slate-700 font-mono text-blue-400">Gray Code</th>
                <th className="p-4 border-b border-slate-700 text-right">Bit Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {sequence.map((row) => (
                <tr key={row.decimal} className="hover:bg-slate-700/50 transition-colors">
                  <td className="p-4 text-slate-300 font-mono">{row.decimal}</td>
                  <td className="p-4 text-slate-400 font-mono tracking-widest">{row.binary}</td>
                  <td className="p-4 text-white font-mono font-bold tracking-widest bg-slate-800/30">
                     {row.gray.split('').map((char, i) => {
                       // Highlight the changed bit
                       // Note: changedBitIndex is 0 for LSB, so we need to map to string index
                       const isChanged = row.changedBitIndex !== null && (bits - 1 - row.changedBitIndex) === i;
                       return (
                         <span key={i} className={isChanged ? "text-green-400" : ""}>{char}</span>
                       );
                     })}
                  </td>
                  <td className="p-4 text-right text-xs text-slate-500">
                    {row.changedBitIndex !== null && row.changedBitIndex !== -1 ? (
                      <span className="inline-block px-2 py-1 rounded bg-slate-900 border border-slate-700">
                        Bit {row.changedBitIndex} (2^{row.changedBitIndex})
                      </span>
                    ) : (
                      <span className="text-slate-600">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};