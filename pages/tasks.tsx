import React from "react";
import Header from "src/components/Header";
import TaskItems from "src/components/TaskItems";
import TasksCommon from "src/components/TasksCommon";

const Tasks = () => {
  const [filterDueDays, setFilterDueDays] = React.useState({
    isFilter: false,
    days: 0,
  });
  const [isFilterByOverdue, setIsFilterByOverdue] = React.useState(false);
  const inCompletePageProps = {
    setFilterDueDays,
    filterDueDays,
    setIsFilterByOverdue,
    isFilterByOverdue,
  };
  return (
    <TasksCommon
      isCompletePage={false}
      inCompletePageProps={inCompletePageProps}
    />
  );
};

export default Tasks;
