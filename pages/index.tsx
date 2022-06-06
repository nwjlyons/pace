import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Pace from "../components/pace"

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Pace" />
      </Head>
      <main className='mx-auto max-w-screen-lg'><Pace /></main>
    </>
  )
}

export default Home
