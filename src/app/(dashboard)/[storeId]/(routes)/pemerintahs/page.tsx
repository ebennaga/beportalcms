import React from "react";
import { format } from "date-fns";
import { PemerintahClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { PemerintahColumn } from "./components/column";

const PemerintahsPage = async ({ params }: { params: { storeId: string } }) => {
  const pemerintahs = await prismadb.layananPemerintah.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formateddPemerintahs: PemerintahColumn[] = pemerintahs.map((item) => ({
    id: item.id,
    link: item.link,
    createdAt: format(item.createdAt, "MMMM do,yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PemerintahClient data={formateddPemerintahs} />
      </div>
    </div>
  );
};

export default PemerintahsPage;
