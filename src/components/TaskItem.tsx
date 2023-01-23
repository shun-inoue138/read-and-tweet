import React, { FC } from "react";
import { Task } from "src/utils/types/Task";
import TaskItemBase from "./TaskItemBase";

const TaskItem: FC<Task> = (props) => {
  console.log("TaskItem");
  return <TaskItemBase {...props} />;
};

export default TaskItem;
