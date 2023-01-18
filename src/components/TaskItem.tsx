import React, { FC } from "react";
import { CompletedTask, IncompletedTask } from "src/utils/types/Task";
import Card from "./Card";

const TaskItem: FC<IncompletedTask | CompletedTask> = (props) => {
  //props.isCompletedの値により異なるjsxを返す
  //todo:共通部分のコンポーネント化(TaskItemBase)
  if (!props.isCompleted) {
    const { title, randomNote, dueDate, postContent, categories } = props;
    return (
      <section>
        未完了
        <Card>
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
