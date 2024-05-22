import User from "@/models/users";
import { connectMongoDB } from "@/lib/mongodb";
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: "164087396746-jupudhr6knn518lac469hs177mkt2sqh.apps.googleusercontent.com",
      clientSecret: "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"
    })
    // Add more providers here if needed
  ],
  secret: process.env.SECRET,
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
