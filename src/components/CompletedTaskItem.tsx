import React, { FC } from "react";
import { Task } from "src/utils/types/Task";
import TaskItemBase from "./TaskItemBase";

const CompletedTaskItem: FC<Task> = (props) => {
  console.log("CompletedTaskItem");

  return <TaskItemBase {...props} isCompletePage />;
};

export default CompletedTaskItem;
