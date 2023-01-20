import React from "react";
import { createTask, editTask } from "src/api/tasksAPI";
import { getAfter7Days } from "src/utils/functions/getAfter7Days";
import { myToast } from "src/utils/functions/toastWrapper";

const TaskForm = (props) => {
  const {
    URL,
    title,
    randomNote,
    dueDate,
    postContent,
    id,
    handleSubmit,
    router,
    register,
    categoryList,
    append,
    remove,
    fields,
    openModal,
    formType,
  } = props;
  console.log({ dueDate });

  const onSubmit = (data) => {
    if (formType === "edit") {
      editTask(id, data)
        .then(() => {
          router.push("/tasks");
          myToast("タスクを編集しました", "success");
        })
        .catch((error) => {
          console.log(error);
          myToast("タスクの編集に失敗しました", "error");
        });
    } else if (formType === "create") {
      createTask(data)
        .then(() => {
          router.push("/tasks");
          myToast("タスクを作成しました", "success");
        })
        .catch((error) => {
          console.log(error);
          myToast("タスクの作成に失敗しました", "error");
        });
    }
  };

  return (
    <form>
      <input
        placeholder={URL.placeholder}
        type={URL.type}
        {...URL.registerReturn}
        defaultValue={URL.defaultValue}
      />
      {URL.errors && <p>{URL.errors}</p>}
      <input
        placeholder={title.placeholder}
        type={title.type}
        {...title.registerReturn}
        defaultValue={title.defaultValue}
      />
      {title.errors && <p>{title.errors}</p>}
      <textarea
        placeholder={randomNote.placeholder}
        {...randomNote.registerReturn}
        defaultValue={randomNote.defaultValue}
      />
      <input
        type="date"
        {...dueDate.registerReturn}
        //fixme
        defaultValue={
          dueDate.defaultValue ? dueDate.defaultValue : getAfter7Days()
        }
      />
      <textarea
        placeholder={postContent.placeholder}
        {...postContent.registerReturn}
        defaultValue={postContent.defaultValue}
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

      <button onClick={handleSubmit(onSubmit)}>完了</button>
    </form>
  );
};

export default TaskForm;
