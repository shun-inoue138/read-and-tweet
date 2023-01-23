import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { completeTask, deleteTask, useGetAllTasks } from "src/api/tasksAPI";
import { useConfirmationModal } from "src/hooks/useConfirmation";
import { useModal } from "src/hooks/useModal";
import { myToast } from "src/utils/functions/toastWrapper";
import { Task } from "src/utils/types/Task";
import Button from "./Button";
import Card from "./Card";
import TweetTextArea from "./TweetTextArea";
import UnderstandingRateStars from "./UnderstandingRateStars";

const TaskItemBase: FC<Task & { isCompletePage?: boolean }> = ({
  isCompletePage = false,
  //fix:なぜtasks？taskであるべき
  ...tasks
}) => {
  const { mutate } = useGetAllTasks();
  const router = useRouter();
  const { MyModal, openModal, closeModal } = useModal();
  const TweetTextAreaEL = React.useRef<HTMLTextAreaElement>(null);
  const [understandingRate, setUnderstandingRate] =
    React.useState<Task["understandingRate"]>(1);

  const { url, id, title, randomNote, dueDate, postContent, categories } =
    tasks;
  const editpageURL = isCompletePage
    ? `/tasks/completed/${id}/edit`
    : `/tasks/${id}/edit`;
  const { Confirmation, openConfirmationModal, modalConfig, setModalConfig } =
    useConfirmationModal();

  const onDeleteHandler = async () => {
    openConfirmationModal();
    const ret = await new Promise<string>((resolve) => {
      setModalConfig({
        onClose: resolve,
        question: "本当に削除しますか？",
      });
    });
    setModalConfig(undefined);
    console.log(ret);
    if (ret === "yes") {
      console.log("ok is selected");

      await deleteTask(id);
      mutate();
      myToast("削除されました。", "success");
    }
  };

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
          <Button buttonColor="red" onClick={onDeleteHandler}>
            削除
          </Button>
          <Button
            buttonColor="green"
            onClick={() => {
              router.push({
                pathname: editpageURL,
              });
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
                ...tasks,
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
      <Confirmation {...modalConfig} />
    </section>
  );
};

export default TaskItemBase;
