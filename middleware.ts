import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth(
  async function middleware(req) {
    // This function will only run for protected routes
  },
  {
    // Define public paths that don't require authentication
    publicPaths: ["https://vivid-gu87.vercel.app"],
    // Optional: You can specify where to redirect unauthenticated users
    loginPage: "/dashboard",
    // Optional: Where to redirect after login
    redirectTo: "/"
  }
);

export const config = {
  matcher: [
    // Match all paths except:
    // - _next (Next.js internal routes)
    // - Static files (images, css, js, etc.)
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};