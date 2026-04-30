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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pageSettings = await getPageSettings();

  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
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
