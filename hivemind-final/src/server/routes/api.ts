import { Hono } from 'hono';
import { context, redis, reddit } from '@devvit/web/server';
import type {
  DecrementResponse,
  IncrementResponse,
  InitResponse,
} from '../../shared/api';

type ErrorResponse = {
  status: 'error';
  message: string;
};

export const api = new Hono();

api.get('/init', async (c) => {
  const { postId } = context;

  if (!postId) {
    console.error('API Init Error: postId not found in devvit context');
    return c.json<ErrorResponse>(
      {
        status: 'error',
        message: 'postId is required but missing from context',
      },
      400
    );
  }

  try {
    const [count, username] = await Promise.all([
      redis.get('count'),
      reddit.getCurrentUsername(),
    ]);

    return c.json<InitResponse>({
      type: 'init',
      postId: postId,
      count: count ? parseInt(count) : 0,
      username: username ?? 'anonymous',
    });
  } catch (error) {
    console.error(`API Init Error for post ${postId}:`, error);
    let errorMessage = 'Unknown error during initialization';
    if (error instanceof Error) {
      errorMessage = `Initialization failed: ${error.message}`;
    }
    return c.json<ErrorResponse>(
      { status: 'error', message: errorMessage },
      400
    );
  }
});

api.post('/increment', async (c) => {
  const { postId } = context;
  if (!postId) {
    return c.json<ErrorResponse>(
      {
        status: 'error',
        message: 'postId is required',
      },
      400
    );
  }

  const count = await redis.incrBy('count', 1);
  return c.json<IncrementResponse>({
    count,
    postId,
    type: 'increment',
  });
});

api.post('/decrement', async (c) => {
  const { postId } = context;
  if (!postId) {
    return c.json<ErrorResponse>(
      {
        status: 'error',
        message: 'postId is required',
      },
      400
    );
  }

  const count = await redis.incrBy('count', -1);
  return c.json<DecrementResponse>({
    count,
    postId,
    type: 'decrement',
  });
});

