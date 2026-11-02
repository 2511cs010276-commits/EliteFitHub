import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    // Basic Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Please provide name, email, and password' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    let useMock = false;
    try {
      await dbConnect();
    } catch (dbErr) {
      console.warn('MongoDB connection failed. Falling back to local in-memory mock database. Error details:', dbErr.message);
      useMock = true;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (useMock) {
      if (!global.mockUsers) {
        global.mockUsers = [];
      }

      const userExists = global.mockUsers.find((u) => u.email === email);
      if (userExists) {
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 400 }
        );
      }

      const mockUser = {
        _id: 'mock_' + Math.random().toString(36).substr(2, 9),
        name,
        email,
        password: hashedPassword,
        role: 'user',
        createdAt: new Date(),
      };
      global.mockUsers.push(mockUser);

      return NextResponse.json(
        {
          message: 'User registered successfully (Demo Sandbox Mode)',
          user: {
            id: mockUser._id,
            name: mockUser.name,
            email: mockUser.email,
            role: mockUser.role,
          },
        },
        { status: 201 }
      );
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Create User
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Return created user (excluding password)
    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
