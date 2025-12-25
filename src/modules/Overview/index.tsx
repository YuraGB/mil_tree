'use client';
import dynamic from 'next/dynamic';
import rawData from './dummy.json';
import { IBrigadeTree, ICommandPerson } from '@/types';
import { useTreeDnD } from '../DragnDrop/hook/useTreeDnD';

const BrigadeTree = dynamic(
  () => import('./components/units/BrigadeTree').then((mod) => mod.BrigadeTree),
  { ssr: false },
);

const data = rawData as IBrigadeTree;

export const OverviewModule = () => {
  return (
    <div>
      <BrigadeTree data={data} />
    </div>
  );
};
