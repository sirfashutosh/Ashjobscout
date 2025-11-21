export type DataSource = 'YC' | 'LinkedIn';

export type CompanyStatus = 'pending' | 'worked' | 'skipped';

export interface Job {
  title: string;
  type?: string;
  salary?: string;
  location?: string;
  link?: string;
}

export interface Company {
  name: string;
  description: string;
  website?: string;
  batch?: string; // e.g., W24, S23, or 'LinkedIn'
  tags?: string[];
  jobs: Job[];
  status?: CompanyStatus; // New field for workflow
}

export type StreamUpdate = 
  | { type: 'company'; data: Company }
  | { type: 'log'; message: string };

export interface SearchState {
  isLoading: boolean;
  error: string | null;
  data: Company[] | null;
}