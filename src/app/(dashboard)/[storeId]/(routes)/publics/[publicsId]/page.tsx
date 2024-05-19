import prismadb from "@/lib/prismadb";
import React from "react";
import { PublicsForm } from "./components/publics-form";

const PublikPage = async ({ params }: { params: { publicsId: string } }) => {
  const publics = await prismadb.layananPublik.findUnique({
    where: {
      id: params.publicsId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PublicsForm initialData={publics} />
      </div>
    </div>
  );
};

export default PublikPage;
