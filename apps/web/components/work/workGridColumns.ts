import type { Project } from "@portfolio/sanity";
import { Column } from "./type";

export const HOME_PROJECT_COLUMNS: Column<Project>[] = [
  {
    key: "title",
    label: "Recent Project",
    className:
      "w-[100%] lg:w-[70%] pb-4 lg:pb-0 border-b border-b-gray-200 lg:border-0",
  },
  {
    key: "location",
    label: "",
    className: "lg:w-[20%] hidden",
  },
  {
    key: "serviceTitle",
    label: "",
    className: "w-[70%] lg:w-[30%]",
  },
  {
    key: "year",
    label: "",
    className: "w-[30%] lg:w-[14%] text-right lg:hidden",
  },
];

export const PAGE_PROJECT_COLUMNS: Column<Project>[] = [
  {
    key: "title",
    label: "Project",
    className:
      "w-[100%] lg:w-[70%] pb-4  lg:pb-0 border-b border-b-gray-200 lg:border-0",
  },
  {
    key: "location",
    label: "Location",
    className: "hidden lg:block lg:w-[20%]",
  },
  {
    key: "serviceTitle",
    label: "Expertise",
    className:
      "w-[70%] lg:w-[22%] truncate overflow-hidden text-ellipsis whitespace-nowrap",
  },
  {
    key: "year",
    label: "Year",
    className: "w-[30%] lg:w-[14%] text-right",
  },
];
