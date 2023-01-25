export type Task = {
  url: string;
  id: number;
  title: string;
  randomNote: string;
  categories: string[];
  postContent: string;
  understandingRate: 1 | 2 | 3 | 4 | 5;
  dueDate: string;
  isCompleted: boolean;
};
