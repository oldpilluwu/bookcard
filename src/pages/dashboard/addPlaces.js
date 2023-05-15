import React, { useEffect, useState } from "react"
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Container, Input } from "@mui/material";
import useUser from "@/lib/useUser";
import DashboardLayout from "@/components/DashboardLayout";
import ClientOnly from "@/lib/clientOnly";
import { Paper } from "@mui/material";
import { toast } from "react-toastify";
import { Card, Button } from "@material-tailwind/react";

export default function AddPlace() {
  const [loading, setLoading] = useState(false);
  const user = useUser();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState(null);
  const [capacity, setCapacity] = useState(0);

  const handleImageChange = (e) => {
    if(e.target.files[0]){
      if(e.target.files[0].type == "image/png" || e.target.files[0].type == "image/jpeg" || e.target.files[0].type == "image/jpg"){
        setImage(e.target.files[0]);
      }else{
        toast.error("Please upload a valid image file");
        setImage(null);
      }
    }
  }

  const submitPlace = async (event) => {
    event.preventDefault();
    if (image == null) {
      toast.error('Please upload a valid image file');
      return;
    }
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
    setLoading(true);

    
    try {

      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', 'bookcard');

      const imgRes = await fetch('https://api.cloudinary.com/v1_1/dtlxcmpxa/image/upload', {
        method: 'POST',
        body: formData
      });

      const imgJson = await imgRes.json();
      console.log(imgJson);
      if (!imgJson.secure_url) {
        toast.error("Failed to upload image", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false);
        return;
      }


      const payload = {
        userId: JSON.parse(localStorage.getItem('user')).id,
        name: name,
        address: address,
        description: description,
        price: price,
        capacity: capacity,
        image: imgJson.secure_url
      }
      console.log(payload)
      
      const res = await fetch('/api/places/add_place', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      

      const json = await res.json();
      console.log(json);
      if (json.status) {
        setName("");
        setAddress("");
        setDescription("");
        setPrice(0);
        setImage("");
        setCapacity(0);
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
    setLoading(false);
  };
  
  function buildForm() {
    return (
      <div className="h-full bg-gray-100 md:p-8 flex justify-center">
        <Card className="h-full bg-white p-8 w-full md:w-2/3">
          <Typography component="h1" variant="h4" align="center">
            Add Place
          </Typography>
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12}>
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
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="Capacity"
              name="Capacity"
              label="Capacity"
              type="number"
              fullWidth
              variant="outlined"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
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
              multiline
              rows={4}
              onChange={(e) => setDescription(e.target.value)}
  
            />
          </Grid>
          
          
          <Grid item xs={12} >
            <label
              htmlFor="formFile"
              className="mb-2 inline-block text-neutral-700"
              >Upload Image</label
            >
            <input
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none "
              type="file"
              id="formFile"
              hidden
              onChange={handleImageChange} />
          </Grid>
          
          
        </Grid>
        <Button disabled={loading} onClick={submitPlace}   className="w-full mt-8 py-2 text-lg font-normal" >
          Add
        </Button>
        </Card>
        
      </div>
    )
  }


  return (
    <DashboardLayout page="Add Place">
      <ClientOnly>{buildForm()}</ClientOnly>
    </DashboardLayout>
  );
}
