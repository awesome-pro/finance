import GithubLink from "@/components/github";
import Skip from "@/components/skip";
import { SignUp, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
    <div className="h-full lg:flex flex-col items-around justify-center px-4">
      <div className="text-center space-y-4 pt-16">
          <div className="lg:hidden flex items-center justify-center gap-2 ">
            <Image
              src="/logo.svg"
              alt="Sign in"
              width={50}
              height={50}
              className="lg:hidden"
            />
            <h1 className="text-5xl font-serif">
              SBI
            </h1>
          </div>
          <h1 className="font-bold text-3xl text-[#3d6ef5]">
            Welcome to SBI
          </h1>
          <p className="text-base text-[#3d4ff0]">
            Create account to Join Us
          </p>
      </div>
      <div className="flex items-start justify-center mt-8">
        <ClerkLoaded>
          <SignUp  path="/sign-up" appearance={{}}/>

        </ClerkLoaded>
        <ClerkLoading>
          <Loader2 className="w-8 h-8 text-[#3d8ef8] animate-spin"/>
        </ClerkLoading>
        
      </div>
      <div className="flex items-center justify-between gap-4 w-full my-5">
          <Skip/>
          <GithubLink/>
      </div>
    </div>
    <div className="h-full bg-blue-600 hidden lg:flex items-center justify-center">
        <Image
          src="/complete-logo.svg"
          alt="Sign in"
          width={200}
          height={200}
        />
    </div>
    
  </div>
}