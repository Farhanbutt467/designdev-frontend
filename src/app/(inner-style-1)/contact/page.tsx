import { getMainPage } from "@/lib/helper/contentConverter";
import ContactHero from "@/components/contact/ContactHero";
import Image from "next/image";
import ContactArea from "@/components/contact/ContactArea";
import SeoData from "@/components/tools/SeoData";
import { getImageUrl, getpageData } from "@/lib/helper/api";

const Contact = async () => {
  const { data: contactData } = getMainPage("/contact/_index.mdx");

  const { meta, hero, image, contact: mainContact } = contactData || {};
  const contactpageData = await getpageData("contact");
  const contactContent = contactpageData?.content || {};

  // ContactHero Component Data Update from API
  if (contactContent.hero) {
    hero.title = contactContent.hero.title || hero.title;
    hero.direct_contact.title = contactContent.hero.direct_contact.title || hero.direct_contact.title;
    hero.direct_contact.link = contactContent.hero.direct_contact.link || hero.direct_contact.link;
  }
  if (contactContent.hero?.images && contactContent.hero.images.length > 0) {
    hero.images = contactContent.hero.images.map((img: any, index: number) => getImageUrl(img) || hero.images[index]);
  }

 const updatedImage = contactContent.image ? getImageUrl(contactContent.image) || image : image;

  // ContactArea Component Data Update from API
  if (contactContent.header) {
    mainContact.header.title = contactContent.header.title || mainContact.header.title;
    mainContact.header.description = contactContent.header.description || mainContact.header.description;
    mainContact.info.title = contactContent.info.title || mainContact.info.title;
  }

  if (contactContent.info?.contact_list) {
  mainContact.info.contact_list.phone = contactContent.info.contact_list.phone || mainContact.info.contact_list.phone;
  mainContact.info.contact_list.email = contactContent.info.contact_list.email || mainContact.info.contact_list.email;
  mainContact.info.contact_list.address = contactContent.info.contact_list.address || mainContact.info.contact_list.address;
  }
  
  return (
    <main>
      <SeoData
        title={contactpageData?.title}
        meta_title={contactpageData?.meta_title || meta?.meta_title}
        meta_description={contactpageData?.meta_description || meta?.meta_description}
        meta_canonical={contactpageData?.meta_canonical}
        meta_open_graph={contactpageData?.meta_open_graph}
        meta_twitter={contactpageData?.meta_twitter}
      />
      <ContactHero {...hero} />
      <div className="overflow-hidden">
        <Image
          src={updatedImage}
          alt="image"
          width={1920}
          height={850}
          className="w-full"
        />
      </div>
      <ContactArea {...mainContact} />
    </main>
  );
};

export default Contact;
