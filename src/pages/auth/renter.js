import React, { useState, useEffect } from "react";
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
import { useRouter } from "next/dist/client/router";
import axios from "axios";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  MenuHandler,
} from "@material-tailwind/react";
import Link from "next/link";

export default function SignIn() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user != null && user != undefined) {
      router.push("/dashboard");
    } else {
      setLoading(false);
    }
  }, []);

  const submitLogin = async (event) => {
    event.preventDefault();

    if (email == "" || password == "" || name == "" || phone == "") {
      setMessage("Please fill all the fields");
      toast.error("Please fill all the fields.", {
        position: "top-center",
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

    if(phone.length != 10){
      setMessage("Please enter a valid phone number");
      toast.error("Please enter a valid phone number.", {
        position: "top-center",
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

    const payload = {
      email: email,
      password: password,
      name: name,
      phone: "+880" + phone,
    };

    console.log(payload);
    const response = await axios.post("/api/auth/renter_request", payload);
    console.log(response);
    if (response.data.status) {
      { 
        toast.success("Request Sent Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        router.push("/");
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    // <Container component="main" maxWidth="xs" style={{height: "100vh"}}>

    //   <Box
    //     sx={{
    //       marginTop: 8,
    //       display: 'flex',
    //       flexDirection: 'column',
    //       alignItems: 'center',
    //     }}
    //   >
    //     <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
    //       <LockOutlinedIcon />
    //     </Avatar>
    //     <Typography component="h1" variant="h5">
    //       Renter Request
    //     </Typography>
    //     <Box component="form" noValidate sx={{ mt: 1 }}>
    //     <TextField
    //         margin="normal"
    //         required
    //         fullWidth
    //         id="name"
    //         label="Full Name"
    //         name="name"
    //         autoComplete="name"
    //         autoFocus
    //         value={name}
    //           onChange={(e) => setName(e.target.value)}
    //       />
    //       <TextField
    //         margin="normal"
    //         required
    //         fullWidth
    //         id="email"
    //         label="Email Address"
    //         name="email"
    //         autoComplete="email"
    //         autoFocus
    //         value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //       />
    //       <TextField
    //         margin="normal"
    //         required
    //         fullWidth
    //         name="password"
    //         label="Password"
    //         type="password"
    //         id="password"
    //         autoComplete="current-password"
    //         value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //       />

    //       <Button
    //         type="submit"
    //         fullWidth
    //         variant="contained"
    //         sx={{ mt: 3, mb: 2 }}
    //         onClick={submitLogin}
    //       >
    //         Send Request
    //       </Button>
    //       {/* <Grid container>
    //         <Grid item xs>
    //           <Link href="#" variant="body2">
    //             Forgot password?
    //           </Link>
    //         </Grid>
    //         <Grid item>
    //           <Link href="#" variant="body2">
    //             {"Don't have an account? Sign Up"}
    //           </Link>
    //         </Grid>
    //       </Grid> */}
    //     </Box>
    //   </Box>
    // </Container>
    <section className="flex h-screen items-center justify-center bg-gray-100">
      <Card color="transparent" shadow={true} className="bg-white p-6">
        <Typography
          variant="h4"
          color="blue-gray"
          className="mb-4 inline-block whitespace-nowrap text-center text-2xl font-bold uppercase leading-relaxed text-blue-gray-900"
        >
          Bookcard
        </Typography>
        <Typography
          color="gray"
          className="mt-1 text-center text-lg font-normal"
        >
          Register your renter account
        </Typography>
        <form className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-4 flex flex-col gap-6">
            <Input
              size="lg"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              size="lg"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative flex w-full max-w-[24rem]">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <Button
                    ripple={false}
                    variant="text"
                    color="blue-gray"
                    className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                  >
                    +880
                  </Button>
                </MenuHandler>
              </Menu>
              <Input
                size="tel"
                className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-blue-500"
                labelProps={{
                  className: "before:content-none after:content-none ml-3 ",
                }}
                containerProps={{
                  className: "min-w-0",
                }}
                label="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <Input
              type="password"
              size="lg"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button className="mt-6" fullWidth onClick={submitLogin}>
            Register
          </Button>
          <Typography color="gray" className="mt-4 font-normal">
            {"Already have an account? "}
            <Link
              href="/auth/login"
              className="font-medium text-blue-500 underline transition-colors hover:text-blue-700"
            >
              Login
            </Link>
          </Typography>
        </form>
      </Card>
    </section>
  );
}
