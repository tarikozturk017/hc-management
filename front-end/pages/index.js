import { useState, useEffect } from 'react'

import Head from 'next/head'
import SideBar from '../components/SideBar'
import Footer from '../components/Footer'



export default function Home() {
//   const [mainContent, setMainContent] = useState('Homepage')
//   const [contentSelection, setContentSelection] = useState(<TherapistPanel />)

  
  return (
    <>
      {/* <Head>
        <title>Patient Management System</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
      <main className=' h-screen bg-gradient-to-tr from-cyan-300 to-blue-300'>
        {/* <SideBar /> */}
        {/* {contentSelection} */}
      </main>
      {/* <Footer /> */}
    </>
  )
}
