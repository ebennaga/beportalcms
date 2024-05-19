import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { PubcliClient } from "./components/client";
import { PublicColumn, columns } from "./components/column";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

const PublicsPage = async ({ params }: { params: { storeId: string } }) => {
  const layananpublics = await prismadb.layananPublik.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formateddPublics: PublicColumn[] = layananpublics.map((item) => ({
    id: item.id,
    link: item.link,
    createdAt: format(item.createdAt, "MMMM do,yyyy"),
  }));

  return (
    <>
      <div className="flex col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <PubcliClient data={formateddPublics} />
        </div>
      </div>
    </>
  );
};

export default PublicsPage;
