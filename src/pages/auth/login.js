import React, { useState, useEffect } from 'react';
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
import { useRouter } from 'next/dist/client/router';
import axios from 'axios';
import Loading from '@/components/Loading';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  import Link from "next/link";



export default function SignIn() {

    const router = useRouter()

    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
      const user = localStorage.getItem("user");
      if (user != null && user != undefined) {
        router.push("/dashboard");
      }
      else{
        setLoading(false);
      }
    }, []);


    const submitLogin = async (event) => {
        event.preventDefault()

        if(email == "" || password == ""){
            setMessage("Please fill all the fields");
            return;
        }

		const payload = {
			email: email,
			password: password,
		};

    
		const response = await axios.post("/api/auth/login", payload);
		console.log(response);
		if (response.data.status) {
			{
				localStorage.setItem(
					"user",
					JSON.stringify(response.data.data)
				);
				router.push("/dashboard");
			}
		}
        else{
            setMessage(response.data.message);
            setShowMessage(true);
        }
    
	};

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowMessage(false);
            console.log("ok")
        }, 3000);
        return () => clearTimeout(timer);
    }, [showMessage]);



  if(loading) {
    return <Loading />
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
      //       Sign in
      //     </Typography>
      //     <Box component="form" noValidate sx={{ mt: 1 }}>
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
      //         Login
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
      //       {"Don't have an account? "}
      //       <Link href="/auth/signup" variant="body2">
      //             Sign Up
      //       </Link>
      //     </Box>
      //   </Box>
      // </Container>
      
     <section className="h-screen flex justify-center items-center bg-gray-100">
        <Card color="transparent" shadow={true} className='p-6 bg-white'>
      <Typography variant="h4" color="blue-gray" className="text-center font-bold text-2xl leading-relaxed inline-block whitespace-nowrap uppercase text-blue-gray-900 mb-4">
        Bookcard
      </Typography>
      <Typography color="gray" className="mt-1 font-normal text-lg text-center">
        Sign in to the platform
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          <Input type="password" size="lg" label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        
        <Button className="mt-6" fullWidth onClick={submitLogin}>
          Login
        </Button>
        <Typography color="gray" className="mt-4 font-normal">
          {"Don't have an account? "}
          <Link
            href="/auth/signup"
            className="font-medium text-blue-500 underline transition-colors hover:text-blue-700"
          >
            Register.
          </Link>
        </Typography>
      </form>
    </Card>
    </section> 
  );
}