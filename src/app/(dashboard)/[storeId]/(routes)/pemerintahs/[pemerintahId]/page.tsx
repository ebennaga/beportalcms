import prismadb from "@/lib/prismadb";
import { PemerintahsForm } from "../components/pemerintahs-form";

const PemerintahPage = async ({
  params,
}: {
  params: { pemerintahId: string };
}) => {
  const pemerintah = await prismadb.layananPemerintah.findUnique({
    where: {
      id: params.pemerintahId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8">
        <PemerintahsForm initialData={pemerintah} />
      </div>
    </div>
  );
};

export default PemerintahPage;
