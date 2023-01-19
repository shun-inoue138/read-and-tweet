import React from "react";
import Header from "src/components/Header";
import TaskItem from "src/components/TaskItem";
import TaskItems from "src/components/TaskItems";
import { completedTask, incompletedTask } from "src/utils/dummyData/tasks";

const Tasks = () => {
  const [searchWord, setSearchWord] = React.useState("");
  return (
    <div>
      <Header searchWord={searchWord} setSearchWord={setSearchWord} />
      <TaskItems searchWord={searchWord} />
    </div>
  );
};

export default Tasks;
