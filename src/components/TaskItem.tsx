import { useRouter } from "next/router";
import React, { FC } from "react";
import { completeTask, deleteTask, useGetAllTasks } from "src/api/tasksAPI";
import { useModal } from "src/hooks/useModal";
import { myToast } from "src/utils/functions/toastWrapper";
import { CompletedTask, IncompletedTask, Task } from "src/utils/types/Task";
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
  const [understandingRate, setUnderstandingRate] =
    React.useState<Task["understandingRate"]>(1);

  const { url, id, title, randomNote, dueDate, postContent, categories } =
    props;
  console.log({ categories });

  return (
    <section>
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
        <UnderstandingRateStars
          understandingRate={understandingRate}
          setUnderstandingRate={setUnderstandingRate}
        />
        <div className="flex justify-end">
          <Button
            buttonColor="blue"
            onClick={() => {
              if (!TweetTextAreaEL.current?.value.length) {
                myToast("ツイート内容を入力してください", "error");
                return;
              } else if (TweetTextAreaEL.current?.value.length > 140) {
                myToast("ツイート内容は140文字以内で入力してください", "error");
                return;
              }
              completeTask(id, {
                ...props,
                understandingRate,
                isCompleted: true,
                postContent: TweetTextAreaEL.current?.value,
              });

              closeModal();
              myToast("保存されました。", "success");
              mutate();
            }}
          >
            投稿する
          </Button>
        </div>
      </MyModal>
    </section>
  );
};

export default TaskItem;
