import React from 'react'
import Link from 'next/link'
import { Metadata } from 'next'

const page = () => {
  return (
    <>
      <div className="max-w-screen-xl mt-16 text-white mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-1 gap-8">
        <div className="space-y-6">
          <div className="flex gap-4">
            <h2 className="text-2xl lg:text-4xl text- font-bold">About Get Me a Chai</h2>
            <img width={56} src="wired-lineal-298-coins.gif" alt="" />
          </div>

          <p className="text-base lg:text-sm">
            Get Me a Chai is a crowdfunding platform designed for creators to fund their projects with the support of their fans. It's a space where your fans can directly contribute to your creative endeavors by buying you a chai. Unlock the potential of your fanbase and bring your projects to life.
          </p>

          <div className="space-y-4">
            <h3 className="text-lg lg:text-xl font-bold flex items-center gap-2">
              <svg className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              How It Works
            </h3>
            <ul className="list-disc text-sm list-inside">
              <li>Your fans are enthusiastic about collaborating with you on your projects.</li>
              <li>Receive support from your fans in the form of chai purchases, directly contributing to your project funding.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg lg:text-xl font-bold">Benefits for Creators</h3>
            <ul className="list-disc text-sm list-inside">
              <li>Direct financial support from your fanbase</li>
              <li>Engage with your fans on a more personal level</li>
              <li>Access to a platform tailored for creative projects</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg lg:text-xl font-bold">Benefits for Fans</h3>
            <ul className="list-disc text-sm list-inside">
              <li>Directly contribute to the success of your favorite creators</li>
              <li>Exclusive rewards and perks for supporting creators</li>
              <li>Be part of the creative process and connect with creators</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg lg:text-xl font-bold">Benefits of Collaboration</h3>
            <ul className="list-disc text-sm list-inside">
              <li>Unlock new opportunities through collaboration with fellow creators</li>
              <li>Expand your network and reach a wider audience</li>
              <li>Combine skills and resources to create innovative projects</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg lg:text-xl font-bold">Community Engagement</h3>
            <ul className="list-disc text-sm list-inside">
              <li>Interact with a supportive community of like-minded individuals</li>
              <li>Receive valuable feedback and encouragement from peers</li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center mt-20 lg:col-span-1">
          <div className="flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-4">
            <svg className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 1 1-4 0 2 2 0 0 1 4 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 21v-8m0 0V7a5 5 0 0 1 5-5h0a5 5 0 0 1 5 5v6m0 0v8m0-8h-6m6 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
            </svg>
          </div>
          <h4 className="text-lg lg:text-xl font-bold mb-2">Why Choose Us?</h4>
          <p className="text-base lg:text-md text-center">
            Transparent and secure payment processing, customizable creator profiles, flexible funding options, and a dedicated support team.
          </p>
          <Link href='/login'>
            <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center mb-2 mt-3">Get Started</button>
          </Link>
        </div>
      </div>

    </>
  )
}

export default page
export const metadata = {
  title: "About - Get me a Chai",
}