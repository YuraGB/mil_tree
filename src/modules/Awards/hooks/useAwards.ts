import { AWARDSNAMES } from "@/constants";
import { TAwardName } from "@/types/persons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import z from "zod";

const FormSchema = z.object({
  award_selector: z
    .enum(AWARDSNAMES, {
      message: "Please select an award.",
    })
    .or(z.literal("")) // <-- додає "" як валідне значення
    .optional(),
});

export const useAwards = (addAwardHandler: (awardName: TAwardName) => void) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      award_selector: "",
    },
  });

  /**
   * Handles submission of the awards form by adding the selected award and resetting the selector.
   *
   * @param data - Form values containing `award_selector`; if `award_selector` is an empty string, no action is taken.
   */
  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!data.award_selector) return;
    addAwardHandler(data.award_selector);
    form.reset({ award_selector: "" });
  }

  const currentSelectedAward = useWatch({
    control: form.control,
    name: "award_selector",
  });

  return {
    form,
    onSubmit,
    currentSelectedAward,
  };
};