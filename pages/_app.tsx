import "@/styles/global.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCheckIsLogin } from "src/hooks/useCheckIsLogin";

export default function MyApp({ Component, pageProps }: AppProps) {
  useCheckIsLogin();
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}
