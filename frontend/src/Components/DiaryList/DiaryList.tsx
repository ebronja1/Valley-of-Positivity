// src/Components/DiaryList/DiaryList.tsx
import React from "react";
import { format } from "date-fns"; // Assuming you're using date-fns for formatting
import { DiaryNote } from "../../Models/DiaryModels";
import "./DiaryList.css";

interface DiaryListProps {
  diaryNotes: DiaryNote[] | undefined;
}

const DiaryList: React.FC<DiaryListProps> = ({ diaryNotes }) => {
  return (
    <div className="diary-list">
      <h2>Diary Notes</h2>
      {diaryNotes?.map((note) => {
        // Handle invalid date by using a fallback value
        const formattedDate = new Date(note.timestamp);
        const dateStr = isNaN(formattedDate.getTime()) 
          ? "Invalid date" 
          : format(formattedDate, "MMMM dd, yyyy HH:mm:ss");

        return (
          <div key={note.id} className="diary-entry">
            <p>{note.content}</p>
            <p>{dateStr}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DiaryList;



