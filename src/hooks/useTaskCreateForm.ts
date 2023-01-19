import { useRouter } from "next/router";
import { useFieldArray, useForm } from "react-hook-form";
import { useGetTask } from "src/api/tasksAPI";
import { IncompletedTask, Task } from "src/utils/types/Task";

export const useTaskCreateForm = () => {
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
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "categories",
  });

  const TaskCreateObject = {
    URL: {
      placeholder: "URLを入力してください",
      type: "text",
      registerReturn: register("url", {
        required: "URLは必須です",
      }),
      errors: errors.url?.message,
    },
    title: {
      placeholder: "タイトルを入力してください",
      type: "text",
      registerReturn: register("title", {
        required: "タイトルは必須です",
      }),
      errors: errors.title?.message,
    },
    randomNote: {
      placeholder: "ご自由にメモをどうぞ",
      registerReturn: register("randomNote"),
      errors: errors.randomNote?.message,
    },
    dueDate: {
      type: "date",
      registerReturn: register("dueDate"),
      errors: errors.dueDate?.message,
    },
    postContent: {
      placeholder: "投稿内容",
      type: "text",
      registerReturn: register("postContent"),
      errors: errors.postContent?.message,
    },
  };

  return {
    register,
    handleSubmit,
    errors,
    fields,
    append,
    remove,
    TaskCreateObject,
  };
};
