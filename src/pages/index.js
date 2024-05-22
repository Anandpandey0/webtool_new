import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import Links from "@/components/Links";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Dashboard from "@/components/Dashboard";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter()
  useEffect(() => {
    if(!session)router.push('/signin')
  },[router,session])
  return (
    <>
    <h1>Home</h1>

    </>
  );
}
