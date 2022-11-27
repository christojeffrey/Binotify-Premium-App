// coba pake zustand, kepo ehe

import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface userState {
  isAdmin: boolean;
  username: string;
  setUsername: (username: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
}

// for now seems like only need to store isAdmin
export const useUserStore = create<userState>()(
  devtools(
    persist((set) => ({
      isAdmin: false,
      username: "",
      setIsAdmin: (isAdmin: boolean) => set({ isAdmin }),
      setUsername: (username: string) => set({ username }),
    }))
  )
);
