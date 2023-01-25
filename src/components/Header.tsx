import { Router, useRouter } from "next/router";
import React from "react";
import {
  Default_Input_Due_Days,
  Default_Input_Understanding_Rate,
} from "src/utils/const";

const Header = ({ commonPageProps, specificPageProps }) => {
  const router = useRouter();
  console.log({ commonPageProps });

  const [inputDueDays, setInputDueDays] = React.useState<number>(
    Default_Input_Due_Days
  );
  //fix:commonPageProps.isCompletePageがfalseの場合無駄なstateが生成される
  const [inputUnderstandingRate, setInputUnderstandingRate] =
    React.useState<number>(Default_Input_Understanding_Rate);
  return (
    <div className=" bg-slate-400">
      {commonPageProps.isCompletePage ? (
        <div>
          <input
            type="number"
            value={inputUnderstandingRate}
            //fix:マジックナンバー
            max={5}
            min={1}
            //todo:設定画面でデフォルト値を設定できるようにする
            onChange={(e) => {
              setInputUnderstandingRate(Number(e.target.value));
            }}
          />
          理解度のタスクのみ表示
          <button
            onClick={() => {
              specificPageProps.setFilterUnderstandingRate({
                isFilter: !specificPageProps.filterUnderstandingRate.isFilter,
                rate: inputUnderstandingRate,
              });
            }}
          >
            表示
          </button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={commonPageProps.searchWord}
            onChange={(e) => {
              commonPageProps.setSearchWord(e.target.value);
            }}
          />
          <button
            onClick={() => {
              router.push("/tasks/create");
            }}
          >
            新規タスク登録
          </button>
          <div>
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
                specificPageProps.setFilterDueDays({
                  isFilter: !specificPageProps.filterDueDays.isFilter,
                  days: inputDueDays,
                });
              }}
            >
              表示
            </button>
          </div>
          <button
            onClick={() => {
              specificPageProps.setIsFilterByOverdue(
                !specificPageProps.isFilterByOverdue
              );
            }}
          >
            期限切れのみ
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
