import PageTransition from "@/components/pageTransition";

export default function RouteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageTransition>{children}</PageTransition>
    </>
  );
}
