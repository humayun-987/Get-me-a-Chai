'use client'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify'
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { fetchUser, updateProfile } from '@/actions/useractions'
import { Metadata } from 'next'

const Dashboard = () => {

  const { data: session, status, update } = useSession()
  const router = useRouter()
  
  // useEffect(() => {
  //   getData()
  //   if (!session) {
  //     router.push('/login')
  //   }
  //   console.log(session)
  // }, [router, session, status])

  useEffect(() => {
    document.title = 'Dashboard - Get me a Chai';
    if (status === "loading") return; // Do nothing while loading
    if (!session) {
      router.push('/login')
    } else {
      getData()
    }
    // console.log("hello i am session : ", session)
  }, [router, session, status])

  const [form, setForm] = useState({
    name: '',
    email: '',
    username: '',
    profilePic: '',
    coverPic: '',
    razorPayID: '',
    razorPaySecret: ''
  })

  const getData = async () => {
    let u = await fetchUser(session.user.name)
    setForm(u)
    // console.log("hello i am u : ", u)
    // console.log("hello i am form email : ", form.email)
    // console.log("hello i am form username : ", form.username)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    // if we write onSubmit={handleSubmit} then 'e' will be an event
    // but we want e as form data... 
    // therefore we use action = {handleSubmit}
    update()
    // The update() function in the context of useSession from next-auth/react is used to refresh the session data.
    let a = await updateProfile(e, session.user.name)
    // this 'e' is the form data, it stores form input along with its name and id which we are sending to User.updateOne()
    // to update, so keys mjust match with the User model
    toast('🦄 Profile Updated', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
  });
  }
  return (
    <>
    <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    <ToastContainer />
      <div className='text-white w-full flex flex-col items-center mt-16'>
        <h1 className='text-3xl font-bold mb-6 mt-4'>Welcome to Dashboard</h1>
        <form action={handleSubmit} className="w-3/4 lg:w-1/2">
          <div className='my-1'>
            <label htmlFor="name" className='font-semibold'>Name</label>
            <input onChange={handleChange} type="text" name='name' value={form.name ? form.name : ""} id='name' className='px-2 py-2 my-1 bg-slate-800 w-full p-1 text-sm rounded-md' />
          </div>
          <div className='my-1'>
            <label htmlFor="email" className='font-semibold'>Email</label>
            <input onChange={handleChange} type="text" name='email' value={form.email ? form.email : ""} id='email' className='px-2 py-2 my-1 bg-slate-800 w-full p-1 text-sm rounded-md' />
          </div>
          <div className='my-1'>
            <label htmlFor="username" className='font-semibold'>Username</label>
            <input onChange={handleChange} type="text" name='username' value={form.username ? form.username : ""} id='username' className='px-2 py-2 my-1 bg-slate-800 w-full p-1 text-sm rounded-md' />
          </div>
          <div className='my-1'>
            <label htmlFor="profilePic" className='font-semibold'>Profile Picture URL</label>
            <input onChange={handleChange} type="text" name='profilePic' value={form.profilePic ? form.profilePic : ""} id='profilePic' className='px-2 py-2 my-1 bg-slate-800 w-full p-1 text-sm rounded-md' />
          </div>
          <div className='my-1'>
            <label htmlFor="coverPic" className='font-semibold'>Cover Picture URL</label>
            <input onChange={handleChange} type="text" name='coverPic' value={form.coverPic ? form.coverPic : ""} id='coverPic' className='px-2 py-2 my-1 bg-slate-800 w-full p-1 text-sm rounded-md' />
          </div>
          <div className='my-1'>
            <label htmlFor="razorPayID" className='font-semibold'>Razorpay ID</label>
            <input onChange={handleChange} type="text" name='razorPayID' value={form.razorPayID ? form.razorPayID : ""} id='razorPayID' className='px-2 py-2 my-1 bg-slate-800 w-full p-1 text-sm rounded-md' />
          </div>
          <div className='my-1'>
            <label htmlFor="razorPaySecret" className='font-semibold'>Razorpay Secret</label>
            <input onChange={handleChange} type="password" name='razorPaySecret' value={form.razorPaySecret ? form.razorPaySecret : ""} id='razorPaySecret' className='px-2 py-2 my-1 bg-slate-800 w-full p-1 text-sm rounded-md' />
          </div>
          <div className='my-1'>
            <button type="submit" className="w-full text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center my-3">Save</button>
          </div>

        </form>
      </div>
    </>
  )
}

export default Dashboard