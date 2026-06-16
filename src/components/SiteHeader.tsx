import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import avisafeLogoBlackAsset from "@/assets/avisafe-logo-black.png.asset.json";
import avisafeLogoWhite from "@/assets/avisafe-logo-white.png";

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

type NavItem =
  | { kind: "scroll"; id: string; labelKey: string }
  | { kind: "link"; to: string; labelKey: string };

const NAV: NavItem[] = [
  { kind: "scroll", id: "product-section", labelKey: "nav.product" },
  { kind: "link", to: "/sora", labelKey: "nav.sora" },
  { kind: "link", to: "/artikler", labelKey: "nav.articles" },
  { kind: "link", to: "/galleri", labelKey: "nav.gallery" },
  { kind: "scroll", id: "team-section", labelKey: "nav.team" },
];

const SiteHeader = () => {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-black/10 shadow-sm"
          : "bg-[hsl(210,45%,8%)] border-b border-white/10 shadow-sm"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          {/* Logo — crossfade between white (over hero) and black (on scroll) */}
          <Link to="/" className="flex items-center gap-2 shrink-0 group relative">
            <span className="relative block h-7 md:h-9 w-auto">
              <img
                src={avisafeLogoWhite}
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
          <nav className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <button
                key={item.labelKey}
                onClick={() =>
                  item.kind === "scroll" ? handleScrollTo(item.id) : navigate(item.to)
                }
                className={`px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors duration-500 relative after:absolute after:left-4 after:right-4 after:bottom-1 after:h-px after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-300 ${
                  scrolled
                    ? "text-[hsl(210,45%,12%)]/80 hover:text-[hsl(210,45%,12%)] after:bg-[hsl(210,45%,12%)]"
                    : "text-white/85 hover:text-white after:bg-white"
                }`}
              >
                {t(item.labelKey)}
              </button>
            ))}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <a
                href="https://www.facebook.com/profile.php?id=61583893445784"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={`transition-colors duration-500 ${scrolled ? "text-[#1877F2] hover:text-[#1877F2]/80" : "text-white/70 hover:text-white"}`}
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/avisafe-as/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`transition-colors duration-500 ${scrolled ? "text-[#0A66C2] hover:text-[#0A66C2]/80" : "text-white/70 hover:text-white"}`}
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            </div>
            <LanguageSwitcher variant={scrolled ? "light" : "dark"} />
            <Button
              asChild
              className="hidden sm:inline-flex h-9 rounded-full bg-[#123b87] hover:bg-[#0e2f6b] text-white px-5 text-sm font-semibold shadow-lg"
            >
              <a href="mailto:kontakt@avisafe.no">{t("common.contact")}</a>
            </Button>

            {/* Mobile menu */}
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className={`lg:hidden p-2 rounded-md transition-colors duration-500 ${scrolled ? "text-[hsl(210,45%,12%)] hover:bg-black/10" : "text-white hover:bg-white/10"}`}
                  aria-label={t("common.openMenu")}
                >
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[hsl(210,45%,8%)] border-white/10 text-white">
                <nav className="flex flex-col gap-2 mt-10">
                  {NAV.map((item) => (
                    <button
                      key={item.labelKey}
                      onClick={() =>
                        item.kind === "scroll" ? handleScrollTo(item.id) : (setOpen(false), navigate(item.to))
                      }
                      className="text-left px-3 py-3 text-base font-medium uppercase tracking-wide hover:bg-white/10 rounded-md"
                    >
                      {t(item.labelKey)}
                    </button>
                  ))}
                  <SheetClose asChild>
                    <a
                      href="mailto:kontakt@avisafe.no"
                      className="mt-4 inline-flex items-center justify-center h-11 rounded-full bg-[#123b87] hover:bg-[#0e2f6b] text-white px-5 font-semibold"
                    >
                      {t("common.contact")}
                    </a>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
