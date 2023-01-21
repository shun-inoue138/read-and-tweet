import React from "react";
import Header from "src/components/Header";
import TaskItems from "src/components/TaskItems";
import TasksCommon from "src/components/TasksCommon";

const Completed = () => {
  return <TasksCommon isCompletePage={true} />;
};

export default Completed;
