import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const FormSchema = z.object({
  to: z.string(),
  from: z.string(),
  type: z.literal(["complaint", "vacation", "transfer", "medical", "release"]),
  status: z.literal(["inProgress", "approved", "declined"]),
});
export const useCreateReport = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Creating report with data:", data);
  }

  return {
    onSubmit,
    form,
  };
};
