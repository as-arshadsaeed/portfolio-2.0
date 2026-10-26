type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export default function SectionTitle({
  children,
  className = "",
}: SectionTitleProps) {
  return (
    <h2 className={`text-copy4 lg:font-medium leading-tight ${className}`}>
      {children}
    </h2>
  );
}
