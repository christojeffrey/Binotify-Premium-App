import { FeaturesBarHeader } from "@features/bar";
import { FeaturesSubscribers } from "@features/subscribers";
import { Box } from "@mui/material";

export const ScreensSubscribers = () => {
  return (
    <Box className="p-4">
      <FeaturesBarHeader />
      <FeaturesSubscribers />
    </Box>
  );
};
