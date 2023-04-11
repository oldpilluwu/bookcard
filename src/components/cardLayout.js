import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/dist/client/router';
import useUser from '@/lib/useUser'
import { CardActionArea } from '@mui/material';
import { Refresh } from '@mui/icons-material';




const CardLayout = (props) => {
        const {image , heading , description} = props
    return ( 
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardActionArea>
            <CardMedia
                component="img"
                sx={{
                // 16:9
                pt: '56.25%',
                }}
                image={image}
                alt="random" 
            />
            <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                {heading}
                </Typography>
                <Typography>
                {description}
                </Typography>
            </CardContent>
            {/* <CardActions>
                <Button size="small">View</Button>
                <Button size="small">Book</Button>
            </CardActions> */}
            </CardActionArea>
        </Card>
    )
    }

export default CardLayout
