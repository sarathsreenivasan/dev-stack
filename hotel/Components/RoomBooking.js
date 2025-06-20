import React, { useState } from 'react';
import {
  Container, Button
} from 'react-bootstrap';
import {
  FormLabel,
  Grid,
  OutlinedInput,
  Select,
  MenuItem,
  Box,
  Paper,
  Typography
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import axios from 'axios';
import Usernavbar from './Usernavbar';

const RoomBooking = () => {
 
  const [details, setDetails] = useState({
    firstname: '',
    lastname: '',
    age: '',
    gender: '',
    proof: '',
    proofno: '',
    date: dayjs(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:9000/details', details)
      .then(res => {
        console.log(res)
        window.alert("Successfully Booked")
      })
      .catch(err => {
        console.log(err)
        window.alert("An Error occurred")
      });
  }

  return (
    <div>
      <Usernavbar/>
    <Container className="py-4">
      <Box maxWidth="600px" margin="0 auto">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Personal Details
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} direction="column">
              <Grid item>
                <FormLabel>First Name</FormLabel>
                <OutlinedInput
                  fullWidth
                  value={details.firstname}
                  onChange={e => setDetails({ ...details, firstname: e.target.value })}
                />
              </Grid>

              <Grid item>
                <FormLabel>Last Name</FormLabel>
                <OutlinedInput
                  fullWidth
                  type="text"
                  value={details.lastname}
                  onChange={e => setDetails({ ...details, lastname: e.target.value })}
                />
              </Grid>

              <Grid item>
                <FormLabel>Age</FormLabel>
                <OutlinedInput
                  fullWidth
                  type="number"
                  value={details.age}
                  onChange={(e) => setDetails({ ...details, age: e.target.value })}
                />
              </Grid>

              <Grid item>
                <FormLabel>Gender</FormLabel>
                <Select
                  fullWidth
                  value={details.gender}
                  onChange={(e) => setDetails({ ...details, gender: e.target.value })}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </Grid>

              <Grid item>
                <FormLabel>ID Proof</FormLabel>
                <OutlinedInput
                  fullWidth
                  type="text"
                  value={details.proof}
                  onChange={(e) => setDetails({ ...details, proof: e.target.value })}
                />
              </Grid>

              <Grid item>
                <FormLabel>ID Proof Number</FormLabel>
                <OutlinedInput
                  fullWidth
                  type='text'
                  value={details.proofno}
                  onChange={(e) => setDetails({ ...details, proofno: e.target.value })}
                />
              </Grid>

              <Grid item>
                <FormLabel>Booking Date</FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Select date"
                    value={details.date}
                    onChange={(newValue) => setDetails({ ...details, date: newValue })}
                    renderInput={(params) => <OutlinedInput fullWidth {...params} />}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item>
                <Button type="submit" variant="outline-primary">
                  Book Now
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    </Container>
    </div>
  );
};

export default RoomBooking;
