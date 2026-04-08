import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";
import DeleteButton from "../_components/DeleteButton";
import { auth } from "@/auth";
import AsigneeSelect from "./AsigneeSelect";
import StatusSelect from "./StatusSelect";
import { cache } from "react";
import Comments from "./Comments";
import MoreActionsMenu from "./MoreActionsMenu";

interface IssueDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const fetchIssue = cache(
  async (issueId: number) =>
    await prisma.issue.findUnique({ 
      where: { id: issueId },
      include: {
        comments: {
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
        },
      },
    }),
);

const IssueDetailPage = async ({ params }: IssueDetailPageProps) => {
  const { id } = await params;
  const session = await auth();
  const detailIssue = await fetchIssue(parseInt(id));

  if (!detailIssue) return notFound();

  const isAuthenticated = !!session;

  return (
    <Grid
      columns={{ initial: "1", md: "5" }}
      gap="5"
      className="max-w-6xl mx-auto px-4 py-6"
    >
      <Box className="md:col-span-4">
        <IssueDetail detailIssue={detailIssue} />
        <Comments 
          issueId={detailIssue.id} 
          comments={detailIssue.comments} 
          isAuthenticated={isAuthenticated}
        />
      </Box>
      {isAuthenticated && (
        <Box className="mt-14">
          <Flex direction="column" gap="4">
            <EditIssueButton id={detailIssue.id} />
            <DeleteButton id={detailIssue.id} />
            <MoreActionsMenu
              issueId={detailIssue.id}
              currentSeverity={detailIssue.severity}
            />
            <StatusSelect issue={detailIssue} />
            <AsigneeSelect issue={detailIssue} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

//dynamic metadata generation
export async function generateMetadata({ params }: IssueDetailPageProps) {
  const issue = await fetchIssue(parseInt((await params).id));
  return {
    title: issue ? `Issue #${issue.id} - ${issue.title}` : "Issue Not Found",
    description: issue
      ? `Details and status of issue #${issue.id}`
      : "The requested issue does not exist.",
  };
}

export default IssueDetailPage;
