// src/Models/DiaryModels.ts
export interface DiaryNote {
  id?: number;
  content: string;
  timestamp: string;
  diaryId: number;
}

export interface DiaryNotePost {
  id?: number;
  content: string;
  timestamp?: string;
  diaryId: number;
}

export interface DiaryModel {
  id: number;
  title: string;
  diaryNotes?: DiaryNote[];
}


export interface DiaryQueryObject {
  title: string;
}
