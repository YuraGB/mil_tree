import { WIDGETS } from "@/constants";
import { TWidgetNames } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const FormSchema = z.object({
  widget: z
    .enum(WIDGETS, {
      message: "Please select a widget to display.",
    })
    .or(z.literal("")) // <-- додає "" як валідне значення
    .optional(),
});

export const useWidgetSelector = (
  addWidgetHandler: (widgetName: TWidgetNames) => void,
) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!data.widget) return;
    addWidgetHandler(data.widget);
    form.reset({ widget: "" });
  }

  return {
    form,
    onSubmit,
  };
};
