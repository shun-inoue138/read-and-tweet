import React from "react";
import { useGetAllTasks } from "src/api/tasksAPI";
import {
  filterTasksByDueDate,
  filterTasksByWord,
} from "src/utils/functions/filterTasks";

import useSWR from "swr";
import TaskItem from "./TaskItem";

const TaskItems = ({ searchWord, filterDueDays }) => {
  const { tasks, error, mutate, isLoading } = useGetAllTasks();
  let filteredTasks = filterTasksByWord(tasks, searchWord);
  if (filterDueDays) {
    filteredTasks = filterTasksByDueDate(filteredTasks, filterDueDays);
  }

  return (
    <div>
      {isLoading && <p>loading...</p>}
      {error && <p>error</p>}
      {filteredTasks?.map((task) => (
        <div key={task.id}>
          <TaskItem {...task} />
        </div>
      ))}
    </div>
  );
};
export default TaskItems;
