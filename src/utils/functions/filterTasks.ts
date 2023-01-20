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
    const diffDays = diff / (1000 * 60 * 60 * 24);
    console.log(diffDays);

    return diffDays <= dueDays;
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
