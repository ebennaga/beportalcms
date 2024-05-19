"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { LayananPublik } from "@prisma/client";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { PublicColumn, columns } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface PublicsClientProps {
  data: PublicColumn[];
}

export const PubcliClient: React.FC<PublicsClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Layanan Public(${data.length})`}
          description="Manage Publics"
        />
        <Button onClick={() => router.push(`/${params.storeId}/publics/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />

      <DataTable searchKey="link" columns={columns} data={data} />
      <Heading title="API" description="APi calls for publics " />
      <Separator />
      <ApiList entityName="publics" entityIdName="publicsId" />
    </>
  );
};
