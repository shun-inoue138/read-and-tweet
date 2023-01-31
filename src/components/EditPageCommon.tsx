import { useRouter } from "next/router";
import React, { FC } from "react";
import {
  createCategory,
  editTask,
  useGetCategoryList,
  useGetTask,
} from "src/api/tasksAPI";
import { useTaskEditForm } from "src/hooks/useTaskEditForm";
import { myToast } from "src/utils/functions/toastWrapper";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { useModal } from "src/hooks/useModal";
import { mutate } from "swr";
import TaskForm from "src/components/TaskForm";
import CategoryModalContent from "src/components/CategoryModalContent";

const EditPageCommon: FC<{ isCompletePage?: boolean }> = ({
  isCompletePage = false,
}) => {
  const router = useRouter();
  const { id: rawId } = router.query;
  const id = String(rawId);
  const {
    register,
    handleSubmit,
    errors,
    append,
    remove,
    task,
    isLoading,
    fetchError,
    fields,
    TaskEditObject,
  } = useTaskEditForm(id, isCompletePage);
  const { categoryList, mutate } = useGetCategoryList();

  const { MyModal, openModal, closeModal } = useModal();

  const categoryInputRef = React.useRef<HTMLInputElement>(null);

  if (isLoading) {
    return <p>loading...</p>;
  } else if (fetchError) {
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
        isCompletePage={isCompletePage}
      />
      <MyModal>
        <CategoryModalContent closeModal={closeModal} mutate={mutate} />
      </MyModal>
    </div>
  );
};

export default EditPageCommon;
