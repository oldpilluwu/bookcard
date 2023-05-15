import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/router'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Button, Container } from '@mui/material'
import useUser from '@/lib/useUser'
import React, { useEffect } from "react";
import Loading from '@/components/Loading'




const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()
  // const user = useUser()
  
  useEffect(() => {
    const user = localStorage.getItem("user");
    if(user) {
      router.push("/dashboard");
    }
    else{
      router.push("/auth/login");
    }
  }, [])

  return (
    <>
      <Head>
        <title>Bookcard</title>
        <meta name="description" content="Book places for Conferences, Seminars and many more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      <main className={styles.main}>
        {/* {user ? (<h1>{user.email}</h1>) : ( */}
        {/* <Container>
          <Button onClick={() => router.push('/admin/login')}>Admin Login</Button> 
          <Button onClick={() => router.push('/auth/login')}>Login</Button> 
          <Button onClick={() => router.push('/auth/signup')}>Signup</Button>
          <Button onClick={() => router.push('/auth/renter')}>Request</Button>
        </Container> */}
      {/* } */}
      <Loading />
      </main>
    </>
  )
}
