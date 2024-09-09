import { connectDB } from "@/dbConfig/dbConfig";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { username, email, password } = reqBody;
    if (!username || !email || !password) {
      return NextResponse.json({ error: "User already exist", status: 400 });
    }
    if (password.length < 8) {
      return NextResponse.json({
        error: "Password must be at least 8 characters",
        status: 400,
      });
    }
    const isUserExist = await UserModel.findOne({ email });

    if (isUserExist) {
      return NextResponse.json({ error: "User already exist", status: 400 });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    return NextResponse.json({
      message: "User created successfully",
      data: savedUser,
      status: 200,
    });
  } catch (error: any) {
    console.log("error on POST: ", error.message);
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
