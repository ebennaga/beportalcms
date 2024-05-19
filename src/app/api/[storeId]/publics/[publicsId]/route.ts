import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; publicsId: string } }
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

    if (!params.publicsId) {
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

    const layananpublic = await prismadb.layananPublik.updateMany({
      where: {
        id: params.publicsId,
      },
      data: {
        link,
        imageUrl,
      },
    });
    return NextResponse.json(layananpublic);
  } catch (err) {
    console.log("[layanapublik_patch", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; publicsId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticaated", { status: 401 });
    }

    if (!params.publicsId) {
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

    const layananpublic = await prismadb.layananPublik.deleteMany({
      where: {
        id: params.publicsId,
      },
    });
    return NextResponse.json(layananpublic);
  } catch (err) {
    console.log("[layananpublik_delte", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { publicsId: string } }
) {
  try {
    if (!params.publicsId) {
      return new NextResponse("public id is required", { status: 400 });
    }

    const layananpublic = await prismadb.layananPublik.findUnique({
      where: {
        id: params.publicsId,
      },
    });
    return NextResponse.json(layananpublic);
  } catch (err) {
    console.log("[layananpublik_GET", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
