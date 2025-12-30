import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { binaryToGray, padBinary } from '../utils/math';

interface VisualizerProps {
  bits: number;
}

export const Visualizer: React.FC<VisualizerProps> = ({ bits }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 600;
    const height = 600;
    const radius = Math.min(width, height) / 2 - 20;
    const innerRadius = 50;
    
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous

    const g = svg.append("g")
      .attr("transform", `translate(${width / 2},${height / 2})`);

    const totalSectors = 1 << bits; // 2^bits
    const anglePerSector = (2 * Math.PI) / totalSectors;
    const trackWidth = (radius - innerRadius) / bits;

    // Draw tracks (bits)
    for (let bitIdx = 0; bitIdx < bits; bitIdx++) {
      // Outer tracks are usually LSB in visualizations or vice versa. 
      // Let's make the outermost track the MSB for visual clarity usually, 
      // but strictly in rotary encoders, tracks are concentric.
      // We will map bit 0 (LSB) to the innermost track to bit (n-1) MSB outer.
      
      const rInner = innerRadius + bitIdx * trackWidth;
      const rOuter = innerRadius + (bitIdx + 1) * trackWidth;

      // Draw background ring
      g.append("path")
        .attr("d", d3.arc()({
          innerRadius: rInner,
          outerRadius: rOuter,
          startAngle: 0,
          endAngle: 2 * Math.PI
        }) as string)
        .attr("fill", "#1e293b")
        .attr("stroke", "#334155");

      // Draw active segments
      for (let i = 0; i < totalSectors; i++) {
        const grayVal = binaryToGray(i);
        const isActive = (grayVal >> bitIdx) & 1;

        if (isActive) {
          g.append("path")
            .attr("d", d3.arc()({
              innerRadius: rInner,
              outerRadius: rOuter,
              startAngle: i * anglePerSector,
              endAngle: (i + 1) * anglePerSector
            }) as string)
            .attr("fill", "#3b82f6") // Blue for 1
            .attr("stroke", "#1e293b")
            .attr("stroke-width", "1px");
        }
      }
    }

    // Add labels
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .text(`${bits}-Bit Gray Code`)
      .attr("fill", "white")
      .attr("font-size", "12px")
      .style("font-family", "sans-serif");

  }, [bits]);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-900 rounded-xl border border-slate-700 shadow-xl">
      <h3 className="text-xl font-bold mb-4 text-blue-400">Rotary Encoder Visualization</h3>
      <p className="text-sm text-slate-400 mb-6 text-center max-w-lg">
        This disk represents a rotary encoder pattern. In Gray code, strictly one track changes state at any boundary line between sectors.
      </p>
      <div className="relative">
        <svg ref={svgRef} width={600} height={600} viewBox="0 0 600 600" className="max-w-full h-auto" />
      </div>
    </div>
  );
};