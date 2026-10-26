"use client";

import { Column } from "./type";

type Props<T> = {
  columns: Column<T>[];
};

export default function WorkGridHeader<T>({ columns }: Props<T>) {
  return (
    <ul className="hidden lg:flex w-full px-[10vh] py-8">
      {columns.map((col) => (
        <li
          key={String(col.key)}
          className={`text-xs uppercase tracking-wider text-foreground/50 ${col.className || ""}`}
        >
          {col.label}
        </li>
      ))}
    </ul>
  );
}
