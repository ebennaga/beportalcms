import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; pemerintahsId: string } }
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { link, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticaated", { status: 401 });
    }
    if (!link) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("IMAGE is required", { status: 400 });
    }

    if (!params.pemerintahsId) {
      return new NextResponse("Public id is required", { status: 400 });
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

    const layananpemerintah = await prismadb.layananPemerintah.updateMany({
      where: {
        id: params.pemerintahsId,
      },
      data: {
        link,
        imageUrl,
      },
    });
    return NextResponse.json(layananpemerintah);
  } catch (err) {
    console.log("[layanapemerintah_patch", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; pemerintahsId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticaated", { status: 401 });
    }

    if (!params.pemerintahsId) {
      return new NextResponse("public id is required", { status: 400 });
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

    const layannanpemerintah = await prismadb.layananPemerintah.deleteMany({
      where: {
        id: params.pemerintahsId,
      },
    });
    return NextResponse.json(layannanpemerintah);
  } catch (err) {
    console.log("[layananpublik_delte", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { pemerintahsId: string } }
) {
  try {
    if (!params.pemerintahsId) {
      return new NextResponse("public id is required", { status: 400 });
    }

    const layananpemerintah = await prismadb.layananPemerintah.findUnique({
      where: {
        id: params.pemerintahsId,
      },
    });
    return NextResponse.json(layananpemerintah);
  } catch (err) {
    console.log("[layananpublik_GET", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
