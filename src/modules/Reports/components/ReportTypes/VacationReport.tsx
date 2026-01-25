import { IVacationReport, TReportCreateUpdatePayload } from "@/types/reports";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { SelectAssignedTo } from "../SelectAssignedTo";
import { DataPicker } from "@/components/ui/dataPicker";
import { vacationFormSchema } from "../../util/formSchemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export const VacationReport: React.FC<{
  children?: React.ReactNode;
  reportData?: IVacationReport;
  onSubmit: (data: TReportCreateUpdatePayload) => void;
}> = ({ children, reportData, onSubmit }) => {
  // Initialize the form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof vacationFormSchema>>({
    resolver: zodResolver(vacationFormSchema),
    defaultValues: {
      assignedTo: reportData?.assignedToPersonId || "",
      vacationFrom: new Date(reportData?.vacationFrom || "").toLocaleString(),
      vacationTo: new Date(reportData?.vacationTo || "").toLocaleString(),
      type: reportData?.type || "vacation",
    },
  });

  return (
    <Form {...form}>
      <form id='form-rhf-demo' onSubmit={form.handleSubmit(onSubmit)}>
        <h3 className='mt-1 border-t pt-1'>
          <b>Vacation Report Form</b>
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
          name='vacationFrom'
          render={({ field }) => (
            <FormItem className='my-4 border-b pb-4'>
              <FormLabel>Vacation From</FormLabel>
              <FormControl>
                <DataPicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>The start date of the vacation.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='vacationTo'
          render={({ field }) => (
            <FormItem className='my-4 border-b pb-4'>
              <FormLabel>Vacation To</FormLabel>
              <FormControl>
                <DataPicker value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>The end date of the vacation.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
};
