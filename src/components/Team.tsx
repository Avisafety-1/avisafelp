import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import teamMember1 from "@/assets/team-member-1.jpg";
import teamMember2 from "@/assets/team-member-2.jpg";
import teamVideo from "@/assets/team-video.mp4.asset.json";
import avisafeLogo from "@/assets/avisafe-logo-black.png";

const Team = () => {
  const { t } = useTranslation();
  const members = [
    {
      name: "Rikard Bjørklund",
      title: t("team.rikard.title"),
      image: teamMember1,
      cv: t("team.rikard.cv", { returnObjects: true }) as string[],
    },
    {
      name: "Gard Haug-Hansen",
      title: t("team.gard.title"),
      image: teamMember2,
      cv: t("team.gard.cv", { returnObjects: true }) as string[],
    },
  ];

  return (
    <section id="team-section" className="py-12 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{t("team.title")}</h2>
          <p className="text-xl text-muted-foreground">{t("team.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {members.map((member, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-card-custom transition-all duration-300 hover:-translate-y-1 bg-card border-border animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 ring-4 ring-primary/20">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className={`w-full h-full object-cover ${index === 0 ? "scale-150 -translate-y-6 object-center" : "object-top"}`}
                  />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-4">{member.title}</p>
              </div>

              <ul className="space-y-3 text-left">
                {member.cv.map((item, i) => (
                  <li key={i} className="flex items-start text-muted-foreground text-sm">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-20 animate-fade-in">
          <h3 className="text-2xl md:text-4xl font-bold text-foreground text-center mb-8">
            {t("team.cta")}
          </h3>
          <div className="relative rounded-2xl overflow-hidden shadow-card-custom bg-black">
            <video
              src={teamVideo.url}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto block"
            />
            <img
              src={avisafeLogo}
              alt="AviSafe"
              className="absolute top-3 left-3 sm:top-5 sm:left-5 h-8 sm:h-12 w-auto pointer-events-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Team;
