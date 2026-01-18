"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useWidgetSelector } from "./hooks/useWidgetSelector";
import { WIDGETS } from "@/constants";
import { TWidgetNames } from "@/types";
import React from "react";

function WidgetSelector({
  addWidgetHandler,
}: {
  addWidgetHandler: (widgetName: TWidgetNames) => void;
}) {
  const { form, onSubmit } = useWidgetSelector(addWidgetHandler);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="my-2 w-full space-y-6 rounded border p-4"
      >
        <FormField
          control={form.control}
          name="widget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Widgets</FormLabel>
              <Select
                onValueChange={field.onChange}
                value={field.value ?? undefined}
              >
                <FormControl>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select a widget to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="w-[200px]">
                  {WIDGETS.map((widget) => (
                    <SelectItem
                      key={widget}
                      value={widget.toLowerCase()}
                      className="w-[200px] capitalize"
                    >
                      {widget[0].toUpperCase() +
                        widget.substring(1).replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add a new widget</Button>
      </form>
    </Form>
  );
}

export default React.memo(WidgetSelector);
