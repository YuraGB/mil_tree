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
import { IMedicalReport } from "@/types/reports/";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  assignedTo: z.string().min(2, {
    message: "Assigned To must be at least 2 characters.",
  }),
  diagnosis: z.string().min(5, {
    message: "Diagnosis must be at least 5 characters.",
  }),
  treatment: z.string().min(5, {
    message: "Treatment must be at least 5 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

export const MedicalReport: React.FC<{
  children?: React.ReactNode;
  reportData?: IMedicalReport;
}> = ({ children, reportData }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assignedTo: reportData?.assignedToPersonId || "",
      diagnosis: reportData?.diagnosis || "",
      treatment: reportData?.treatment || "",
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
        <h3>
          <b>Medical Report Form</b>
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
          name="diagnosis"
          render={({ field }) => (
            <FormItem className="my-4 border-b pb-4">
              <FormLabel>Diagnosis:</FormLabel>
              <FormControl>
                <Input placeholder="Diagnosis" {...field} />
              </FormControl>
              <FormDescription>The medical diagnosis.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="treatment"
          render={({ field }) => (
            <FormItem className="my-4 border-b pb-4">
              <FormLabel>Treatment:</FormLabel>
              <FormControl>
                <Input placeholder="Treatment" {...field} />
              </FormControl>
              <FormDescription>The treatment plan.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {children}
      </form>
    </Form>
  );
};
