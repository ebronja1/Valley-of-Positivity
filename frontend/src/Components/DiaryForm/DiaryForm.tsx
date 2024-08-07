// src/Components/DiaryForm/DiaryForm.tsx
import React, { useState } from "react";

interface DiaryFormProps {
  handleAddNote: (note: { content: string;  diaryId: number }) => void;
}

const DiaryForm: React.FC<DiaryFormProps> = ({ handleAddNote }) => {
  const [content, setContent] = useState<string>("");
  const [diaryId, setDiaryId] = useState<number>(1);

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (content) {
      handleAddNote({ content, diaryId});
      setContent(""); // Clear content field
      setDiaryId(1); // Clear date field
    }
  };

  return (
    <form onSubmit={handleSubmit} className="diary-form">
      <h2>Add New Diary Note</h2>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          rows={4}
          required
        />
      </div>
      <button type="submit">Add Note</button>
    </form>
  );
};

export default DiaryForm;
