import { useForm } from "react-hook-form";
import { IncompletedTask, Task } from "src/utils/types/Task";

// {
//   id,
//   title,
//   randomNote,
//   dueDate,
//   postContent,
//   categories,
// },

export const useTaskEditForm = (defaultValue: Task | undefined) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<Task>({
    mode: "onChange",
    defaultValues: defaultValue ? { ...defaultValue } : undefined,
  });

  // const inputArray = [
  //   {
  //     sr: "タイトル",
  //     placeholder: "タイトル",
  //     type: "text",
  //     registerReturn: register("title", {
  //       required: "必須です",
  //       maxLength: { value: 30, message: "30文字以内です" },
  //     }),
  //     errors: errors.title?.message,
  //   },
  //   {
  //     sr: "雑記",
  //     placeholder: "自由にメモしてください。",
  //     type: "text",
  //     registerReturn: register("randomNote", {
  //       maxLength: { value: 1000, message: "1000文字以内です" },
  //     }),
  //     errors: errors.randomNote?.message,
  //   },
  //   {
  //     sr: "期限",
  //     placeholder: "期限",
  //     type: "date",
  //     registerReturn: register("dueDate", {
  //       required: "必須です",
  //     }),
  //     errors: errors.dueDate?.message,
  //   },
  //   {
  //     sr: "ツイート内容",
  //     placeholder: "ここにツイートする文章を入力してください。",
  //     type: "text",
  //     registerReturn: register("postContent", {
  //       maxLength: { value: 140, message: "140文字以内です" },
  //     }),
  //     errors: errors.postContent?.message,
  //   },
  //   {
  //     sr: "カテゴリー",
  //     placeholder: "カテゴリー",
  //     type: "text",
  //     registerReturn: register("categories", {
  //       maxLength: { value: 30, message: "30文字以内です" },
  //     }),
  //   },
  // ];

  return { register, handleSubmit, getValues, errors, reset };
};
