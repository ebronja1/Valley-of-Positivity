// src/Services/DiaryService.ts
import axios from "axios";
import { DiaryNote, DiaryNotePost } from "../Models/DiaryModels";


export const fetchDiaryNotes = async (): Promise<DiaryNote[]> => {
  const response = await axios.get("http://localhost:5240/api/diarynote");
  return response.data;
};

export const addDiaryNote = async (note: DiaryNotePost): Promise<DiaryNote> => {
  const response = await axios.post("http://localhost:5240/api/diarynote/1", note);
  return response.data;
};
