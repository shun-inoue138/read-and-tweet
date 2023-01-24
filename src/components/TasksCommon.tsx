import React, { FC } from "react";
import { Task } from "src/utils/types/Task";
import Header from "./Header";
import TaskItems from "./TaskItems";

type CompletePageProps = {
  filterUnderstandingRate: {
    isFilter: boolean;
    rate: Task["understandingRate"];
  };
  setFilterUnderstandingRate: React.Dispatch<
    React.SetStateAction<CompletePageProps["filterUnderstandingRate"]>
  >;
};
type InCompletePageProps = {
  filterDueDays: {
    isFilter: boolean;
    days: number;
  };
  setFilterDueDays: React.Dispatch<
    React.SetStateAction<InCompletePageProps["filterDueDays"]>
  >;
  setIsFilterByOverdue: React.Dispatch<
    React.SetStateAction<InCompletePageProps["isFilterByOverdue"]>
  >;
  isFilterByOverdue: boolean;
};
type TasksCommonProps = { isCompletePage: boolean } & {
  //fix:このままだと両方渡せてしまう。
  inCompletePageProps?: InCompletePageProps;
  completePageProps?: CompletePageProps;
};

const TasksCommon: FC<TasksCommonProps> = ({
  isCompletePage,
  inCompletePageProps,
  completePageProps,
}) => {
  const [searchWord, setSearchWord] = React.useState("");
  //todo:ここにカテゴリソート用のstateを追加する

  const bgColor = isCompletePage ? "bg-blue-100" : "bg-orange-100";
  return (
    <div className={bgColor}>
      <Header
        commonPageProps={{ searchWord, setSearchWord, isCompletePage }}
        specificPageProps={
          isCompletePage ? completePageProps : inCompletePageProps
        }
      />
      <TaskItems
        commonPageProps={{ searchWord, isCompletePage }}
        specificPageProps={
          //fix:TaskItems内で使用しないpropsを渡している
          isCompletePage ? completePageProps : inCompletePageProps
        }
      />
    </div>
  );
};

export default TasksCommon;
