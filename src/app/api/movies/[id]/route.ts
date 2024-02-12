import { deleteMovieAndUser } from "@/libs/sanity/api/movie";
import { authOptions } from "@/libs/sanity/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const { movieId } = await req.json();

  if (!session) {
    return new NextResponse("Authentication required", { status: 500 });
  }

  const userId = session.user.id;

  try {
    const data = await deleteMovieAndUser(movieId, userId);
    return NextResponse.json(data, { status: 200, statusText: "Successful" });
  } catch (error) {
    return new NextResponse("Unable to fetch", {
      status: 400,
      statusText: `Unable to fetch : ${error}`,
    });
  }
}
