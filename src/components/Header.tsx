import { Router, useRouter } from "next/router";
import React from "react";
import { Input_Due_Days } from "src/utils/const";

const Header = ({
  searchWord,
  setSearchWord,
  setFilterDueDays,
  filterDueDays,
  isFilterByOverdue,
  setIsFilterByOverdue,
}) => {
  const router = useRouter();
  const [inputDueDays, setInputDueDays] =
    React.useState<number>(Input_Due_Days);
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
        //todo:設定画面でデフォルト値を設定できるようにする
        onChange={(e) => {
          setInputDueDays(Number(e.target.value));
        }}
      />
      日以内のタスクのみ表示
      <button
        onClick={() => {
          setFilterDueDays({
            isFilter: !filterDueDays.isFilter,
            days: inputDueDays,
          });
        }}
      >
        表示
      </button>
      <button
        onClick={() => {
          setIsFilterByOverdue(!isFilterByOverdue);
        }}
      >
        期限切れのみ
      </button>
    </div>
  );
};

export default Header;
