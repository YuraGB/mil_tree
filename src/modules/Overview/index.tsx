"use client";
import dynamic from "next/dynamic";
import { UnitNode } from "@/types/units";
import { FC } from "react";

const BrigadeTree = dynamic(
  () => import("./components/units/BrigadeTree").then((mod) => mod.BrigadeTree),
  { ssr: false, loading: () => <div>Loading tree…</div> },
);

export const OverviewModule: FC<{ data: UnitNode }> = ({ data }) => {
  return (
    <article className='h-full w-full p-4'>
      <BrigadeTree data={data} />
    </article>
  );
};
