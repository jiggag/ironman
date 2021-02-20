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

export interface RootReducer {
  note: NoteReducer;
  user: UserReducer;
  voc: VocReducer;
}

export interface NoteReducer {
  isLoading: boolean;
  page: number;
  limit: number;
  list: NoteData[];
  graph: number[];
  note: NoteData & {
    stateText: string;
    weatherText: string;
  };
}
export interface UserReducer {
  isLoading: boolean;
  auth: string;
}
export interface VocReducer {
  isLoading: boolean;
  list: VocData[];
}
