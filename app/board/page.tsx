import prisma from "@/prisma/client";
import { Container, Heading } from "@radix-ui/themes";
import Board from "./Board";

export default async function BoardPage() {
  // Fetch active issues for the board
  const issues = await prisma.issue.findMany({
    orderBy: { updateAt: "desc" }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950 p-6">
      <Container className="max-w-full">
        <Heading mb="5">Kanban Board</Heading>
        <Board initialIssues={issues} />
      </Container>
    </div>
  );
}

export const dynamic = "force-dynamic";
