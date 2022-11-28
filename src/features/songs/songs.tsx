import { useState, useEffect } from "react";

import { FeaturesSongsModalAdd } from "@features/songs/modal/add";
import { FeaturesSongsModalDelete } from "@features/songs/modal/delete";
import { FeaturesSongsCard } from "@features/songs/card";
import { FeaturesSongsPlay } from "@features/songs/play";
import { useSongStore, Song } from "@features/store";

import { config } from "@config";
import { useNavigate } from "react-router-dom";

import { Box, IconButton } from "@mui/material";
import AddCircle from '@mui/icons-material/PlayArrow';

// create 2 dummy song data for testing
const dummySongs: Song[] = [
    {
        "song_id": 1,
        "title": "hati2",
        "audio_path": "1669673513669.m4a"
    },
    {
        "song_id": 2,
        "title": "bermain3",
        "audio_path": "1669673513669.m4a"
    }
]
export const FeaturesSongs = () => {
    let isAddSongModalOpen = useSongStore.getState().isAddSongModalOpen;
    let isDeleteSongModalOpen = useSongStore.getState().isDeleteSongModalOpen;
    let isOpenSongPlayCard = useSongStore.getState().isOpenSongPlayCard;
    let selectedSong = useSongStore.getState().selectedSong;

    let setIsAddSongModalOpen = useSongStore.getState().setIsAddSongModalOpen;
    let setIsDeleteSongModalOpen = useSongStore.getState().setIsDeleteSongModalOpen;
    let setIsOpenSongPlayCard = useSongStore.getState().setIsOpenSongPlayCard;
    let setSelectedSong = useSongStore.getState().setSelectedSong;

    let navigate = useNavigate();

    const [songList, setSongList] = useState([]);

    // fetch song list
    useEffect(() => {
        // redirect to login screen if not logged in
        const token = localStorage.getItem("token");

        if (!token) {
            console.log("no token");
            navigate("/login");
        } else {
            fetch(config.REST_API_URL + "/song", {
            method: "GET",
            headers: {
                Authorization: token
            },
            })
            .then((res) => res.json())
            .then((data) => {
                setSongList(data.songs);
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }, [ ]);


    const renderSongCard = (song_id: number,
        title: string,
        audio_path: string) => {
            return (
                <FeaturesSongsCard
                    song_id={song_id}
                    title={title}
                    audio_path={audio_path}
                />
            );
    }

    const renderSongCards = () => {
        let songCards: JSX.Element[] = [];
        songList.forEach((song: Song) => {
            songCards.push(renderSongCard(song.song_id, song.title,  song.audio_path));
        });
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {songCards}
            </Box>
        );
    }
    const onClickAddSongButton = () => {
        setIsAddSongModalOpen(true);
    }

    return (
        <>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <IconButton aria-label="add" onClick={onClickAddSongButton}>
                <AddCircle sx={{ height: 38, width: 38 }} />
            </IconButton>   
            <FeaturesSongsModalAdd />         
            {/* <FeaturesSongsModalDelete isDeleteSongModalOpen={isDeleteSongModalOpen} song_id={selectedSong.song_id} setIsDeleteSongModalOpen={setIsDeleteSongModalOpen}/> */}
            {
                songList.length > 0 ? renderSongCards() : <p>No songs found</p>
            }
            {isOpenSongPlayCard && <FeaturesSongsPlay />}
        </Box>
        </>
    )
};
