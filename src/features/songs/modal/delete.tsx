import { useState} from "react";
import TextField from "@mui/material/TextField";
import { Modal, Box, Button, Alert, Typography } from "@mui/material";
import { config } from "@config";
import { useSongStore, selectedSongInitialValue } from "@features/store";
import { useNavigate } from "react-router-dom";

const defaultValues = {
    title: null,
    audio_file: null,
  };

  type FeaturesSongsModalDeleteProps = {

  }

export const FeaturesSongsModalDelete = ({

    }: FeaturesSongsModalDeleteProps) => {
// : FC<FeaturesSongsModalAddProps> = ({
//     isAddSongModalOpen
//   }) => {
    const [formValues, setFormValues] = useState(defaultValues);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    let setIsDeleteSongModalOpen = useSongStore.getState().setIsDeleteSongModalOpen;
    let isDeleteSongModalOpen = useSongStore(state => state.isDeleteSongModalOpen);

    let setSelectedSong = useSongStore.getState().setSelectedSong;
    let selectedSong = useSongStore(state => state.selectedSong);
    let navigate = useNavigate();

    const handleDelete = (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        fetch(`${config.REST_API_URL}/song/${selectedSong.song_id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `${localStorage.getItem("token")}`
            }
        })
        .then((res) => {
            if (res.status === 200) {
              res.json().then((data) => {
                handleCloseDeleteSongModal();
                navigate(0);
              });
            } else {
            setIsLoading(false);
            setErrorMessage("Error deleting song");
            }
        })
        .catch((err) => {
            setIsLoading(false);
            setErrorMessage(err);
        })
    }
    
    const handleCloseDeleteSongModal = () => {
        setIsLoading(false);
        setIsDeleteSongModalOpen(false);
        setSelectedSong(selectedSongInitialValue);
    }
    return (
        <Modal
            open={isDeleteSongModalOpen}
            onClose={handleCloseDeleteSongModal}>
             <Box component="form" autoComplete="off" className="flex flex-col bg-gray-300 p-5" onSubmit={handleDelete}>
                <Typography>Are you sure want to delete {selectedSong.title}?</Typography>
                <Button variant="contained" type="submit" disabled={isLoading} onClick={handleDelete}>
                    {isLoading ? "Loading" : "Yes"}
                </Button>
            </Box>
        </Modal>
        
    )
};
