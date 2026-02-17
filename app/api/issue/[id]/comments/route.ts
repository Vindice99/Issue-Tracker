import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { auth } from "@/auth";
import { z } from "zod";

const commentSchema = z.object({
  text: z.string().min(1, "Comment cannot be empty").max(5000),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const validation = commentSchema.safeParse(body);
  
  if (!validation.success) {
    return NextResponse.json(
      { errors: validation.error.format() },
      { status: 400 }
    );
  }

  // Check if issue exists
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  // Create comment
  const comment = await prisma.comment.create({
    data: {
      text: validation.data.text,
      issueId: parseInt(id),
      userId: session.user.id,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  return NextResponse.json(comment);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const comments = await prisma.comment.findMany({
    where: { issueId: parseInt(id) },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json(comments);
}
