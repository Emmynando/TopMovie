import { NextResponse, NextRequest } from "next/server";
import prisma from "@/src/lib/db";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const movieId = url.searchParams.get("id");

    const movie = await prisma.topMovie.findUnique({
      where: {
        id: String(movieId),
      },
    });

    if (!movie) {
      return NextResponse.json(
        {
          error: "Movie not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Movie fetched successfully",
      movie,
    });
  } catch (error) {
    console.error("Error fetching movie:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch movie",
      },
      { status: 500 }
    );
  }
}

export default {
  GET,
};
