import { syncLiliKnowledgeToDatabase } from "../src/lib/lili/knowledge-server.server";

async function main() {
  const result = await syncLiliKnowledgeToDatabase();
  console.log(`Lili knowledge indexed: ${result.count} chunks`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
