import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button, Container } from "@mui/material";
import useUser from "@/lib/useUser";
import DashboardLayout from "@/components/DashboardLayout";
import ClientOnly from "@/lib/clientOnly";
import { Paper } from "@mui/material";
import { toast } from "react-toastify";

export default function AddPlace() {
  const user = useUser();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  const submitPlace = async (event) => {
    event.preventDefault();
    console.log(user);
    if (!name || !address || !description || !price || !image) {
      toast.error("Please fill in all the fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    try {
      const res = await fetch("/api/places/add_place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          name: name,
          address: address,
          description: description,
          price: parseFloat(price),
          image: image,
        }),
      });
      const json = await res.json();
      console.log(json);
      if (json.status) {
        toast.success("Place submitted successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Failed to submit place", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };
  function buildForm() {
    return (
      <Container style={{ height: "100vh" }}>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, height: "600px" }}
          >
            <Typography component="h1" variant="h4" align="center">
              Checkout
            </Typography>
            <Grid container spacing={3} mt={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="Place's Name"
                  name="Place's Name"
                  label="Place's Name"
                  fullWidth
                  autoComplete="given-name"
                  variant="outlined"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="Price"
                  name="Price"
                  label="Price"
                  type="number"
                  fullWidth
                  variant="outlined"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address"
                  name="address"
                  label="Address"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="outlined"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="Description"
                  name="Description"
                  label="Description"
                  fullWidth
                  autoComplete="Description"
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="Image"
                  name="Image"
                  label="Image"
                  fullWidth
                  variant="outlined"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
              </Grid>
            </Grid>
            <Container style={{ display: "flex", justifyContent: "end" }}>
              <Button
                onClick={submitPlace}
                variant="contained"
                size="large"
                color="primary"
                style={{ marginTop: "1rem", padding: "0.5rem 4rem" }}
              >
                Add
              </Button>
            </Container>
          </Paper>
        </Container>
      </Container>
    );
  }

  return (
    <DashboardLayout page="Add Place">
      <ClientOnly>{buildForm()}</ClientOnly>
    </DashboardLayout>
  );
}
