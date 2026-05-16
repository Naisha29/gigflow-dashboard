import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function GET() {
  const userCount = await prisma.user.count();
  
  if (userCount === 0) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@gigflow.com',
        password: hashedPassword,
      }
    });

    // Add some sample leads
    await prisma.lead.createMany({
      data: [
        { name: 'Alice Smith', email: 'alice@example.com', status: 'New', userId: user.id },
        { name: 'Bob Johnson', email: 'bob@example.com', status: 'Contacted', userId: user.id },
        { name: 'Charlie Brown', email: 'charlie@example.com', status: 'Interviewing', userId: user.id },
      ]
    });

    return NextResponse.json({ message: 'Database seeded successfully' });
  }

  return NextResponse.json({ message: 'Database already seeded' });
}
