import React, { FC } from "react";
import { deleteTask, useGetAllTasks } from "src/api/tasksAPI";
import { CompletedTask, IncompletedTask } from "src/utils/types/Task";
import Card from "./Card";

const TaskItem: FC<IncompletedTask | CompletedTask> = (props) => {
  //props.isCompletedの値により異なるjsxを返す
  //todo:共通部分のコンポーネント化(TaskItemBase)
  const { mutate } = useGetAllTasks();
  if (!props.isCompleted) {
    const { id, title, randomNote, dueDate, postContent, categories } = props;
    return (
      <section>
        未完了
        <Card>
          <h2>{title}</h2>
          <div className="flex gap-3">
            <p>{randomNote}</p>
            <button>編集</button>
          </div>
          <span>{dueDate}</span>
          <p>{postContent}</p>
          <ul>
            {categories?.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
        </Card>
        <button
          className="bg-red-500 text-white p-4"
          onClick={() => {
            deleteTask(id).then(() => mutate());
          }}
        >
          削除
        </button>
      </section>
    );
  } else {
    const {
      title,
      randomNote,
      postContent,
      categories,
      passedTime,
      understandingRate,
    } = props;
    return (
      <section>
        完了
        <Card>
          <h2>{title}</h2>
          <p>{randomNote}</p>
          <p>{postContent}</p>
          <span>{passedTime}</span>
          <span>{understandingRate}</span>
          <ul>
            {categories?.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
        </Card>
      </section>
    );
  }
};

export default TaskItem;
