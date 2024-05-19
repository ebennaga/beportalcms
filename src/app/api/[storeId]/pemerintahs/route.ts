import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { link, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!link) {
      return new NextResponse("Link is Required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image is Required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Layanan is Required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const layananpemerintah = await prismadb.layananPemerintah.create({
      data: {
        link,
        imageUrl,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(layananpemerintah);
  } catch (err) {
    console.log("[PEMERINTAH_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Layanan is Required", { status: 400 });
    }

    const layananpemerintah = await prismadb.layananPemerintah.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(layananpemerintah);
  } catch (err) {
    console.log("[PUBLICS_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
