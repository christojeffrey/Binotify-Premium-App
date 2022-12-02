import { Subscription } from "@features/store/store";
import { config } from "@config";

import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useNavigate } from "react-router-dom";

export const FeaturesSubscribersCard = ({ creator_id, subscriber_id, status }: Subscription) => {
  let navigate = useNavigate();

  const handleAccept = () => {
    const body = {
      status: "ACCEPTED",
    };
    fetch(config.REST_API_URL + `/subscription/${creator_id}/${subscriber_id}`, {
      method: "PATCH",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        navigate(0);
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  };

  const handleReject = () => {
    const body = {
      status: "REJECTED",
    };
    fetch(config.REST_API_URL + `/subscription/${creator_id}/${subscriber_id}`, {
      method: "PATCH",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        navigate(0);
      })
      .catch((err) => {
        alert("Something went wrong");
      });
  };
  return (
    <Card className="play-audio-card-container my-1">
      <Box className="play-audio-card-content-container" sx={{ display: "flex", flexDirection: "row" }}>
        <CardContent>
          <Box>
            <Typography component="div">User's ID: {subscriber_id}</Typography>
            <Typography component="div">Singer's ID: {creator_id}</Typography>
          </Box>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton
            aria-label="Reject"
            onClick={handleReject}
            sx={{
              "&:hover": {
                color: "red",
                cursor: "pointer",
              },
            }}
          >
            <ThumbDownIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton
            aria-label="Accept"
            onClick={handleAccept}
            sx={{
              "&:hover": {
                color: "green",
                cursor: "pointer",
              },
            }}
          >
            <ThumbUpIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};
