import { ChartConfig } from "@/components/ui/chart";
import { Widget } from "@/types";
import { useMemo } from "react";

export const useChartPie = (widgets: Widget[]) => {
  // ✅ Мемоїзуємо baseConfig — не перераховується, якщо widgets не змінились
  const baseConfig = useMemo<ChartConfig>(() => {
    const config: ChartConfig = {};

    for (const key of widgets || []) {
      if (key.props?.karmaValue) {
        const karma = key.props.karmaValue;
        config[key.createdAt.toDateString()] = {
          label: key.createdAt.toDateString(),
          color:
            Number(karma) > 0
              ? "var(--color-success)"
              : "var(--color-destructive)",
        };
      }
    }

    return config;
  }, [widgets]);

  // ✅ Мемоїзуємо chartData
  const chartData = useMemo(() => {
    return (
      widgets
        ?.filter((w) => typeof w.props?.karmaValue === "number")
        .map((w, i, arr) => {
          const karma = Number(w.props!.karmaValue || 0);
          const abs = Math.abs(karma);
          const intensity = Math.min(100, abs); // нормалізуємо до [0, 100]

          // ✅ Генеруємо динамічний колір через HSL
          // зелений: від hsl(140, 40%, 70%) до hsl(140, 100%, 40%)
          // червоний: від hsl(0, 40%, 70%) до hsl(0, 100%, 40%)
          const color =
            karma > 0
              ? `hsl(140, ${40 + intensity * 0.6}%, ${70 - intensity * 0.3}%)`
              : `hsl(0, ${40 + intensity * 0.6}%, ${70 - intensity * 0.3}%)`;

          return {
            value: arr.length,
            color,
            date: w.createdAt.toDateString(),
          };
        }) || []
    );
  }, [widgets]);

  return { baseConfig, chartData };
};
