import { db } from '@/db';
import { person } from '@/db/schemas/auth-schema';
import { TDBPerson, TPersonsRespons } from '@/types/persons';
import { eq } from 'drizzle-orm';

export const getAllPersons = async (): Promise<TDBPerson[]> => {
  try {
    return await db.select().from(person);
  } catch (_e) {
    console.log(_e);
    return [];
  }
};

export const getPersonById = async (id: string): Promise<TDBPerson | null> => {
  try {
    const [user] = await db.select().from(person).where(eq(person.id, id));
    return user || null;
  } catch (_e) {
    console.log(_e);
    return null;
  }
};

export const updatePerson = async (
  id: string,
  data: Omit<TPersonsRespons, 'id' | 'createdAt' | 'updatedAt'>,
) => {
  console.log('Updating person with data:', data);
  try {
    const [updatedUser] = await db
      .update(person)
      .set({
        name: data.name,
        rank: data.rank as TDBPerson['rank'],
        statusCode: data.statusCode as TDBPerson['statusCode'],
        assignmentRole: data.assignmentRole as TDBPerson['assignmentRole'],
        content: data.content,
        image: data.image,
        commanderId: data.commanderId,
        unitId: data.unitId,
        updatedAt: new Date(),
        email: data.email,
        emailVerified: data.emailVerified,
      })
      .where(eq(person.id, id))
      .returning();
    return updatedUser;
  } catch (_e) {
    console.log(_e);
    return null;
  }
};

export const createPerson = async () => {};

export const deletePerson = async () => {};
