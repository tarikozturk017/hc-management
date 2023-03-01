import Head from 'next/head'
import SideBar from "./SideBar";
import Footer from "./Footer";

const Layout = (props) => {
    return (
        <>
            <Head>
                <title>Patient Management System</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SideBar />
                <div className=" h-screen bg-gradient-to-tr from-cyan-300 to-blue-300">
                    {props.children}
                </div>
            <Footer />
        </>
    )
}

export default Layout