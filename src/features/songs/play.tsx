import { useState, useEffect} from "react";
import { Box, Card, CardContent, Typography} from "@mui/material";
import ReactAudioPlayer from 'react-audio-player';
import { config } from "@config";
import { useSongStore, Song, useUserStore } from "@features/store";


export const FeaturesSongsPlay = ({

    }) => {
        const [isLoading, setIsLoading] = useState(false);
        const [errorMessage, setErrorMessage] = useState("");

        // const getSongAudio = () => {
        //     fetch(`${config.REST_API_URL}/song/${audio_path}`, {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
        //             "Authorization": `${localStorage.getItem("token")}`
        //         }
        //     })
        //     .then((res) => {
        //         if (res.status === 200) {
        //           res.json().then((data) => {
        //             window.location.href = "/";
        //           });
        //         } else {
        //             setErrorMessage("Error playing song");
        //             setIsLoading(false);
        //         }
        //     })
        //     .catch((err) => {
        //         setErrorMessage(err);
        //         setIsLoading(false);
        //     });
        // }
        let selectedSong : Song = useSongStore(state => state.selectedSong);
        let singer = useUserStore.getState().name;

        return (

            <Card sx={{ marginBottom: 0 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <CardContent>
                        <Box>
                            <Typography component="div" variant="h5">
                                {selectedSong.title}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary" component="div">
                                {singer}
                            </Typography>
                        </Box>
                    </CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        <ReactAudioPlayer
                            src={`${config.REST_API_URL}/song/${selectedSong.audio_path}`}
                            autoPlay
                            controls
                        />
                    </Box>
                </Box>
                            
            </Card>
        )
}