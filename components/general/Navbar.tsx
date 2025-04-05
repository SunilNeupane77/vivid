import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { buttonVariants } from "../ui/button";

const Navbar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if(!user){
    // redirecting only works in server components
    // using next navigation
    return redirect("/api/auth/register")

  }
  return (
    <div>
      <nav className="py-5 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href={"/"}>
            <h1 className="text-3xl font-extrabold ">
              {" "}
              Information <br />
              <span className="text-red-600">Management</span>
            </h1>
          </Link>
          <div className="hidden sm:flex items-center gap-6">
            <Link className="text-sm font-medium hover:text-red-600" href={"/"}>
              Home
            </Link>
            <Link
              className="text-sm font-medium hover:text-red-600"
              href={"/dashboard"}
            >
              Dashboard
            </Link>
          </div>
        </div>
         {user?(
          <div className="flex items-center gap-4">
            <p>{user.given_name}</p>
            <LogoutLink className={buttonVariants({variant:"secondary"})}>Logout</LogoutLink>
          </div>
         ):(
          <div className="flex items-center gap-4">
          <LoginLink className={buttonVariants()}>Sign in</LoginLink>

          <RegisterLink className={buttonVariants({ variant: "secondary" })}>
            Sign up
          </RegisterLink>
        </div>
         )}
      </nav>
    </div>
  );
};

export default Navbar;
