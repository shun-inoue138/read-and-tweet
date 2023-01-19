import { useRouter } from "next/router";
import { useFieldArray, useForm } from "react-hook-form";
import { useGetTask } from "src/api/tasksAPI";
import { taskObjectFactory } from "src/utils/functions/taskObjectFactory";
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

  const TaskCreateObject = taskObjectFactory(register, errors);

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
