import { api } from "@/elysia/eden";
import { OverviewModule } from "@/modules/Overview";

export default async function OverviewData() {
  const { data } = await api.overview.get();
  if (!data) return null;
  return <OverviewModule data={data} />;
}
