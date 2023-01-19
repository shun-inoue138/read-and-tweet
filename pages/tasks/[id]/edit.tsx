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
import TaskForm from "src/components/TaskForm";
import CategoryModalContent from "src/components/CategoryModalContent";

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
    TaskEditObject,
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
      <TaskForm
        {...TaskEditObject}
        id={id}
        handleSubmit={handleSubmit}
        router={router}
        register={register}
        categoryList={categoryList}
        append={append}
        remove={remove}
        fields={fields}
        openModal={openModal}
        formType="edit"
      />
      <MyModal>
        <CategoryModalContent closeModal={closeModal} mutate={mutate} />
      </MyModal>
    </div>
  );
};

export default edit;
