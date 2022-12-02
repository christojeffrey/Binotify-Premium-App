import { useState, useEffect } from "react";

import { FeaturesSongsModalAdd } from "@features/songs/modal/add";
import { FeaturesSongsModalEdit } from "@features/songs/modal/edit";
import { FeaturesSongsModalDelete } from "@features/songs/modal/delete";
import { FeaturesSongsCard } from "@features/songs/card";
import { FeaturesSongsPlay } from "@features/songs/play";
import { useSongStore, Song } from "@features/store";

import { config } from "@config";
import { useNavigate } from "react-router-dom";

import { Box, IconButton } from "@mui/material";

import AddCircleIcon from '@mui/icons-material/AddCircle';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

// create 2 dummy song data for testing

const paginationInitialValue = {
    page: 1,
    limit: 2,
}
export const FeaturesSongs = () => {
    let isAddSongModalOpen = useSongStore(state => state.isAddSongModalOpen);
    let isDeleteSongModalOpen = useSongStore(state => state.isDeleteSongModalOpen);
    let isEditSongModalOpen = useSongStore(state => state.isEditSongModalOpen);
    let isOpenSongPlayCard = useSongStore(state => state.isOpenSongPlayCard);
    let selectedSong = useSongStore(state => state.selectedSong);
    let playedSong = useSongStore(state => state.playedSong);
    let setIsAddSongModalOpen = useSongStore.getState().setIsAddSongModalOpen;
    let setIsDeleteSongModalOpen = useSongStore.getState().setIsDeleteSongModalOpen;
    let setIsEditSongModalOpen = useSongStore.getState().setIsEditSongModalOpen;
    let setIsOpenSongPlayCard = useSongStore.getState().setIsOpenSongPlayCard;
    let setSelectedSong = useSongStore.getState().setSelectedSong;

    let navigate = useNavigate();

    const [songList, setSongList] = useState([]);
    const [pagination, setPagination] = useState(paginationInitialValue);
    const [canGoToNextPage, setCanGoToNextPage] = useState(true);
    const [canGoToPreviousPage, setCanGoToPreviousPage] = useState(false);

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

    useEffect(() => {
        if ((isDeleteSongModalOpen ||  isEditSongModalOpen) && (selectedSong.song_id === playedSong.song_id)) {
            console.log("sanma")
            setIsOpenSongPlayCard(false)
        }
    }, [isDeleteSongModalOpen, isEditSongModalOpen, selectedSong, playedSong])


    useEffect(() => {
        setCanGoToPreviousPage(pagination.page > 1)
    }, [pagination.page])

    useEffect(() => {
        setCanGoToNextPage(Math.ceil(songList.length / pagination.limit)  > pagination.page)
    }, [songList, pagination.page, pagination.limit])

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
        (songList as Song[]).slice((pagination.page-1) * pagination.limit, pagination.page * pagination.limit).forEach((song) => {
            songCards.push(renderSongCard(song.song_id, song.title,  song.audio_path));
        });
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignSelf: 'center' }}>
                {songCards}
            </Box>
        );
    }

    const goToNextPage = () => {
        setPagination({...pagination, page: pagination.page + 1});
    }

    const goToPreviousPage = () => {
        setPagination({...pagination, page: pagination.page - 1});
    }

    const onClickAddSongButton = () => {
        setIsAddSongModalOpen(true);
    }

    return (
        // todo: pagination
        <>
        <Box className="flex-col">
            <Box className="flex-col w-9/12 justify-center">
                <Box className="flex row justify-between" >
                    <IconButton aria-label="add" onClick={onClickAddSongButton}>
                        <AddCircleIcon sx={{ height: 38, width: 38, color: "white" }}  />
                    </IconButton>  
                    <Box className="flex row">
                        <IconButton disabled={!canGoToPreviousPage} aria-label="navigate-before" onClick={goToPreviousPage}>
                            <NavigateBeforeIcon sx={{ height: 38, width: 38, color: "white" }} />
                        </IconButton>
                        <IconButton disabled={!canGoToNextPage} aria-label="navigate-next" onClick={goToNextPage}>
                            <NavigateNextIcon sx={{ height: 38, width: 38, color: "white" }} />
                        </IconButton> 
                    </Box>
                    
                </Box>
                {
                    songList.length > 0 ? renderSongCards() : <p>No songs found</p>
                }
            </Box>
            
 
            <FeaturesSongsModalAdd />         
            <FeaturesSongsModalDelete />
            <FeaturesSongsModalEdit />

            {isOpenSongPlayCard && <FeaturesSongsPlay />}
        </Box>
        </>
    )
};
