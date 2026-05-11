import "../styles/globals.css";
import "@/styles/main.css";
import Provider from "@/provider";
import MarketingHeader from "@/components/headers/MarketingHeader";
import Footer1 from "@/components/footer/Footer1";
import navigation from "@/config/navigation.json";
import { getPageSettings } from "@/lib/helper/api";
import ScrollSmootherComponent from "@/components/tools/ScrollSmoother";
import ToolsComponent from "@/components/tools";
import ScrollTop from "@/components/tools/ScrollTop";
import { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/design-dev-fav.ico",
  },
  formatDetection: {
    telephone: false,
    date: false,
    email: false,
    address: false,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageSettings = await getPageSettings();

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Provider>
          <div className="plus-jakarta root-layout" theme-setting="style-5">
            <div className="has-smooth" id="has_smooth"></div>
            <ScrollSmootherComponent />
            <ToolsComponent />
            <ScrollTop />
            <div id="smooth-wrapper">
              <div id="smooth-content">
                <MarketingHeader />
                {children}
                <Footer1
                  footerNav={navigation.footer1}
                  pageSettings={pageSettings}
                />
              </div>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
