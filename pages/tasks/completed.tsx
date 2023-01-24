import React, { useState } from "react";
import Header from "src/components/Header";
import TaskItems from "src/components/TaskItems";
import TasksCommon from "src/components/TasksCommon";
import { Task } from "src/utils/types/Task";

const Completed = () => {
  //todo:理解度ソート用のstateを追加する
  const [filterUnderstandingRate, setFilterUnderstandingRate] = useState<{
    isFilter: boolean;
    rate: Task["understandingRate"];
  }>({
    isFilter: false,
    rate: 1,
  });
  const completePageProps = {
    filterUnderstandingRate,
    setFilterUnderstandingRate,
  };
  return (
    <TasksCommon isCompletePage={true} completePageProps={completePageProps} />
  );
};

export default Completed;
