import './index.css';
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Violation, ActiveTab } from './types';
import { INITIAL_THREATS, HISTORICAL_THREATS } from './data';
import { DashboardTab } from './components/DashboardTab';
import { ThreatsTab } from './components/ThreatsTab';
import { ThreatDetailsModal } from './components/ThreatDetailsModal';
import { SwarmTab } from './components/SwarmTab';
import { Shield, Eye, AlertTriangle, BarChart3, Settings, Zap, Network } from 'lucide-react';

export const App = () => {
  const [violations, setViolations] = useState<Violation[]>([...INITIAL_THREATS, ...HISTORICAL_THREATS] as Violation[]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('Dashboard');
  const [selectedViolation, setSelectedViolation] = useState<Violation | null>(null);

  const calculateLiveStats = () => {
    return {
      low: violations.filter(v => v.severity === 'LOW').length,
      medium: violations.filter(v => v.severity === 'MEDIUM').length,
      high: violations.filter(v => v.severity === 'HIGH').length,
      critical: violations.filter(v => v.severity === 'CRITICAL').length,
    };
  };

  const handleSimulateViolation = (newViolation: Violation) => {
    setViolations([newViolation, ...violations]);
  };

  const liveStats = calculateLiveStats();
  const totalViolations = Object.values(liveStats).reduce((a, b) => a + b, 0);

  const tabs: { label: ActiveTab; icon: React.ReactNode; description: string }[] = [
    { label: 'Dashboard', icon: <Eye className="w-5 h-5" />, description: 'Overview & quick stats' },
    { label: 'Violations', icon: <AlertTriangle className="w-5 h-5" />, description: 'Browse all violations' },
    { label: 'Queue', icon: <BarChart3 className="w-5 h-5" />, description: 'Analytics & trends' },
    { label: 'Swarm', icon: <Network className="w-5 h-5" />, description: 'Collective neural grid' },
    { label: 'Rules', icon: <Settings className="w-5 h-5" />, description: 'Manage rules' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1a1f3a 50%, #16213e 100%)' }}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-700/40">
        <div style={{ background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(12px)' }} className="border-b border-slate-700/30">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-100">HiveMind Swarm Grid</h1>
                  <p className="text-sm text-slate-400 mt-0.5">Zero-Knowledge Threat-Intelligence Grid</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-sm text-slate-400">Total Violations</div>
                  <div className="text-2xl font-bold text-indigo-400">{totalViolations}</div>
                </div>
                <div className="h-12 w-px bg-slate-700/40"></div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                  <Zap className="w-4 h-4 text-emerald-400 animate-pulse-gentle" />
                  <span className="text-sm font-medium text-emerald-300">Live</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 pt-4">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`flex items-center gap-2 px-4 py-3 rounded-t-lg font-medium text-sm transition-all duration-200 border-b-2 ${
                  activeTab === tab.label
                    ? 'text-indigo-300 border-indigo-500 bg-slate-800/30'
                    : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-800/20'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'Dashboard' && (
          <DashboardTab
            threats={violations.filter(v => v.status === 'FLAGGED' || v.status === 'WARNED')}
            onSelectThreat={setSelectedViolation}
            liveStats={liveStats}
          />
        )}

        {activeTab === 'Violations' && (
          <ThreatsTab
            threats={violations}
            onSelectThreat={setSelectedViolation}
            onSimulateThreat={handleSimulateViolation}
          />
        )}

        {activeTab === 'Queue' && (
          <div className="animate-fade-in-up">
            <div className="card text-center py-16">
              <BarChart3 className="w-16 h-16 mx-auto mb-4 text-slate-500" />
              <h3 className="text-lg font-semibold text-slate-200 mb-2">Analytics Coming Soon</h3>
              <p className="text-slate-400">Moderation insights and trends will appear here</p>
            </div>
          </div>
        )}

        {activeTab === 'Swarm' && (
          <SwarmTab />
        )}

        {activeTab === 'Rules' && (
          <div className="animate-fade-in-up">
            <div className="card text-center py-16">
              <Settings className="w-16 h-16 mx-auto mb-4 text-slate-500" />
              <h3 className="text-lg font-semibold text-slate-200 mb-2">Settings Coming Soon</h3>
              <p className="text-slate-400">Configure your moderation rules here</p>
            </div>
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedViolation && (
        <ThreatDetailsModal
          threat={selectedViolation}
          onClose={() => setSelectedViolation(null)}
        />
      )}
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
