"use client";

import { useState } from "react";
import type { Band } from "@/types/courses";
import CourseCard from "@/components/CourseCard";

type CourseExplorerProps = {
  bands: Band[];
};

export default function CourseExplorer({ bands }: CourseExplorerProps) {
  const [keyword, setKeyword] = useState("");
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [likes, setLikes] = useState<{ [key: number]: number }>({});

  function handleToggleFavorite(id: number) {
    setFavoriteIds((prev) =>
      prev.includes(id)
        ? prev.filter((bandId) => bandId !== id)
        : [...prev, id]
    );
  }

  function handleLike(id: number) {
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  }

  const searchText = keyword.toLowerCase().replace(/\s+/g, "");
  const visibleBands = bands.filter((band) => {
    const searchableText = [
      band.name,
      band.genre,
      band.hitSong,
      band.history,
      ...band.members.map((member) => member.name),
    ]
      .join(" ")
      .toLowerCase()
      .replace(/\s+/g, "");

    return searchableText.includes(searchText);
  });

  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <input
          type="search"
          placeholder="ค้นหาวงดนตรี..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            padding: "10px 16px",
            width: "100%",
            maxWidth: "400px",
            borderRadius: "32px",
            border: "1px solid #ccc",
            fontSize: "1rem",
          }}
        />
        <p style={{ marginTop: "12px", fontSize: "1.1rem", fontWeight: "600", color: "#000000" }}>
          กำลังติดตาม <span style={{ color: "#22852f", fontSize: "1.3rem", fontWeight: "bold" }}>{favoriteIds.length}</span>
        </p>
      </div>
      {visibleBands.length === 0 ? (
        <p style={{ fontSize: "1.2rem", color: "#666" }}>
          ไม่พบวงดนตรีที่ตรงกับคำค้นหา "{keyword}"
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
          }}
        >
          {visibleBands.map((band) => (
            <CourseCard
              key={band.id}
              band={band}
              isFavorite={favoriteIds.includes(band.id)}
              likeCount={likes[band.id] || 0}
              onToggleFavorite={() => handleToggleFavorite(band.id)}
              onLike={() => handleLike(band.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}