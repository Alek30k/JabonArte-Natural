// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isPublicRoute = createRouteMatcher([
//   "/",
//   "/category/:path*",
//   "/products/:path*",
//   "/privacy",
//   "/product",
//   "/category",
//   "/sign-in",
//   "/sign-up",
// ]);

// export default clerkMiddleware(async (auth, request) => {
//   if (!isPublicRoute(request)) {
//     const { redirectToSignIn } = await auth();
//     return redirectToSignIn({ returnBackUrl: request.url });
//   }
// });

// export const config = {
//   matcher: [
//     "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|svg|ico|webp)$|api/webhook).*)",
//     "/",
//     "/(api|trpc)(.*)",
//   ],
// };

import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware(async (auth) => {
  await auth.protect();
});

export const config = {
  matcher: ["/profile(.*)", "/orders(.*)"], // Solo proteger estas rutas
  "Cache-Control": "public, max-age=300",
};
