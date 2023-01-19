import { useRouter } from "next/router";
import React from "react";
import { createCategory, useGetCategoryList } from "src/api/tasksAPI";
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
  const categoryInputRef = React.useRef<HTMLInputElement>(null);

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

export default create;
