import { set } from "react-hook-form";
import { User } from "src/utils/types/User";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type UserStoreType = {
  currentUser: User;
  setCurrentUser: (user: User) => void;
  resetCurrentUser: () => void;
};

const useUserStore = create<UserStoreType>()(
  devtools(
    persist(
      (set) => ({
        currentUser: {
          _id: "",
          username: "",
          email: "",
          password: "",
        },
        setCurrentUser: (user) => set({ currentUser: user }),
        resetCurrentUser: () =>
          set({
            currentUser: { _id: "", username: "", email: "", password: "" },
          }),
      }),
      {
        name: "user",
      }
    )
  )
);

export default useUserStore;
