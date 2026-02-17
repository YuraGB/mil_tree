import { db } from '@/db';
import { person } from '@/db/schemas/auth-schema';
import { TDBPerson } from '@/types/persons';

export const getAllPersons = async (): Promise<TDBPerson[]> => {
  try {
    return await db.select().from(person);
  } catch (_e) {
    console.log(_e);
    return [];
  }
};

export const updatePerson = async () => {};

export const createPerson = async () => {};

export const deletePerson = async () => {};
