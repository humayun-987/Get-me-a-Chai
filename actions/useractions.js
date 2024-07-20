'use server'
// This will not be visible on browser, works behind the scene
import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDB from "@/db/connectDb"
import User from "@/models/User"

export const initiate = async (amount, to_user, paymentform) => {
    await connectDB()
    let user = await User.findOne({username:to_user})
    let rzp_secret = user.razorPaySecret
    let rzp_keyId = user.razorPayID
    var instance = new Razorpay({
        key_id: rzp_keyId, 
        key_secret: rzp_secret
    })
    // console.log("Razorpay Instance Created:", instance); // Debugging Razorpay instance

    let options = {
        amount: Number.parseInt(amount) * 100, // Ensure amount is in paise
        currency: "INR"
    }

    let x = await instance.orders.create(options)
    // console.log("Order Created:", x); // Debugging order creation

    await Payment.create({ oid: x.id, amount: amount, to_user: to_user, name: paymentform.name, message: paymentform.message })

    return x
}
export const fetchUser = async (username) => {
    await connectDB()
    let u = await User.findOne({username:username})
    // {
    //   "_id": ObjectId("507f191e810c19729de860ea")
    // }
    // After Flattening:
    // {
    //   "_id": "507f191e810c19729de860ea"
    // }
    let user = u.toObject({flattenObjectIds:true})
    return user   
}
export const fetchPayments = async (username) => {
    await connectDB()
    // .sort({amount:-1}) is a method to sort on basis of amount but in descending order
    let p = await Payment.find({to_user:username , done:true}).sort({amount:-1}).lean()
    // let payments = p.toObject({flattenObjectIds:true})
    // console.log("hello I am Payments:",p)
    return p
}
export const updateProfile = async (data, oldusername) => {
    // ndata is the new profile data for the user
    // we check if the username is changed or not
    // if not changed then no worries
    // if changed then check that there does not exist an user with the new username assigned
    await connectDB()
    let ndata = Object.fromEntries(data)
    // if username is being updated , check if username is available
    if(oldusername !== ndata.username){
        let u = await User.findOne({username:ndata.username})
        if(u){
            return { error: "Username already exists" }
        }
        await Payment.updateMany({to_user:oldusername},{to_user:ndata.username})
    }
    // if everything is perfect find the user data from the databaseand then update the user data
    await User.updateOne({email:ndata.email}, ndata)
}