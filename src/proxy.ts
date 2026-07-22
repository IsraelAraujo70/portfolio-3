import { NextResponse, type NextRequest } from "next/server";
import { isMobileDevice } from "@/lib/device";

export function proxy(request: NextRequest) {
  const mobile = isMobileDevice(
    request.headers.get("user-agent"),
    request.headers.get("sec-ch-ua-mobile"),
  );
  const destination = mobile ? "/mobile" : "/desktop";

  return NextResponse.rewrite(new URL(destination, request.url));
}

export const config = {
  matcher: "/",
};
