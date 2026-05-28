import React from "react";
import { Violation } from "../types";
import { ShieldAlert, AlertTriangle, Skull, ShieldCheck, Activity, Terminal } from "lucide-react";

interface DashboardTabProps {
  threats: Violation[];
  onSelectThreat: (threat: Violation) => void;
  liveStats: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
}

export const DashboardTab: React.FC<DashboardTabProps> = ({ threats, onSelectThreat, liveStats }) => {
  return (
    <div id="dashboard-container" className="space-y-6">
      <div id="severity-grids" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          id="card-severity-low"
          className="relative rounded-xl glass-panel bg-slate-950/40 p-5 flex flex-col justify-between border-emerald500/10 hover:border-emerald-500/30 group transition duration-300 overflow-hidden"
        >
          <div className="scanner-line/20 absolute inset-y-0" />
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-emerald-400">LOW SEVERITY</span>
            <span className="p-1 rounded bg-emerald-950/30 border border-emerald-500/20 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="my-4">
            <p className="text-4xl md:text-5xl font-mono font-bold text-white tracking-tight leading-none group-hover:scale-105 transition-transform duration-300 origin-left">
              {liveStats.low}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5 fill-emerald-500/20" />
            <span className="font-medium">Low Severity</span>
          </div>
          <div className="mt-4 h-12 w-full opacity-60 group-hover:opacity-100 transition-opacity">
            <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d="M 0,25 Q 15,22 30,24 T 60,25 T 90,26 L 100,26 L 100,30 L 0,30 Z" fill="url(#lowGrad)" />
              <path d="M 0,25 Q 15,22 30,24 T 60,25 T 90,26 L 100,26" fill="none" stroke="#00f5a0" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div
          id="card-severity-medium"
          className="relative rounded-xl glass-panel bg-slate-950/40 p-5 flex flex-col justify-between border-amber500/10 hover:border-amber-500/30 group transition duration-300 overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">MEDIUM SEVERITY</span>
            <span className="p-1 rounded bg-amber-950/30 border border-amber-500/20 text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </span>
          </div>
          <div className="my-4">
            <p className="text-4xl md:text-5xl font-mono font-bold text-white tracking-tight leading-none group-hover:scale-105 transition-transform duration-300 origin-left">
              {liveStats.medium}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-amber-400">
            <AlertTriangle className="w-3.5 h-3.5 fill-amber-500/20" />
            <span className="font-medium">Medium Severity</span>
          </div>
          <div className="mt-4 h-12 w-full opacity-60 group-hover:opacity-100 transition-opacity">
            <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
              <defs>
                <linearGradient id="medGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d="M 0,26 Q 15,26 30,20 T 60,25 T 90,16 L 100,14 L 100,30 L 0,30 Z" fill="url(#medGrad)" />
              <path d="M 0,26 Q 15,26 30,20 T 60,25 T 90,16 L 100,14" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div
          id="card-severity-high"
          className="relative rounded-xl glass-panel bg-slate-950/40 p-5 flex flex-col justify-between border-orange500/10 hover:border-orange-500/30 group transition duration-300 overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-orange-400">HIGH SEVERITY</span>
            <span className="p-1 rounded bg-orange-950/30 border border-orange-500/20 text-orange-400">
              <ShieldAlert className="w-4 h-4" />
            </span>
          </div>
          <div className="my-4">
            <p className="text-4xl md:text-5xl font-mono font-bold text-white tracking-tight leading-none group-hover:scale-105 transition-transform duration-300 origin-left">
              {liveStats.high}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-orange-400">
            <ShieldAlert className="w-3.5 h-3.5 fill-orange-500/20" />
            <span className="font-medium">High Severity</span>
          </div>
          <div className="mt-4 h-12 w-full opacity-60 group-hover:opacity-100 transition-opacity">
            <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
              <defs>
                <linearGradient id="highGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d="M 0,26 Q 20,24 40,24 T 70,12 T 90,14 L 100,5 L 100,30 L 0,30 Z" fill="url(#highGrad)" />
              <path d="M 0,26 Q 20,24 40,24 T 70,12 T 90,14 L 100,5" fill="none" stroke="#fd7e14" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        <div
          id="card-severity-critical"
          className="relative rounded-xl glass-panel bg-slate-950/40 p-5 flex flex-col justify-between border-rose-500/20 hover:border-rose-500/40 group transition duration-300 overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-rose-400">CRITICAL SEVERITY</span>
            <span className="p-1 rounded bg-rose-950/30 border border-rose-500/20 text-rose-400 animate-pulse">
              <Skull className="w-4 h-4" />
            </span>
          </div>
          <div className="my-4">
            <p className="text-4xl md:text-5xl font-mono font-bold text-white tracking-tight leading-none group-hover:scale-105 transition-transform duration-300 origin-left">
              {liveStats.critical}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-rose-400">
            <Skull className="w-3.5 h-3.5 fill-rose-500/20" />
            <span className="font-medium">Critical Severity</span>
          </div>
          <div className="mt-4 h-12 w-full opacity-60 group-hover:opacity-100 transition-opacity">
            <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
              <defs>
                <linearGradient id="critGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff3860" stopOpacity="0.3"/>
                  <stop offset="100%" stopColor="#ff3860" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <path d="M 0,26 L 30,26 L 60,26 L 75,26 L 85,5 L 94,26 L 100,26 L 100,30 L 0,30 Z" fill="url(#critGrad)" />
              <path d="M 0,26 L 30,26 L 60,26 L 75,26 L 85,5 L 94,26 L 100,26" fill="none" stroke="#ff3860" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      <div id="threat-feed-header" className="flex items-center justify-between border-b border-slate-800 pb-2 mt-8">
        <h3 className="font-sans font-bold text-sm md:text-base text-slate-300 tracking-wider flex items-center gap-2">
          <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
          ACTIVE VIOLATIONS FEED
        </h3>
        <div className="flex font-mono text-[11px] text-slate-500 gap-2 items-center">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>Real-time polling</span>
        </div>
      </div>

      <div id="threat-feed-list" className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
        {threats.length === 0 ? (
          <div className="text-center py-12 border border-slate-900 bg-slate-950/40 rounded-lg">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto opacity-50 mb-2" />
            <p className="text-sm text-slate-400">No active violations detected in your community.</p>
          </div>
        ) : (
          threats.map((threat) => {
            const isCritical = threat.severity === "CRITICAL";
            const isHigh = threat.severity === "HIGH";
            const isMed = threat.severity === "MEDIUM";
            let borderTheme = "border-slate-800/80 hover:border-cyan-500/40 hover:bg-slate-900/30";
            if (isCritical) {
              borderTheme = "border-rose-950/45 hover:border-rose-500/40 hover:bg-rose-950/10";
            } else if (isHigh) {
              borderTheme = "border-orange-950/45 hover:border-orange-500/40 hover:bg-orange-950/10";
            }
            return (
              <div
                key={threat.id}
                id={`threat-entry-${threat.id}`}
                onClick={() => onSelectThreat(threat)}
                className={`group flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-lg bg-slate-950/50 border ${borderTheme} transition duration-200 cursor-pointer relative overflow-hidden`}
              >
                <div className={`absolute top-0 left-0 w-1 h-full opacity-60 group-hover:opacity-100 ${
                  isCritical ? "bg-rose-500" :
                  isHigh ? "bg-orange-500" :
                  isMed ? "bg-amber-500" : "bg-emerald-500"
                }`} />
                <div className="flex items-start md:items-center gap-4 w-full md:w-auto">
                  <div className="font-mono text-left w-24 sm:w-28 shrink-0">
                    <p className="text-xs text-slate-300 font-semibold group-hover:text-cyan-400 transition-colors">{threat.timestamp}</p>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">{threat.author || threat.subreddit || ''}</p>
                  </div>
                  <div className="hidden sm:block h-8 w-px bg-slate-900" />
                  <div className="text-left py-1 md:py-0">
                    <p className="text-sm font-semibold text-white tracking-wide group-hover:text-cyan-200 transition-colors truncate max-w-sm sm:max-w-md md:max-w-lg">
                      {threat.violationTitle || threat.threatTitle}
                    </p>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                      {threat.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-3 md:mt-0 ml-28 md:ml-0 self-end md:self-auto shrink-0 font-mono">
                  <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded border ${
                    isCritical ? "bg-rose-950/20 border-rose-500/20 text-rose-400" :
                    isHigh ? "bg-orange-950/20 border-orange-500/20 text-orange-400" :
                    isMed ? "bg-amber-950/20 border-amber-500/20 text-amber-400" :
                    "bg-emerald-950/20 border-emerald-500/20 text-emerald-400"
                  }`}>
                    {threat.severity}
                  </span>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1.5 bg-slate-900/40 px-2 py-0.5 rounded border border-slate-800/60 font-mono">
                    <Terminal className="w-3 h-3 text-cyan-400/80" />
                    Detail
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
