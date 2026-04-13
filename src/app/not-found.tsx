import errorData from "@/config/errorData.json";
import ErrorPage from "@/components/error/ErrorPage ";
import InnerHeader1 from "@/components/headers/InnerHeader1";
import Footer1 from "@/components/footer/Footer1";
import navigation from "@/config/navigation.json";
import SeoData from "@/components/tools/SeoData";
import { getPageSettings } from "@/lib/helper/api";

export default async function NotFound() {
  const pageSettings = await getPageSettings();
  return (
    <main>
      <SeoData
        meta_title={"Not Found Page"}
        description={"Not Found Page Description"}
      />
      <InnerHeader1 />
      <ErrorPage data={errorData.data} />
      <Footer1 footerNav={navigation.footer1} pageSettings={pageSettings} />
    </main>
  );
}
