import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import UserModel from "@/models/userModel";
import { connectDB } from "@/dbConfig/dbConfig";

connectDB();

export async function GET(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);
    if (!userId) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }
    const user = await UserModel.findById(userId).select("-password");
    return NextResponse.json({
      status: 200,
      message: "User found",
      data: user,
    });
  } catch (error: any) {
    NextResponse.json({
      message: "Server error",
      error: error.message,
      status: 500,
    });
  }
}
