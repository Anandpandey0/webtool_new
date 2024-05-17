import User from "@/Models/users";
import { connectMongoDB } from "@/lib/mongodb";
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
    // Add more providers here if needed
  ],
  callbacks:{
    async signIn({user,account}){
      if(account.provider === 'google'){
        const {name,email} = user;
        try {
          await connectMongoDB();
          const existingUser = await User.findOne({email});
          if(!existingUser){
            const res = await fetch('http://localhost:3000/api/registerUser',{
              method:"POST",
              headers:{
                "Content-Type":"application/json",
              },
              body:JSON.stringify({
                name,
                email
              })
            })
            if(res.ok)return user;
          } 
        } catch (error) {
          console.log(error);
        }
      }

      return user
    }
  }
 
};

export default NextAuth(authOptions);
