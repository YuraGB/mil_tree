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
import { IReleaseReport, TReportCreateUpdatePayload } from "@/types/reports";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { SelectAssignedTo } from "../SelectAssignedTo";
import { DataPicker } from "@/components/ui/dataPicker";
import { releaseFormSchema } from "../../util/formSchemas";

export const ReleaseReport: React.FC<{
  children?: React.ReactNode;
  reportData?: IReleaseReport;
  onSubmit: (data: TReportCreateUpdatePayload) => void;
}> = ({ children, reportData, onSubmit }) => {
  // Initialize the form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof releaseFormSchema>>({
    resolver: zodResolver(releaseFormSchema),
    defaultValues: {
      type: reportData?.type || "release",
      assignedTo: reportData?.assignedToPersonId || "",
      releaseDate: new Date(reportData?.releaseDate || "").toLocaleString(),
      reason: reportData?.releaseReason || "",
    },
  });

  return (
    <Form {...form}>
      <form id='form-rhf-demo' onSubmit={form.handleSubmit(onSubmit)}>
        <h3>
          <b>Release Report Form</b>
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
          name='releaseDate'
          render={({ field }) => (
            <FormItem className='my-4 border-b pb-4'>
              <FormLabel>Release Date</FormLabel>
              <FormControl>
                <DataPicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>The date of the release.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='reason'
          render={({ field }) => (
            <FormItem className='my-4 border-b pb-4'>
              <FormLabel>Reason</FormLabel>
              <FormControl>
                <Input placeholder='Reason' {...field} />
              </FormControl>
              <FormDescription>The reason for the release.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
};
