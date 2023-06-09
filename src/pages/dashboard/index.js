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
import CardLayout from '../../components/CardLayout';
import DashboardLayout from '@/components/DashboardLayout';
import {getter} from '@/lib/getter'


const theme = createTheme();

export default function Album({data}) {

  const router = useRouter()

  const [places, setPlaces] = React.useState([])

  React.useEffect(() => {
    fetchPlaces()
  }, [])


  const fetchPlaces = async () => {
    const res = await fetch('/api/places/all_places', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const json = await res.json()
    
    console.log(json.data)
    setPlaces(json.data)
  }

  
  return (

      <DashboardLayout page="Home">
        <div className='p-8'>
          <Grid container spacing={4}>
          {places.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4} xl={3} style={{width:"100%"}}>

                {/* <CardLayout image="/SMU_Hall.jpg" heading="SMU HALL" description="Hall room for rent with high ceilings,
                    ample natural light, and modern amenities. Perfect for conferences, and other special occasions." /> */}

                <CardLayout id={card.id} image={card.image} heading={card.name} description={card.description} />

              </Grid>
              
            ))}
            
          </Grid>
        </div>  
        </DashboardLayout>
  );
}

