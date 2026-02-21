export interface GamePlayer {
  id: string;
  user?: {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
  } | null;
}

export interface Game {
  id: string;
  date: string | Date;
  startIndex: number;
  endIndex: number;
  players?: GamePlayer[];
}
