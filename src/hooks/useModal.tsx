import { Children, ReactNode, useState } from "react";
import Modal from "react-modal";
import { IoCloseOutline } from "react-icons/io5";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return {
    MyModal: ({ children }: { children: ReactNode }) => {
      return (
        <Modal isOpen={isOpen} onRequestClose={closeModal} style={customStyles}>
          <button onClick={closeModal} className="absolute top-1 left-1">
            <IoCloseOutline />
          </button>
          {children}
        </Modal>
      );
    },
    openModal,
    closeModal,
  };
};
