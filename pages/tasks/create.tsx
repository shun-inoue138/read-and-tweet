import { useRouter } from "next/router";
import React from "react";
import { useGetCategoryList } from "src/api/categoryAPI";
import CategoryModalContent from "src/components/CategoryModalContent";
import TaskForm from "src/components/TaskForm";
import { useModal } from "src/hooks/useModal";
import { useTaskCreateForm } from "src/hooks/useTaskCreateForm";
import { myToast } from "src/utils/functions/toastWrapper";

const create = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    errors,
    fields,
    append,
    remove,
    TaskCreateObject,
  } = useTaskCreateForm();
  const { categoryList, mutate } = useGetCategoryList();
  const { MyModal, openModal, closeModal } = useModal();

  return (
    <div>
      <TaskForm
        {...TaskCreateObject}
        handleSubmit={handleSubmit}
        router={router}
        register={register}
        categoryList={categoryList}
        append={append}
        remove={remove}
        fields={fields}
        openModal={openModal}
        formType="create"
      />
      <MyModal>
        <CategoryModalContent closeModal={closeModal} mutate={mutate} />
      </MyModal>
    </div>
  );
};

export default create;
