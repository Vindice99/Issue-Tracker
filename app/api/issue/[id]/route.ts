import { patchIssueScheme } from "@/app/validationSchema";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { auth } from "@/auth";

export async function PATCH(
  request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

  const {id} = await params;
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Placeholder implementation
  const body = await request.json();
  const validation = patchIssueScheme.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(JSON.stringify({ errors: validation.error.format() }), {
      status: 400,
    });
  }
  //Destructure validated fields
  const {assignedToUserId,title, description} = body;
  if(assignedToUserId)
  {
    const user =await prisma.user.findUnique({
      where: {id: assignedToUserId},
    })
    if(!user){
      return NextResponse.json(JSON.stringify({ error: "Assigned user not found" }), {
        status: 404,
      });
    }
  }

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt((await params).id),
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
      title,
      description,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue);
}

export async function DELETE(
  request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
  const {id} = await params;
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt((await params).id),
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