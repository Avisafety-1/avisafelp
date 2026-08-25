import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import teamMember1 from "@/assets/team-member-1.jpg.asset.json";
import teamMember2 from "@/assets/team-member-2.jpg.asset.json";

const Team = () => {
  const { t } = useTranslation();
  const members = [
    {
      name: "Rikard Bjørklund",
      title: t("team.rikard.title"),
      image: teamMember1.url,
      cv: t("team.rikard.cv", { returnObjects: true }) as string[],
    },
    {
      name: "Gard Haug-Hansen",
      title: t("team.gard.title"),
      image: teamMember2.url,
      cv: t("team.gard.cv", { returnObjects: true }) as string[],
    },
  ];

  return (
    <section id="team-section" className="py-16 md:py-24 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20 animate-slide-up">
          <h2 className="text-6xl md:text-7xl font-bold text-foreground mb-6">{t("team.title")}</h2>
          <p className="text-2xl md:text-3xl text-muted-foreground">{t("team.subtitle")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {members.map((member, index) => (
            <Card
              key={index}
              className="p-12 hover:shadow-card-custom transition-all duration-300 hover:-translate-y-1 bg-card border-border animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center mb-10">
                <div className="w-48 h-48 rounded-full overflow-hidden mb-6 ring-4 ring-primary/20">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h3 className="text-2xl md:text-3xl font-semibold text-card-foreground mb-2">{member.name}</h3>
                <p className="text-primary font-medium mb-6 text-xl md:text-2xl">{member.title}</p>
              </div>

              <ul className="space-y-5 text-left">
                {member.cv.map((item, i) => (
                  <li key={i} className="flex items-start text-muted-foreground text-base md:text-lg">
                    <span className="text-primary mr-2 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Team;
