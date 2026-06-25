import { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, ChevronDown, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ShopCartButton from "@/components/ShopCartButton";
import avisafeLogoBlackAsset from "@/assets/avisafe-logo-black.png.asset.json";
import avisafeLogoWhiteAsset from "@/assets/avisafe-logo-white.png.asset.json";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

interface HoverDropdownProps {
  label: string;
  items: { label: string; action: () => void }[];
  scrolled: boolean;
}

const HoverDropdown = ({ label, items, scrolled }: HoverDropdownProps) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 150);
  };

  const buttonBg = scrolled
    ? "bg-white text-[hsl(210,45%,12%)] hover:bg-gray-100 border border-black/10"
    : "bg-black text-white hover:bg-black/80 border border-white/15";

  const dropdownBg = scrolled
    ? "bg-white border border-black/10 shadow-lg"
    : "bg-black border border-white/15 shadow-lg";

  const itemText = scrolled
    ? "text-[hsl(210,45%,12%)] hover:bg-gray-100"
    : "text-white hover:bg-white/10";

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        className={`px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors duration-300 inline-flex items-center gap-1 outline-none rounded-md ${buttonBg}`}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div
          className={`absolute top-full left-0 mt-1 rounded-md overflow-hidden min-w-[12rem] ${dropdownBg}`}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {items.map((it, idx) => (
            <button
              key={idx}
              onClick={() => {
                it.action();
                setOpen(false);
              }}
              className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${itemText}`}
            >
              {it.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const SiteHeader = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [newsletterOpen, setNewsletterOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToId = (id: string) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const goTo = (path: string) => {
    setOpen(false);
    navigate(path);
  };

  const openNewsletter = () => {
    setOpen(false);
    setNewsletterOpen(true);
  };

  const navButtonBase =
    "px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors duration-300 inline-flex items-center gap-1 outline-none rounded-md";
  const navButtonTheme = scrolled
    ? "bg-white text-[hsl(210,45%,12%)] hover:bg-gray-100 border border-black/10"
    : "bg-black text-white hover:bg-black/80 border border-white/15";

  const smsItems = [
    { label: "Oversikt", action: () => scrollToId("hero-section") },
    { label: t("nav.smsIntegrations"), action: () => scrollToId("product-section") },
    { label: t("nav.smsSecurity"), action: () => scrollToId("security-section") },
    { label: "Risikovurdering", action: () => goTo("/sora") },
  ];

  const articlesItems = [
    { label: t("nav.articles"), action: () => goTo("/artikler") },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-black/10 shadow-sm"
            : "bg-[hsl(210,45%,8%)] border-b border-white/10 shadow-sm"
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <div className="flex h-16 md:h-20 items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 shrink-0 group relative">
              <span className="relative block h-7 md:h-9 w-auto">
                <img
                  src={avisafeLogoWhiteAsset.url}
                  alt="AviSafe"
                  className={`h-7 md:h-9 w-auto transition-opacity duration-500 ${
                    scrolled ? "opacity-0" : "opacity-100"
                  }`}
                />
                <img
                  src={avisafeLogoBlackAsset.url}
                  alt=""
                  aria-hidden="true"
                  className={`absolute inset-0 h-7 md:h-9 w-auto transition-opacity duration-500 ${
                    scrolled ? "opacity-100" : "opacity-0"
                  }`}
                />
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-2">
              <HoverDropdown label={t("nav.sms")} items={smsItems} scrolled={scrolled} />

              <button onClick={() => goTo("/operations")} className={`${navButtonBase} ${navButtonTheme}`}>
                {t("nav.operations")}
              </button>

              <HoverDropdown label={t("nav.articlesMedia")} items={articlesItems} scrolled={scrolled} />

              <button onClick={openNewsletter} className={`${navButtonBase} ${navButtonTheme}`}>
                {t("nav.newsletter")}
              </button>

              <button onClick={() => scrollToId("team-section")} className={`${navButtonBase} ${navButtonTheme}`}>
                {t("nav.whoWeAre")}
              </button>

              <button onClick={() => goTo("/butikk")} className={`${navButtonBase} ${navButtonTheme}`}>
                {t("nav.shop")}
              </button>

              <button
                onClick={() => { setOpen(false); setContactOpen(true); }}
                className={`${navButtonBase} ${navButtonTheme}`}
              >
                {t("nav.contact")}
              </button>
            </nav>

            {/* Right cluster */}
            <div className="flex items-center gap-2 md:gap-3">
              <div className="hidden sm:flex items-center gap-2">
                <a
                  href="https://www.facebook.com/profile.php?id=61583893445784"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className={`transition-colors duration-500 ${
                    scrolled ? "text-[#1877F2] hover:text-[#1877F2]/80" : "text-white/70 hover:text-white"
                  }`}
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/company/avisafe-as/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className={`transition-colors duration-500 ${
                    scrolled ? "text-[#0A66C2] hover:text-[#0A66C2]/80" : "text-white/70 hover:text-white"
                  }`}
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
              </div>
              <LanguageSwitcher variant={scrolled ? "light" : "dark"} />
              <ShopCartButton scrolled={scrolled} />
              {/* Mobile menu */}
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <button
                    className={`lg:hidden p-2 rounded-md transition-colors duration-500 ${
                      scrolled ? "text-[hsl(210,45%,12%)] hover:bg-black/10" : "text-white hover:bg-white/10"
                    }`}
                    aria-label={t("common.openMenu")}
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[hsl(210,45%,8%)] border-white/10 text-white">
                  <nav className="flex flex-col gap-1 mt-10">
                    <Accordion type="multiple" className="w-full">
                      <AccordionItem value="sms" className="border-white/10">
                        <AccordionTrigger className="px-3 py-3 text-base font-medium uppercase tracking-wide hover:bg-white/10 rounded-md hover:no-underline">
                          {t("nav.sms")}
                        </AccordionTrigger>
                        <AccordionContent className="pb-1">
                          <div className="flex flex-col">
                            {smsItems.map((it, idx) => (
                              <button
                                key={idx}
                                onClick={it.action}
                                className="text-left px-6 py-2.5 text-sm hover:bg-white/10 rounded-md text-white/85"
                              >
                                {it.label}
                              </button>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="articles" className="border-white/10">
                        <AccordionTrigger className="px-3 py-3 text-base font-medium uppercase tracking-wide hover:bg-white/10 rounded-md hover:no-underline">
                          {t("nav.articlesMedia")}
                        </AccordionTrigger>
                        <AccordionContent className="pb-1">
                          <div className="flex flex-col">
                            {articlesItems.map((it, idx) => (
                              <button
                                key={idx}
                                onClick={it.action}
                                className="text-left px-6 py-2.5 text-sm hover:bg-white/10 rounded-md text-white/85"
                              >
                                {it.label}
                              </button>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <button
                      onClick={() => goTo("/operations")}
                      className="text-left px-3 py-3 text-base font-medium uppercase tracking-wide hover:bg-white/10 rounded-md"
                    >
                      {t("nav.operations")}
                    </button>
                    <button
                      onClick={() => goTo("/butikk")}
                      className="text-left px-3 py-3 text-base font-medium uppercase tracking-wide hover:bg-white/10 rounded-md"
                    >
                      {t("nav.shop")}
                    </button>
                    <button
                      onClick={openNewsletter}
                      className="text-left px-3 py-3 text-base font-medium uppercase tracking-wide hover:bg-white/10 rounded-md"
                    >
                      {t("nav.newsletter")}
                    </button>
                    <button
                      onClick={() => scrollToId("team-section")}
                      className="text-left px-3 py-3 text-base font-medium uppercase tracking-wide hover:bg-white/10 rounded-md"
                    >
                      {t("nav.whoWeAre")}
                    </button>

                    <button
                      onClick={() => { setOpen(false); setContactOpen(true); }}
                      className="mt-4 inline-flex items-center justify-center h-11 rounded-full bg-[#123b87] hover:bg-[#0e2f6b] text-white px-5 font-semibold"
                    >
                      {t("nav.contact")}
                    </button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <Dialog open={newsletterOpen} onOpenChange={setNewsletterOpen}>
        <DialogContent className="max-w-md p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle>{t("hero.newsletterTitle")}</DialogTitle>
          </DialogHeader>
          <iframe
            src="https://app.avisafe.no/nyhetsbrev"
            title="AviSafe nyhetsbrev"
            className="w-full h-[420px] border-0"
          />
        </DialogContent>
      </Dialog>

      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="max-w-sm p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-2">
            <DialogTitle>{t("nav.contactTitle")}</DialogTitle>
          </DialogHeader>
          <div className="px-6 pb-6 pt-2 space-y-3">
            <a
              href="mailto:kontakt@avisafe.no"
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 hover:bg-accent transition-colors"
            >
              <Mail className="w-5 h-5 text-[#123b87] shrink-0" />
              <span className="text-sm font-medium text-foreground">kontakt@avisafe.no</span>
            </a>
            <a
              href="tel:+4746941552"
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 hover:bg-accent transition-colors"
            >
              <Phone className="w-5 h-5 text-[#123b87] shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-foreground">Rikard Bjørklund</span>
                <span className="text-xs text-muted-foreground">+47 469 41 552</span>
              </div>
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SiteHeader;

