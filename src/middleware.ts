import { NextRequest, NextResponse } from "next/server";
import { auth } from "./auth";

export async function middleware(req: NextRequest) {
  const session = await auth()
  
  const { pathname } = req.nextUrl;

  if (!session?.session_id) {
    
    return NextResponse.redirect(new URL("/auth/login", req.url)); // Redirect to login if not authenticated
  }

  
  const role = session.user_type as string; // Ensure roleType exists

  if (role !== "client") {
    return NextResponse.redirect(new URL("/auth/login", req.url)); // Redirect to login if not authenticated
  }
  // Define dashboards for each role
  // const dashboardRoutes: Record<string, string> = {
  //   admin: "/admin/dashboard",
  //   client: "/university/dashboard",
  //   student: "/student/dashboard",
  // };
  //change route to dashboard when it will ready
  const dashboardRoutes: Record<string, string> = {
    client: "/university/dashboard"
  };

  const userDashboard = dashboardRoutes[role] || "/";
  

  //Redirect users from `/` to their dashboard
  if (pathname === "/") {
    return NextResponse.redirect(new URL(userDashboard, req.url));
  }

  //Restrict access and redirect unauthorized users
  const protectedRoutes: Record<string, string[]> = {
    client: ["/university"]
  };

  const allowedRoutes = protectedRoutes[role] || [];
  if (!allowedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL(userDashboard, req.url)); // Redirect unauthorized users
  }

  return NextResponse.next();
}

// Apply middleware to relevant routes, including `/`
export const config = {
  matcher: ["/", "/university/:path*"],
};
