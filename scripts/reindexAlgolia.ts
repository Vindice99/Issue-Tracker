import prisma from '@/prisma/client';
import { syncIssueToAlgolia } from '@/lib/algolia';

async function main() {
  const issues = await prisma.issue.findMany();
  console.log(`Found ${issues.length} issues, syncing to Algolia...`);
  for (const issue of issues) {
    try {
      await syncIssueToAlgolia(issue);
      console.log(`Synced issue ${issue.id}`);
    } catch (err) {
      console.error(`Failed to sync issue ${issue.id}:`, err);
    }
  }
  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
