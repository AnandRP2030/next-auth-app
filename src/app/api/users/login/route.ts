import { connectDB } from "@/dbConfig/dbConfig";
import UserModel from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
connectDB();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;
    if (!email || !password) {
      return NextResponse.json({
        error: "Email and password is required",
        status: 400,
      });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }
    const isPasswordMatch = await bcryptjs.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json({ message: "Incorrect email", status: 404 });
    }
    const tokenData = {
      userId: user._id,
      username: user.username,
      email: user.email,
    };
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY!, {
      expiresIn: "1d",
    });
    const response = NextResponse.json({
      message: "User Logged in successfully",
      status: 200,
    });
    response.cookies.set("next-token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    NextResponse.json({ error: error.message, status: 500 });
  }
}
