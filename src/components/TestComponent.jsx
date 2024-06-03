import { sql } from "@vercel/postgres";

export default async function TestComponent({ params }) {
   const  rows = await sql `SELECT * from BUSERS`;
   console.log('qq')

  return (
    <div>
    </div>
  );
}