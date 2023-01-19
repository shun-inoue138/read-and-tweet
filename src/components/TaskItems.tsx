import React from "react";
import { useGetAllTasks } from "src/api/tasksAPI";
import { filterTasksByWord } from "src/utils/functions/filterTasksByWord";

import useSWR from "swr";
import TaskItem from "./TaskItem";

const TaskItems = ({ searchWord }) => {
  const { tasks, error, mutate, isLoading } = useGetAllTasks();
  const filteredTasks = filterTasksByWord(tasks, searchWord);

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
