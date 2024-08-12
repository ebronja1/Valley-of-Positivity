// src/Models/QuoteType.ts
export enum PhotoType {
    Landscape = 'Landscape',
    Nature = 'Nature',
    Travel = 'Travel',
    Animals = 'Animals',
    Inspirational = 'Inspirational',
    Abstract = 'Abstract',
    Other = 'Other',
  }
  
  export type PhotoTypeString = keyof typeof PhotoType; 
  
  export type PhotoModel = {
    id: number;
    title: string;
    imageUrl: string;
    type: PhotoType;
  };
  
  // src/Models/QuoteModels.ts
  
  export interface PhotoQueryObject {
    type?: "Landscape" | "Nature" | "Travel" | "Animals" | "Inspirational" | "Abstract" | "Other";
    title?: string;
  }