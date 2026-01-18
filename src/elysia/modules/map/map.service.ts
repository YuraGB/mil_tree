import { db } from "@/db";
import { mapMarks } from "@/db/schemas/mapMarks";
import { TDBMark, TMark } from "@/types/map";
import { eq } from "drizzle-orm";

/**
 *
 * @returns {TDBMark[]}array of all mark types
 */
export const getAllMarkTypes = async (): Promise<TDBMark[]> => {
  try {
    return await db.select().from(mapMarks);
  } catch (e) {
    console.error("Error fetching marks:", e);
    return [];
  }
};

/**
 * @param markData {TMark}
 * @returns
 */
export const saveMark = async (markData: TMark): Promise<TDBMark | null> => {
  try {
    // Prevent duplicates
    const existing = await db
      .select()
      .from(mapMarks)
      .where(eq(mapMarks.id, markData.id))
      .limit(1);

    if (existing.length) {
      return null;
    }

    const [saved] = await db
      .insert(mapMarks)
      .values({
        ...markData,
        properties: markData.properties ?? {},
      })
      .returning();

    return saved;
  } catch (e) {
    console.error("Error fetching marks:", e);
    return null;
  }
};

/**
 *
 * @param markId {string}
 * @returns
 */
export const deleteMark = async (markId: string): Promise<string | null> => {
  try {
    const [deleted] = await db
      .delete(mapMarks)
      .where(eq(mapMarks.id, markId))
      .returning({
        id: mapMarks.id,
      });

    return deleted?.id ?? null;
  } catch (e) {
    console.error("Error delete mark:", e);
    return null;
  }
};

/**
 *
 * @param updateData {TMark}
 * @returns
 */
export const updateMark = async (
  updateData: TMark
): Promise<TDBMark | null> => {
  try {
    const [updated] = await db
      .update(mapMarks)
      .set({
        ...updateData,
        updatedAt: new Date(),
      })
      .where(eq(mapMarks.id, updateData.id))
      .returning();

    return updated;
  } catch (e) {
    console.error("Error fetching marks:", e);
    return null;
  }
};
