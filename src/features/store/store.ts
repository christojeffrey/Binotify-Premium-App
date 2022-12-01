// coba pake zustand, kepo ehe

import create from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface Song {
  song_id: number;
  title: string;
  audio_path: string;
}

export interface Subscription {
  creator_id: number;
  subscriber_id : number;
  status : string;
}

export const selectedSongInitialValue = {
  song_id: 0,
  title: "",
  audio_path: "",
};

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
  isEditSongModalOpen: boolean;
  setIsEditSongModalOpen: (isEditSongModalOpen: boolean) => void;
  isOpenSongPlayCard: boolean;
  setIsOpenSongPlayCard: (isOpenSongPlayCard: boolean) => void;
  selectedSong: Song;
  setSelectedSong: (selectedSong: Song) => void;
  playedSong: Song;
  setPlayedSong: (playedSong: Song) => void;
}
// for now seems like only need to store isAdmin, username, and name
export const useUserStore = create<userState>()(
  devtools(
    persist((set: any) => ({
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
    persist((set: any) => ({
      isAddSongModalOpen: false,
      isDeleteSongModalOpen: false,
      isOpenSongPlayCard: false,
      isEditSongModalOpen: false,
      selectedSong: selectedSongInitialValue,
      playedSong: selectedSongInitialValue,
      setIsAddSongModalOpen: (isAddSongModalOpen: boolean) => set({ isAddSongModalOpen }),
      setIsDeleteSongModalOpen: (isDeleteSongModalOpen: boolean) => set({ isDeleteSongModalOpen }),
      setIsEditSongModalOpen: (isEditSongModalOpen: boolean) => set({ isEditSongModalOpen }),
      setIsOpenSongPlayCard: (isOpenSongPlayCard: boolean) => set({ isOpenSongPlayCard }),
      setSelectedSong: (selectedSong: Song) => set({ selectedSong }),
      setPlayedSong: (playedSong: Song) => set({ playedSong }),
    }))
  )
);
