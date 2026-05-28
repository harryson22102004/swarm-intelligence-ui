import { Violation, SubredditCommunity, ViolationTemplate } from "./types";

export const INITIAL_THREATS: Violation[] = [
  {
    id: "v-101",
    violationTitle: "Coordinated Self-Promotion Ring",
    severity: "CRITICAL",
    timestamp: "09:44:12 AM",
    author: "u/promo_bot_77",
    subreddit: "r/learnprogramming",
    description: "Cluster of 12 accounts posting identical affiliate links with mutated text patterns.",
    details: "Detected coordinated posting from accounts created within 48hrs of each other. All sharing links to the same domain with slight URL variations (bit.ly, tinyurl, direct). Text uses Unicode lookalike characters to evade keyword filters (e.g., 'frēē cöurse' instead of 'free course'). Behavioral cadence: posts every 15 minutes across 4 subreddits simultaneously.",
    status: "FLAGGED",
    ruleViolated: "Rule 2: No Self-Promotion",
    violationType: "Self-Promotion Spam"
  },
  {
    id: "v-102",
    violationTitle: "Harassment Campaign - Targeted Brigading",
    severity: "HIGH",
    timestamp: "09:43:55 AM",
    author: "u/raid_leader_x",
    subreddit: "r/gaming",
    description: "Organized harassment ring targeting specific users with hate speech variants.",
    details: "8 accounts from a coordinated group using text mutation tactics: replacing letters with visually similar Unicode characters to bypass AutoMod filters. Pattern: 'h8' → 'hαte', slurs with zero-width spaces inserted. All accounts post within 2-minute windows, suggesting bot coordination or a shared script.",
    status: "FLAGGED",
    ruleViolated: "Rule 1: No Harassment",
    violationType: "Coordinated Harassment"
  },
  {
    id: "v-103",
    violationTitle: "Misinformation Spread - Health Claims",
    severity: "HIGH",
    timestamp: "09:42:30 AM",
    author: "u/truth_seeker_2026",
    subreddit: "r/AskReddit",
    description: "Network of accounts pushing false health claims with citation-mimicking formatting.",
    details: "Accounts use academic-style formatting to appear credible: fake DOI links, fabricated journal names, and copy-pasted 'abstracts'. Same rhetorical pattern detected across r/health, r/nutrition, r/AskReddit. Text mutations include replacing medical terms with near-synonyms to avoid keyword detection.",
    status: "WARNED",
    ruleViolated: "Rule 4: No Misinformation",
    violationType: "Misinformation"
  },
  {
    id: "v-104",
    violationTitle: "Ban Evasion Cluster Detected",
    severity: "CRITICAL",
    timestamp: "09:41:18 AM",
    author: "u/totally_new_user_99",
    subreddit: "r/news",
    description: "Previously banned user operating 5 alternate accounts with identical behavioral signatures.",
    details: "Semantic analysis matched writing style, posting cadence (burst of 6 posts between 2-4 AM), topic preferences, and rhetorical patterns to banned user u/removed_user_44. New accounts use slight name variations and different email domains but identical behavioral DNA. Vocabulary overlap: 94%. Sentence structure similarity: 91%.",
    status: "FLAGGED",
    ruleViolated: "Reddit TOS: Ban Evasion",
    violationType: "Ban Evasion"
  }
];

export const HISTORICAL_THREATS: Violation[] = [
  {
    id: "v-099",
    violationTitle: "Astroturfing Campaign - Product Reviews",
    severity: "HIGH",
    timestamp: "09:12:05 AM",
    author: "u/happy_customer_22",
    subreddit: "r/technology",
    description: "20+ accounts posting suspiciously similar positive reviews for the same product.",
    details: "All accounts follow same template: personal anecdote → product mention → purchase link. Created within same week, similar username patterns (adjective_noun_number). Semantic fingerprint matches commercial astroturfing campaigns previously flagged in r/gadgets.",
    status: "REMOVED",
    ruleViolated: "Rule 5: No Astroturfing",
    violationType: "Astroturfing"
  },
  {
    id: "v-098",
    violationTitle: "Hate Speech with Unicode Evasion",
    severity: "CRITICAL",
    timestamp: "08:55:40 AM",
    author: "u/edge_poster_v2",
    subreddit: "r/gaming",
    description: "Slurs encoded with Cyrillic lookalike characters and zero-width joiners.",
    details: "User replaced Latin characters with visually identical Cyrillic equivalents (а, е, о, р, с) to bypass word filters. Also inserted zero-width Unicode joiners between characters. Behavioral vaccine from r/news flagged this exact evasion pattern 3 hours ago.",
    status: "REMOVED",
    ruleViolated: "Rule 1: No Hate Speech",
    violationType: "Hate Speech"
  },
  {
    id: "v-097",
    violationTitle: "Spam Wave - Crypto Scam Links",
    severity: "MEDIUM",
    timestamp: "08:42:15 AM",
    author: "u/invest_now_xyz",
    subreddit: "r/learnprogramming",
    description: "Batch of accounts posting crypto scam links disguised as coding tutorials.",
    details: "Posts titled 'Learn Python and earn $$$' with links redirecting to crypto pump schemes. 7 accounts detected with identical post timing and URL shortener chains. Behavioral vaccine generated and broadcast to swarm.",
    status: "REMOVED",
    ruleViolated: "Rule 2: No Spam",
    violationType: "Spam"
  },
  {
    id: "v-096",
    violationTitle: "Vote Manipulation Ring",
    severity: "MEDIUM",
    timestamp: "08:15:30 AM",
    author: "u/upvote_gang_01",
    subreddit: "r/AskReddit",
    description: "Coordinated upvoting/downvoting pattern detected across multiple threads.",
    details: "15 accounts consistently upvoting each other's posts within 30-second windows while downvoting competing posts. Same behavioral cadence detected in r/worldnews last week — vaccine match confirmed.",
    status: "FLAGGED",
    ruleViolated: "Reddit TOS: Vote Manipulation",
    violationType: "Vote Manipulation"
  },
  {
    id: "v-095",
    violationTitle: "Doxxing Attempt - Personal Info Shared",
    severity: "CRITICAL",
    timestamp: "07:30:12 AM",
    author: "u/anonymous_leaker",
    subreddit: "r/community",
    description: "User posted personal information of another user across multiple threads.",
    details: "Real name, workplace, and social media profiles shared in comments. Content was split across 3 separate comments to evade automated detection. Behavioral pattern matches previous doxxing incident in r/drama — swarm vaccine triggered pre-emptive flag.",
    status: "REMOVED",
    ruleViolated: "Rule 3: No Doxxing",
    violationType: "Doxxing"
  }
];

