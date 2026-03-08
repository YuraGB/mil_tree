import { ProfileData } from '@/components/ProfileData';
import { ProfileInfo } from '@/components/ProfileInfo';
import { api } from '@/elysia/eden';
import { WidgetPage } from '@/modules/WidgetPage';
import { notFound } from 'next/navigation';

function assertData<T>(res: { data: T | null; error: unknown }): T {
  if (res.error || !res.data) {
    notFound();
  }
  return res.data;
}

const ProfilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const person = assertData(await api.persons({ id }).get());

  return (
    <article>
      <ProfileData profile={person} />

      <ProfileInfo content={person.content} />

      <WidgetPage person={person} />
    </article>
  );
};

export default ProfilePage;
