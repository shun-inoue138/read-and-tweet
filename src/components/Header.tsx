import { Router, useRouter } from "next/router";
import React from "react";

const Header = ({ searchWord, setSearchWord }) => {
  const router = useRouter();
  return (
    <div className=" h-12 bg-slate-400">
      <input
        type="text"
        value={searchWord}
        onChange={(e) => {
          setSearchWord(e.target.value);
        }}
      />
      <button
        onClick={() => {
          router.push("/tasks/create");
        }}
      >
        新規タスク登録
      </button>
    </div>
  );
};

export default Header;
