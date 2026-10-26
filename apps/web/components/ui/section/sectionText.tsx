type SectionTextProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionText({
  children,
  className = "",
}: SectionTextProps) {
  return (
    <p className={`text-lg lg:text-2xl mt-5 text-foreground/70 ${className}`}>
      {children}
    </p>
  );
}
