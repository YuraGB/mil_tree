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
import { Report, TReportCreateUpdatePayload } from "@/types/reports";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { SelectAssignedTo } from "../SelectAssignedTo";
import { complaintFormSchema } from "../../util/formSchemas";

export const ComplaintReport: React.FC<{
  children?: React.ReactNode;
  reportData?: Report;
  onSubmit: (data: TReportCreateUpdatePayload) => void;
}> = ({ children, reportData, onSubmit }) => {
  // Initialize the form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof complaintFormSchema>>({
    resolver: zodResolver(complaintFormSchema),
    defaultValues: {
      assignedTo: reportData?.assignedToPersonId || "",
      description: reportData?.description || "",
      type: "complaint",
    },
  });

  return (
    <Form {...form}>
      <form
        id={`report-form-${reportData?.type}-id:${reportData?.id}`}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h3 className='mt-1 border-t pt-1'>
          <b>Complaint Report Form</b>
        </h3>
        <FormField
          control={form.control}
          name='assignedTo'
          render={({ field }) => (
            <FormItem className='my-4 border-b pb-4'>
              <FormLabel>Assigned to:</FormLabel>
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
          name='description'
          render={({ field }) => (
            <FormItem className='my-4 border-b pb-4'>
              <FormLabel>Description:</FormLabel>
              <FormControl>
                <Input placeholder='Description' {...field} />
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
