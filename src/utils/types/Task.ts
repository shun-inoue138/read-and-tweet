type BaseTask = {
  id: number;
  title: string;
  randomNote: string;
  categories: string[];
  postContent: string;
};

export type IncompletedTask = BaseTask & {
  dueDate: string;
  isCompleted: false;
};

export type CompletedTask = BaseTask & {
  understandingRate: 1 | 2 | 3 | 4 | 5;
  passedTime: number;
  isCompleted: true;
};

export type Task = IncompletedTask | CompletedTask;

const task: Task = {
  id: 1,
  title: "タイトル",
  randomNote: "雑記",
  dueDate: "2021-08-01",
  categories: ["カテゴリー"],
  postContent: "ツイート内容",
  isCompleted: false,
};
