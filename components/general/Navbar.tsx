import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image"; // Added Image component
import Link from "next/link";
import { redirect } from "next/navigation";
import { buttonVariants } from "../ui/button";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if(!user){
    return redirect("/api/auth/register")
  }

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 py-5 flex items-center justify-between">
        {/* Logo/Brand Section */}
        <div className="flex items-center gap-6">
          <Link href={"/"}>
            <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-600">
              <span className="block">Curated</span>
              <span className="block">Chronicles</span>
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 ml-10">
            <Link 
              href={"/"} 
              className="relative group text-sm font-medium text-gray-300 hover:text-white transition-all"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <Link 
              href={"/dashboard"} 
              className="relative group text-sm font-medium text-gray-300 hover:text-white transition-all"
            >
              Dashboard
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <Link 
              href={"/explore"} 
              className="relative group text-sm font-medium text-gray-300 hover:text-white transition-all"
            >
              Explore
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            
            <Link 
              href={"/posts"} 
              className="relative group text-sm font-medium text-gray-300 hover:text-white transition-all"
            >
              Gallery
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </div>
        </div>

        {/* Auth Section */}
        {user ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              {user.picture && (
                <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-red-500">
                  <Image
                    src={user.picture}
                    alt={user.given_name || "User"}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-col">
                <p className="text-gray-200 font-medium">{user.given_name}</p>
                <p className="text-xs text-gray-400">Author</p>
              </div>
            </div>
            <LogoutLink className={buttonVariants({
              variant: "ghost",
              className: "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
            })}>
              Logout
            </LogoutLink>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <LoginLink className={buttonVariants({
              variant: "outline",
              className: "bg-transparent text-white border-white hover:bg-white hover:text-gray-900 transition-colors"
            })}>
              Sign in
            </LoginLink>

            <RegisterLink className={buttonVariants({
              className: "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg transition-all"
            })}>
              Join the Journey
            </RegisterLink>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;