import React, { useState, useEffect } from "react";
import { Network, Lock, AlertTriangle, TrendingUp, Zap } from "lucide-react";

interface SwarmStatus {
  activeVaccines: number;
  activeQuarantines: number;
  swarmHealth: string;
}

export const SwarmTab: React.FC = () => {
  const [swarmStatus, setSwarmStatus] = useState<SwarmStatus | null>(null);
  useEffect(() => {
    const fetchSwarmStatus = async () => {
      try {
        const response = await fetch('/api/swarm/status');
        const data = await response.json();
        setSwarmStatus(data);
      } catch (error) {
        console.error('Failed to fetch swarm status:', error);
      }
    };

    void fetchSwarmStatus();
    const interval = setInterval(() => { void fetchSwarmStatus(); }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="swarm-container" className="space-y-6 animate-fade-in-up">
      {/* Swarm Network Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Active Vaccines Card */}
        <div className="card bg-indigo-950/40 border-indigo-500/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-slate-400 mb-1">Behavioral Vaccines</p>
              <p className="text-3xl font-bold text-indigo-300">
                {swarmStatus?.activeVaccines || 0}
              </p>
            </div>
            <Lock className="w-8 h-8 text-indigo-400 opacity-50" />
          </div>
          <p className="text-xs text-slate-500">Active across swarm network</p>
        </div>

        {/* Active Quarantines Card */}
        <div className="card bg-orange-950/40 border-orange-500/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-slate-400 mb-1">Quarantine Queue</p>
              <p className="text-3xl font-bold text-orange-300">
                {swarmStatus?.activeQuarantines || 0}
              </p>
            </div>
            <AlertTriangle className="w-8 h-8 text-orange-400 opacity-50" />
          </div>
          <p className="text-xs text-slate-500">Accounts in immigration queue</p>
        </div>

        {/* Swarm Health Card */}
        <div className="card bg-emerald-950/40 border-emerald-500/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-slate-400 mb-1">Swarm Status</p>
              <p className="text-3xl font-bold text-emerald-300">
                {swarmStatus?.swarmHealth || 'DORMANT'}
              </p>
            </div>
            <Network className="w-8 h-8 text-emerald-400 opacity-50" />
          </div>
          <p className="text-xs text-slate-500">Global collective defense grid</p>
        </div>
      </div>

      {/* HiveMind Architecture Info */}
      <div className="card border-slate-700/50">
        <div className="flex items-center gap-3 mb-4">
          <Zap className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-slate-100">
            Collective Neural Swarm System
          </h3>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-200">Semantic Mutation Tracking</p>
              <p className="text-slate-400 text-xs mt-0.5">
                Extracts abstract behavioral DNA patterns beyond static keywords
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mt-1.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-200">Behavioral Vaccine Generation</p>
              <p className="text-slate-400 text-xs mt-0.5">
                Compiles semantic signatures into encrypted "vaccine tokens" on detection
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-200">Global Swarm Push</p>
              <p className="text-slate-400 text-xs mt-0.5">
                Redis cluster broadcasts vaccines across all participating subreddits
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-slate-200">Immigration Quarantine Queue</p>
              <p className="text-slate-400 text-xs mt-0.5">
                Recognizes bad actors on new communities, pre-blocks before first toxic post
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Connected Communities */}
      <div className="card border-slate-700/50">
        <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <Network className="w-5 h-5 text-cyan-400" />
          Connected Communities in Swarm
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {[
            { name: "r/learnprogramming", active: true },
            { name: "r/gaming", active: true },
            { name: "r/AskReddit", active: true },
            { name: "r/news", active: false },
            { name: "r/technology", active: true },
            { name: "r/community", active: false },
          ].map((community) => (
            <div
              key={community.name}
              className={`px-3 py-2 rounded-lg border text-sm font-medium ${
                community.active
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                  : "bg-slate-800/30 border-slate-700/30 text-slate-400"
              }`}
            >
              {community.name}
              {community.active && (
                <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-gentle" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Vaccine Distribution Timeline */}
      <div className="card border-slate-700/50">
        <h3 className="text-lg font-semibold text-slate-100 mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-400" />
          Recent Vaccine Broadcasts
        </h3>
        
        <div className="space-y-2">
          {[
            { time: "09:42 AM", vaccine: "vac-000-9a3f", communities: 6, efficacy: 94 },
            { time: "09:38 AM", vaccine: "vac-001-c7d2", communities: 8, efficacy: 87 },
            { time: "09:33 AM", vaccine: "vac-002-f41e", communities: 5, efficacy: 91 },
          ].map((entry, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg border border-slate-800/50">
              <div className="text-sm">
                <p className="text-slate-300 font-mono">{entry.vaccine}</p>
                <p className="text-xs text-slate-500">{entry.time}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-300">{entry.communities} communities</p>
                <p className="text-xs text-emerald-400">{entry.efficacy}% efficacy</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
