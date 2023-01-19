import { useRouter } from "next/router";
import { useFieldArray, useForm } from "react-hook-form";
import { useGetTask } from "src/api/tasksAPI";
import { IncompletedTask, Task } from "src/utils/types/Task";

// {
//   id,
//   title,
//   randomNote,
//   dueDate,
//   postContent,
//   categories,
// },

export const useTaskEditForm = (id: number) => {
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

  // const { register, control, handleSubmit, reset, trigger, setError } = useForm({
  //   // defaultValues: {}; you can populate the fields by this attribute
  // });
  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "test"
  // });

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

  return {
    register,
    handleSubmit,
    errors,
    isLoading,
    fields,
    append,
    remove,
    task,
    error,
  };
};
