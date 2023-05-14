import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Button from '@mui/material/Button';
// import CameraIcon from '@mui/icons-material/PhotoCamera';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import CssBaseline from '@mui/material/CssBaseline';
// import Grid from '@mui/material/Grid';
// import Stack from '@mui/material/Stack';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/dist/client/router';
import useUser from '@/lib/useUser'
import { CardActionArea } from '@mui/material';
import { Refresh } from '@mui/icons-material';

import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Tooltip,
    IconButton,
  } from "@material-tailwind/react";




const CardLayout = (props) => {
        const {id, image , heading , description} = props
        const router = useRouter()
    return ( 
        // <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        //     <CardActionArea>
        //     <CardMedia
        //         component="img"
                
        //         image={image}
        //         alt="random" 
        //     />
        //     <CardContent sx={{ flexGrow: 1 }}>
        //         <Typography gutterBottom variant="h5" component="h2">
        //         {heading}
        //         </Typography>
        //         <Typography>
        //         {description}
        //         </Typography>
        //     </CardContent>
        //     {/* <CardActions>
        //         <Button size="small">View</Button>
        //         <Button size="small">Book</Button>
        //     </CardActions> */}
        //     </CardActionArea>
        // </Card>
        <Card className="w-full max-w-[26rem] shadow-lg">
      <CardHeader floated={false} color="blue-gray" className='max-h-40'>
        <img
          src={image}
          alt="ui/ux review check"
          className='w-fit object-contain'
          
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            {heading}
          </Typography>
          
        </div>
        <Typography color="gray">
          {description}
        </Typography>
       
      </CardBody>
      <CardFooter className="pt-3">
        <Button size="lg" fullWidth={true} onClick={() => router.push(`/dashboard/place/${id}`)}>
          Reserve
        </Button>
      </CardFooter>
    </Card>

    )
    }

export default CardLayout
