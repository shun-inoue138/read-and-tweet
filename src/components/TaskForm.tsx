import React from "react";
import { editTask, useCreateTask, useGetAllTasks } from "src/api/tasksAPI";
import { convertToHtmlDateInput } from "src/utils/functions/convertToHtmlDateInput";
import { getOneWeekAfterDay } from "src/utils/functions/getAfter7Days";
import { getFormattedDatebyYmd } from "src/utils/functions/getFormattedDate";
import { myToast } from "src/utils/functions/toastWrapper";
import UnderstandingRateStars from "./UnderstandingRateStars";

//todo:全体的に要リファクタリング
const TaskForm = (props) => {
  const { createTask } = useCreateTask();
  const {
    URL,
    title,
    randomNote,
    dueDate,
    understandingRate,
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
    isCompletePage,
  } = props;

  //edit及びcreate完了直後にrevalidateするため
  const { mutate } = useGetAllTasks();

  const onSubmit = async (data) => {
    if (formType === "edit") {
      try {
        await editTask(id, data);
        await mutate();
        const url = isCompletePage ? "/tasks/completed" : "/tasks";
        router.push(url);
        myToast("タスクを編集しました", "success");
      } catch (error) {
        console.log(error);
        myToast("タスクの編集に失敗しました", "error");
      }
    } else if (formType === "create") {
      try {
        await createTask({ ...data, isCompleted: false });
        await mutate();
        router.push("/tasks");
        myToast("タスクを作成しました", "success");
      } catch (error) {
        console.log(error);
        myToast("タスクの作成に失敗しました", "error");
      }
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
      {isCompletePage ? (
        <label>
          <div>理解度</div>
          <select
            defaultValue={understandingRate.defaultValue}
            {...understandingRate.registerReturn}
          >
            {/* fix:magic number */}
            {Array.from({ length: 5 }, (_, i) => i + 1).map((number) => {
              return (
                <option key={number} value={number}>
                  {number}
                </option>
              );
            })}
          </select>
        </label>
      ) : (
        <input
          type="date"
          {...dueDate.registerReturn}
          //fixme
          defaultValue={
            dueDate.defaultValue
              ? convertToHtmlDateInput(dueDate.defaultValue)
              : getOneWeekAfterDay()
          }
        />
      )}

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
