import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass } from 'lucide-react';
import type { CricketStadium, WorldRegion } from '../../types/stadium';

interface StadiumAtlasProps {
  stadiums: CricketStadium[];
  selectedRegion: WorldRegion;
  onSelectRegion: (region: WorldRegion) => void;
  onSelectStadium: (stadium: CricketStadium) => void;
}

// Coordinate mapping helper to SVG coordinate space [0..1000, 0..500]
// Equirectangular projection mapping
const mapCoordinatesToSvg = (lat: number, lng: number) => {
  // Longitude: -180..180 -> 0..1000
  const x = ((lng + 180) / 360) * 1000;
  // Latitude: 90..-90 -> 0..500 (Mercator-ish dampening)
  const y = ((90 - lat) / 180) * 500;
  return { x, y };
};

export const StadiumAtlas: React.FC<StadiumAtlasProps> = ({
  stadiums,
  selectedRegion,
  onSelectRegion,
  onSelectStadium,
}) => {
  const [hoveredStadium, setHoveredStadium] = useState<CricketStadium | null>(null);

  const regions: Array<{ id: WorldRegion; label: string }> = [
    { id: 'ALL', label: 'Global Colosseums' },
    { id: 'Asia', label: 'Asia' },
    { id: 'Europe', label: 'Europe / UK' },
    { id: 'Oceania', label: 'Oceania' },
    { id: 'Africa', label: 'Africa' },
    { id: 'Americas', label: 'Americas / Caribbean' },
  ];

  return (
    <div className="w-full rounded-3xl bg-[#08090d] border border-white/10 p-6 sm:p-8 shadow-2xl relative overflow-hidden mb-12">
      {/* Background Grid Pattern & Coordinates Motif */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Header bar */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Compass className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-serif-luxury text-lg font-bold text-white">
              Geographic Arena Radar
            </h3>
            <span className="text-[10px] font-tech text-zinc-400 uppercase tracking-wider">
              {stadiums.length} Sacred Cathedrals Mapped
            </span>
          </div>
        </div>

        {/* Region Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {regions.map((reg) => (
            <button
              key={reg.id}
              onClick={() => onSelectRegion(reg.id)}
              className={`px-3 py-1 rounded-lg text-xs font-tech tracking-wider uppercase transition-all cursor-pointer ${
                selectedRegion === reg.id
                  ? 'bg-emerald-400 text-black font-bold shadow-md shadow-emerald-500/20'
                  : 'bg-white/[0.03] text-zinc-300 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
              }`}
            >
              {reg.label}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Interactive Map Canvas */}
      <div className="relative z-10 w-full aspect-[2/1] min-h-[280px] max-h-[460px] bg-[#050608] rounded-2xl border border-white/[0.06] overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle Latitude / Longitude lines */}
          <line x1="0" y1="250" x2="1000" y2="250" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
          <line x1="500" y1="0" x2="500" y2="500" stroke="rgba(255,255,255,0.06)" strokeDasharray="4 4" />
          <line x1="250" y1="0" x2="250" y2="500" stroke="rgba(255,255,255,0.03)" strokeDasharray="2 2" />
          <line x1="750" y1="0" x2="750" y2="500" stroke="rgba(255,255,255,0.03)" strokeDasharray="2 2" />

          {/* Continents Stylized Outlines (Simplified Architectural Vectors) */}
          {/* North America */}
          <path
            d="M 120,80 Q 200,60 280,100 Q 240,180 180,220 Q 140,240 100,160 Z"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
          {/* South America */}
          <path
            d="M 280,260 Q 350,280 340,360 Q 300,450 260,420 Q 240,340 280,260 Z"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
          {/* Europe */}
          <path
            d="M 460,80 Q 550,70 560,140 Q 500,170 460,130 Z"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
          {/* Africa */}
          <path
            d="M 460,180 Q 560,180 580,280 Q 540,400 480,360 Q 440,260 460,180 Z"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
          {/* Asia / Subcontinent */}
          <path
            d="M 580,90 Q 760,80 820,180 Q 750,240 680,200 Q 640,160 580,90 Z"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
          {/* Oceania / Australia */}
          <path
            d="M 800,320 Q 920,310 910,400 Q 820,420 800,320 Z"
            fill="rgba(255,255,255,0.02)"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />

          {/* Interactive Stadium Pins */}
          {stadiums.map((stadium) => {
            const { x, y } = mapCoordinatesToSvg(
              stadium.coordinates.lat,
              stadium.coordinates.lng
            );
            const isHovered = hoveredStadium?.id === stadium.id;

            return (
              <g
                key={stadium.id}
                className="cursor-pointer transition-all duration-300"
                onClick={() => onSelectStadium(stadium)}
                onMouseEnter={() => setHoveredStadium(stadium)}
                onMouseLeave={() => setHoveredStadium(null)}
              >
                {/* Radar pulse ring */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? '14' : '7'}
                  fill="none"
                  stroke="#10b981"
                  strokeOpacity={isHovered ? '0.8' : '0.3'}
                  strokeWidth="1.5"
                  className={isHovered ? 'animate-ping' : ''}
                />
                {/* Center Core Marker */}
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? '5' : '3.5'}
                  fill={isHovered ? '#34d399' : '#10b981'}
                  className="shadow-lg"
                />
              </g>
            );
          })}
        </svg>

        {/* Hovered Stadium Quick Floating Tooltip */}
        <AnimatePresence>
          {hoveredStadium && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute bottom-4 left-4 sm:left-auto sm:right-4 z-20 p-4 rounded-2xl bg-black/90 border border-emerald-500/40 backdrop-blur-xl shadow-2xl max-w-xs pointer-events-none"
            >
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-[10px] uppercase font-tech text-emerald-400 font-bold">
                  {hoveredStadium.country} • {hoveredStadium.city}
                </span>
                <span className="text-[10px] font-tech text-zinc-400">
                  Est. {hoveredStadium.establishedYear}
                </span>
              </div>
              <h4 className="font-serif-luxury text-base font-bold text-white leading-tight">
                {hoveredStadium.name}
              </h4>
              <p className="text-[11px] text-zinc-300 font-light mt-1 line-clamp-2">
                {hoveredStadium.description}
              </p>
              <div className="mt-2 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-tech text-zinc-400">
                <span>Capacity: {hoveredStadium.capacity.toLocaleString()}</span>
                <span className="text-emerald-300 font-bold">Click to Inspect →</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
