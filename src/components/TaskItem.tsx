import { useRouter } from "next/router";
import React, { FC } from "react";
import { deleteTask, useGetAllTasks } from "src/api/tasksAPI";
import { CompletedTask, IncompletedTask } from "src/utils/types/Task";
import Card from "./Card";

const TaskItem: FC<IncompletedTask | CompletedTask> = (props) => {
  //props.isCompletedの値により異なるjsxを返す
  //todo:共通部分のコンポーネント化(TaskItemBase)
  const { mutate } = useGetAllTasks();
  const router = useRouter();
  if (!props.isCompleted) {
    const { url, id, title, randomNote, dueDate, postContent, categories } =
      props;
    console.log({ categories });

    return (
      <section>
        未完了
        <Card>
          <a href={url}>{url}</a>
          <h2>{title}</h2>

          <p>{randomNote}</p>

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
        <button
          onClick={() => {
            router.push(
              {
                pathname: `/tasks/${id}/edit`,
                // query: {
                //   id,
                // },
              }
              // `/tasks/${id}/edit`
            );
          }}
        >
          編集
        </button>
      </section>
    );
  } else {
    const {
      url,
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
