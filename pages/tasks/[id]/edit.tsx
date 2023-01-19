import { useRouter } from "next/router";
import React from "react";
import {
  createCategory,
  editTask,
  useGetCategoryList,
  useGetTask,
} from "src/api/tasksAPI";
import { useTaskEditForm } from "src/hooks/useTaskEditForm";
import { IncompletedTask, Task } from "src/utils/types/Task";
import { myToast } from "src/utils/functions/toastWrapper";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { useModal } from "src/hooks/useModal";
import { mutate } from "swr";

const edit = () => {
  const router = useRouter();
  const { id: stringId } = router.query;
  const id = Number(stringId);
  const {
    register,
    handleSubmit,
    errors,
    append,
    remove,
    task,
    isLoading,
    error,
    fields,
  } = useTaskEditForm(id);
  const { categoryList, mutate } = useGetCategoryList();

  const { MyModal, openModal, closeModal } = useModal();

  const categoryInputRef = React.useRef<HTMLInputElement>(null);

  if (isLoading) {
    return <p>loading...</p>;
  } else if (error) {
    return <p>error</p>;
  } else if (!task) {
    return <p>task not found</p>;
  }
  return (
    <div>
      {/* todo:formの中身をコンポーネント化する。 */}
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

        <ul>
          {fields.map((field, index) => {
            //<select>のdefaultValueを取得するために、fieldを変形。
            const fieldValues = Object.values(field);
            fieldValues.pop();
            const defaultValue = fieldValues.join("");

            return (
              <li key={field.id}>
                <select
                  defaultValue={defaultValue}
                  {...register(`categories.${index}` as const)}
                >
                  <option value="">選択してください</option>
                  {categoryList?.map((item) => {
                    return (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    remove(index);
                  }}
                >
                  削除
                </button>
              </li>
            );
          })}
        </ul>

        <button
          onClick={(e) => {
            e.preventDefault();
            append({ name: "" });
          }}
        >
          カテゴリーを増やす
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            openModal();
          }}
        >
          新規カテゴリーを追加
        </button>

        <button
          onClick={handleSubmit((data) => {
            console.log({ data });

            editTask(id, data)
              .then(() => {
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
      <MyModal>
        <div>
          <input ref={categoryInputRef} type="text" />
          <button
            onClick={() => {
              const categoryName = categoryInputRef.current?.value as string;
              categoryName &&
                createCategory(categoryName)
                  .then(() => {
                    myToast("カテゴリーを追加しました", "success");
                    closeModal();
                    mutate();
                  })
                  .catch((error) => {
                    console.log(error);
                    myToast("カテゴリーの追加に失敗しました", "error");
                  });
            }}
          >
            追加
          </button>
        </div>
      </MyModal>
    </div>
  );
};

export default edit;
