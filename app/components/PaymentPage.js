'use client'
import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from 'react'
import Script from 'next/script'
import { fetchPayments, fetchUser, initiate } from '@/actions/useractions'
import Razorpay from 'razorpay'
import { useSession } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import { Bounce } from 'react-toastify'
import { useRouter } from 'next/navigation'
const PaymentPage = ({ username }) => {

    // const {data:session} = useSession()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [paymentform, setPaymentform] = useState({
        name: '',
        message: '',
        amount: ''
    })
    // console.log("Razorpay Key ID:", process.env.NEXT_PUBLIC_KEY_ID);

    // const [totalPayments, setTotalPayments] = useState([])

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        // on successful payment from route.js we are redicted to http://localhost:3000/username?paymentdone:true
        // this paymentdone is a param
        if (searchParams.get('paymentdone') == 'true') {
            toast('🦄 Payment Successful', {
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
        router.push(`/${username}`)
    }, [])

    const [currentUser, setCurrentUser] = useState({})
    const [payments, setPayments] = useState([])

    const getData = async () => {
        const u = await fetchUser(username)
        // console.log("I am users : ", u)
        setCurrentUser(u)
        let dbPayments = await fetchPayments(username)
        // console.log("I am Payments : ", dbPayments)
        setPayments(dbPayments)
    }
    useEffect(() => {
        // console.log("I am the payments useState : ", payments)
    }, [payments])

    const [paymentsSum, setPaymentsSum] = useState(0)
    // const numbers = [1, 2, 3, 4, 5];
    // const sum = numbers.reduce((accumulator, currentValue) => {
    //   return accumulator + currentValue;
    // }, 0); // accumulator is initialised as 0
    // console.log(sum); // Output: 15
    useEffect(() => {
        let sum = payments.reduce((total, payment) => {
            return total + payment.amount
        }, 0)
        setPaymentsSum(sum)
        // console.log("Total paid amount : ",sum)
    }, [payments])

    const pay = async (amount) => {
        let a = await initiate(amount, username, paymentform)
        let orderId = a.id
        // console.log("Order ID:", orderId); // Debugging order ID

        var options = {
            "key": currentUser.razorPayID, // Ensure this is correctly printed
            "amount": amount * 100, // Amount in paise
            "currency": "INR",
            "name": "Get Me A Chai",
            "description": "Test Transaction",
            "image": "pngwing.com (7).png",
            "order_id": orderId,
            "callback_url": "http://localhost:3000/api/razorpay",
            "prefill": {
                "name": paymentform.name || "Gaurav Kumar",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            },
            "method": {
                "netbanking": true,
                "card": true,
                "upi": true,
                "wallet": true,
                "emi": true,
                "paylater": true,
                "bank_transfer": true,
            },
            "payment_capture": 1 // Auto capture payment
        };

        // console.log("Razorpay Options:", options); // Debugging options object

        // Script Loading: Ensure the Razorpay script is loaded and initialized before opening the Razorpay instance.
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
            var rzp1 = new window.Razorpay(options);
            rzp1.open();
        };
        script.onerror = () => {
            console.error("Failed to load Razorpay script");
        };
        // Why window.Razorpay(options) ?
        // Asynchronous Loading: Scripts like Razorpay's checkout.js are typically loaded asynchronously. This means that at the time your React component executes, the Razorpay object might not yet be available in the local scope. By using window.Razorpay, you ensure that you’re accessing the Razorpay instance that has been loaded globally.
        document.body.appendChild(script);
    }


    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
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
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className="cover w-full mt-12 h-[200px] sm:h-[250px] xl:h-[350px] relative">
                <img className='w-full h-[200px] sm:h-[250px] xl:h-[350px] object-cover' src={currentUser.coverPic} alt="" />
                <div className="profile w-20 h-20 sm:w-28 sm:h-28 absolute left-[50%] border-2 border-white  transform -translate-x-1/2 -bottom-14 rounded-full">
                    <img className='rounded-full' src={currentUser.profilePic} alt="" />
                </div>
            </div>
            <div className='text-white flex flex-col items-center justify-center my-16'>
                <div className="font-bold">
                    @{username}
                </div>
                <div className='text-slate-400 text-sm'>
                    Let's help {username} get a chai
                </div>
                <div className='text-slate-400 text-sm'>
                    11,831 members &nbsp;●&nbsp;  {payments.length} payments  &nbsp;●&nbsp; {paymentsSum} raised till now
                </div>
            </div>
            <div className="payment flex flex-col sm:flex-row mx-auto gap-3 text-sm text-white w-[90%] mb-10">
                <div className="support w-full sm:w-1/2 bg-slate-900 rounded-lg p-5">
                    {/* Show list of all supoorters as leaderboard */}
                    <h2 className='text-2xl my-4 font-bold'>Supporters</h2>
                    <ul className='max-h-56 overflow-y-auto'>
                        {payments.length == 0 && <li className='p-2 text-lg text-slate-400'>No payments yet</li>}
                        {payments.map((payment, i) => {
                            return <li className='my-3 text-md flex items-center gap-4'>
                                <div className="rounded-full bg-slate-200 p-1">
                                    <img width={28} src="wired-lineal-21-avatar.gif" alt="" />
                                </div>
                                <div>
                                    <div className='text-[16px]'>{payment.name} donated <span className='font-bold'>₹{payment.amount}</span></div>
                                    <div className='text-md text-slate-400'>{payment.message}. Lots of ❤️❤️❤️</div>
                                </div>
                            </li>
                        })}
                    </ul>
                </div>
                <div className="makePayment w-full sm:w-1/2 bg-slate-900 rounded-lg p-5">
                    <h2 className='text-2xl my-4 font-bold'>Make a Payment</h2>
                    <div className="flex flex-col gap-2">
                        <div className="name">
                            <input onChange={handleChange} name='name' value={paymentform.name} type="text" placeholder='Enter Name' className='rounded-md bg-slate-800 p-2 px-3 w-full' />
                        </div>
                        <div className="message">
                            <input onChange={handleChange} name='message' value={paymentform.message} type="text" placeholder='Enter Message' className='rounded-md bg-slate-800 p-2 px-3 w-full' />
                        </div>
                        <input onChange={handleChange} name='amount' value={paymentform.amount} type="Number" placeholder='Enter Amount' className='rounded-md bg-slate-800 p-2 px-3 w-full' />
                        <button type="button" onClick={() => { pay(paymentform.amount) }} disabled={paymentform.name.length < 3 || !paymentform.amount || paymentform.message.length < 5} className="w-full text-white disabled:opacity-50 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Pay</button>
                    </div>
                    <div className='flex gap-3 my-3'>
                        <button className='px-3 py-3 bg-slate-800 rounded-lg' onClick={() => { pay(10) }}>Pay ₹10</button>
                        <button className='px-3 py-3 bg-slate-800 rounded-lg' onClick={() => { pay(20) }}>Pay ₹20</button>
                        <button className='px-3 py-3 bg-slate-800 rounded-lg' onClick={() => { pay(30) }}>Pay ₹30</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PaymentPage
