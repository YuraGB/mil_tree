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
import { IVacationReport } from "@/types/reports";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  assignedTo: z.string().min(2, {
    message: "Assigned To must be at least 2 characters.",
  }),
  vacationFrom: z.string().min(2, {
    message: "Vacation From must be at least 2 characters.",
  }),
  vacationTo: z.string().min(2, {
    message: "Vacation To must be at least 2 characters.",
  }),
});

export const VacationReport: React.FC<{
  children?: React.ReactNode;
  reportData?: IVacationReport;
}> = ({ children, reportData }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      assignedTo: reportData?.assignedToPersonId || "",
      vacationFrom: new Date(reportData?.vacationFrom || "").toLocaleString(),
      vacationTo: new Date(reportData?.vacationTo || "").toLocaleString(),
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
        <h3 className="mt-1 border-t pt-1">
          <b>Vacation Report Form</b>
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
          name="vacationFrom"
          render={({ field }) => (
            <FormItem className="my-4 border-b pb-4">
              <FormLabel>Vacation From</FormLabel>
              <FormControl>
                <Input placeholder="Vacation start date" {...field} />
              </FormControl>
              <FormDescription>The start date of the vacation.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="vacationTo"
          render={({ field }) => (
            <FormItem className="my-4 border-b pb-4">
              <FormLabel>Vacation To</FormLabel>
              <FormControl>
                <Input placeholder="Vacation end date" {...field} />
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
