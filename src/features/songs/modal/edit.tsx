import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Modal, Box, Button, Alert } from "@mui/material";
import { config } from "@config";
import { useSongStore, selectedSongInitialValue } from "@features/store";
import { useNavigate } from "react-router-dom";


  type FeaturesSongsModalEditProps = {
    fetchSongs: () => void;
  }

  const defaultValues = {
    title: "",
    file: null,
  };

export const FeaturesSongsModalEdit = ({
  fetchSongs
}: FeaturesSongsModalEditProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    let setSelectedSong = useSongStore.getState().setSelectedSong;
    let setIsEditSongModalOpen = useSongStore.getState().setIsEditSongModalOpen;
    let isEditSongModalOpen = useSongStore(state => state.isEditSongModalOpen);
    let selectedSong = useSongStore(state => state.selectedSong);
    const [formValues, setFormValues] = useState(defaultValues);

    const initialTitleValue = selectedSong.title;
    useEffect (() => {
        setFormValues({
            ...formValues,
            title: initialTitleValue})
    }, [selectedSong])

    const handleInputChange = (e: any) => {
        const { id, value } = e.target;
        setFormValues({
          ...formValues,
          [id]: value,
        });
      }

      const handleFileChange = (e: any) => {
        const { id, value } = e.target;
        setFormValues({
          ...formValues,
          [id]: e.target.files[0],
        });
      }
      
    const handleSubmit = (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        const formData = new FormData();
        if (formValues.title && formValues.title !== initialTitleValue) {
            formData.append("title", formValues.title);
        }

        if (formValues.file !== null) {
            formData.append("file", formValues.file);
        }

        fetch(`${config.REST_API_URL}/song/${selectedSong.song_id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `${localStorage.getItem("token")}`
            },
            body: formData
        })
        .then((res) => {
            if (res.status === 200) {
              res.json().then((data) => {
                handleCloseEditSongModal();
                fetchSongs();
              });
            } else {
              setIsLoading(false);
              setErrorMessage("Error editing song");
            }
        })
        .catch((err) => {
            setIsLoading(false);
            setErrorMessage(err);
        });

    }
    const handleCloseEditSongModal = () => {
      setIsLoading(false);
        setIsEditSongModalOpen(false);
        setFormValues(defaultValues);
    }
    return (
        <Modal open={isEditSongModalOpen}
        onClose={() =>setIsEditSongModalOpen(false)}
        className="flex items-center justify-center h-screen">
             <Box component="form" autoComplete="off" className="flex flex-col p-5  bg-gray-500 bg-opacity-10" onSubmit={handleSubmit}>
                <TextField  id="title"
                            label="Title"
                            variant="outlined"
                            required
                            focused
                            margin="normal"
                            color="secondary"
                            value={formValues.title}
                            onChange={handleInputChange}
                            disabled={isLoading} />
                <TextField  id="file"
                            label="Audio File"
                            variant="outlined"
                            margin="normal"
                            focused
                            color="secondary"
                            onChange={handleFileChange}
                            disabled={isLoading}
                            type="file"
                            InputProps={{ inputProps: { accept: "audio/*" } }}
                            />
                <Button color="secondary" variant="contained" type="submit" disabled={isLoading}>
                    {isLoading ? "Loading" : "Edit Song"}
                </Button>
                <Button color="secondary" onClick ={handleCloseEditSongModal}>
                    Cancel
                </Button>
            </Box>
        </Modal>
        
    )
};
