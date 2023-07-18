import Link from 'next/link';
import Head from 'next/head'
import Navbar from './Navbar';

const Hero = () => {
  return (
    <>
      <Navbar />
      <Head>
        <title>Holonym Metrics</title>
        <meta name="description" content="Holonym usage metrics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div 
        style={{ 
          paddingTop: "20px", 
          flex: "1",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
          <h1 style={{ color: 'white', fontSize: '24px' }} >
            Holonym metrics
          </h1>
      </div>
    </>
  )
};

export default Hero;
