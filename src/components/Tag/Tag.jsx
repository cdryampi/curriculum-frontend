import React from "react"

const getContrastColor = (hex) => {
  if (!hex) return "#ffffff"
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return lum > 0.55 ? "#000000" : "#ffffff"
}

const TagsDisplay = React.memo(({ tags }) => {
  if (!tags?.length) return null
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <span
          key={`${tag.id}-${tag.nombre}`}
          style={{ backgroundColor: tag.color, color: getContrastColor(tag.color) }}
          className="px-2 py-0.5 text-xs rounded"
        >
          {tag.nombre}
        </span>
      ))}
    </div>
  )
})

export default TagsDisplay
