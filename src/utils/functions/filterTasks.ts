import { Task } from "../types/Task";

export const filterTasksByWord = (
  tasks: Task[],
  searchWord: string
): Task[] => {
  return tasks?.filter((task) => {
    const regexp = new RegExp(searchWord, "gi");
    return (
      task.title.match(regexp) ||
      task.randomNote.match(regexp) ||
      task.postContent.match(regexp) ||
      task.categories.some((category) => category.match(regexp))
    );
  });
};
export const filterTasksByDueDate = (
  tasks: Task[],
  dueDays: number
): Task[] => {
  return tasks.filter((task) => {
    const now = new Date();
    const dueDate = new Date(task.dueDate);
    const diff = dueDate.getTime() - now.getTime();
    //期限日を含めるため+1する。
    const diffDays = diff / (1000 * 60 * 60 * 24) + 1;

    //期限切れのタスクは対象外とする。
    return diffDays <= dueDays && diffDays >= 0;
  });
};
export const filterTasksByOverDue = (tasks: Task[]) => {
  return tasks.filter((task) => {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    //同日を期限切れとしないため昨日の日付を比較対象とする。
    const yesterday = new Date(today.setDate(today.getDate() - 1));

    return dueDate < yesterday;
  });
};

export const filterTasksByIsCompleted = (
  tasks: Task[],
  isCompletePage: boolean
) => {
  return tasks?.filter((task) => {
    console.log({ isCompletePage });
    return task.isCompleted === isCompletePage;
  });
};

export const filterTasksByUnderstandingRate = (
  tasks: Task[],
  rate: Task["understandingRate"]
) => {
  return tasks.filter((task) => task.understandingRate === rate);
};

export const filterTasksByCategory = (
  tasks: Task[],
  //fix:categorisの型を連想配列にすると↓は要変更。
  category: Task["categories"][number]
) => {
  return tasks.filter((task) => task.categories.includes(category));
};
