import errorData from "@/config/errorData.json";
import ErrorPage from "@/components/error/ErrorPage ";
import SeoData from "@/components/tools/SeoData";

export default async function NotFound() {
  return (
    <>
      <SeoData
        meta_title={"Not Found Page"}
        description={"Not Found Page Description"}
      />
      <ErrorPage data={errorData.data} />
    </>
  );
}
