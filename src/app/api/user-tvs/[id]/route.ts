import { deleteUserTvAndStatus } from "@/libs/sanity/api/tv";
import { authOptions } from "@/libs/sanity/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  const { userTvId } = await req.json();

  if (!session) {
    return new NextResponse("Authentication required", { status: 500 });
  }

  try {
    const data = await deleteUserTvAndStatus(userTvId);
    return NextResponse.json(data, { status: 200, statusText: "Successful" });
  } catch (error) {
    return new NextResponse("Unable to fetch", {
      status: 400,
      statusText: `Unable to fetch : ${error}`,
    });
  }
}
