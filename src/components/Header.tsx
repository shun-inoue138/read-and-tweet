import { Router, useRouter } from "next/router";
import React from "react";

const Header = ({ searchWord, setSearchWord, setFilterDueDays }) => {
  const router = useRouter();
  const [inputDueDays, setInputDueDays] = React.useState<number>(0);
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
      締め切り
      <input
        type="number"
        value={inputDueDays}
        max={100}
        min={1}
        onChange={(e) => {
          setInputDueDays(Number(e.target.value));
        }}
      />
      日以内のタスクのみ表示
      <button
        onClick={() => {
          setFilterDueDays(inputDueDays);
        }}
      >
        表示
      </button>
    </div>
  );
};

export default Header;
