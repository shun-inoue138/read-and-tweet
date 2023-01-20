import React from "react";
import Header from "src/components/Header";
import TaskItem from "src/components/TaskItem";
import TaskItems from "src/components/TaskItems";
import { completedTask, incompletedTask } from "src/utils/dummyData/tasks";

const Tasks = () => {
  const [searchWord, setSearchWord] = React.useState("");
  const [filterDueDays, setFilterDueDays] = React.useState(0);
  const [isFilterByOverdue, setIsFilterByOverdue] = React.useState(false);
  return (
    <div>
      <Header
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        setFilterDueDays={setFilterDueDays}
        isFilterByOverdue={isFilterByOverdue}
        setIsFilterByOverdue={setIsFilterByOverdue}
      />
      <TaskItems
        searchWord={searchWord}
        filterDueDays={filterDueDays}
        isFilterByOverdue={isFilterByOverdue}
      />
    </div>
  );
};

export default Tasks;
