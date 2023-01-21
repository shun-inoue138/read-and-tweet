import React from "react";
import Header from "src/components/Header";
import TaskItems from "src/components/TaskItems";

const Tasks = () => {
  const [searchWord, setSearchWord] = React.useState("");
  const [filterDueDays, setFilterDueDays] = React.useState({
    isFilter: false,
    days: 0,
  });
  const [isFilterByOverdue, setIsFilterByOverdue] = React.useState(false);
  return (
    <div>
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
        isCompletePage={false}
      />
    </div>
  );
};

export default Tasks;
