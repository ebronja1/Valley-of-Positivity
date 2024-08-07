// src/Components/DiaryList/DiaryList.tsx
import React from "react";
import { format } from "date-fns";
import { DiaryNote } from "../../Models/DiaryModels";
import { v4 as uuidv4 } from "uuid";

interface DiaryListProps {
  diaryNotes: DiaryNote[];
}

const DiaryList: React.FC<DiaryListProps> = ({ diaryNotes }) => {
  return (
    <div className="diary-list">
      {diaryNotes.map((note) => (
        <div key={uuidv4()} className="diary-entry">
          <p>{note.content}</p>
          <p>{format(new Date(note.timestamp), "PPPpp")}</p> {/* Format the date */}
        </div>
      ))}
    </div>
  );
};

export default DiaryList;
