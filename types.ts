export interface SearchSource {
  title: string;
  url: string;
}

export interface AiResponse {
  text: string;
  sources: SearchSource[];
}

export enum AppTab {
  GENERATOR = 'GENERATOR',
  CONVERTER = 'CONVERTER',
  VISUALIZER = 'VISUALIZER',
  AI_SEARCH = 'AI_SEARCH'
}

export interface GrayCodeRow {
  decimal: number;
  binary: string;
  gray: string;
  changedBitIndex: number | null; // Which bit changed from the previous row
}