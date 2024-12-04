import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const SearchForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!phoneNumber) {
      setError("Please enter a valid phone number");
      return;
    }
    setError("");
    setLoading(true);
    setData(null);

    const url = `https://${process.env.REACT_APP_RAPIDAPI_HOST}/search/${phoneNumber}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_RAPIDAPI_KEY,
        "x-rapidapi-host": process.env.REACT_APP_RAPIDAPI_HOST,
      },
    };

    try {
      const response = await axios.get(url, options);
      setData(response.data.data);
    } catch (err) {
      setError(
        "Failed to fetch data. Please check the number or try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "auto" }}>
      <TextField
        label="Enter Phone Number"
        variant="outlined"
        fullWidth
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        error={!!error}
        helperText={error}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSearch}
      >
        Search
      </Button>

      {loading && (
        <CircularProgress style={{ display: "block", margin: "20px auto" }} />
      )}

      {data && (
        <Card style={{ marginTop: "20px" }}>
          <CardContent>
            <Typography variant="h6">
              Name: {data.basicInfo.name.fullName || "N/A"}
            </Typography>
            <Typography variant="body1">
              Phone: {data.phoneInfo.nationalFormat}
            </Typography>
            <Typography variant="body1">
              Carrier: {data.phoneInfo.carrier}
            </Typography>
            <Typography variant="body1">
              Country: {data.addressInfo.countryCode}
            </Typography>
            <Typography variant="body1">
              City: {data.addressInfo.city}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchForm;
