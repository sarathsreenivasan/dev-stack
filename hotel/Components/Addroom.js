import React, { useState } from 'react';
import {
  Container, Button
} from 'react-bootstrap';
import {
  Checkbox,
  FormControlLabel,
  FormLabel,
  Grid,
  OutlinedInput,
  TextField,
  Select,
  MenuItem,
  Box,
  FormGroup,
  Paper,
  Typography
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Hotelnavbar from './Hotelnavbar';

const Addroom = () => {
  const [room, setRoom] = useState({
    roomno:'',
    type: '',
    size: '',
    capacity: '',
    price: '',
    description: '',
    extras: '',
    requirement: []
  });

  const [images, setImages] = useState([null, null, null, null]);

  const requirementOptions = ['wifi', 'tv', 'balcony'];

  const handleRequirementChange = (value, checked) => {
    setRoom((prev) => ({
      ...prev,
      requirement: checked
        ? [...prev.requirement, value]
        : prev.requirement.filter((r) => r !== value)
    }));
  };

  const handleInputChange = (field, value) => {
    setRoom((prev) => ({
      ...prev,
      [field]: value
    }));
  };
const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    Object.keys(room).forEach((key) => {
      if (key === 'requirement') {
        formData.append(key, JSON.stringify(room[key]));
      } else {
        formData.append(key, room[key]);
      }
    });

    images.forEach((img) => {
      if (img) formData.append('images', img);
    });

    try {
      const res = await axios.post('http://localhost:9000/addroom', formData);
      alert('Room Added Successfully!');
      console.log(res.data)
      navigate('/addroom')
    } catch (err) {
      console.error(err);
      alert('Failed to add room');
    }
  };

  return (
    <div>
      <Hotelnavbar/>
    <Container className="py-4">
      
      <Box maxWidth="600px" margin="0 auto">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Add Room
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} direction="column">
              <Grid item>
                <FormLabel>Room Number</FormLabel>
                <OutlinedInput
                  fullWidth
                  type="number"
                  value={room.roomno}
                  onChange={(e) => handleInputChange('roomno', e.target.value)}
                />
              </Grid>
              <Grid item>
                <FormLabel>Room Type</FormLabel>
                <Select
                  fullWidth
                  value={room.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                >
                  <MenuItem value="">Select Room Type</MenuItem>
                  <MenuItem value="ac">AC</MenuItem>
                  <MenuItem value="nonac">Non AC</MenuItem>
                </Select>
              </Grid>

              <Grid item>
                <FormLabel>Room Size (sq ft)</FormLabel>
                <OutlinedInput
                  fullWidth
                  type="number"
                  value={room.size}
                  onChange={(e) => handleInputChange('size', e.target.value)}
                />
              </Grid>

              <Grid item>
                <FormLabel>Capacity</FormLabel>
                <OutlinedInput
                  fullWidth
                  type="number"
                  value={room.capacity}
                  onChange={(e) => handleInputChange('capacity', e.target.value)}
                />
              </Grid>

              <Grid item>
                <FormLabel>Price</FormLabel>
                <OutlinedInput
                  fullWidth
                  type="number"
                  value={room.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                />
              </Grid>

              <Grid item>
                <FormLabel>Requirements</FormLabel>
                <FormGroup>
                  {requirementOptions.map((req) => (
                    <FormControlLabel
                      key={req}
                      control={
                        <Checkbox
                          checked={room.requirement.includes(req)}
                          onChange={(e) => handleRequirementChange(req, e.target.checked)}
                        />
                      }
                      label={req}
                    />
                  ))}
                </FormGroup>
              </Grid>

              <Grid item>
                <FormLabel>Description</FormLabel>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  value={room.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                />
              </Grid>

              <Grid item>
                <FormLabel>Extras</FormLabel>
                <OutlinedInput
                  fullWidth
                  value={room.extras}
                  onChange={(e) => handleInputChange('extras', e.target.value)}
                />
              </Grid>

              {Array.from({ length: 4 }).map((_, i) => (
                <Grid item key={i}>
                  <FormLabel>Image {i + 1}</FormLabel>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ width: '100%', padding: '10px 12px' }}
                    onChange={(e) => {
                      const newImgs = [...images];
                      newImgs[i] = e.target.files[0];
                      setImages(newImgs);
                    }}
                  />

                </Grid>
              ))}

              <Grid item>
                <Button type="submit"  variant="outline-primary">
                  Add Room
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

export default Addroom;
