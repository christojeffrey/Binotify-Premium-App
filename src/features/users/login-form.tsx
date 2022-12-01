import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { config } from "@config";
import { useNavigate } from "react-router";

const defaultValues = {
  username: null,
  password: null,
};

export const FeaturesUsersLoginForm = () => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(defaultValues);
  const [error, setError] = useState(null);
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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    })
      .then((res) => {
        res.json().then((data) => {
          if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "/";
          } else {
            setError(data.error);
          }
        });
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const [isLoading, setIsLoading] = useState(false);
  return (
    <Box component="form" autoComplete="off" className="flex flex-col bg-gray-300 p-5" onSubmit={handleSubmit}>
      <TextField id="username" label="username" variant="outlined" required margin="normal" value={formValues.username} onChange={handleInputChange} disabled={isLoading} sx={{ input: { color: "red" } }} />
      <TextField id="password" label="password" variant="outlined" required type="password" margin="normal" value={formValues.password} onChange={handleInputChange} disabled={isLoading} />
      <div className="h-6 text-red-500">{error}</div>
      <Button variant="contained" type="submit" disabled={isLoading}>
        {isLoading ? "Loading" : "Login"}
      </Button>
      <div className="text-black">
        not yet registered? go to{" "}
        <span
          onClick={() => {
            navigate("/register");
          }}
          className="hover:cursor-pointer"
        >
          register
        </span>
      </div>
    </Box>
  );
};
