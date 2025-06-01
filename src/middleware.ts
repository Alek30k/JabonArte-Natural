// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware(async (auth) => {
//   await auth.protect();
// });

// export const config = {
//   matcher: ["/profile(.*)", "/orders(.*)"], // Solo proteger estas rutas
// };

// middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
  publicRoutes: ["/", "/productos", "/blog", "/contact", "/buscar"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
