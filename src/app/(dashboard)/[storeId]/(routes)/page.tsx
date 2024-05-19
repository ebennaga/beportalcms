interface DashboardPageProps {
  params: { storeId: string };
}

import prismadb from "@/lib/prismadb";
import React from "react";

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });
  return <div>Welcome To Portal Banten</div>;
};

export default DashboardPage;
