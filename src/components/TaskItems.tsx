import React from "react";
import { useGetAllTasks } from "src/api/tasksAPI";
import {
  filterTasksByDueDate,
  filterTasksByIsCompleted,
  filterTasksByOverDue,
  filterTasksByUnderstandingRate,
  filterTasksByUpdatedAt,
  filterTasksByWord,
} from "src/utils/functions/filterTasks";
import { Category } from "src/utils/types/Category";

import useSWR from "swr";
import TaskItem from "./TaskItem";

const TaskItems = ({ commonPageProps, specificPageProps }) => {
  const { tasks, error, mutate, isLoading } = useGetAllTasks();
  const [filterCategories, setFilterCategories] = React.useState<{
    isFilter: boolean;
    selectedCategory: Category["name"];
  }>({ isFilter: false, selectedCategory: "" });

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error</div>;
  if (!tasks) return <div>no tasks</div>;

  let filteredTasks = filterTasksByIsCompleted(
    tasks,
    commonPageProps.isCompletePage
  );
  //updatedAtでソート
  filteredTasks = filterTasksByUpdatedAt(filteredTasks);
  filteredTasks = filterTasksByWord(filteredTasks, commonPageProps.searchWord);
  filteredTasks = filterTasksByCategory(
    filteredTasks,
    filterCategories.selectedCategory
  );
  //fix:ネスト解除したい
  if (!commonPageProps.isCompletePage) {
    if (specificPageProps.filterDueDays?.isFilter) {
      filteredTasks = filterTasksByDueDate(
        filteredTasks,
        specificPageProps.filterDueDays.days
      );
    }
    if (specificPageProps.isFilterByOverdue) {
      filteredTasks = filterTasksByOverDue(filteredTasks);
    }
  } else {
    if (specificPageProps.filterUnderstandingRate?.isFilter) {
      filteredTasks = filterTasksByUnderstandingRate(
        filteredTasks,
        specificPageProps.filterUnderstandingRate.rate
      );
    }
  }

  return (
    <div
      {filteredTasks?.map((task) => (
        <div key={task.id}>
          <TaskItem
            {...task}
            isCompletePage={commonPageProps.isCompletePage}
            filterCategories={filterCategories}
            setFilterCategories={setFilterCategories}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskItems;
