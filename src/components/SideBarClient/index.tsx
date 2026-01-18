"use cache";

import { TSideBarLink } from "@/types/client";
import { SideBarLink } from "./SideBarLink";
import { sideBarLinks } from "@/constants";

export const SideBarClient = async ({
  links,
}: {
  links: TSideBarLink[] | typeof sideBarLinks;
}) => {
  return (
    <aside className="row-start-2 row-end-3 h-full w-full">
      <ul className="flex w-full flex-col">
        {links.map((link) => (
          <SideBarLink key={link.url} url={link.url} text={link.text} />
        ))}
      </ul>
    </aside>
  );
};
