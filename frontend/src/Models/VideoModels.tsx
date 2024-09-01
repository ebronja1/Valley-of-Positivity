// src/Models/QuoteType.ts
export enum VideoType {
    Landscape = 'Landscape',
    Nature = 'Nature',
    Travel = 'Travel',
    Animals = 'Animals',
    Inspirational = 'Inspirational',
    Abstract = 'Abstract',
    Other = 'Other',
  }
  
  export type VideoTypeString = keyof typeof VideoType; 
  
  export type VideoModel = {
    id: number;
    title: string;
    videoUrl: string;
    type: VideoType;
  };
  
  // src/Models/QuoteModels.ts
  
  export interface VideoQueryObject {
    type?: "Landscape" | "Nature" | "Travel" | "Animals" | "Inspirational" | "Abstract" | "Other";
    title?: string;
  }