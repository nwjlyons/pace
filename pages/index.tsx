import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Pace from "../components/pace"

const Home: NextPage = () => {
  return (
    <>
      <main className='mx-auto max-w-screen-md'><Pace /></main>
    </>
  )
}

export default Home
