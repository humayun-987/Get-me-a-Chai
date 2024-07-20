import React from 'react'
import PaymentPage from '../components/PaymentPage'
import { notFound } from 'next/navigation'
import connectDB from "@/db/connectDb"
import User from "@/models/User"
import { Metadata } from 'next'

const UserName = async ({ params }) => {

  const checkUser = async () => {
    await connectDB()
    let user = await User.findOne({ username: params.username })
    if (!user) {
      return notFound()
    }
  }

  await checkUser()

  return (
    <>
      <PaymentPage username={params.username} />
    </>
  )
}

export default UserName
export async function generateMetadata({ params }) {
  return {
    title: `${params.username} - Get me a Chai`,
  }
}