import React from "react";
import Header from "src/components/Header";
import TaskItem from "src/components/TaskItem";
import TaskItems from "src/components/TaskItems";
import { completedTask, incompletedTask } from "src/utils/dummyData/tasks";

const Tasks = () => {
  const [searchWord, setSearchWord] = React.useState("");
  const [filterDueDays, setFilterDueDays] = React.useState(0);
  return (
    <div>
      <Header
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        setFilterDueDays={setFilterDueDays}
      />
      <TaskItems searchWord={searchWord} filterDueDays={filterDueDays} />
    </div>
  );
};

export default Tasks;
