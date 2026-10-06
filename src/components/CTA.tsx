import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

const CTA = () => {
  const { t } = useTranslation();
  return (
    <section className="py-2 md:py-4 -mt-4 md:-mt-6 bg-gradient-to-br from-primary via-primary to-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            {t("cta.title")}
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {t("cta.subtitle")}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              variant="hero"
              size="xl"
              className="bg-white text-primary hover:bg-white/95 hover:shadow-2xl group"
              asChild
            >
              <a href="mailto:kontakt@avisafe.no">
                <Mail className="w-5 h-5" />
                {t("cta.contactBtn")}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button
              variant="outline"
              size="xl"
              className="border-white/30 text-white hover:bg-white/10 backdrop-blur-xs"
            >
              {t("cta.demoBtn")}
            </Button>
          </div>

          <p className="text-white/70 text-sm pt-4">
            {t("cta.note")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
