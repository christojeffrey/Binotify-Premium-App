import { useState} from "react";

import { div, Typography, IconButton } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import ReactAudioPlayer from 'react-audio-player';
import EditIcon from '@mui/icons-material/Edit';
import { useSongStore, useUserStore } from "@features/store";
import { Song } from "@features/store";
import { Delete } from "@mui/icons-material";

import './card.css';

export const FeaturesSongsCard = ({
    song_id,
    title,
    audio_path
}: Song ) => {
    let setIsOpenSongPlayCard = useSongStore.getState().setIsOpenSongPlayCard;
    let setIsDeleteSongModalOpen = useSongStore.getState().setIsDeleteSongModalOpen;
    let setIsEditSongModalOpen = useSongStore.getState().setIsEditSongModalOpen;
    let setSelectedSong = useSongStore.getState().setSelectedSong;
    let setPlayedSong = useSongStore.getState().setPlayedSong;
    let singer = useUserStore.getState().name;
    const selectSong = () => {
        setSelectedSong({
            song_id: song_id,
            title: title,
            audio_path: audio_path
        });
    }
    const playAudio = () => {
        setPlayedSong({
            song_id: song_id,
            title: title,
            audio_path: audio_path
        });
        setIsOpenSongPlayCard(true);
    }
    
    const deleteSong = () => {
        selectSong();
        setIsDeleteSongModalOpen(true);
    }

    const editSong = () => {
        selectSong();
        setIsEditSongModalOpen(true);
    }

    return (
        <div className="flex justify-between bg-white h-20 bg-opacity-10 my-4 rounded-md">
            <div className="flex p-4">
                <IconButton  aria-label="play/pause" onClick={playAudio}>
                    <PlayArrowIcon color="secondary" className="singer-card-button" />
                </IconButton>
                <div clasName="flex-col">
                    <h2 className="text-lg">
                        {title}
                    </h2>
                    <h3 className="text-sm">
                        {singer}
                    </h3>
                </div>
            </div>
            <div className="flex-row justify-between items-center p-2">
                <IconButton aria-label="edit" onClick={editSong}>
                    <EditIcon className="singer-card-button"/>
                </IconButton>
                <IconButton aria-label="delete" onClick={deleteSong}>
                    <Delete className="singer-card-button" sx={{ color: 'pink[500]' }} />
                </IconButton>

            </div>                        
        </div>
    )
};
