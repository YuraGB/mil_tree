"use client";
import { useCallback, useEffect } from "react";
import { useDnDHelpers } from "./helpers";
import { findReport, moveReport } from "@/lib/dndMoveReports";
import {
  TReportCreateUpdatePayload,
  TReportView,
  TRoot,
} from "@/types/reports";
import z from "zod";
import { createUpdateFormSchema } from "@/modules/Reports/util/formSchemas";

function mapReportToForm(
  report: TReportView,
): z.infer<typeof createUpdateFormSchema> {
  switch (report.type) {
    case "medical":
      return {
        type: "medical",
        assignedTo: report.toPersonName ?? "",

        diagnosis: report.diagnosis ?? "",
        treatment: report.treatment ?? "",
        description: report.description ?? "",
      };

    case "complaint":
      return {
        type: "complaint",
        assignedTo: report.toPersonName ?? "",
        description: report.description ?? "",
      };

    case "release":
      return {
        type: "release",
        assignedTo: report.toPersonName ?? "",
        releaseDate: report.releaseDate
          ? new Date(report.releaseDate).toDateString()
          : new Date().toDateString(),
        reason: report.decisionReason ?? "",
      };

    case "transfer":
      return {
        type: "transfer",
        assignedTo: report.toPersonName ?? "",
        transferFrom: report.transferFrom ?? "",
        transferTo: report.transferTo ?? "",
        reason: report.decisionReason ?? "",
      };

    case "vacation":
      return {
        type: "vacation",
        assignedTo: report.toPersonName ?? "",
        vacationFrom:
          new Date(report.vacationFrom).toDateString() ??
          new Date().toDateString(),
        vacationTo: report.vacationFrom
          ? (new Date(report.vacationTo).toDateString() ??
            new Date().toDateString())
          : new Date().toDateString(),
      };
  }
}

export function useReportDnD(
  root: { [name: string]: TReportView[] },
  setRoot: React.Dispatch<React.SetStateAction<TRoot>>,
  onUpdateReport: (report: TReportCreateUpdatePayload & { id: string }) => void,
) {
  // this will update the Reports state
  // This callback will trigger if drag and drop will be successfull
  const onUpdateStateCallback = useCallback(
    (draggingId: TReportView["id"], dropTargetId: TReportView["id"]) => {
      const found = findReport(root, draggingId);
      if (!found) return;

      // update report service
      onUpdateReport({ ...mapReportToForm(found.report), id: found.report.id });

      // move the report in the UI
      setRoot((prev) => {
        if (!found) return prev;

        const updated = moveReport(
          found.report,
          prev,
          found.assigned,
          dropTargetId,
        );

        return updated ?? prev;
      });
    },
    [setRoot, onUpdateReport, root],
  );

  const { onMove, onUp, onDragStart, draggingId, dropPos, dropTargetId } =
    useDnDHelpers(onUpdateStateCallback);

  useEffect(() => {
    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
    };
  }, [draggingId, dropTargetId, dropPos, root, setRoot, onMove, onUp]);

  return {
    draggingId,
    dropTargetId,
    dropPos,
    onDragStart,
  };
}
