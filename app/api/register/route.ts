import bcrypt from "bcrypt";
import prisma from '@/app/libs/prismadb'
import {NextResponse} from "next/server";
export async function POST(request: Request) {
  const body = await request.json();
  const {email, name, password} = body;
  const hashedPassword = await bcrypt.hash(password, 12);
  const userExistent = await prisma.user.findUnique({where: {email: email}});
  if (userExistent) {
    throw new Error('User is already registered')
  }
  const newUser = await prisma.user.create({data: {name, email, hashedPassword}});

  return NextResponse.json(newUser);
}
