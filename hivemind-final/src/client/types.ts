export type Severity = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export interface Violation {
  id: string;
  violationTitle?: string;
  threatTitle?: string; // kept for backward compat
  severity: Severity;
  timestamp: string;
  author?: string;
  subreddit?: string;
  description: string;
  details?: string;
  status: "FLAGGED" | "REMOVED" | "WARNED" | "APPEALED" | "BLOCKED" | "MITIGATED" | "UNDER_INVESTIGATION" | "ACTIVE";
  ruleViolated?: string;
  violationType?: string;
  ip?: string; // deprecated
  endpoint?: string; // deprecated
  signature?: string; // deprecated
  attackVector?: string; // deprecated
}

export type ActiveTab = "Dashboard" | "Violations" | "Queue" | "Rules" | "Swarm";

export interface SubredditCommunity {
  id: string;
  name: string;
  url: string;
  status: "HEALTHY" | "CONCERNING" | "CRITICAL";
  violationCount: number;
}

// HiveMind Swarm Types
export interface SemanticSignature {
  id: string;
  behavioralDNA: string;
  rhetoricalPatterns: string[];
  coordinationFrequency: number;
  confidenceScore: number;
  createdAt: string;
}

export interface BehavioralVaccine {
  id: string;
  semanticHash: string;
  signature: SemanticSignature;
  sourceSubreddit: string;
  flaggedViolation: Violation;
  status: "ACTIVE" | "ARCHIVED";
  timestamp: string;
  efficacy: number;
}

export interface SwarmAlert {
  id: string;
  vaccineId: string;
  targetSubreddit: string;
  matchedBehavior: string;
  riskLevel: number;
  quarantineUntil?: string;
  status: "QUARANTINE" | "BLOCKED" | "MONITORING";
}

export interface ViolationTemplate {
  violationTitle: string;
  threatTitle?: string;
  severity: Severity;
  description: string;
  details: string;
  violationType: string;
  attackVector?: string;
}
