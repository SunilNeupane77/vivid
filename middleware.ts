import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default withAuth(
  async function middleware() {
    // This function will only run for protected routes
    // _req is prefixed with underscore to indicate it's intentionally unused
  },
  {
    publicPaths: ["/"],
    loginPage: "/dashboard",
    redirectTo: "/"
  }
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
  ],
};