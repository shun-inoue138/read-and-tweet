import React from "react";
import TaskItem from "src/components/TaskItem";
import TaskItems from "src/components/TaskItems";
import { completedTask, incompletedTask } from "src/utils/dummyData/tasks";

const index = () => {
  return (
    <div>
      <TaskItems />
    </div>
  );
};

export default index;
