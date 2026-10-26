"use client";

import clsx from "clsx";
import Link from "next/link";
import React from "react";
import useMagneticElement from "@/hooks/useMagneticElement";

/* ---------------------------------- */
/* VARIANTS */
/* ---------------------------------- */

type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "blank"
  | "circle";

const variants: Record<Variant, string> = {
  primary:
    "px-10 py-6 bg-black text-white hover:bg-white hover:text-black border border-black/20",
  secondary:
    "px-10 py-6 bg-white text-black hover:bg-black hover:text-white border border-white/20",
  outline:
    "px-10 py-6 border border-page-dark-foreground/20 hover:bg-white hover:text-black",
  ghost: "hover:bg-white/10",
  circle:
    "rounded-full justify-center items-center flex w-36 h-36 lg:w-52 lg:h-52",
  blank: "",
};

/* ---------------------------------- */
/* CORE TYPES (Polymorphic) */
/* ---------------------------------- */

type BaseProps = {
  variant?: Variant;
  className?: string;
  innerClassName?: string;
  strength?: number;
  textStrength?: number;
  children: React.ReactNode;
};

/* ---------------------------------- */
/* OVERLOADS (IMPORTANT) */
/* ---------------------------------- */

type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    as?: "button";
  };

type LinkProps = BaseProps &
  React.ComponentPropsWithoutRef<typeof Link> & {
    as: "link";
  };

type Props = ButtonProps | LinkProps;

/* ---------------------------------- */
/* COMPONENT */
/* ---------------------------------- */

export default function Magnetic(props: Props) {
  const ref = useMagneticElement<HTMLButtonElement>({
    strength: props.strength,
    textStrength: props.textStrength,
  });

  const base =
    "group inline-flex items-center justify-center rounded-full text-base transition-colors duration-300 capitalize";

  const variantClass = variants[props.variant ?? "outline"];

  const content = (
    <span
      data-magnetic-text="true"
      className={clsx(
        "inline-block will-change-transform",
        props.innerClassName,
      )}
    >
      {props.children}
    </span>
  );

  const className = clsx(base, variantClass, props.className);

  /* ----------------------------- */
  /* LINK */
  /* ----------------------------- */

  if (props.as === "link") {
    const { as, innerClassName, strength, textStrength, variant, ...rest } =
      props;

    return (
      <Link
        {...rest}
        className={className}
        ref={ref as React.Ref<HTMLAnchorElement>}
      >
        {content}
      </Link>
    );
  }

  /* ----------------------------- */
  /* BUTTON (default) */
  /* ----------------------------- */

  const { as, innerClassName, strength, textStrength, variant, ...rest } =
    props as ButtonProps;

  return (
    <button
      {...rest}
      className={className}
      ref={ref as React.Ref<HTMLButtonElement>}
    >
      {content}
    </button>
  );
}
