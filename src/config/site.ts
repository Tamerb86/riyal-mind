import { type NavItem, type NavItemFooter } from "@/types"

const links = {
  github: "",
  twitter: "",
  linkedin: "",
  discord: "",
  authorsWebsite: "",
  authorsGitHub: "",
  openGraphImage: "/og-image.png",
}

export const siteConfig = {
  name: "ريال مايند",
  description:
    "تطبيق ذكي لإدارة المصاريف العائلية بتقنيات الذكاء الاصطناعي. تتبع مصاريفك، حدد ميزانياتك، وحقق أهدافك المالية بسهولة.",
  links,
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: links.openGraphImage,
  author: "Riyal Mind Team",
  hostingRegion: "fra1",
  keywords: ["إدارة المصاريف", "ميزانية", "مالية", "عائلة", "ذكاء اصطناعي"],
  navItems: [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Features",
      href: "/features",
    },
    {
      title: "Pricing",
      href: "/pricing",
    },
    {
      title: "FAQ",
      href: "/faq",
    },
    {
      title: "Docs",
      href: "/docs",
    },
    {
      title: "Blog",
      href: "/blog",
    },
  ] satisfies NavItem[],
  navItemsMobile: [],
  navItemsFooter: [
    {
      title: "Company",
      items: [
        {
          title: "About",
          href: "/about",
          external: false,
        },
        {
          title: "Privacy",
          href: "/privacy",
          external: false,
        },
        {
          title: "Terms",
          href: "/tos",
          external: false,
        },
        {
          title: "Careers",
          href: "/careers",
          external: false,
        },
      ],
    },
    {
      title: "Support",
      items: [
        {
          title: "Docs",
          href: "/docs",
          external: false,
        },
        {
          title: "FAQ",
          href: "/faq",
          external: false,
        },
        {
          title: "Blog",
          href: "/blog",
          external: false,
        },
        {
          title: "Contact",
          href: "/contact",
          external: false,
        },
      ],
    },
    {
      title: "Inspiration",
      items: [
        {
          title: "Shadcn",
          href: "https://ui.shadcn.com/",
          external: true,
        },
        {
          title: "Taxonomy",
          href: "https://tx.shadcn.com/",
          external: true,
        },
        {
          title: "Skateshop",
          href: "https://skateshop.sadmn.com/",
          external: true,
        },
        {
          title: "Acme Corp",
          href: "https://acme-corp.jumr.dev/",
          external: true,
        },
      ],
    },
  ] satisfies NavItemFooter[],
}
