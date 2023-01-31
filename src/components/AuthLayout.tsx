import React, { FC, ReactNode, useEffect, useLayoutEffect } from "react";

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

export default AuthLayout;
