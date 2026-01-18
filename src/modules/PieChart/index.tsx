"use client";
import React from "react";
import { Cell, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Widget } from "@/types";
import { useChartPie } from "./hooks/useChartPie";
import { TooltipProps } from "recharts";

export const description = "A pie chart with no separator";

const tooltipFormatter: TooltipProps<number, string>["formatter"] = (name) => [
  `Created at ${name}`,
];

function ChartPieComponent({ widgets }: { widgets?: Widget[] }) {
  const { baseConfig, chartData } = useChartPie(widgets || []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total karma</CardTitle>
        <CardDescription>
          Edit widget has Karma widget that describes positive or negative
          effects for the people
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={baseConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              formatter={tooltipFormatter}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="value" nameKey="date" stroke="0">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Positive and Negative Karma Points.
        </div>
        <div className="text-muted-foreground leading-none">
          Summary of the karma points. Read Only. The data is taken from the all
          widgets on the page
        </div>
      </CardFooter>
    </Card>
  );
}

ChartPieComponent.displayName = "ChartPieComponent";
// ✅ Обгортаємо в React.memo — не ререндериться, якщо widgets не змінились за посиланням
export const ChartPie = React.memo(ChartPieComponent);
