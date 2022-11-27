import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";

export const FeaturesUsersLoginForm = () => {
  return (
    <Box component="form" autoComplete="off">
      asdf
      <TextField id="username" label="username" variant="outlined" required />
      <TextField id="password" label="password" variant="outlined" required type="password" />
      <TextField />
    </Box>
  );
};
