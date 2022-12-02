import { useState} from "react";
import TextField from "@mui/material/TextField";
import { Modal, Box, Button, Alert } from "@mui/material";
import { config } from "@config";
import { useSongStore, selectedSongInitialValue } from "@features/store";
import { useNavigate } from "react-router-dom";

const defaultValues = {
    title: null,
    file: null,
  };

  type FeaturesSongsModalAddProps = {
    fetchSongs: () => void;
  }

export const FeaturesSongsModalAdd = ({
  fetchSongs

}: FeaturesSongsModalAddProps) => {
    const [formValues, setFormValues] = useState(defaultValues);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    let setSelectedSong = useSongStore.getState().setSelectedSong;
    let setIsAddSongModalOpen = useSongStore.getState().setIsAddSongModalOpen;
    let isAddSongModalOpen = useSongStore(state => state.isAddSongModalOpen);

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
        if (formValues.file !== null && formValues.title) {
            formData.append("title", formValues.title);
            formData.append("file", formValues.file);
        }

        fetch(`${config.REST_API_URL}/song`, {
            method: "POST",
            headers: {
                "Authorization": `${localStorage.getItem("token")}`
            },
            body: formData
        })
        .then((res) => {
            if (res.status === 200) {
              res.json().then((data) => {
                handleCloseAddSongModal();
                fetchSongs();
              });
            } else {
              setIsLoading(false);
              setErrorMessage("Error adding song");
            }
        })
        .catch((err) => {
            setIsLoading(false);
            setErrorMessage(err);
        });

    }
    const handleCloseAddSongModal = () => {
      setIsLoading(false);
        setIsAddSongModalOpen(false);
        setFormValues(defaultValues);
    }
    return (
        <Modal  open={isAddSongModalOpen}
                onClose={() =>setIsAddSongModalOpen(false)}
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
                            required
                            color="secondary"
                            onChange={handleFileChange}
                            disabled={isLoading}
                            type="file"
                            InputProps={{ inputProps: { accept: "audio/*" } }}
                            />
                <Button variant="contained" color="secondary" type="submit" disabled={isLoading}>
                    {isLoading ? "Loading" : "Add Song"}
                </Button>
            </Box>
        </Modal>
        
    )
};
