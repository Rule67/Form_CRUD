export type Course = {
  id?: number | string;
  code: string;
  name: string;
  credit: number;
  instructor: string;
};

export type Member = {
  id: number;
  name: string;
  image: string;
};

export type Band = {
  id: number;
  name: string;
  genre: string;
  hitSong: string;
  history: string;
  coverImage: string;
  members: Member[];
};