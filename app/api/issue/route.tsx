import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../prisma/client';
import { schema } from '../../validationSchema';
import { syncIssueToAlgolia } from '@/lib/algolia';
export async function POST(request: NextRequest) {
    const body = await request.json();
    // Process the body data here
    const validation = schema.safeParse(body);

    if(!validation.success){
        return NextResponse.json({error: "Invalid data", details: validation.error.format()}, {status: 400});
    }

   const newIssue = await  prisma.issue.create({
        data: {
            title: validation.data.title,
            description: validation.data.description,
        }
    });

    await syncIssueToAlgolia(newIssue);

    if(!newIssue){
        return NextResponse.json({error: "Failed to create issue"}, {status: 500});
    }
    return NextResponse.json({ message: "Issue created successfully" }, { status: 201 });
}