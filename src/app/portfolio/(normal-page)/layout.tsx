import ScrollSmootherComponent from "@/components/tools/ScrollSmoother";
import ToolsComponent from "@/components/tools";
import ScrollTop from "@/components/tools/ScrollTop";
import InnerHeader1 from "@/components/headers/InnerHeader1";
import Footer1 from "@/components/footer/Footer1";
import navigation from "@/config/navigation.json";
import { getPageSettings } from "@/lib/helper/api";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pageSettings = await getPageSettings();
  return (
    <div className="beatrice-kanit">
      <ScrollSmootherComponent />
      <ToolsComponent />
      <ScrollTop />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <InnerHeader1 />
          <div>{children}</div>
          <Footer1 footerNav={navigation.footer1} pageSettings={pageSettings} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
