import { useState} from "react";
import TextField from "@mui/material/TextField";
import { Modal, Box, Button, Alert } from "@mui/material";
import { config } from "@config";
import { useSongStore} from "@features/store";

const defaultValues = {
    title: null,
    file: null,
  };

  type FeaturesSongsModalAddProps = {

  }

export const FeaturesSongsModalAdd = ({

}: FeaturesSongsModalAddProps) => {
    const [formValues, setFormValues] = useState(defaultValues);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

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
                setIsAddSongModalOpen(false);
                setIsLoading(false);
              });
            } else {
            setErrorMessage("Error adding song");
              setIsLoading(false);
            }
        })
        .catch((err) => {
            setErrorMessage(err);
            setIsLoading(false);
        });
    }
    const handleCloseAddSongModal = () => {
        setIsAddSongModalOpen(false);
        setFormValues(defaultValues);
    }
    return (
        <Modal open={isAddSongModalOpen} onClose={() =>setIsAddSongModalOpen(false)}>
             <Box component="form" autoComplete="off" className="flex flex-col bg-gray-300 p-5" onSubmit={handleSubmit}>
                <TextField  id="title"
                            label="Title"
                            variant="outlined"
                            required
                            margin="normal"
                            value={formValues.title}
                            onChange={handleInputChange}
                            disabled={isLoading} />
                <TextField  id="file"
                            label="Audio File"
                            variant="outlined"
                            required
                            margin="normal"
                            onChange={handleFileChange}
                            disabled={isLoading}
                            type="file"
                            InputProps={{ inputProps: { accept: "audio/*" } }}
                            />
                <Button variant="contained" type="submit" disabled={isLoading}>
                    {isLoading ? "Loading" : "Add Song"}
                </Button>
            </Box>
        </Modal>
        
    )
};
