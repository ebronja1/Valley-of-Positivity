// src/Components/DiaryForm/DiaryForm.tsx
import React, { useState } from "react";
import "./DiaryForm.css";

interface DiaryFormProps {
  onAddNote: (content: string) =>  Promise<void>;
}

const DiaryForm: React.FC<DiaryFormProps> = ({ onAddNote }) => {
  const [content, setContent] = useState("");

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (content) {
      onAddNote(content);
      setContent(""); // Clear content field
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
