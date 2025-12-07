import { create } from 'domain';
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';
import prisma from '../../../prisma/client';
const schema = z.object({
    title: z.string().min(1).max(200),
    description: z.string().min(1),
})


export async function POST(request: NextRequest) {
    const body = await request.json();
    // Process the body data here
    const validation = schema.safeParse(body);

    if(!validation.success){
        return NextResponse.json({error: "Invalid data", details: validation.error}, {status: 400});
    }

   const newIssue = await  prisma.issue.create({
        data: {
            title: validation.data.title,
            description: validation.data.description,
        }
    });
    return NextResponse.json({ message: "Issue created successfully" }, { status: 201 });
}