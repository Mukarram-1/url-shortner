import React, { useState, useEffect } from "react";

function MyTags() {
  const [tags, setTags] = useState([]);
  const [editingTagId, setEditingTagId] = useState(null);
  const [newTagName, setNewTagName] = useState("");
  const accessToken = localStorage.getItem("accessToken");

  const fetchTags = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/urltags`, {
        headers: {
          "Authorization": `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const tags = await response.json();
      setTags(tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleTagDelete = async (tag) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/urltags/${tag.tag_id}`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) {
        console.error("Network response was not ok");
      }
      await response.json();
      fetchTags();
    } catch (error) {
      console.error("Error deleting tag:", error);
    }
  };

  const handleTagEdit = (tag) => {
    setEditingTagId(tag.tag_id);
    setNewTagName(tag.tag_name);
  };

  const handleTagChange = async (tag) => {
    if (newTagName.trim() === "") return;
    console.log("new tag name: ",newTagName);
    try {
      const response = await fetch(
        `http://localhost:3000/api/urltags/${tag.tag_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ tag_name: newTagName }),
        }
      );
      if (!response.ok) {
        console.error("Network response was not ok");
        return;
      }
      await response.json();
      setEditingTagId(null);
      fetchTags();
    } catch (error) {
      console.error("Error updating tag:", error);
    }
  };

  const handleInputBlur = (tag) => {
    handleTagChange(tag);
  };

  const handleInputChange = (e) => {
    setNewTagName(e.target.value);
  };

  const handleKeyDown = (e, tag) => {
    if (e.key === "Enter") {
      handleTagChange(tag);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <div className="tags-container">
      {tags.map((tag) => (
        <div key={tag.tag_id} className="tag">
          {editingTagId === tag.tag_id ? (
            <input
              type="text"
              value={newTagName}
              onChange={handleInputChange}
              onBlur={() => handleInputBlur(tag)}
              onKeyDown={(e) => handleKeyDown(e, tag)}
              autoFocus
            />
          ) : (
            <span onDoubleClick={() => handleTagEdit(tag)}>
              {tag.tag_name}
            </span>
          )}
          <span className="tag-delete" onClick={() => handleTagDelete(tag)}>
            &times;
          </span>
        </div>
      ))}
    </div>
  );
}

export default MyTags;
