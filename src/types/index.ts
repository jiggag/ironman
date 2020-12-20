export interface NoteData {
  id: number;
  date: number;
  title: string;
  state: number;
  weather: number;
  food: Record<number, string>;
  done: Record<number, string>;
  etc: string;
}

export interface VocData {
  title: string;
  content: string;
  create_date: number;
  id: number;
  user_id: number;
}
