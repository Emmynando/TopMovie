import { NextResponse, NextRequest } from "next/server";
import prisma from "@/src/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, thumbnail, genre, movieLink, duration, plot } = body;

    const data = await prisma.topMovie.create({
      data: {
        title,
        thumbnail,
        genre,
        movieLink,
        duration: parseInt(duration, 10),
        plot,
      },
    });

    return NextResponse.json({
      message: "Movie saved successfully",
      id: data.id,
    });
  } catch (error) {
    console.error("Error saving movie:", error);
    return NextResponse.json(
      { error: "Failed to save movie" },
      { status: 500 }
    );
  }
}

// export { POST };
