import { useRouter } from "next/router";
import React, { FC } from "react";
import { deleteTask, useGetAllTasks } from "src/api/tasksAPI";
import { useModal } from "src/hooks/useModal";
import { CompletedTask, IncompletedTask } from "src/utils/types/Task";
import Button from "./Button";
import Card from "./Card";
import TweetTextArea from "./TweetTextArea";
import UnderstandingRateStars from "./UnderstandingRateStars";

const TaskItem: FC<IncompletedTask | CompletedTask> = (props) => {
  //props.isCompletedの値により異なるjsxを返す
  //todo:共通部分のコンポーネント化(TaskItemBase)
  const { mutate } = useGetAllTasks();
  const router = useRouter();
  const { MyModal, openModal, closeModal } = useModal();
  const TweetTextAreaEL = React.useRef<HTMLTextAreaElement>(null);
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

          <div className="mt-2 flex gap-2">
            <Button
              buttonColor="red"
              onClick={() => {
                deleteTask(id).then(() => mutate());
              }}
            >
              削除
            </Button>
            <Button
              buttonColor="green"
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
            </Button>
            <Button
              buttonColor="blue"
              className="ml-auto"
              onClick={() => {
                openModal();
              }}
            >
              save and tweet
            </Button>
          </div>
        </Card>
        <MyModal>
          <TweetTextArea ref={TweetTextAreaEL}>{postContent}</TweetTextArea>
          <UnderstandingRateStars />
          <div className="flex justify-end">
            <Button
              buttonColor="blue"
              // todo:140字以上はdisabledにする
              onClick={() => {
                console.log(TweetTextAreaEL.current?.value.length);
              }}
            >
              投稿する
            </Button>
          </div>
        </MyModal>
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
