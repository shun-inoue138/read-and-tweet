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
export const useGetTask = (id: number, reset?) => {
  const url = `/tasks/${id}`;
  const fetcher: Fetcher<Task, string> = () => {
    return axiosClient.get(url).then((res) => {
      reset && reset(res.data);
      return res.data;
    });
  };
  const { data, error, mutate, isLoading } = useSWR<Task>(url, fetcher);
  return { task: data, error, mutate, isLoading };
};

export const useGetCategoryList = () => {
  const url = "/categoryList";
  const fetcher: Fetcher<{ id: number; name: string }[], string> = () => {
    return axiosClient.get(url).then((res) => res.data);
  };
  const { data, error, mutate, isLoading } = useSWR<
    { id: number; name: string }[]
  >(url, fetcher);
  return { categoryList: data, error, mutate, isLoading };
};
export const createCategory = (name: string) => {
  const url = "/categoryList";
  return axiosClient.post(url, { name });
};

export const deleteTask = (id: number) => {
  const url = `/tasks/${id}`;
  return axiosClient.delete(url);
};
export const editTask = (id: number, task: Task) => {
  const url = `/tasks/${id}`;
  return axiosClient.put(url, task);
};
export const createTask = (task: Task) => {
  const url = "/tasks";
  return axiosClient.post(url, task);
};
export const completeTask = (id: number, task: Task) => {
  const url = `/tasks/${id}/`;
  return axiosClient.put(url, task);
};
export const undoCompleteTask = (id: number, task: Task) => {
  const url = `/tasks/${id}/`;
  const undoTask = { ...task, isCompleted: false };
  return axiosClient.put(url, undoTask);
};
