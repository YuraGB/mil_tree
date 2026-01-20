import { getAllMarkTypes, updateMark } from '@/elysia/modules/map/map.service';
import { MarkSchema } from '@/elysia/modules/map/map.validation.schemas';
import { TMark } from '@/types/map';
import { ZodFormattedError } from 'zod';

export const formatMarkDataFromDb = (
  raw:
    | Awaited<ReturnType<typeof getAllMarkTypes>>
    | Awaited<ReturnType<typeof updateMark>>,
) => {
  let valid: TMark[] = [];
  let invalid: ZodFormattedError<string | undefined>[] = [];

  if (raw == null) {
    return { valid, invalid };
  }
  if (Array.isArray(raw)) {
    const parsed = raw.map((item) => ({
      raw: item,
      result: MarkSchema.safeParse(item),
    }));

    valid = parsed
      .filter((p) => p.result.success)
      .map((p) => p.result.data as TMark);

    invalid = parsed
      .filter((p) => !p.result.success)
      .map((p) => p?.result?.error?.format())
      .filter((error) => error !== undefined) as ZodFormattedError<
      string | undefined
    >[];

    return { valid, invalid };
  } else {
    const parsed = MarkSchema.safeParse(raw);
    if (parsed.success) {
      valid = [parsed.data];
    } else {
      invalid = [parsed.error.format()];
    }
  }
  return { valid, invalid };
};
