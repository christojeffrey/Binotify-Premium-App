import { Subscription } from "@features/store/store";
import { config } from "@config";

import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";


type FeaturesSubscribersCardProps = {
  creator_id: number,
  subscriber_id: number,
  status: string,
  fetchSubscriberRequests: () => void
}
export const FeaturesSubscribersCard = ({
  creator_id,
  subscriber_id,
  status,
  fetchSubscriberRequests
}: FeaturesSubscribersCardProps) => {

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
        fetchSubscriberRequests();
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
    <div className="flex justify-between bg-white h-20 bg-opacity-10 my-4 rounded-md">
        <div className="flex-col justify-center p-4">
            <Typography component="div">User's ID: {subscriber_id}</Typography>
            <Typography component="div">Singer's ID: {creator_id}</Typography>
        </div>
        <div className="flex-row justify-center items-center p-2">
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
              <ThumbDownIcon sx={{ height: 25, width: 25 }} />
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
              <ThumbUpIcon sx={{ height: 25, width: 25 }} />
          </IconButton>
        </div>
    </div>
  );
};
