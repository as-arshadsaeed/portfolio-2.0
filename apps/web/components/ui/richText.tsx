import { PortableText } from "@portabletext/react";
import { portableTextComponents } from "./portableTextComponents";

interface Props {
  value?: unknown[];
}
export default function RichText({ value = [] }: Props) {
  return <PortableText value={value} components={portableTextComponents} />;
}
