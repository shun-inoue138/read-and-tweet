import { Category } from "./../utils/types/Category";
import { convertToHtmlDateInput } from "./../utils/functions/convertToHtmlDateInput";
import axiosClient from "./axiosClient";
import { Task } from "../utils/types/Task";
import useSWR, { Fetcher } from "swr";

export const useGetAllTasks = () => {
  const url = "/tasks";
  const fetcher: Fetcher<Task[], string> = () => {
    return axiosClient.get(url).then((res) => res.data);
  };
  const { data, error, mutate, isLoading } = useSWR<Task[]>(url, fetcher);
  return { tasks: data, error, mutate, isLoading };
};

//useFormとuseFieldArrayと併用する場合のみ引数にresetを渡す
export const useGetTask = (id: string, reset?) => {
  const url = `/tasks/${id}`;
  const fetcher: Fetcher<Task, string> = () => {
    return axiosClient.get(url).then((res) => {
      //fix。不自然。htmlのinput type="date"にて表示させるため無理やり変形させている。
      reset &&
        reset({
          ...res.data,
          dueDate: convertToHtmlDateInput(res.data.dueDate),
        });
      return res.data;
    });
  };
  const { data, error, mutate, isLoading } = useSWR<Task>(url, fetcher);
  return { task: data, error, mutate, isLoading };
};
//todo:要categoryAPIへ移動。
export const useGetCategoryList = () => {
  const url = "/categories";
  const fetcher: Fetcher<{ id: string; name: string }[], string> = () => {
    return axiosClient.get(url).then((res) => res.data);
  };
  const { data, error, mutate, isLoading } = useSWR<
    { id: string; name: string }[]
  >(url, fetcher);
  return { categoryList: data, error, mutate, isLoading };
};
export const createCategory = (name: Category["name"]) => {
  const url = "/categories";
  return axiosClient.post(url, { name });
};

export const deleteTask = (id: string) => {
  const url = `/tasks/${id}`;
  return axiosClient.delete(url);
};

//categoriesの重複入力された場合、その場で警告を出さずに結果的に重複を削除して登録する
const categoryNameDeduplication = (categories: Category["name"][]) => {
  const deduplication = categories.filter((category, index, self) => {
    return self.indexOf(category) === index;
  });
  return deduplication;
};
//todo:そもそも重複入力出来ないほうが良さそう。
export const editTask = (id: string, task: Task) => {
  const url = `/tasks/${id}`;
  const deduplication = categoryNameDeduplication(task.categories);
  const modifiedTask = { ...task, categories: deduplication };
  console.log(modifiedTask);

  return axiosClient.put(url, modifiedTask);
};
export const createTask = (task: Task) => {
  const url = "/tasks";
  const deduplication = categoryNameDeduplication(task.categories);
  const modifiedTask = { ...task, categories: deduplication };
  return axiosClient.post(url, modifiedTask);
};
//todo:呼び出し側でisCompletedをtoggleさせるほうが良いかも？どちらにせよ統一すべき
export const completeTask = (id: string, task: Task) => {
  const url = `/tasks/${id}/complete`;
  return axiosClient.put(url, task);
};
export const undoCompleteTask = (id: string, task: Task) => {
  const url = `/tasks/${id}/undo`;
  const undoTask = { ...task, isCompleted: false };
  return axiosClient.put(url, undoTask);
};
