type BaseTask = {
  url: string;
  id: number;
  title: string;
  randomNote: string;
  categories: string[];
  postContent: string;
  understandingRate: 1 | 2 | 3 | 4 | 5;
};

export type IncompletedTask = BaseTask & {
  dueDate: string;
  isCompleted: false;
};

export type CompletedTask = BaseTask & {
  // passedTime: number;
  isCompleted: true;
};

export type Task = IncompletedTask | CompletedTask;
