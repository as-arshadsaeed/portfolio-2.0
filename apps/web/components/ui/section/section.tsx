import clsx from "clsx";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  innerClass?: string;
};

export default function Section({
  children,
  className,
  innerClass,
}: SectionProps) {
  return (
    <section className={clsx(className)}>
      <div className={innerClass}>{children}</div>
    </section>
  );
}
