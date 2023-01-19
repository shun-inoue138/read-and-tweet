import { useRouter } from "next/router";
import React from "react";
import { editTask, useGetTask } from "src/api/tasksAPI";
import { useTaskEditForm } from "src/hooks/useTaskEditForm";
import { IncompletedTask, Task } from "src/utils/types/Task";
import { myToast } from "src/utils/functions/toastWrapper";
import { useFieldArray, useForm, Controller } from "react-hook-form";

const edit = () => {
  const router = useRouter();
  const { id: stringId } = router.query;
  const id = Number(stringId);

  // const {
  //   register,
  //   handleSubmit,
  //   getValues,
  //   reset,
  //   errors,
  //   control,
  //   //fix:pageを再起動するとfieldsが空になる

  //   // = task?.categories.map((category) => ({ id: category })),
  // } = useTaskEditForm(task);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<Task>({
    mode: "onChange",
    reValidateMode: "onChange",
    // defaultValues: task,
  });
  const { task, isLoading, error } = useGetTask(id, reset);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });
  console.log({ fields });

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
          {...register("url", {
            required: "URLは必須です",
          })}
          defaultValue={task.url}
        />
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
        <ul className="flex gap-2">
          {task.categories?.map((category) => (
            <li key={category} className="text-xs bg-black text-white p-2">
              {category}
            </li>
          ))}
        </ul>
        <ul>
          {fields.map((field, index) => (
            <li key={field.id}>
              <input
                type="text"
                {...register(`categories.${index}` as const)}
                defaultValue={field.id}
              />
            </li>
          ))}
        </ul>
        <button
          onClick={(e) => {
            e.preventDefault();
            append("");
          }}
        >
          追加
        </button>

        <button
          onClick={handleSubmit((data) => {
            console.log({ data });

            editTask(id, data)
              .then(() => {
                reset(data);
                router.push("/");
                myToast("タスクを編集しました", "success");
              })
              .catch((error) => {
                console.log(error);
                myToast("タスクの編集に失敗しました", "error");
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
