"use client";

import Magnetic from "@/components/ui/magnetic";

type Props = {
  href: string;
  label: string;
  count: number;
};

export default function WorkGridCTA({ href, label, count }: Props) {
  return (
    <div className="py-20 text-center">
      <Magnetic
        as="link"
        href={href}
        variant="primary"
        textStrength={20}
        className="min-w-50"
      >
        {label}
        <sup className="pl-1 text-gray-300">{count}</sup>
      </Magnetic>
    </div>
  );
}
