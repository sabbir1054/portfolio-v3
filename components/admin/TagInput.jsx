"use client";
import { useState } from "react";

export default function TagInput({ value = [], onChange, placeholder = "Add tag..." }) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const tag = input.trim();
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInput("");
  };

  const removeTag = (index) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="admin-tag-input">
      <div className="admin-tags">
        {value.map((tag, i) => (
          <span key={i} className="admin-tag">
            {tag}
            <button type="button" onClick={() => removeTag(i)}>
              <i className="fa-solid fa-xmark" />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTag();
          }
        }}
        placeholder={placeholder}
      />
    </div>
  );
}
