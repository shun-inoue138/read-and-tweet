import React from "react";
import TaskItem from "src/components/TaskItem";
import { completedTask, incompletedTask } from "src/utils/dummyData/tasks";

const index = () => {
  return (
    <div>
      <TaskItem {...incompletedTask} />
      <TaskItem {...completedTask} />
    </div>
  );
};

export default index;
