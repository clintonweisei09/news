export type NewsCategory = 
  | 'top-stories'
  | 'gossip'
  | 'scandals'
  | 'corridors-of-power'
  | 'entertainment'
  | 'opinion'
  | 'politics'
  | 'technology'
  | 'world'
  | 'science-health'
  | 'sports'
  | 'arts-culture'
  | 'climate-energy';

export interface Author {
  name: string;
  role: string;
  avatar: string;
  verified?: boolean;
}

export interface CourtCaseDetail {
  courtName: string;
  caseNumber: string;
  presidingJudge: string;
  rulingDate: string;
  status: 'In Progress' | 'Verdict Delivered' | 'Hearing Scheduled' | 'Constitutional Appeal';
  keyLitigants: string;
}

export interface Article {
  id: string;
  title: string;
  kicker: string;
  deck: string;
  category: NewsCategory;
  categoryLabel: string;
  author: Author;
  publishedAt: string;
  readTime: string;
  imageUrl: string;
  imageCaption: string;
  views: number;
  commentsCount: number;
  isLead?: boolean;
  isTrending?: boolean;
  isFeaturedInSlider?: boolean;
  isSponsored?: boolean;
  sponsorName?: string;
  tags: string[];
  keyPoints?: string[];
  courtDetail?: CourtCaseDetail;
  content: string[];
}

export interface NewsTickerItem {
  id: string;
  title: string;
  timeAgo: string;
  category: string;
  tag: string;
  articleId: string;
}

export interface SidebarUpdateItem {
  id: string;
  timestamp: string;
  title: string;
  category: string;
  tag: string;
  badgeColor?: string;
  articleId: string;
  isUrgent?: boolean;
  imageUrl?: string;
  excerpt?: string;
}

export interface AdUnit {
  id: string;
  format: 'leaderboard' | 'skyscraper' | 'companion' | 'infeed' | 'mobile_sticky' | 'midpage';
  sponsor: string;
  tagline: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  cpmRate: string;
  imageUrl?: string;
}

export interface CommentItem {
  id: string;
  authorName: string;
  authorRole: string;
  timestamp: string;
  text: string;
  upvotes: number;
}
