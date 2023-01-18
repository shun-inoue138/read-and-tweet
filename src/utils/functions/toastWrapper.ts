import { Slide, toast } from "react-toastify";

export const myToast = (
  message: string,
  type: "success" | "error" | "info"
) => {
  toast(message, {
    type,
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    pauseOnHover: false,
    closeOnClick: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Slide,
  });
};
