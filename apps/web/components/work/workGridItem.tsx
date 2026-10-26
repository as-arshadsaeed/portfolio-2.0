"use client";

import Link from "next/link";
import Image from "next/image";

import { Column } from "./type";
import { Project } from "@portfolio/sanity";

type Props<T extends Project> = {
  item: T;
  columns: Column<T>[];
  workSlug: string;
};

export default function WorkGridItem<T extends Project>({
  item,
  columns,
  workSlug,
}: Props<T>) {
  return (
    <li className="block w-full md:w-1/2 lg:w-full">
      <Link
        href={`${workSlug}/${item.slug}`}
        className="
          work-grid-item
          group
          relative
          flex
          flex-wrap
          lg:flex-nowrap
          items-center
          gap-y-4
          lg:gap-x-5
          py-8
          lg:py-[10vh]
          md:px-4
          lg:px-[10vh]
          md:border-t
          border-t-page-dark/20
        "
      >
        {/* Mobile Image */}
        <div
          className="relative mb-5 aspect-16/12 w-full lg:hidden"
          style={{
            backgroundColor: item.backgroundColor,
          }}
        >
          <Image
            src={`${item.thumbnail}`}
            alt={item.title}
            fill
            className="object-cover"
          />
        </div>

        {columns.map((col, i) => (
          <div
            key={String(col.key)}
            className={`
              transition-all
              duration-500
              group-hover:opacity-30
              ${
                i === 0
                  ? "text-3xl md:text-4xl lg:text-6xl uppercase"
                  : "text-base lg:text-2xl"
              }
              ${col.className || ""}
            `}
          >
            {String(item[col.key])}
          </div>
        ))}
      </Link>
    </li>
  );
}
