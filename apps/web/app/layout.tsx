import "./globals.css";
import { Jost } from "next/font/google";
import { APP_DESCRIPTION, APP_NAME, APP_URL } from "@/constants";
import type { Metadata } from "next";
import AppProviders from "@/context/AppProviders";
import RouteShell from "./routeShell";
import Header from "@/components/header";
import Footer from "@/components/footer";
import CustomCursor from "@/components/CustomCursor";
import { getNavigation } from "@/lib/server/actions/navigation";
import { getSiteSettings } from "@/lib/server/actions/settings/get-site-settings";
import { GlobalLayoutProvider } from "@/context/GlobalLayoutProvider";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";

const jost = Jost({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(APP_URL),
};

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default async function RootLayout({ children }: Props) {
  const [siteSettings, navigation] = await Promise.all([
    getSiteSettings(),
    getNavigation(),
  ]);
  return (
    <html lang="en" className={`${jost.variable}`} suppressHydrationWarning>
      <body className="min-h-full antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <AppProviders>
            <CustomCursor />

            <GlobalLayoutProvider value={{ siteSettings, navigation }}>
              <Header />
              <RouteShell>{children}</RouteShell>
              <Footer />
            </GlobalLayoutProvider>
            <Analytics />
          </AppProviders>
        </ThemeProvider>
      </body>
    </html>
  );
}
