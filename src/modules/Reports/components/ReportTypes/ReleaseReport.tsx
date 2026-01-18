import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ITransferReport } from "@/types/reports";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  assignedTo: z.string().min(2, {
    message: "Assigned To must be at least 2 characters.",
  }),
  releaseDate: z.string().min(10, {
    message: "Release date must be at least 10 characters.",
  }),
  reason: z.string().min(10, {
    message: "Reason must be at least 10 characters.",
  }),
});

export const ReleaseReport: React.FC<{
  children?: React.ReactNode;
  reportData?: ITransferReport;
}> = ({ children, reportData }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: reportData,
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <h3>
          <b>Complaint Report Form</b>
        </h3>
        <FormField
          control={form.control}
          name="assignedTo"
          render={({ field }) => (
            <FormItem className="my-4 border-b pb-4">
              <FormLabel>Assigned To</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="releaseDate"
          render={({ field }) => (
            <FormItem className="my-4 border-b pb-4">
              <FormLabel>Release Date</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
};
