import * as React from 'react';

import Grid from '@mui/material/Grid';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRouter } from 'next/dist/client/router';
import useUser from '@/lib/useUser'
import CardLayout from '../../components/CardLayout';
import DashboardLayout from '@/components/DashboardLayout';


const theme = createTheme();

export default function Album() {

  const router = useRouter()
  const user = useUser()

  const [places, setPlaces] = React.useState([])

  React.useEffect(() => {
    fetchPlaces()
  }, [])


  const fetchPlaces = async () => {
    const res = await fetch('/api/places/places_by_userid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({userId: user.id}),
    })
    console.log(res);
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
