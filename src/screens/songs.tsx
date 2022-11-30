import { FeaturesBarHeader } from "@features/bar";
import { FeaturesSongs } from "@features/songs/songs";
import { Box } from "@mui/material";

export const ScreensSongs = () => {
  return (
    <Box className="p-4">
      <FeaturesBarHeader />
      <FeaturesSongs />
    </Box>
  );
};
