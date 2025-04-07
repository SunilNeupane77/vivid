import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // Allow root path without authentication
  if (req.nextUrl.pathname === "/") {
    return NextResponse.next();
  }

  // Apply Kinde auth to all other routes
  return withAuth(req, {
    loginPage: "/dashboard", // Redirect unauthenticated users here
    redirectTo: "/" // Redirect after login
  });
}

export const config = {
  matcher: [
    // Match all paths except:
    // - Root path ("/")
    // - Next.js internal routes (_next)
    // - Static files
    "/((?!^/$|_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)"
  ]
};