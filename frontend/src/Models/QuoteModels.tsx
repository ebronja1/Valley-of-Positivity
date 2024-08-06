// src/Models/QuoteType.ts
export enum QuoteType {
  Inspirational = 'Inspirational',
  Motivational = 'Motivational',
  Funny = 'Funny',
  Life = 'Life',
  Love = 'Love',
  Success = 'Success',
  Business = 'Business',
  Friendship = 'Friendship',
}

export type QuoteTypeString = keyof typeof QuoteType; 

export type QuoteModel = {
  id: number;
  text: string;
  type: QuoteType;
  author?: string;
};

// src/Models/QuoteModels.ts

export interface QuoteQueryObject {
  type?: "Inspirational" | "Motivational" | "Funny" | "Life" | "Love" | "Success" | "Business" | "Friendship";
  author?: string;
}
