import React, { useState, useEffect } from "react";
import DiaryList from "../../Components/DiaryList/DiaryList";
import DiaryForm from "../../Components/DiaryForm/DiaryForm";
import {
  fetchDiaryNotes,
  fetchUserDiary,
  createUserDiary,
  updateUserDiary,
  addDiaryNote
} from "../../Services/DiaryService";
import { DiaryModel, DiaryNote } from "../../Models/DiaryModels";
import "./DiaryPage.css";

const DiaryPage: React.FC = () => {
  const [diaryNotes, setDiaryNotes] = useState<DiaryNote[] | undefined>([]);
  const [diary, setDiary] = useState<DiaryModel | null>(null);
  const [diaryTitle, setDiaryTitle] = useState<string>("");

  useEffect(() => {
    const loadDiary = async () => {
      try {
        const userDiary = await fetchUserDiary();
        if (userDiary) {
          setDiary(userDiary);
          setDiaryTitle(userDiary.title);
          setDiaryNotes(userDiary.diaryNotes);
        }
      } catch (error) {
        console.error("Error fetching diary:", error);
      }
    };
    loadDiary();
  }, []);

  const handleAddNote = async (noteContent: string) => {
    if (!diary) return;

    try {
      await addDiaryNote({
        content: noteContent,
        diaryId: diary.id
      });
      const newUserDiary = await fetchUserDiary();
      setDiaryNotes(newUserDiary?.diaryNotes);
    } catch (error) {
      console.error("Error adding diary note:", error);
    }
  };

  const handleCreateDiary = async () => {
    try {
      const newDiary = await createUserDiary(diaryTitle);
      setDiary(newDiary);
      setDiaryTitle(newDiary.title);
    } catch (error) {
      console.error("Error creating diary:", error);
    }
  };

  const handleUpdateDiaryTitle = async () => {
    if (!diary) return;

    try {
      const updatedDiary = await updateUserDiary(diary.id, diaryTitle);
      setDiary(updatedDiary);
    } catch (error) {
      console.error("Error updating diary title:", error);
    }
  };

  return (
    <div className="diary-page">
      {diary ? (
        <>
          <div className="diary-header">
            <h3>Diary Title: {diaryTitle}</h3>
            <input
              type="text"
              value={diaryTitle}
              onChange={(e) => setDiaryTitle(e.target.value)}
              placeholder={diaryTitle}
            />
            <button onClick={handleUpdateDiaryTitle}>Update Title</button>
          </div>
          <DiaryForm onAddNote={handleAddNote} />
          <DiaryList diaryNotes={diaryNotes} />
        </>
      ) : (
        <div className="create-diary">
          <input
            type="text"
            value={diaryTitle}
            onChange={(e) => setDiaryTitle(e.target.value)}
            placeholder="Diary Title"
          />
          <button onClick={handleCreateDiary}>Create Diary</button>
        </div>
      )}
    </div>
  );
};

export default DiaryPage;

