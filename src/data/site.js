import { assetUrl } from "./paths";

export const site = {
  name: "Mark Omelyanenko",
  title: "Software Engineer",
  email: "mark.omelyanenko@gmail.com",
  location: "Poznań, Poland",
  relocation: "Open to relocation",
  github: "https://github.com/MarkOmelyanenko",
  linkedin: "https://linkedin.com/in/markomelyanenko",
  cvHref: assetUrl("cv/CV-Mark-Omelyanenko.pdf"),
  cvFilename: "CV-Mark-Omelyanenko.pdf",
  canonical: "https://MarkOmelyanenko.github.io/portfolio-page/",
};

export const socialLinks = [
  { name: "GitHub", href: site.github },
  { name: "LinkedIn", href: site.linkedin },
  { name: "Email", href: `mailto:${site.email}` },
];
