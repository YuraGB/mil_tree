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
import { IMedicalReport, TReportCreateUpdatePayload } from "@/types/reports/";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { SelectAssignedTo } from "../SelectAssignedTo";
import { medicalFormSchema } from "../../util/formSchemas";

export const MedicalReport: React.FC<{
  children?: React.ReactNode;
  reportData?: IMedicalReport;
  onSubmit: (data: TReportCreateUpdatePayload) => void;
}> = ({ children, reportData, onSubmit }) => {
  // Initialize the form with react-hook-form and zod validation
  const form = useForm<z.infer<typeof medicalFormSchema>>({
    resolver: zodResolver(medicalFormSchema),
    defaultValues: {
      assignedTo: reportData?.assignedToPersonId || "",
      diagnosis: reportData?.diagnosis || "",
      treatment: reportData?.treatment || "",
      description: reportData?.description || "",
      type: reportData?.type || "medical",
    },
  });

  return (
    <Form {...form}>
      <form
        id={`report-form-${reportData?.type}-id:${reportData?.id}`}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h3>
          <b>Medical Report Form</b>
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
          name='diagnosis'
          render={({ field }) => (
            <FormItem className='my-4 border-b pb-4'>
              <FormLabel>Diagnosis:</FormLabel>
              <FormControl>
                <Input placeholder='Diagnosis' {...field} />
              </FormControl>
              <FormDescription>The medical diagnosis.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='treatment'
          render={({ field }) => (
            <FormItem className='my-4 border-b pb-4'>
              <FormLabel>Treatment:</FormLabel>
              <FormControl>
                <Input placeholder='Treatment' {...field} />
              </FormControl>
              <FormDescription>The treatment plan.</FormDescription>
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
              <FormDescription>Additional details.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
};
