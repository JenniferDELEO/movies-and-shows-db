import { getUserMovies } from "@/libs/sanity/api/movie";
import { authOptions } from "@/libs/sanity/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse("Authentication required", { status: 500 });
  }

  const userId = session.user.id;

  console.log(userId);

  try {
    const data = await getUserMovies(userId);
    console.log(data);
    return NextResponse.json(data, { status: 200, statusText: "Successful" });
  } catch (error) {
    return new NextResponse("Unable to fetch", {
      status: 400,
      statusText: `Unable to fetch : ${error}`,
    });
  }
}
