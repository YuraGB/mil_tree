import { PageWrapper } from "@/components/PageWrapper";
import { SideBarClient } from "@/components/SideBarClient";
import { sideBarLinks } from "@/constants";

export default function LayoutClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageWrapper
      sidebar={<SideBarClient links={sideBarLinks} key={"side"} />}
      classes={{
        root: "grid-cols-[150px_minmax(0,1fr)] justify justify-items-start",
        main: "w-full h-full",
      }}
    >
      {children}
    </PageWrapper>
  );
}
