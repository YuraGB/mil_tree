import { WidgetContainerProps } from "@/types";
import { Tooltip } from "@/components/ui/tooltip"; // Update this import to your actual UI tooltip component
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";

const WidgetContainer = ({
  children,
  widgetName,
  onRemoveHandler,
  widgetCreated: widgetDate = new Date(),
  widgetId,
}: WidgetContainerProps) => {
  return (
    <article className="relative my-2 rounded border p-6">
      <header className="relative mx-2 mb-4 flex items-center justify-between border-b pb-2">
        <section className="flex flex-col justify-items-end gap-2">
          <h3>
            {widgetName[0].toUpperCase() +
              widgetName.substring(1).replace("-", " ").replace("_", " ")}
          </h3>
          <span className="text-sm opacity-50">
            {widgetDate.toLocaleDateString()}{" "}
          </span>
        </section>
        <Tooltip defaultOpen={false} delayDuration={200}>
          <TooltipTrigger asChild>
            <button
              className="px-2 py-1 text-sm font-semibold"
              onClick={() => onRemoveHandler(widgetId)}
            >
              X
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" align="end" sideOffset={5}>
            <p className="bg-gray-400 p-1">Remove widget</p>
          </TooltipContent>
        </Tooltip>
      </header>
      {children}
    </article>
  );
};

export default WidgetContainer;
