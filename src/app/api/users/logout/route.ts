import { NextResponse } from "next/server";
export async function GET() {
  try {
    const response = await NextResponse.json({
      message: "Logout successful",
      status: 200,
    });
    response.cookies.set("next-token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error: any) {
    console.log("Error on logout: ", error);
    return NextResponse.json({
      error: error.message,
      status: 500,
      message: "Server error",
    });
  }
}
