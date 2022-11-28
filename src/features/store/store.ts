// coba pake zustand, kepo ehe

import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Song {
  song_id: number;
  title: string;
  audio_path: string;
}

interface userState {
  isAdmin: boolean;
  username: string;
  name: string;
  setUsername: (username: string) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setName: (name: string) => void;
}

interface songState {
  isAddSongModalOpen: boolean;
  setIsAddSongModalOpen: (isAddSongModalOpen: boolean) => void;
  isDeleteSongModalOpen: boolean;
  setIsDeleteSongModalOpen: (isDeleteSongModalOpen: boolean) => void;
  isOpenSongPlayCard: boolean;
  setIsOpenSongPlayCard: (isOpenSongPlayCard: boolean) => void;
  selectedSong: Song;
  setSelectedSong: (selectedSong: Song) => void;

}
// for now seems like only need to store isAdmin
export const useUserStore = create<userState>()(
  devtools(
    persist((set) => ({
      isAdmin: false,
      username: "",
      name: "",
      setIsAdmin: (isAdmin: boolean) => set({ isAdmin }),
      setUsername: (username: string) => set({ username }),
      setName: (name: string) => set({ name }),
    }))
  )
);

export const useSongStore = create<songState>()(
  devtools(
    persist((set) => ({
      isAddSongModalOpen: false,
      isDeleteSongModalOpen: false,
      isOpenSongPlayCard: false,
      selectedSong: {
        song_id: 0,
        title: "",
        audio_path: "",
      },
      setIsAddSongModalOpen: (isAddSongModalOpen: boolean) => set({ isAddSongModalOpen }),
      setIsDeleteSongModalOpen: (isDeleteSongModalOpen: boolean) => set({ isDeleteSongModalOpen }),
      setIsOpenSongPlayCard: (isOpenSongPlayCard: boolean) => set({ isOpenSongPlayCard }),
      setSelectedSong: (selectedSong: Song) => set({ selectedSong }),
    }))
  )
);

