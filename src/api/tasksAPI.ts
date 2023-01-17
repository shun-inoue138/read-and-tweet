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

export const deleteTask = (id: number) => {
  const url = `/tasks/${id}`;
  return axiosClient.delete(url);
};
