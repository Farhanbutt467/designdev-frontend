import Link from "next/link";

// icons
import {
  FaDribbble,
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaTiktok,
} from "react-icons/fa6";

// lib
import { cn } from "@/lib/utils";

type SocialType = {
  name: string;
  link: string;
  value?: string;
};

export const SocialShare1 = (item: SocialType, className?: string) => {
  const name = item.name.toLowerCase();
  
  const icons: Record<string, any> = {
    fb: <FaFacebookF />,
    facebook: <FaFacebookF />,
    tw: <FaTwitter />,
    twitter: <FaTwitter />,
    in: <FaInstagram />,
    instagram: <FaInstagram />,
    db: <FaDribbble />,
    dribbble: <FaDribbble />,
    li: <FaLinkedin />,
    linkedin: <FaLinkedin />,
    tiktok: <FaTiktok />,
  };

  const icon = icons[name];

  if (!icon) return null;

  return (
    <Link
      href={item.link || "#"}
      target="_blank"
      key={item.link}
      className={cn("relative z-10", className)}
    >
      {icon}
    </Link>
  );
};
