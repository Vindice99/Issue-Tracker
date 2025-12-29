import { schema } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Placeholder implementation
  const body = await request.json();
  const validation = schema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(JSON.stringify({ errors: validation.error.format() }), {
      status: 400,
    });
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    return NextResponse.json(JSON.stringify({ error: "Issue not found" }), {
      status: 404,
    });
  }

 const updatedIssue = await prisma.issue.update({
    where: {id : issue.id},
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) {
    return NextResponse.json(JSON.stringify({ error: "Issue not found" }), {
      status: 404,
    });
  }
  const deletedIssue = await prisma.issue.delete({
    where: {id : issue.id},
  });

  return NextResponse.json(deletedIssue);
}