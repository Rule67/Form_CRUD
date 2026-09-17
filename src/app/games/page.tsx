import { initialGames } from "@/data/games";
import "./games.css";
import GameExplorer from "@/components/GameExplorer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game Backlog",
};

export default function GamesPage() {
  return (
    <main className="games-page-wrapper">
      <h1>Game Backlog</h1>
      <GameExplorer initialGames={initialGames} />
    </main>
  );
}