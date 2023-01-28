import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import {
  completeTask,
  deleteTask,
  undoCompleteTask,
  useGetAllTasks,
} from "src/api/tasksAPI";
import { useConfirmationModal } from "src/hooks/useConfirmation";
import { useModal } from "src/hooks/useModal";
import { convertToHtmlDateInput } from "src/utils/functions/convertToHtmlDateInput";
import { myToast } from "src/utils/functions/toastWrapper";
import { Task } from "src/utils/types/Task";
import FilledButton from "./Button/FilledButton";
import Card from "./Card";
import TweetTextArea from "./TweetTextArea";
import UnderstandingRateStars from "./UnderstandingRateStars";

const TaskItemBase: FC<Task & { isCompletePage?: boolean }> = ({
  isCompletePage = false,
  //fix:なぜtasks？taskであるべき
  ...task
}) => {
  const { mutate } = useGetAllTasks();
  const router = useRouter();
  const { MyModal, openModal, closeModal } = useModal();
  const [understandingRate, setUnderstandingRate] = React.useState<
    Task["understandingRate"]
  >(task.understandingRate || 1);

  const {
    url,
    _id: id,
    title,
    randomNote,
    dueDate,
    postContent,
    categories,
  } = task;
  const editpageURL = isCompletePage
    ? `/tasks/completed/${id}/edit`
    : `/tasks/${id}/edit`;
  console.log(task);

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
        {isCompletePage ? (
          <div className="flex gap-2 items-center">
            <span>理解度</span>

            <UnderstandingRateStars understandingRate={understandingRate} />
          </div>
        ) : (
          //fix?
          <span>{convertToHtmlDateInput(dueDate)}</span>
        )}

        <p>{postContent}</p>
        <ul>
          {categories?.map((category) => (
            <li key={category}>{category}</li>
          ))}
        </ul>

        <div className="mt-2 flex gap-2">
          <FilledButton buttonColor="red" onClick={onDeleteHandler}>
            削除
          </FilledButton>
          <FilledButton
            buttonColor="green"
            onClick={() => {
              router.push({
                pathname: editpageURL,
              });
            }}
          >
            編集
          </FilledButton>
          {isCompletePage ? (
            <FilledButton
              buttonColor="blue"
              className="ml-auto"
              onClick={async () => {
                openConfirmationModal();
                const ret = await new Promise<string>((resolve) => {
                  setModalConfig({
                    onClose: resolve,
                    question: "本当に戻しますか？",
                  });
                });
                setModalConfig(undefined);
                console.log(ret);
                if (ret === "yes") {
                  await undoCompleteTask(id, task);
                  mutate();
                  myToast("未完了に戻しました。", "success");
                }
              }}
            >
              未完了に戻す
            </FilledButton>
          ) : (
            <FilledButton
              buttonColor="blue"
              className="ml-auto"
              onClick={() => {
                openModal();
              }}
            >
              save and tweet
            </FilledButton>
          )}
        </div>
      </Card>
      <MyModal>
        <UnderstandingRateStars
          understandingRate={understandingRate}
          setUnderstandingRate={setUnderstandingRate}
        />
        <div className="flex justify-end">
          <FilledButton
            buttonColor="blue"
            onClick={() => {
              completeTask(id, {
                ...task,
                understandingRate,
                isCompleted: true,
              });

              closeModal();
              myToast("保存されました。", "success");
              mutate();
            }}
          >
            投稿する
          </FilledButton>
        </div>
      </MyModal>
      <Confirmation {...modalConfig} />
    </section>
  );
};

export default TaskItemBase;
