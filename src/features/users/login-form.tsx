import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { config } from "@config";

const defaultValues = {
  username: null,
  password: null,
};

export const FeaturesUsersLoginForm = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: value,
    });
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    console.log(formValues);
    fetch(`${config.REST_API_URL}/login`, {
      method: "POST",
      body: JSON.stringify(formValues),
    })
      .then((res) => {
        if (res.status === 200) {
          res.json().then((data) => {
            localStorage.setItem("token", data.token);
            window.location.href = "/";
          });
        } else {
          console.log("error");
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const [isLoading, setIsLoading] = useState(false);
  return (
    <Box component="form" autoComplete="off" className="flex flex-col bg-gray-300 p-5" onSubmit={handleSubmit}>
      <TextField id="username" label="username" variant="outlined" required margin="normal" value={formValues.username} onChange={handleInputChange} disabled={isLoading} />
      <TextField id="password" label="password" variant="outlined" required type="password" margin="normal" value={formValues.password} onChange={handleInputChange} disabled={isLoading} />
      <Button variant="contained" type="submit" disabled={isLoading}>
        {isLoading ? "Loading" : "Login"}
      </Button>
    </Box>
  );
};
