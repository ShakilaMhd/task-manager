
import { createAdminClient } from "@/lib/appwrite";

export default async function Home() {
  console.log(createAdminClient, "hello");

  return (
    <>
      <h1>سلام دکتر only visibke</h1>
    </>
  );
}
