import type { Game } from "@/types/games";

export const GAME_STORAGE_KEY = "game-backlog";

export const initialGames: Game[] = [
  {
    id: "g1",
    title: "Elden Ring",
    platform: "PC",
    expectedHours: 80,
    status: "เล่นจบแล้ว",
  },
  {
    id: "g2",
    title: "Zelda: Tears of the Kingdom",
    platform: "Nintendo Switch",
    expectedHours: 100,
    status: "กำลังเล่น",
  },
  {
    id: "g3",
    title: "Final Fantasy VII Rebirth",
    platform: "PS5",
    expectedHours: 60,
    status: "ยังไม่เริ่ม",
  },
  {
    id: "g4",
    title: "Cyberpunk 2077",
    platform: "PC",
    expectedHours: 50,
    status: "เล่นจบแล้ว",
  },
  {
    id: "g5",
    title: "Hollow Knight- Silksong",
    platform: "PC",
    expectedHours: 30,
    status: "ยังไม่เริ่ม",
  },
];

export function getStoredGames(): Game[] {
  if (typeof window === "undefined") return initialGames;

  try {
    const stored = window.localStorage.getItem(GAME_STORAGE_KEY);
    if (!stored) return initialGames;

    const parsed = JSON.parse(stored) as Game[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialGames;
  } catch {
    return initialGames;
  }
}

export function saveGamesToStorage(games: Game[]) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(GAME_STORAGE_KEY, JSON.stringify(games));
}