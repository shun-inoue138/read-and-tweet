import { Signin_URL, Signup_URL } from "./../utils/const";
import { useLayoutEffect } from "react";
import { useRouter } from "next/router";
import useUserStore from "src/stores/useUserStore";

export const useCheckIsLogin = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const router = useRouter();
  useLayoutEffect(() => {
    if (
      !currentUser.username &&
      router.pathname !== Signin_URL &&
      router.pathname !== Signup_URL
    ) {
      router.push(Signin_URL);
    }
  });
};
