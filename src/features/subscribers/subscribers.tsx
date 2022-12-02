import { config } from "@config";
import { Box, Typography, IconButton } from "@mui/material";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { FeaturesSubscribersCard } from "./card";
import { Subscription } from "@features/store/store";

export const FeaturesSubscribers = () => {
  let [subscribers, setSubscribers] = useState([]);
  let [pagination, setPagination] = useState({page:1, limit:2});
  let [canGoToNextPage, setCanGoToNextPage] = useState(true);
  let [canGoToPreviousPage, setCanGoToPreviousPage] = useState(false);
  useEffect(() => {
    fetchSubscriberRequests()
  }, [])
  
  const fetchSubscriberRequests = () => {
    const token = localStorage.getItem("token");
    
    // let navigate = useNavigate();

    if (!token) {
      // navigate("/login");
    } else {
      fetch(config.REST_API_URL + "/subscription/getAllSubscriptionRequests", {
        method: "GET",
        headers: {
          Authorization: token
        },
      })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.subscriptions);
        setSubscribers(data.subscriptions);
      })
      .catch((err) => {
        // console.log(err);
      });
    }
  }
  const goToNextPage = () => {
      setPagination({...pagination, page: pagination.page + 1});
  }

  const goToPreviousPage = () => {
      setPagination({...pagination, page: pagination.page - 1});
  }

  useEffect(() => {
    setCanGoToPreviousPage(pagination.page > 1)
  }, [pagination.page])

  useEffect(() => {
    setCanGoToNextPage(Math.ceil(subscribers.length / pagination.limit)  > pagination.page)
  }, [subscribers, pagination.page, pagination.limit])


  const renderSubscriberCard = (
    creator_id: number,
    subscriber_id: number,
    status: string) => {
        return (
            <FeaturesSubscribersCard
                creator_id={creator_id}
                subscriber_id={subscriber_id}
                status={status}
                fetchSubscriberRequests={fetchSubscriberRequests}
            />
        );
}

const renderSubscriberCards = () => {
    let subscriberCards: JSX.Element[] = [];
    (subscribers as Subscription[]).slice((pagination.page-1) * pagination.limit, pagination.page * pagination.limit).forEach((sub) => {
        subscriberCards.push(renderSubscriberCard(sub.creator_id, sub.subscriber_id,  sub.status));
    });
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignSelf: 'center' }}>
            {subscriberCards}
        </Box>
    );
}


  return (
    <>
      <Box className="flex-col p-4">
        <Typography variant="h5">Subscription requests</Typography>
        <Box className="flex row justify-end" > 
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
          subscribers.length > 0 ? renderSubscriberCards()
        : <p className="flex items-center justify-center h-96 text-gray-400">No subscription requests</p>
        }
      </Box>
    </>
  );
};
