import React, { useState } from "react";
import { Violation, Severity, ViolationTemplate } from "../types";
import { MOCK_SUBREDDIT_POOL, MOCK_THREAT_TEMPLATES } from "../data";
import { Search, Play, Plus, Server, ChevronRight } from "lucide-react";

interface ThreatsTabProps {
  threats: Violation[];
  onSelectThreat: (threat: Violation) => void;
  onSimulateThreat: (newThreat: Violation) => void;
}

export const ThreatsTab: React.FC<ThreatsTabProps> = ({ threats, onSelectThreat, onSimulateThreat }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState<Severity | "ALL">("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedTemplateIndex, setSelectedTemplateIndex] = useState(0);
  const [customIp, setCustomIp] = useState(MOCK_SUBREDDIT_POOL[0] || '');
  const [showSimulator, setShowSimulator] = useState(false);

  const handleTriggerSimulation = () => {
    const template: ViolationTemplate = MOCK_THREAT_TEMPLATES[selectedTemplateIndex] as ViolationTemplate;
    if (!template) return;
    const newThreat: Violation = {
      id: `th-sim-${Date.now()}`,
      violationTitle: template.violationTitle || template.threatTitle || "",
      severity: template.severity,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      author: 'u/simulated_' + Math.floor(Math.random() * 9999),
      subreddit: customIp,
      description: template.description,
      details: template.details,
      status: "ACTIVE",
      ruleViolated: 'Community Rule Violation',
      violationType: template.violationType || 'Unknown',
    };
    onSimulateThreat(newThreat);
    const nextIpIndex = Math.floor(Math.random() * MOCK_SUBREDDIT_POOL.length);
    const nextIp = MOCK_SUBREDDIT_POOL[nextIpIndex];
    setCustomIp(nextIp as string);
    if (window.innerWidth < 1024) {
      setShowSimulator(false);
    }
  };

  const filteredThreats = threats.filter(threat => {
    const title = threat.violationTitle || threat.threatTitle || "";
    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (threat.author || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (threat.subreddit || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (threat.violationType || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === "ALL" || threat.severity === severityFilter;
    const matchesStatus = statusFilter === "ALL" || threat.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  return (
    <div id="threats-logs-container" className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-white tracking-wide">Violation Log</h3>
          <p className="text-xs text-slate-400">Search, filter, and simulate moderation violations for testing.</p>
        </div>
        <button
          id="toggle-simulator-btn"
          onClick={() => setShowSimulator(!showSimulator)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs cursor-pointer border transition duration-200 ${
            showSimulator
              ? "bg-cyan-950/40 text-cyan-400 border-cyan-500/50"
              : "bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800"
          }`}
        >
          <Plus className="w-3.5 h-3.5" />
          {showSimulator ? "Hide Simulation" : "Simulate Violation"}
        </button>
      </div>

      {showSimulator && (
        <div id="attack-simulator-panel" className="bg-gradient-to-b from-cyan-950/20 to-slate-950/70 border border-cyan-500/20 p-5 rounded-lg space-y-4 shadow-lg">
          <div className="flex items-center gap-2 border-b border-cyan-900/50 pb-2">
            <Play className="w-4 h-4 text-cyan-400 animate-pulse" />
            <h4 className="font-mono font-bold text-xs text-cyan-400 uppercase tracking-widest">
              VIOLATION SIMULATION PANEL
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5 text-left">
              <label className="block text-[11px] font-mono text-slate-400 uppercase">VIOLATION TEMPLATE</label>
              <select
                id="select-attack-template"
                value={selectedTemplateIndex}
                onChange={(e) => setSelectedTemplateIndex(Number(e.target.value))}
                className="w-full bg-slate-950 text-xs text-slate-200 py-2 px-3 rounded border border-slate-800 focus:outline-none focus:border-cyan-500 font-sans"
              >
                {MOCK_THREAT_TEMPLATES.map((tmpl: ViolationTemplate, idx) => (
                  <option key={idx} value={idx}>
                    {tmpl.violationTitle || tmpl.threatTitle || ""} ({tmpl.severity})
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5 text-left">
              <label className="block text-[11px] font-mono text-slate-400 uppercase">SOURCE SUBREDDIT</label>
              <div className="flex gap-2">
                <select
                  id="select-custom-ip"
                  value={customIp}
                  onChange={(e) => setCustomIp(e.target.value)}
                  className="w-full bg-slate-950 text-xs font-mono text-slate-200 py-2 px-3 rounded border border-slate-800 focus:outline-none focus:border-cyan-500"
                >
                  {MOCK_SUBREDDIT_POOL.map((ip, idx) => (
                    <option key={idx} value={ip}>{ip}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-end">
              <button
                id="deploy-attack-payload-btn"
                onClick={handleTriggerSimulation}
                className="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider rounded border border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.25)] transition duration-150 cursor-pointer flex justify-center items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                SIMULATE VIOLATION
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="md:col-span-5 relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-slate-500" />
          </span>
          <input
            id="threats-search-input"
            type="text"
            placeholder="Search violations by author, subreddit, type..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950/80 text-sm py-2 pl-9 pr-4 rounded border border-slate-800/80 focus:outline-none focus:border-cyan-500/60 text-slate-200 font-sans"
          />
        </div>
        <div className="md:col-span-3 flex items-center gap-2 bg-slate-950/40 px-3 py-1.5 rounded border border-slate-800/80">
          <span className="text-[11px] font-mono text-slate-500 uppercase shrink-0">Severity:</span>
          <select
            id="filter-severity-select"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value as Severity | "ALL")}
            className="bg-transparent text-xs text-slate-300 font-sans w-full focus:outline-none"
          >
            <option value="ALL">ALL LEVELS</option>
            <option value="LOW">LOW ONLY</option>
            <option value="MEDIUM">MEDIUM ONLY</option>
            <option value="HIGH">HIGH ONLY</option>
            <option value="CRITICAL">CRITICAL ONLY</option>
          </select>
        </div>
        <div className="md:col-span-4 flex items-center gap-2 bg-slate-950/40 px-3 py-1.5 rounded border border-slate-800/80">
          <span className="text-[11px] font-mono text-slate-500 uppercase shrink-0">Status:</span>
          <select
            id="filter-status-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent text-xs text-slate-300 font-sans w-full focus:outline-none"
          >
            <option value="ALL">ALL STATUSES</option>
            <option value="BLOCKED">BLOCKED ACTIONS</option>
            <option value="MITIGATED">MITIGATED ALERTS</option>
            <option value="ACTIVE">ACTIVE EVENTS</option>
            <option value="UNDER_INVESTIGATION">UNDER INVESTIGATION</option>
          </select>
        </div>
      </div>

      <div id="threat-tabular-panel" className="glass-panel border border-slate-800/80 rounded-lg overflow-hidden bg-slate-950/20">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-950/80 font-mono text-left text-xs uppercase text-cyan-400/80 tracking-wider">
                <th className="py-3 px-4">TIMESTAMP</th>
                <th className="py-3 px-4">VIOLATION / DETAILS</th>
                <th className="py-3 px-4">SUBREDDIT</th>
                <th className="py-3 px-4">SEVERITY</th>
                <th className="py-3 px-4">STATUS</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900/60 font-sans text-sm text-slate-300">
              {filteredThreats.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500 font-mono text-xs">
                    No violations found matching current filter criteria.
                  </td>
                </tr>
              ) : (
                filteredThreats.map((threat) => {
                  const isCritical = threat.severity === "CRITICAL";
                  const isHigh = threat.severity === "HIGH";
                  const isMed = threat.severity === "MEDIUM";
                  return (
                    <tr
                      key={threat.id}
                      id={`log-row-${threat.id}`}
                      onClick={() => onSelectThreat(threat)}
                      className="hover:bg-slate-900/20 active:bg-slate-900/40 transition duration-150 cursor-pointer group"
                    >
                      <td className="py-4 px-4 font-mono text-xs text-slate-400 group-hover:text-cyan-400 transition-colors">
                        {threat.timestamp}
                      </td>
                      <td className="py-4 px-4 pr-6">
                        <div>
                          <p className="font-semibold text-white tracking-wide group-hover:text-cyan-200 transition-colors">
                            {threat.violationTitle || threat.threatTitle}
                          </p>
                          <p className="text-xs text-slate-500 font-mono mt-0.5">{threat.author || ''}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5 text-slate-400 font-mono text-xs">
                          <Server className="w-3.5 h-3.5 text-slate-600" />
                          <span>{threat.subreddit || ''}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-mono">
                        <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded border inline-block ${
                          isCritical ? "bg-rose-950/20 border-rose-500/20 text-rose-400" :
                          isHigh ? "bg-orange-950/20 border-orange-500/20 text-orange-400" :
                          isMed ? "bg-amber-950/20 border-amber-500/20 text-amber-400" :
                          "bg-emerald-950/20 border-emerald-500/20 text-emerald-400"
                        }`}>
                          {threat.severity}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            threat.status === "BLOCKED" ? "bg-emerald-400" :
                            threat.status === "MITIGATED" ? "bg-cyan-400" :
                            threat.status === "ACTIVE" ? "bg-rose-500 animate-ping" : "bg-amber-400"
                          }`} />
                          <span className={`font-mono text-xs font-semibold uppercase ${
                            threat.status === "BLOCKED" ? "text-emerald-400" :
                            threat.status === "MITIGATED" ? "text-cyan-400" :
                            threat.status === "ACTIVE" ? "text-rose-400" : "text-amber-400"
                          }`}>
                            {threat.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="inline-flex p-1 rounded hover:bg-slate-800 border border-transparent hover:border-slate-700 text-slate-500 hover:text-white transition group-hover:translate-x-0.5 duration-150">
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
