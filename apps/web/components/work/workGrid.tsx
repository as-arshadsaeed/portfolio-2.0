"use client";

import { usePathname } from "next/navigation";

import useGSAP from "@/hooks/useGSAP";
import { initWorkGridHover } from "./workGridAnimations";

import WorkGridHeader from "./workGridHeader";
import WorkGridItem from "./workGridItem";
import WorkGridPreview from "./workGridPreview";
import WorkGridCursor from "./workGridCursor";
import WorkGridCTA from "./workGridCTA";

import { Column } from "./type";
import { Project } from "@portfolio/sanity";

type Props<T extends Project> = {
  data: T[];
  columns: Column<T>[];
  workSlug: string;
  projectCount?: number;
};

export default function WorkGrid<T extends Project>({
  data,
  columns,
  workSlug,
  projectCount,
}: Props<T>) {
  const pathname = usePathname();

  useGSAP(() => {
    return initWorkGridHover();
  });

  return (
    <section className="relative">
      <div className="row">
        <WorkGridHeader columns={columns} />

        <ul className="flex flex-wrap lg:block">
          {data.map((item) => (
            <WorkGridItem
              key={item._id}
              item={item}
              columns={columns}
              workSlug={workSlug}
            />
          ))}
        </ul>

        {pathname === "/" && (
          <WorkGridCTA
            href={workSlug}
            label="More Work"
            count={projectCount || 0}
          />
        )}

        {data.map((item) => (
          <WorkGridPreview key={item._id} item={item} />
        ))}

        <WorkGridCursor />
      </div>
    </section>
  );
}
