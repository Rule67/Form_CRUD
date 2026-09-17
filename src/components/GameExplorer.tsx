"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Game, GameStatus } from "@/types/games";
import GameForm, { type GameDraft } from "@/components/GameForm";
import { getStoredGames, saveGamesToStorage } from "@/data/games";

type GameExplorerProps = {
  initialGames: Game[];
};

export default function GameExplorer({ initialGames }: GameExplorerProps) {
  const [games, setGames] = useState<Game[]>(() => {
    const savedGames = getStoredGames();
    return savedGames.length > 0 ? savedGames : initialGames;
  });
  const [keyword, setKeyword] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ทั้งหมด");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    saveGamesToStorage(games);
  }, [games]);

  function handleSave(draft: GameDraft) {
    if (editingId === null) {
      const newGame: Game = {
        id: crypto.randomUUID(),
        title: draft.title.trim(),
        platform: draft.platform,
        expectedHours: Number(draft.expectedHours),
        status: draft.status,
      };
      setGames((prev) => [...prev, newGame]);
    } else {
      setGames((prev) =>
        prev.map((g) =>
          g.id === editingId
            ? {
                ...g,
                title: draft.title.trim(),
                platform: draft.platform,
                expectedHours: Number(draft.expectedHours),
                status: draft.status,
              }
            : g
        )
      );
      setEditingId(null);
    }
  }

  function handleDelete(id: string) {
    setGames((prev) => prev.filter((g) => g.id !== id));
  }

  function handleQuickStatusChange(id: string, newStatus: GameStatus) {
    setGames((prev) => prev.map((g) => (g.id === id ? { ...g, status: newStatus } : g)));
  }

  function getBadgeClass(status: GameStatus) {
    switch (status) {
      case "เล่นจบแล้ว":
        return "badge badge-completed";
      case "กำลังเล่น":
        return "badge badge-playing";
      default:
        return "badge badge-unstarted";
    }
  }

  const totalUnstartedHours = games
    .filter((g) => g.status === "ยังไม่เริ่ม")
    .reduce((sum, g) => sum + g.expectedHours, 0);

  const visibleGames = games.filter((g) => {
    const matchesSearch = g.title.toLowerCase().includes(keyword.trim().toLowerCase());
    const matchesStatus = statusFilter === "ทั้งหมด" || g.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const editingGame = games.find((g) => g.id === editingId);

  return (
    <div className="container games-shell">
      <div className="games-list-column">
        <div>
          {visibleGames.length === 0 ? (
            <p style={{ textAlign: "center", color: "#6b7280", padding: "20px" }}>
              ไม่พบรายการเกมที่ค้นหา {keyword ? `"${keyword}"` : ""}
            </p>
          ) : (
            visibleGames.map((game) => (
              <div key={game.id} className="game-card">
                <div className="game-header">
                  <div>
                    <h3 className="game-title">
                      <Link href={`/games/${game.id}`}>{game.title}</Link>
                    </h3>
                    <span className="game-info">
                      <img src="/games/gamepad.png" alt="Gamepad" style={{ width: "25px", height: "15px", marginRight: "1px" }} /> 
                      {game.platform} •
                      <img src="/games/cmini.png" alt="Mini Clock" style={{ width: "20px", height: "20px", marginRight: "1px" }} /> 
                      {game.expectedHours} ชม.
                    </span>
                  </div>
                  <span className={getBadgeClass(game.status)}>{game.status}</span>
                </div>

                <div className="actions-group">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleQuickStatusChange(game.id, "กำลังเล่น")}
                  >
                    <img src="/games/gameboy.png" alt="Play" style={{ width: "20px", height: "15px", marginRight: "1px" }} /> 
                    กำลังเล่น
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleQuickStatusChange(game.id, "เล่นจบแล้ว")}
                  >
                    <img src="/games/ok.png" alt="Ok" style={{ width: "15px", height: "15px", marginRight: "1px" }} /> 
                    เล่นจบแล้ว
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => setEditingId(game.id)}
                  >
                    <img src="/games/pen.png" alt="Edit" style={{ width: "20px", height: "15px", marginRight: "1px" }} /> 
                    แก้ไข
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(game.id)}
                  >
                    ✕ ลบ
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <aside className="games-side-column">
        <div className="summary-banner">
          <img src="/games/Coo.png" alt="Clock" style={{ width: "25px", height: "20px", marginRight: "1px" }} /> ชั่วโมงรวมเกมที่ยังไม่ได้เริ่ม: <strong>{totalUnstartedHours}</strong> ชั่วโมง
        </div>

        <div className="filter-container">
          <input
            className="input-search"
            placeholder="ค้นหาชื่อเกม..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <select
            className="select-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ทั้งหมด">สถานะทั้งหมด</option>
            <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
            <option value="กำลังเล่น">กำลังเล่น</option>
            <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
          </select>
        </div>

        <div className="form-card">
          <GameForm
            key={editingId ?? "new"}
            initialGame={editingGame}
            onSave={handleSave}
            onCancel={() => setEditingId(null)}
          />
        </div>
      </aside>
    </div>
  );
}