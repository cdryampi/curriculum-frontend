import React from "react";

const TagsDisplay = ({ tags }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <span
          key={`${tag.id}-${tag.nombre}`}
          style={{ backgroundColor: tag.color, color: "#ffffff" }}
          className="px-2 py-0.5 text-xs rounded"
        >
          {tag.nombre}
        </span>
      ))}
    </div>
  );
};

export default TagsDisplay;
