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
import { Report } from "@/types/reports";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  assignedTo: z.string().min(2, {
    message: "Assigned To must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

export const ComplaintReport: React.FC<{
  children?: React.ReactNode;
  reportData?: Report;
}> = ({ children, reportData }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assignedTo: reportData?.assignedToPersonId || "",
      description: reportData?.description || "",
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        id={`report-form-${reportData?.type}-id:${reportData?.id}`}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h3 className="mt-1 border-t pt-1">
          <b>Complaint Report Form</b>
        </h3>
        <FormField
          control={form.control}
          name="assignedTo"
          render={({ field }) => (
            <FormItem className="my-4 border-b pb-4">
              <FormLabel>Assigned to:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Commander name or approved or denied"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The next person in the chain of command.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="my-4 border-b pb-4">
              <FormLabel>Description:</FormLabel>
              <FormControl>
                <Input placeholder="Description" {...field} />
              </FormControl>
              <FormDescription>
                Detailed description of the complaint.
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
