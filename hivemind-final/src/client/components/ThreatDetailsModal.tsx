import React, { useState } from "react";
import { Violation } from "../types";
import { X, ShieldAlert, Cpu, Terminal, Copy, Check, Server } from "lucide-react";

interface ThreatDetailsModalProps {
  threat: Violation;
  onClose: () => void;
}

const CyberMarkdown: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split("\n");
  let insideCodeBlock = false;
  let codeBlockLines: string[] = [];
  const renderedElements: React.JSX.Element[] = [];
  
  lines.forEach((line, index) => {
    if (line.trim().startsWith("```")) {
      if (insideCodeBlock) {
        renderedElements.push(
          <pre key={`code-${index}`} className="bg-slate-950/80 p-3 rounded-md border border-cyan-500/20 font-mono text-xs text-cyan-300 overflow-x-auto my-2 shadow-[inset_0_2px_10px_rgba(0,0,0,0.8)]">
            <code>{codeBlockLines.join("\n")}</code>
          </pre>
        );
        codeBlockLines = [];
        insideCodeBlock = false;
      } else {
        insideCodeBlock = true;
      }
      return;
    }
    if (insideCodeBlock) {
      codeBlockLines.push(line);
      return;
    }
    const trimmedLine = line.trim();
    if (!trimmedLine) {
      renderedElements.push(<div key={`space-${index}`} className="h-2" />);
      return;
    }
    if (trimmedLine.startsWith("###")) {
      const headerText = trimmedLine.replace(/^###\s*/, "");
      renderedElements.push(
        <h4 key={`h-${index}`} className="text-cyan-400 font-semibold tracking-wide border-b border-cyan-950 pb-1 mt-4 mb-2 text-sm md:text-base flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400/70" />
          {parseInlineBold(headerText)}
        </h4>
      );
    } else if (trimmedLine.startsWith("##")) {
      const headerText = trimmedLine.replace(/^##\s*/, "");
      renderedElements.push(
        <h3 key={`h-${index}`} className="text-cyan-300 font-bold uppercase tracking-wider border-b border-cyan-800 pb-2 mt-6 mb-3 text-base md:text-lg">
          {parseInlineBold(headerText)}
        </h3>
      );
    } else if (trimmedLine.startsWith("#")) {
      const headerText = trimmedLine.replace(/^#\s*/, "");
      renderedElements.push(
        <h2 key={`h-${index}`} className="text-cyan-200 font-extrabold uppercase tracking-widest border-b border-cyan-500 pb-2 mt-6 mb-4 text-lg md:text-xl text-center cyan-glow">
          {parseInlineBold(headerText)}
        </h2>
      );
    } else if (trimmedLine.startsWith("- ") || trimmedLine.startsWith("* ")) {
      const listContent = trimmedLine.substring(2);
      renderedElements.push(
        <div key={`li-${index}`} className="flex items-start gap-2 ml-4 my-1 text-sm text-slate-300">
          <span className="text-cyan-400 mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>{parseInlineBold(listContent)}</span>
        </div>
      );
    } else if (/^\d+\.\s+/.test(trimmedLine)) {
      const listContent = trimmedLine.replace(/^\d+\.\s+/, "");
      const match = trimmedLine.match(/^(\d+)\./);
      const num = match ? match[1] : "1";
      renderedElements.push(
        <div key={`li-num-${index}`} className="flex items-start gap-2 ml-4 my-1.5 text-sm text-slate-200">
          <span className="text-cyan-400 font-mono font-bold text-xs bg-cyan-950/50 border border-cyan-800/40 px-1 rounded mt-0.5">{num}</span>
          <span>{parseInlineBold(listContent)}</span>
        </div>
      );
    } else {
      renderedElements.push(
        <p key={`p-${index}`} className="text-sm text-slate-300 leading-relaxed my-2">
          {parseInlineBold(trimmedLine)}
        </p>
      );
    }
  });
  return <div className="space-y-1">{renderedElements}</div>;
};

function parseInlineBold(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="text-white font-semibold">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export const ThreatDetailsModal: React.FC<ThreatDetailsModalProps> = ({ threat, onClose }) => {
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const performAiAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/threat-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          threatTitle: threat.violationTitle || threat.threatTitle,
          severity: threat.severity,
          timestamp: threat.timestamp,
          author: threat.author,
          subreddit: threat.subreddit,
          description: threat.description,
          details: threat.details,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setAiReport(data.analysis);
      } else {
        setError(data.error || "Failed to fetch response from security module.");
      }
    } catch {
      setError("Unable to establish network handshake with Gemini analysis engine.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!aiReport) return;
    void navigator.clipboard.writeText(aiReport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getSeverityStyle = (s: typeof threat.severity) => {
    switch (s) {
      case "LOW":
        return { border: "border-emerald-500/30", text: "text-emerald-400", bg: "bg-emerald-950/20" };
      case "MEDIUM":
        return { border: "border-amber-500/30", text: "text-amber-400", bg: "bg-amber-950/20" };
      case "HIGH":
        return { border: "border-orange-500/30", text: "text-orange-400", bg: "bg-orange-950/20" };
      case "CRITICAL":
        return { border: "border-rose-500/40", text: "text-rose-400", bg: "bg-rose-950/20" };
    }
  };

  const sevStyle = getSeverityStyle(threat.severity);

  return (
    <div id="modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div id="modal-backdrop" className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={onClose} />
      <div id="modal-panel" className="relative w-full max-w-4xl max-h-[90vh] flex flex-col glass-panel border border-slate-800 rounded bg-slate-950/90 shadow-2xl overflow-hidden">
        <div className="scanner-line" />
        <div id="modal-header" className="flex items-center justify-between border-b border-slate-800/80 px-6 py-4 bg-slate-950">
          <div className="flex items-center gap-3">
            <ShieldAlert className={`w-5 h-5 ${sevStyle.text}`} />
            <div>
              <span className="font-mono text-xs text-slate-400 tracking-wider">VIOLATION BRIEFING</span>
              <h3 className="font-sans font-bold text-base md:text-lg text-white max-w-lg truncate">{threat.violationTitle || threat.threatTitle}</h3>
            </div>
          </div>
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 hover:border-slate-700 p-1.5 rounded transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div id="modal-body" className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4 md:col-span-1 border-r border-slate-900/60 pr-0 md:pr-6">
              <h4 className="font-mono font-semibold text-xs text-cyan-400 uppercase tracking-wider">VIOLATION DETAILS</h4>
              <div className="space-y-3">
                <div className="bg-slate-900/40 p-3 rounded border border-slate-800/40">
                  <span className="block text-[11px] text-slate-400 uppercase font-mono mb-1">SEVERITY</span>
                  <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold bg-slate-950/80 border border-slate-800 ${sevStyle.text}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    {threat.severity} Severity
                  </div>
                </div>
                <div className="bg-slate-900/40 p-3 rounded border border-slate-800/40">
                  <span className="block text-[11px] text-slate-400 uppercase font-mono mb-1">AUTHOR / SUBREDDIT</span>
                  <div className="flex font-mono text-sm gap-2 text-white items-center">
                    <Server className="w-3.5 h-3.5 text-cyan-500" />
                    <div>
                      <p className="font-bold leading-none">{threat.author || 'Unknown'}</p>
                      <p className="text-[11px] text-slate-400 mt-1">{threat.subreddit || 'Unknown'}</p>
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900/40 p-3 rounded border border-slate-800/40">
                  <span className="block text-[11px] text-slate-400 uppercase font-mono mb-1">FLAGGED AT</span>
                  <p className="font-mono text-sm font-semibold text-slate-200">{threat.timestamp}</p>
                </div>
                <div className="bg-slate-900/40 p-3 rounded border border-slate-800/40">
                  <span className="block text-[11px] text-slate-400 uppercase font-mono mb-1">VIOLATION TYPE</span>
                  <p className="text-sm font-semibold text-cyan-400">{threat.violationType || threat.attackVector || "Unknown"}</p>
                </div>
                <div className="bg-slate-900/40 p-3 rounded border border-slate-800/40">
                  <span className="block text-[11px] text-slate-400 uppercase font-mono mb-1">RULE VIOLATED</span>
                  <p className="font-mono text-xs text-pink-400 break-all">{threat.ruleViolated || threat.signature || "n/a"}</p>
                </div>
                <div className="bg-slate-900/40 p-3 rounded border border-slate-800/40">
                  <span className="block text-[11px] text-slate-400 uppercase font-mono mb-1">MODERATION STATUS</span>
                  <div className="inline-flex py-0.5 text-[10px] font-bold rounded">
                    <p className={`text-xs ${
                      threat.status === "BLOCKED" ? "text-emerald-400" :
                      threat.status === "MITIGATED" ? "text-cyan-400" :
                      threat.status === "ACTIVE" ? "text-rose-400 animate-pulse" : "text-amber-400"
                    }`}>{threat.status}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              <div className="space-y-2">
                <h4 className="font-mono font-semibold text-xs text-cyan-400 uppercase tracking-wider">VIOLATION DETAILS</h4>
                <div className="bg-slate-900/60 p-4 rounded border border-slate-800/60 font-mono text-xs text-slate-300 leading-relaxed shadow-[inset_0_1px_5px_rgba(0,0,0,0.5)]">
                  <p className="text-white font-bold mb-2">&gt;_ violation_report</p>
                  <p>{threat.details || threat.description}</p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-t border-slate-900/80 pt-4">
                  <h4 className="font-mono font-semibold text-xs text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
                    AI MODERATION ANALYSIS
                  </h4>
                  {aiReport && (
                    <button
                      id="copy-report-btn"
                      onClick={copyToClipboard}
                      className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white px-2 py-1 rounded border border-slate-800 hover:bg-slate-900 transition"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      {copied ? "Copied" : "Copy Brief"}
                    </button>
                  )}
                </div>
                {!aiReport ? (
                  <div className="bg-slate-900/20 p-6 rounded-lg border border-cyan-500/10 flex flex-col items-center justify-center text-center space-y-4 relative overflow-hidden">
                    <Cpu className="w-10 h-10 text-cyan-500/40 animate-pulse" />
                    <div>
                      <p className="text-sm font-semibold text-slate-200">Generate AI Moderation Analysis</p>
                      <p className="text-xs text-slate-400 max-w-md mt-1">
                        Use Gemini AI to analyze the violation pattern, identify behavioral signatures, and recommend moderation actions.
                      </p>
                    </div>
                    <button
                      id="trigger-ai-analysis-btn"
                      onClick={performAiAnalysis}
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-teal-500 hover:from-cyan-500 hover:to-teal-400 disabled:opacity-50 text-white font-semibold text-xs uppercase tracking-wider rounded border border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.25)] transition duration-200 cursor-pointer"
                    >
                      {loading ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Analyzing Violation...
                        </>
                      ) : (
                        <>
                          <Cpu className="w-3.5 h-3.5" />
                          ANALYZE WITH GEMINI
                        </>
                      )}
                    </button>
                    {error && (
                      <p id="ai-error-indicator" className="text-xs text-rose-400 font-mono text-center border border-rose-500/20 bg-rose-950/20 px-3 py-1.5 rounded">{error}</p>
                    )}
                  </div>
                ) : (
                  <div className="bg-slate-900/30 p-5 rounded border border-cyan-500/20 flex flex-col max-h-[400px] overflow-y-auto bg-gradient-to-b from-slate-900/50 to-slate-950 relative">
                    <div className="absolute right-3 top-3 py-0.5 px-2 bg-cyan-950/50 border border-cyan-800/40 rounded text-[10px] text-cyan-400 font-mono select-none">
                      AI REPORT
                    </div>
                    <CyberMarkdown text={aiReport} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div id="modal-footer" className="border-t border-slate-900 px-6 py-4 bg-slate-950/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>HiveMind Swarm connected</span>
          </div>
          <div className="flex gap-2">
            <button
              id="modal-verify-status-btn"
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-mono border border-slate-800 hover:border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded cursor-pointer"
            >
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
