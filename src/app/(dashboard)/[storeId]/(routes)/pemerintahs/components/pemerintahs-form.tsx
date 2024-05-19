"use client";

import { AlertModal } from "@/components/alert-modal";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { zodResolver } from "@hookform/resolvers/zod";
import { LayananPemerintah, LayananPublik, Store } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface PemerintahsFormProps {
  initialData: LayananPemerintah | null;
}

const formSchema = z.object({
  link: z.string().min(1),
  imageUrl: z.string().min(1),
});

type PemerintahsFormPropsValue = z.infer<typeof formSchema>;

export const PemerintahsForm: React.FC<PemerintahsFormProps> = ({
  initialData,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const tilte = initialData ? "Edit Pemerintah" : "Create Pemerintah";
  const description = initialData ? "Edit Pemerintah" : "Add new Pemerintah";
  const toastMessage = initialData
    ? "Pemerintah Updated"
    : " Pemerintah Created";
  const action = initialData ? "Save Changes" : "Create ";

  const form = useForm<PemerintahsFormPropsValue>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      link: "",
      imageUrl: "",
    },
  });

  const onSubmit = async (data: PemerintahsFormPropsValue) => {
    console.log(data);
    console.log("initialdata", initialData);
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/pemerintahs/${params.pemerintahId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/pemerintahs`, data);
      }

      router.push(`/${params.storeId}/pemerintahs`);
      router.refresh();
      toast.success(toastMessage);
    } catch (err) {
      toast.error("something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/pemerintahs/${params.pemerintahId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/pemerintahs`);
      toast.success("Layanan Pemerintah has been deleted");
    } catch (err) {
      toast.error("make sure you removed services first");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex items-center justify-between">
        <Heading title={tilte} description={description} />

        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image </FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="input name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};
