import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '@/lib/models/user';
import bcrypt from 'bcrypt';
import { connectToDB } from '@/lib/mongoose';
import GoogleProvider from "next-auth/providers/google";

const options: NextAuthOptions = {
  secret: process.env.SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        connectToDB()
        const user = await User.findOne({email});
        if(password) {
          const passwordOk = user && bcrypt.compareSync(password, user.password);
          if (passwordOk) {
            return user;
          }
        }  
        return null
      }
    })
  ],
}  

export default options;
