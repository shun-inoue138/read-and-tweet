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
