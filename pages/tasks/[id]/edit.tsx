import { useRouter } from "next/router";
import React from "react";
import { editTask, useGetTask } from "src/api/tasksAPI";
import { useTaskEditForm } from "src/hooks/useTaskEditForm";
import { IncompletedTask, Task } from "src/utils/types/Task";

const edit = () => {
  const router = useRouter();

  const { id: stringId } = router.query;
  const id = Number(stringId);
  const { task, isLoading, error } = useGetTask(id);

  const { register, handleSubmit, getValues, reset, errors } =
    useTaskEditForm(task);
  if (isLoading) {
    return <p>loading...</p>;
  } else if (error) {
    return <p>error</p>;
  } else if (!task) {
    return <p>task not found</p>;
  }
  return (
    <div>
      <form>
        <input
          type="text"
          {...register("title", {
            required: "タイトルは必須です",
          })}
          defaultValue={task.title}
        />
        {errors.title && <p>{errors.title.message}</p>}
        <textarea {...register("randomNote")} defaultValue={task.randomNote} />
        <input
          type="date"
          {...register("dueDate")}
          //fixme
          defaultValue={(task as IncompletedTask).dueDate}
        />
        <textarea
          {...register("postContent")}
          defaultValue={task.postContent}
        />

        <button
          //エラー対応
          onClick={handleSubmit((data) => {
            console.log(data);
            editTask(id, data)
              .then(() => {
                reset(data);
                router.push("/");
              })
              .catch((error) => {
                console.log(error);
              });
          })}
        >
          完了
        </button>
      </form>
    </div>
  );
};

export default edit;
