import { set } from "react-hook-form";
import { User } from "src/utils/types/User";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type IdOmitUser = Omit<User, "_id">;

type UserStoreType = {
  currentUser: IdOmitUser;
  setCurrentUser: (user: IdOmitUser) => void;
  resetCurrentUser: () => void;
};

const useUserStore = create<UserStoreType>()(
  devtools(
    persist(
      (set) => ({
        currentUser: {
          username: "",
          email: "",
          password: "",
        },
        setCurrentUser: (user) => set({ currentUser: user }),
        resetCurrentUser: () =>
          set({ currentUser: { username: "", email: "", password: "" } }),
      }),
      {
        name: "user",
      }
    )
  )
);

export default useUserStore;
