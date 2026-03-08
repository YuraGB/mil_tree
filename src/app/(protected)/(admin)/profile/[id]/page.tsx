import { ProfileInfo } from '@/components/ProfileInfo';
import { api } from '@/elysia/eden';
import { WidgetPage } from '@/modules/WidgetPage';
import { User } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const ProfileIcon = () => {
  return <User className="text-grey-500" size={100} strokeWidth={1.5} />;
};

function assertData<T>(res: { data: T | null; error: unknown }): T {
  if (res.error || !res.data) {
    notFound();
  }
  return res.data;
}
const ProfilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const person = assertData(await api.persons({ id }).get());

  const {
    name,
    email,
    assignmentRole,
    commanderId,
    createdAt,
    image,
    rank,
    statusCode,
    content,
    unitId,
  } = person;

  return (
    <article>
      <section className="grid grid-cols-[200px_1fr] gap-4">
        <section className="flex items-center justify-center rounded bg-neutral-100 p-4">
          {image ? (
            <Image
              src={image}
              alt={`${name}'s profile picture`}
              width={200}
              height={200}
            />
          ) : (
            <ProfileIcon />
          )}
        </section>
        <section>
          <h2 className="text-2xl font-bold">{name}</h2>
          <small className="mb-4 inline-block text-neutral-500">
            Email: {email}
          </small>
          <p className="grid grid-cols-[200px_300px] border-b py-1">
            <b className="mr-2 border-r">Assignment Role:</b> {assignmentRole}
          </p>

          <p className="grid grid-cols-[200px_300px] border-b py-1">
            <b className="mr-2 border-r">Commander ID:</b> {commanderId}
          </p>

          <p className="grid grid-cols-[200px_300px] border-b py-1">
            <b className="mr-2 border-r">Created At:</b>{' '}
            {new Date(createdAt).toLocaleDateString()}
          </p>
          <p className="grid grid-cols-[200px_300px] border-b py-1">
            <b className="mr-2 border-r">Rank:</b> {rank}
          </p>
          <p className="grid grid-cols-[200px_300px] border-b py-1">
            <b className="mr-2 border-r">Status Code:</b> {statusCode}
          </p>
          <p className="grid grid-cols-[200px_300px] border-b py-1">
            <b className="mr-2 border-r">Unit ID:</b> {unitId}
          </p>
        </section>
      </section>
      <ProfileInfo content={content} />

      <WidgetPage person={person} />
    </article>
  );
};

export default ProfilePage;
