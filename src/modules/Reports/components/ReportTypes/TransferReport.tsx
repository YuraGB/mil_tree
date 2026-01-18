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
import { ITransferReport } from "@/types/reports/";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  assignedTo: z.string().min(2, {
    message: "Assigned To must be at least 2 characters.",
  }),
  transferFrom: z.string().min(2, {
    message: "Transfer From must be at least 2 characters.",
  }),
  transferTo: z.string().min(2, {
    message: "Transfer To must be at least 2 characters.",
  }),
  reason: z.string().min(10, {
    message: "Reason must be at least 10 characters.",
  }),
});

export const TransferReport: React.FC<{
  children?: React.ReactNode;
  reportData?: ITransferReport;
}> = ({ children, reportData }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assignedTo: reportData?.assignedToPersonId || "",
      transferFrom: reportData?.transferFrom || "",
      transferTo: reportData?.transferTo || "",
      reason: reportData?.reason || "",
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <h3 className="mt-1 border-t pt-1">
          <b>Transfer Report Form</b>
        </h3>
        <FormField
          control={form.control}
          name="assignedTo"
          render={({ field }) => (
            <FormItem className="my-4 border-b pb-4">
              <FormLabel>Assigned To</FormLabel>
              <FormControl>
                <Input placeholder="Commander name" {...field} />
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
          name="reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Input placeholder="Reason for transfer" {...field} />
              </FormControl>
              <FormDescription>The reason for the transfer.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="transferFrom"
          render={({ field }) => (
            <FormItem className="my-4 border-b pb-4">
              <FormLabel>Transfer From</FormLabel>
              <FormControl>
                <Input placeholder="Current location" {...field} />
              </FormControl>
              <FormDescription>
                The current location of the transfer.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="transferTo"
          render={({ field }) => (
            <FormItem className="my-4 border-b pb-4">
              <FormLabel>Transfer To</FormLabel>
              <FormControl>
                <Input placeholder="New location" {...field} />
              </FormControl>
              <FormDescription>
                The new location of the transfer.
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
