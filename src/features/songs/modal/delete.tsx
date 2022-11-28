import { useState} from "react";
import TextField from "@mui/material/TextField";
import { Modal, Box, Button, Alert } from "@mui/material";
import { config } from "@config";

const defaultValues = {
    title: null,
    audio_file: null,
  };

  type FeaturesSongsModalDeleteProps = {
    isDeleteSongModalOpen: boolean,
    song_id: number,
    setIsDeleteSongModalOpen: (isDeleteSongModalOpen: boolean) => void
  }

export const FeaturesSongsModalDelete = ({
        isDeleteSongModalOpen,
        song_id,
        setIsDeleteSongModalOpen
    }: FeaturesSongsModalDeleteProps) => {
// : FC<FeaturesSongsModalAddProps> = ({
//     isAddSongModalOpen
//   }) => {
    const [formValues, setFormValues] = useState(defaultValues);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    const handleDelete = (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        fetch(`${config.REST_API_URL}/song/${song_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "multipart/form-data; boundary=<calculated when request is sent>",
                "Authorization": `${localStorage.getItem("token")}`
            }
        })
        .then((res) => {
            if (res.status === 200) {
              res.json().then((data) => {
                window.location.href = "/";
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
    return (
        <Modal
            open={isDeleteSongModalOpen}
            onClose={() => setIsDeleteSongModalOpen(false)}>
             <Box component="form" autoComplete="off" className="flex flex-col bg-gray-300 p-5" onSubmit={handleDelete}>
                <p1>Are you sure want to delete this song?</p1>
                <Button variant="contained" type="submit" disabled={isLoading}>
                    {isLoading ? "Loading" : "Yes"}
                </Button>
            </Box>
        </Modal>
        
    )
};
