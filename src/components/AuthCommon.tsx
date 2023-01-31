import { FC, ReactNode, useState } from "react";
import { signin, signup } from "src/api/authAPI";
import { IFormInputs, useAuthForm } from "src/hooks/useAuthForm";
import { useAuthRouter } from "src/hooks/useAuthRouter";
import useUserStore from "src/stores/useUserStore";
import { Signin_URL, Signup_URL } from "src/utils/const";
import {
  signinInputArrayFactory,
  signupInputArrayFactory,
} from "src/utils/functions/signinInputArrayFactory";
import AuthFormContainer from "./AuthFormContainer";
import FilledButton from "./Button/FilledButton";
import InputItemComponent from "./InputItemComponent";

const AuthCommon: FC<{ AuthType: "signin" | "signup" }> = ({ AuthType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { router, email, password } = useAuthRouter();
  const { register, handleSubmit, getValues, errors, reset } = useAuthForm({
    defaultEmail: email,
    defaultPassword: password,
  });

  const inputArray =
    AuthType === "signin"
      ? signinInputArrayFactory(register, errors)
      : signupInputArrayFactory(register, errors, getValues);

  const setCurrentUser = useUserStore((state) => state.setCurrentUser);

  //different signinとsignupの違いのみ
  const onSubmitHandler = async (data: IFormInputs) => {
    setIsLoading(true);
    try {
      const res =
        AuthType === "signin" ? await signin(data) : await signup(data);
      // await saveTokenToLocalStorage(res.data.token);
      console.log(res.data.user);

      setCurrentUser(res.data.user);
      setIsLoading(false);
      //todo:遷移先はtopページの方が良いかも
      router.push("/tasks");
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };
  //

  //different ボタンの役割や文言が異なる。
  const formContent = (
    <div>
      <div className="text-center">
        {AuthType === "signin"
          ? " ログインはこちらから"
          : "新規登録はこちらから"}
      </div>
      <AuthFormContainer>
        {inputArray.map((inputItem) => {
          return <InputItemComponent {...inputItem} key={inputItem.sr} />;
        })}
        <FilledButton
          buttonColor="green"
          onClick={handleSubmit(onSubmitHandler)}
        >
          {isLoading
            ? "Loading..."
            : AuthType === "signin"
            ? "ログイン"
            : "新規登録"}
        </FilledButton>
        {AuthType === "signin" && (
          <FilledButton buttonColor="green"> パスワードを忘れた方</FilledButton>
        )}

        <FilledButton
          buttonColor="green"
          onClick={(e) => {
            e.preventDefault();
            const pushUrl = AuthType === "signin" ? Signup_URL : Signin_URL;
            router.push(
              {
                pathname: pushUrl,
                query: {
                  email: getValues("email"),
                  password: getValues("password"),
                },
              },
              pushUrl
            );
          }}
        >
          {AuthType === "signin"
            ? "新規登録はこちらから"
            : "ログインはこちらから"}
        </FilledButton>
      </AuthFormContainer>
    </div>
  );
  return (
    <>
      <AuthLayout formContent={formContent} />
    </>
  );
};

export default AuthCommon;

const AuthLayout: FC<{ formContent: ReactNode }> = ({ formContent }) => {
  return (
    <div className="h-screen grid grid-cols-2 items-center justify-items-center">
      <div>
        <h1 className="text-5xl text-violet-600 font-bold font-sans mb-4">
          authページ
        </h1>
        <p className="max-w-[20em]">
          この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています
        </p>
      </div>
      <div className=" p-2 shadow-md rounded-sm w-[60%]">{formContent}</div>
    </div>
  );
};
