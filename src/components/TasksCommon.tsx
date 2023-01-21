import React from "react";
import Header from "./Header";
import TaskItems from "./TaskItems";

const TasksCommon = ({ isCompletePage }: { isCompletePage: boolean }) => {
  const [searchWord, setSearchWord] = React.useState("");
  const [filterDueDays, setFilterDueDays] = React.useState({
    isFilter: false,
    days: 0,
  });
  const [isFilterByOverdue, setIsFilterByOverdue] = React.useState(false);
  const bgColor = isCompletePage ? "bg-blue-100" : "bg-orange-100";
  return (
    <div className={bgColor}>
      <Header
        searchWord={searchWord}
        setSearchWord={setSearchWord}
        setFilterDueDays={setFilterDueDays}
        filterDueDays={filterDueDays}
        isFilterByOverdue={isFilterByOverdue}
        setIsFilterByOverdue={setIsFilterByOverdue}
      />
      <TaskItems
        searchWord={searchWord}
        filterDueDays={filterDueDays}
        isFilterByOverdue={isFilterByOverdue}
        isCompletePage={isCompletePage}
      />
    </div>
  );
};

export default TasksCommon;
