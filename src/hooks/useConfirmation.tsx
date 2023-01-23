import { useState } from "react";
import { MyDialogProps } from "src/components/TaskItemBase";
import { useModal } from "./useModal";

export const useConfirmation = () => {
  const { MyModal, openModal, closeModal } = useModal();
  const [isConfirmed, setIsConfirmed] = useState<"yes" | "no" | undefined>(
    undefined
  );
  const getIsConfirmed = () => {
    return isConfirmed;
  };
  const resetIsConfirmed = () => {
    setIsConfirmed(undefined);
  };

  const Confirmation = (props: MyDialogProps) => {
    const { onClose } = props;
    const onConfirmHandler = (val: "yes" | "no") => {
      setIsConfirmed(val);
    };

    return (
      <MyModal>
        <div className="flex flex-col gap-3">
          <p>本当に削除しますか?</p>
          <ul className="flex gap-2 justify-center">
            <li
              onClick={() => {
                onClose("yes");
                closeModal();
              }}
            >
              YES
            </li>
            <li
              onClick={() => {
                onClose("no");
                closeModal();
              }}
            >
              NO
            </li>
          </ul>
        </div>
      </MyModal>
    );
  };

  return {
    Confirmation,
    openConfirmationModal: openModal,
    getIsConfirmed,
    resetIsConfirmed,
  };
};
