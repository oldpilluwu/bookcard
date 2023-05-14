import React, {useEffect, useState} from 'react';
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
import DashboardLayout from '@/components/DashboardLayout';
import CardLayout from '@/components/CardLayout';
import UserBookings from '@/components/UserBookings';
import RenterBookings from '@/components/RenterBookings';


const theme = createTheme();

export default function Album() {
  const [user, setUser] = useState({})
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);
  return (
    <DashboardLayout page="My Bookings">
        {user.role === 'USER' ? <UserBookings /> : <RenterBookings />}
        </DashboardLayout>
  );
}
