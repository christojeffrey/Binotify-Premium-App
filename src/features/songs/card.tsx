import { useState} from "react";

import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import DeleteIcon from '@mui/icons-material/Delete';
import ReactAudioPlayer from 'react-audio-player';
import EditIcon from '@mui/icons-material/Edit';
import { useSongStore, useUserStore } from "@features/store";
import { Song } from "@features/store";
import { Delete } from "@mui/icons-material";


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
        <Card className="play-audio-card-container my-1">
            <Box className="play-audio-card-content-container" sx={{ display: 'flex', flexDirection: 'row' }}>
                <CardContent>
                    <Box>
                        <Typography component="div" variant="h5">
                            {title}
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" component="div">
                            {singer}
                        </Typography>
                    </Box>
                </CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                   
                    <IconButton aria-label="play/pause" onClick={() => playAudio()}>
                        <PlayArrowIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={deleteSong}>
                        <Delete sx={{ height: 38, width: 38 }} />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={editSong}>
                        <EditIcon sx={{ height: 38, width: 38 }} />
                    </IconButton>
                </Box>
            </Box>
                        
        </Card>
    )
};
