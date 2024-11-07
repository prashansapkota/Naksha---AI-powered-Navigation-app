import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { firstName, lastName, email, password, studentId } = await req.json();
        
        // Validate all fields
        if (!firstName || !lastName || !email || !password || !studentId) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        await connectMongoDB();

        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ email }, { studentId }] 
        });
        
        if (existingUser) {
            return NextResponse.json(
                { message: existingUser.email === email ? 
                    "Email already registered" : 
                    "Student ID already registered" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            studentId,
        });

        return NextResponse.json(
            { message: "User registered successfully" },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error during registration:", error);
        return NextResponse.json(
            { message: "Error occurred while registering" },
            { status: 500 }
        );
    }
} 