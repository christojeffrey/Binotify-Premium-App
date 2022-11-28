import { useState} from "react";

import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReactAudioPlayer from 'react-audio-player';
import { useSongStore, useUserStore } from "@features/store";
import { Song } from "@features/store";


export const FeaturesSongsCard = ({
    song_id,
    title,
    audio_path
}: Song ) => {
    let setIsOpenSongPlayCard = useSongStore.getState().setIsOpenSongPlayCard;
    let setSelectedSong = useSongStore.getState().setSelectedSong;
    let singer = useUserStore.getState().name;
    const playAudio = () => {
        setIsOpenSongPlayCard(true);
        setSelectedSong({
            song_id: song_id,
            title: title,
            audio_path: audio_path
        })
    }

    return (
        <Card>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
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
                </Box>
            </Box>
                        
        </Card>
    )
};
