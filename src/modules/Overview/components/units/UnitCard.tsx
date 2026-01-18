"use client";
import { STATUSES } from "@/constants";
import { DynamicIcon } from "lucide-react/dynamic";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UnitNode } from "@/types/units";

export const UnitCard: React.FC<{
  node: UnitNode;
  css?: string;
}> = ({ node, css }) => {
  return (
    <section
      role="button"
      tabIndex={0}
      aria-pressed="false"
      className={`card ${css ? css : ""} relative`}
      data-node-id={node.id}
    >
      {"rank" in node ? (
        <>
          <strong className="mr-4 flex justify-between">
            <span className="text-left">{node.name}</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="absolute top-2 right-2">
                  <DynamicIcon
                    name={STATUSES[node.commander?.statusCode ?? "800"].icon}
                    size={24}
                    color={STATUSES[node.commander?.statusCode ?? "800"].color}
                  />
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  {STATUSES[node.commander?.statusCode ?? "800"].description}
                </p>
              </TooltipContent>
            </Tooltip>
          </strong>
          <div>{node?.commander?.rank}</div>
        </>
      ) : (
        <>
          <strong>{node.name}</strong>

          {node.commander && (
            <p>
              <small>{node.commander.name}</small>
              <small>{node.commander.rank}</small>
            </p>
          )}
        </>
      )}
    </section>
  );
};
