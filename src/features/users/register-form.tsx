import { Box, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { config } from "@config";
import { setDefaultResultOrder } from "dns/promises";

const defaultValues = {
  name: null,
  username: null,
  password: null,
  email: null,
  confirmPassword: null,
};

export const FeaturesUsersRegisterForm = () => {
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
    // check if passwords match
    if (formValues.password !== formValues.confirmPassword) {
      alert("Passwords do not match");
      setIsLoading(false);
      return;
    }
    let editedFormValues: any = { ...formValues };
    delete editedFormValues.confirmPassword;

    fetch(`${config.REST_API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedFormValues),
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
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Box component="form" autoComplete="off" className="flex flex-col bg-gray-300 p-5" onSubmit={handleSubmit}>
      <TextField color="secondary" id="name" label="name" variant="outlined" required margin="normal" value={formValues.name} onChange={handleInputChange} disabled={isLoading} />
      <TextField color="secondary" id="username" label="username" variant="outlined" required margin="normal" value={formValues.username} onChange={handleInputChange} disabled={isLoading} />
      <TextField color="secondary" id="email" label="email" variant="outlined" required margin="normal" type="email" value={formValues.email} onChange={handleInputChange} disabled={isLoading} />
      <TextField color="secondary" id="password" label="password" variant="outlined" required type="password" margin="normal" value={formValues.password} onChange={handleInputChange} disabled={isLoading} />
      {/* confirm password */}
      <TextField color="secondary" id="confirmPassword" label="confirm password" variant="outlined" required type="password" margin="normal" value={formValues.confirmPassword} onChange={handleInputChange} disabled={isLoading} />

      <div color="error" className="h-6 text-red-500">{error}</div>
      <Button color="secondary" variant="contained" type="submit" disabled={isLoading}>
        {isLoading ? "Loading" : "Register"}
      </Button>
    </Box>
  );
};
