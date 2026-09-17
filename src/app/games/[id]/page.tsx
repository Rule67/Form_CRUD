"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getStoredGames, initialGames } from "@/data/games";
import "../games.css";
import type { Game } from "@/types/games";

export default function GameDetailsPage() {
  const params = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const games = getStoredGames();
    const found = games.find((item) => item.id === params.id) ?? initialGames.find((item) => item.id === params.id) ?? null;
    setGame(found);
    setIsReady(true);
  }, [params.id]);

  if (!isReady) {
    return <main className="font-pixel game-details"><p>Loading...</p></main>;
  }

  if (!game) {
    return (
      <main className="font-pixel game-details">
        <Link href="/games" className="back-link">ย้อนกลับไปยังรายการเกม</Link>
        <h1>ไม่พบเกมนี้</h1>
      </main>
    );
  }

  return (
    <main className="font-pixel game-details">
      <Link href="/games" className="back-link">ย้อนกลับไปยังรายการเกม</Link>
      <h1>{game.title}</h1>
      <p><strong>แพลตฟอร์ม:</strong> {game.platform}</p>
      <p><strong>เวลาที่คาดว่าจะใช้:</strong> {game.expectedHours} ชั่วโมง</p>
      <p><strong>สถานะ:</strong> {game.status}</p>
    </main>
  );
}