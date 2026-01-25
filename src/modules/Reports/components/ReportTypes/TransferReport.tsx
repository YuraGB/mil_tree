import { Input } from "@/components/ui/input";
import { ITransferReport, TReportCreateUpdatePayload } from "@/types/reports/";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { SelectAssignedTo } from "../SelectAssignedTo";
import { transferFormSchema } from "../../util/formSchemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const TransferReport: React.FC<{
  children?: React.ReactNode;
  reportData?: ITransferReport;
  onSubmit: (data: TReportCreateUpdatePayload) => void;
}> = ({ children, reportData, onSubmit }) => {
  // Initialize the form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof transferFormSchema>>({
    resolver: zodResolver(transferFormSchema),
    defaultValues: {
      assignedTo: reportData?.assignedToPersonId || "",
      transferFrom: reportData?.transferFrom || "",
      transferTo: reportData?.transferTo || "",
      reason: reportData?.reason || "",
      type: reportData?.type || "transfer",
    },
  });

  return (
    <Form {...form}>
      <form id='form-rhf-demo' onSubmit={form.handleSubmit(onSubmit)}>
        <h3 className='mt-1 border-t pt-1'>
          <b>Transfer Report Form</b>
        </h3>
        <FormField
          control={form.control}
          name='assignedTo'
          render={({ field }) => (
            <FormItem className='my-4 border-b pb-4'>
              <FormLabel>Assigned To</FormLabel>
              <SelectAssignedTo value={field.value} onChange={field.onChange} />
              <FormDescription>
                The next person in the chain of command.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='reason'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Input placeholder='Reason for transfer' {...field} />
              </FormControl>
              <FormDescription>The reason for the transfer.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='transferFrom'
          render={({ field }) => (
            <FormItem className='my-4 border-b pb-4'>
              <FormLabel>Transfer From</FormLabel>
              <FormControl>
                <Input placeholder='Current location' {...field} />
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
          name='transferTo'
          render={({ field }) => (
            <FormItem className='my-4 border-b pb-4'>
              <FormLabel>Transfer To</FormLabel>
              <FormControl>
                <Input placeholder='New location' {...field} />
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