api.post('/threat-analysis', async (c) => {
  try {
    const body = await c.req.json();
    const { threatTitle, severity } = body;

    if (!threatTitle) {
      return c.json(
        { error: 'Threat title is required', success: false },
        400
      );
    }

    const mockAnalysis = `## MODERATION ANALYSIS REPORT

### 1. Violation Severity Assessment
**Risk Score: ${severity === 'CRITICAL' ? '9-10' : severity === 'HIGH' ? '7-8' : severity === 'MEDIUM' ? '5-6' : '2-3'}/10**

${severity === 'CRITICAL' ? 'Critical violation requiring immediate moderator intervention.' : 'Moderate violation requiring review and appropriate action.'}

### 2. Behavioral Profile
Based on posting patterns and semantic analysis, this appears to be a ${severity === 'CRITICAL' ? 'coordinated multi-account operation' : 'single user or small group'} campaign. Probable intent: **${severity === 'CRITICAL' ? 'Community disruption and rule evasion at scale' : 'Individual rule violation or low-level spam'}**

### 3. Pattern Analysis
The violation was detected via ${severity === 'CRITICAL' ? 'cross-community behavioral vaccine matching' : 'local semantic pattern detection'}. Analysis suggests **${['text mutation evasion tactics', 'coordinated posting cadence', 'ban evasion behavioral fingerprint'][Math.floor(Math.random() * 3)]}**.

### 4. Recommended Moderation Actions
- **Immediate**: Remove violating content and issue user warning
- **Urgent**: Check user's post history for pattern violations
- **Follow-up**: Generate behavioral vaccine for swarm distribution
- **Long-term**: Update community AutoMod rules based on detected patterns

### 5. Swarm Intelligence
Monitor for:
- Same behavioral patterns appearing in other communities
- Account age and karma anomalies
- Posting cadence matching known coordinated campaigns
- Text mutation patterns (Unicode substitution, homoglyphs)
- Cross-subreddit coordination signals`;

    return c.json({
      analysis: mockAnalysis,
      success: true,
    });
  } catch (error) {
    console.error('Threat Analysis Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to analyze threat';
    return c.json(
      {
        error: errorMessage,
        success: false,
      },
      500
    );
  }
});

// HiveMind Swarm Endpoints
api.post('/vaccines/generate', async (c) => {
  try {
    const body = await c.req.json();
    const { violation } = body;

    // Extract semantic patterns from violation
    const semanticPatterns = [
      violation.description?.substring(0, 50) || 'pattern',
      `severity:${violation.severity}`,
      `type:${violation.violationType || 'unknown'}`
    ];

    // Generate behavioral vaccine token
    const vaccineId = `vac-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const semanticHash = Buffer.from(JSON.stringify(semanticPatterns)).toString('base64').substring(0, 32);

    // Store vaccine in Redis for global distribution
    await redis.set(`vaccine:${vaccineId}`, JSON.stringify({
      id: vaccineId,
      semanticHash,
      sourceSubreddit: 'hivemind-network',
      timestamp: new Date().toISOString(),
      severity: violation.severity,
      patterns: semanticPatterns,
    }), { nx: true });

    // Broadcast to swarm
    await redis.set('swarm:vaccine:' + vaccineId, JSON.stringify({
      vaccine_id: vaccineId,
      broadcast_time: Date.now(),
      target_subreddits: '*',
    }));

    return c.json({
      vaccineId,
      semanticHash,
      success: true,
      message: 'Behavioral vaccine generated and broadcast to swarm',
    });
  } catch (error) {
    console.error('Vaccine Generation Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ error: errorMessage, success: false }, 500);
  }
});

api.post('/swarm/detect', async (c) => {
  try {
    const body = await c.req.json();
    const { violation } = body;

    // Track matched vaccines in a set
    const matchedVaccines: { id: string; patterns: string[]; severity: string; matchConfidence: number; }[] = [];
    
    // Simulate vaccine database lookup
    const mockVaccines = [
      { id: 'vac-001', patterns: ['promotion', 'spam'], severity: 'HIGH' },
      { id: 'vac-002', patterns: ['harassment', 'brigade'], severity: 'CRITICAL' },
    ];

    for (const vaccine of mockVaccines) {
      // Behavioral pattern matching
      const descriptionMatch = vaccine.patterns?.some((p: string) =>
        violation.description?.toLowerCase().includes(p.toLowerCase())
      );
      
      const severityMatch = vaccine.severity === violation.severity;

      if (descriptionMatch || severityMatch) {
        matchedVaccines.push({
          ...vaccine,
          matchConfidence: descriptionMatch && severityMatch ? 0.95 : 0.70,
        });
      }
    }

    // Store quarantine alert
    if (matchedVaccines.length > 0) {
      const quarantineId = `quar-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      await redis.set(`${quarantineId}`, JSON.stringify({
        id: quarantineId,
        violation,
        matchedVaccines: matchedVaccines.map(v => v.id),
        riskLevel: Math.max(...matchedVaccines.map(v => v.matchConfidence)),
        status: 'ACTIVE',
        timestamp: new Date().toISOString(),
      }));
    }

    return c.json({
      matched: matchedVaccines.length > 0,
      matchedVaccines,
      riskLevel: matchedVaccines.length > 0 ? Math.max(...matchedVaccines.map(v => v.matchConfidence)) : 0,
      success: true,
    });
  } catch (error) {
    console.error('Swarm Detection Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ error: errorMessage, success: false }, 500);
  }
});

api.get('/swarm/status', async (c) => {
  try {
    // Simulate swarm status from mock data
    const activeVaccines = Math.floor(Math.random() * 15) + 5;
    const activeQuarantines = Math.floor(Math.random() * 8) + 2;

    return c.json({
      activeVaccines,
      activeQuarantines,
      swarmHealth: activeVaccines > 0 ? 'ACTIVE' : 'DORMANT',
      success: true,
    });
  } catch (error) {
    console.error('Swarm Status Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return c.json({ error: errorMessage, success: false }, 500);
  }
});
