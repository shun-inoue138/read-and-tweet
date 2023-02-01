import { Category } from "../utils/types/Category";
import useSWR from "swr";
import { Fetcher } from "swr";
import axiosClient from "./axiosClient";
import useUserStore from "src/stores/useUserStore";

export const useGetCategoryList = () => {
  const user_id = useUserStore((state) => state.currentUser._id);
  const url = `/categories?user_id=${user_id}`;
  const fetcher: Fetcher<{ id: string; name: string }[], string> = () => {
    return axiosClient.get(url).then((res) => res.data);
  };
  const { data, error, mutate, isLoading } = useSWR<
    { id: string; name: string }[]
  >(url, fetcher);
  return { categoryList: data, error, mutate, isLoading };
};

export const useCreateCategory = () => {
  const user_id = useUserStore((state) => state.currentUser._id);
  const createCategory = (name: Category["name"]) => {
    const url = "/categories";
    return axiosClient.post(url, { name, user_id });
  };
  return { createCategory };
};
