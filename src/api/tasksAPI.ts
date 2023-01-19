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
//useFormとともに使用する場合、resetを受け取って実行する
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

export const deleteTask = (id: number) => {
  const url = `/tasks/${id}`;
  return axiosClient.delete(url);
};
export const editTask = (id: number, task: Task) => {
  const url = `/tasks/${id}`;
  return axiosClient.put(url, task);
};
