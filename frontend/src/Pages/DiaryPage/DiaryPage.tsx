// src/Pages/DiaryPage/DiaryPage.tsx
import React, { useState, useEffect } from "react";
import DiaryList from "../../Components/DiaryList/DiaryList";
import DiaryForm from "../../Components/DiaryForm/DiaryForm";
import { fetchDiaryNotes, addDiaryNote } from "../../Services/DiaryService";
import { DiaryNote } from "../../Models/DiaryModels";

const DiaryPage: React.FC = () => {
  const [diaryNotes, setDiaryNotes] = useState<DiaryNote[]>([]);
  
  useEffect(() => {
    const loadNotes = async () => {
      try {
        const notes = await fetchDiaryNotes();
        setDiaryNotes(notes);
      } catch (error) {
        console.error("Error fetching diary entries:", error);
      }
    };
    loadNotes();
  }, []);

  const handleAddNote = async (note: { content: string; diaryId: number }) => {
    try {
      await addDiaryNote(note);
      const updatedNotes = await fetchDiaryNotes();
      setDiaryNotes(updatedNotes);
    } catch (error) {
      console.error("Error adding diary entry:", error);
    }
  };

  return (
    <div className="diary-page">
      <DiaryForm handleAddNote={handleAddNote} />
      <DiaryList diaryNotes={diaryNotes} />
    </div>
  );
};

export default DiaryPage;

