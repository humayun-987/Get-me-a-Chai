import NextAuth from 'next-auth'
// import AppleProvider from 'next-auth/providers/apple'
// import FacebookProvider from 'next-auth/providers/facebook'
// import GoogleProvider from 'next-auth/providers/google'
// import EmailProvider from 'next-auth/providers/email'
import GithubProvider from "next-auth/providers/github"
import mongoose from 'mongoose'
import User from '@/models/User'
import Payment from '@/models/Payment'
import connectDB from '@/db/connectDb'
export const authoptions = NextAuth({
  providers: [
    // OAuth authentication providers...
    // AppleProvider({
    //   clientId: process.env.APPLE_ID,
    //   clientSecret: process.env.APPLE_SECRET
    // }),
    // FacebookProvider({
    //   clientId: process.env.FACEBOOK_ID,
    //   clientSecret: process.env.FACEBOOK_SECRET
    // }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET
    // }),
    // // Passwordless / email sign in
    // EmailProvider({
    //   server: process.env.MAIL_SERVER,
    //   from: 'NextAuth.js <no-reply@example.com>'
    // }),
    GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await connectDB()
      if(account.provider === "github"){
        // Check if user already exists in database
        const currentUser = await User.findOne({email:profile.email})
        if(!currentUser){
          const newUser = new User({
            email:profile.email,
            username:profile.login,
          })
          await newUser.save()
        }
        // console.log('User object:', user);
        return true
      }
      return false
    },
    async session({session,user,token}){
      const dbUser = await User.findOne({email:session.user.email})
      // console.log("dbUser is : ",dbUser)
      // console.log("user name is : ",session.user.name)
      session.user.name = dbUser.username
      // console.log("user name is : ",dbUser.username)
      // console.log("debugging => user name is : ",session.user.name)
      return session
    },
  }
})
export {authoptions as GET, authoptions as POST}