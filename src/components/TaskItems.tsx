import React from "react";
import { useGetAllTasks } from "src/api/tasksAPI";

import useSWR from "swr";
import TaskItem from "./TaskItem";

const TaskItems = () => {
  const { tasks, error, mutate, isLoading } = useGetAllTasks();

  return (
    <div>
      {isLoading && <p>loading...</p>}
      {error && <p>error</p>}
      {tasks?.map((task) => (
        <div key={task.id}>
          <TaskItem {...task} />
        </div>
      ))}
    </div>
  );
};
export default TaskItems;