export const MOCK_SUBREDDIT_POOL = [
  "r/learnprogramming",
  "r/gaming",
  "r/AskReddit",
  "r/technology",
  "r/news",
  "r/worldnews",
  "r/science",
  "r/community",
  "r/memes",
  "r/todayilearned"
];

export const MOCK_THREAT_TEMPLATES: ViolationTemplate[] = [
  {
    violationTitle: "Coordinated Harassment Wave",
    severity: "HIGH" as const,
    description: "Multiple accounts targeting user with synchronized hate comments.",
    details: "Coordinated group using shared talking points and timing patterns. Accounts created within same 24-hour window. Text mutations include substituting vowels with numbers and using homoglyphs.",
    violationType: "Coordinated Harassment"
  },
  {
    violationTitle: "Spam Bot Network Detected",
    severity: "MEDIUM" as const,
    description: "Automated accounts posting repetitive promotional content.",
    details: "Bot network posting identical content with slight word substitutions to appear unique. Posting frequency: every 90 seconds. Same affiliate tracking codes detected across all posts.",
    violationType: "Spam"
  },
  {
    violationTitle: "Ban Evasion - Serial Offender",
    severity: "CRITICAL" as const,
    description: "Previously banned user returning with new accounts matching behavioral DNA.",
    details: "Writing style analysis confirms 96% match with banned user. Same posting schedule, topic interests, and rhetorical patterns. Account age: 2 days. Behavioral vaccine from 3 communities confirms identity.",
    violationType: "Ban Evasion"
  },
  {
    violationTitle: "Brigading from External Platform",
    severity: "CRITICAL" as const,
    description: "Coordinated raid originating from external Discord server targeting community.",
    details: "Sudden influx of 40+ new accounts posting inflammatory content within 10-minute window. All accounts have no prior Reddit history. Content follows identical rhetorical template with minor text variations.",
    violationType: "Brigading"
  },
  {
    violationTitle: "Misinformation Campaign - Political",
    severity: "HIGH" as const,
    description: "Network spreading fabricated political claims with fake source links.",
    details: "Accounts posting manufactured screenshots and fake news articles. Cross-referenced with fact-checking databases — all claims debunked. Same campaign detected in 5 other subreddits via swarm intelligence.",
    violationType: "Misinformation"
  },
  {
    violationTitle: "Off-Topic Flooding",
    severity: "LOW" as const,
    description: "Accounts posting irrelevant content to disrupt community discussions.",
    details: "Multiple accounts posting unrelated memes and copypasta to bury legitimate discussion threads. Low severity but coordinated pattern suggests intentional disruption.",
    violationType: "Off-Topic Spam"
  }
];

export const INITIAL_ENDPOINTS: SubredditCommunity[] = [
  { id: "c-1", name: "r/learnprogramming", url: "r/learnprogramming", status: "CRITICAL", violationCount: 3 },
  { id: "c-2", name: "r/gaming", url: "r/gaming", status: "CONCERNING", violationCount: 2 },
  { id: "c-3", name: "r/AskReddit", url: "r/AskReddit", status: "HEALTHY", violationCount: 1 },
  { id: "c-4", name: "r/news", url: "r/news", status: "CONCERNING", violationCount: 1 },
  { id: "c-5", name: "r/technology", url: "r/technology", status: "HEALTHY", violationCount: 1 },
  { id: "c-6", name: "r/worldnews", url: "r/worldnews", status: "HEALTHY", violationCount: 0 },
  { id: "c-7", name: "r/science", url: "r/science", status: "HEALTHY", violationCount: 0 },
  { id: "c-8", name: "r/community", url: "r/community", status: "HEALTHY", violationCount: 1 }
];
