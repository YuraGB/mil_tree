import { db } from '@/db';
import { unit } from '@/db/schemas/unit';
import { TDBUnit } from '@/types/units';

export const getAllUnits = async (): Promise<TDBUnit[] | null> => {
  try {
    return await db.select().from(unit);
  } catch (_e) {
    console.log(_e);
    return null;
  }
};

export const updateUnite = async () => {};
