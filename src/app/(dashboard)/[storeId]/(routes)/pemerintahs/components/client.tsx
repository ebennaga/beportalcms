"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { PemerintahColumn, columns } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface PemerintahClientProps {
  data: PemerintahColumn[];
}

export const PemerintahClient: React.FC<PemerintahClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Pemerintah(${data?.length})`}
          description="Manage Layanan pemerintah"
        />
      </div>
      <Button
        onClick={() => router.push(`/${params.storeId}/pemerintahs/new `)}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add New
      </Button>
      <Separator />
      <DataTable searchKey="link" columns={columns} data={data} />
      <Heading title="API" description="APi calls for publics " />
      <Separator />
      <ApiList entityName="pemerintahs" entityIdName="pemerintahsId" />
    </>
  );
};
