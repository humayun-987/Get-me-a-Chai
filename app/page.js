'use client'
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
export default function Home() {
  const { data: session } = useSession()
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        /* isIntersecting : element is intersecting with viewport or not */
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
        else {
          entry.target.classList.remove('show');
        }
      })
    })
    const hiddenElements = document.querySelectorAll('.hidden_')
    hiddenElements.forEach((element) => observer.observe(element));
  }, [])

  return (
    <>
      <div className='mt-12 flex flex-col gap-3 justify-center items-center text-white h-[44vh] lg:h-[64vh]'>
        {/* <img className="absolute opacity-25 object-cover w-[100vw] h-[44vh]" src="istockphoto-467148153-612x612.jpg" alt="" /> */}
        <video className="object-cover absolute opacity-35 z-[2] h-[44vh] lg:h-[64vh] w-[100vw]" src="3628356-hd_1920_1080_25fps.mp4" muted autoPlay loop />
        <div className="z-[3] flex mt-2 items-center gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-5xl ">Buy me a Chai</h1>
          <span><img className='cup w-12 mb-2 2xl:w-20 lg:w-16 md:w-14' src="pngwing.com (7).png" alt="" /></span>
        </div>
        <p className='z-[3] mb-2 text-xs sm:text-sm lg:text-base text-center px-6 lg:px-14 2xl:px-20 '>
          Welcome to <strong>Buy me a Chai</strong> - a vibrant crowdfunding platform designed for creators. Here, your followers and fans can support your creative projects, helping you turn your ideas into reality. Whether you're an artist, musician, writer, or any other type of creator, our platform offers the perfect space to connect with your audience and get your projects funded.
        </p>
        <div className='z-10 my-2'>
          <Link href={session ? '/dashboard' : '/login'}>
            <button type="button" className="mr-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-3">Start now</button>
          </Link>
          <Link href='/about'>
            <button type="button" className="ml-2 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-3">Read more</button>
          </Link>
        </div>
      </div>
      <div className='bg-white h-[3px] opacity-10'>
      </div>
      <div className='text-white flex flex-col mx-auto py-8'>
        <div className="inline-block"><h1 className='w-auto text-2xl font-bold text-center mb-6'>Your Fans can buy you a Chai</h1></div>
        <div className="flex flex-wrap max-w-[100%] gap-5 justify-around mx-4 py-5">
          <div className='flex flex-col justify-center w-[360px] items-center'>
            <img className='w-20 bg-slate-800 rounded-full p-1 scaleHover' src="man.png" alt="" />
            <p className='font-semibold text-center mt-2 text-md'>Fund yourself</p>
            <p className='text-xs text-center text-slate-300 m-1'>Fans can support your creativity with a chai. Each donation directly supports your work</p>
          </div>
          <div className='flex flex-col justify-center w-[360px] items-center'>
            <img className='w-20 bg-slate-800 rounded-full p-1 scaleHover' src="woman.png" alt="" />
            <p className='font-semibold text-center mt-2 text-md'>Exclusive Content</p>
            <p className='text-xs text-center text-slate-300 m-1'>Offer fans exclusive content or early access as a thank you for their support</p>
          </div>
          <div className='flex flex-col justify-center w-[360px] items-center'>
            <img className='w-20 bg-slate-800 rounded-full p-1 scaleHover' src="man (2).png" alt="" />
            <p className='font-semibold text-center mt-2 text-md'>Community Engagement</p>
            <p className='text-xs text-center text-slate-300 m-1'>Strengthen your community connection. Fans feel more involved by buying you a chai</p>
          </div>
        </div>
      </div>
      <div className='bg-white h-[3px] opacity-10'>
      </div>
      <div className='text-white flex flex-col items-center justify-center mx-auto py-8'>
        <h1 className='text-3xl font-bold text-center mb-6'>Learn more about us</h1>

        <div className="youtubeVideos flex gap-20 justify-center items-center max-w-[100%] flex-wrap">
          <iframe className='hidden_ rounded-xl' width="360" height="202" src="https://www.youtube.com/embed/CYwEq1GdU4E?si=XwttVB12EcSOt8Gb" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <iframe className='hidden_ rounded-xl' width="360" height="202" src="https://www.youtube.com/embed/iegMqFnVocA?si=TuMnmE7cd4Y44itU" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          <iframe className='hidden_ rounded-xl' width="360" height="202" src="https://www.youtube.com/embed/QtaorVNAwbI?si=bAM3OlUM6wCF0MbJ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>
    </>
  );
}
