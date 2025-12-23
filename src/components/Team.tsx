import { Card } from "@/components/ui/card";
import teamMember1 from "@/assets/team-member-1.jpg";
import teamMember2 from "@/assets/team-member-2.jpg";
import teamMember3 from "@/assets/team-member-3.jpg";
const teamMembers = [
  {
    name: "Rikard Bjørklund",
    title: "Salg & Markedsføring",
    image: teamMember1,
    cv: [
      "Bakgrunn fra shipping og maritim redningstjeneste",
      "2 års erfaring som Quality Assurance",
      "Bachelor i Nautikk",
      "Sikkerhetsleder Redbull Cliff Dive Oslo",
      "Human Factors in Aircraft Investigation fra Southern California Safety Institue",
      "Godkjent revisjonsleder - ISO 9001",
    ],
  },
  {
    name: "Gard Haug-Hansen",
    title: "Produktutvikling",
    image: teamMember2,
    cv: [
      "13 års erfaring som pilot",
      "Bachelor i luftmakt og ledelse fra Luftkrigskolen",
      "2 års erfaring som Safety Manager (EASA)",
      "Aircraft Accident Investigation (AAI) og Human Factors in Accident Investigation (HFAI) fra Southern California Safety Institue (SCSI)",
    ],
  },
  {
    name: "Ivar Moen",
    title: "IT-sikkerhet",
    image: teamMember3,
    cv: [
      "Operativ og strategisk erfaring med fysisk og digital sikkerhet fra politiet, finanssektoren og maritim virksomhet",
      "Ekspert innen digital kriminalitet, IT-sikkerhet, beredskap og virksomhetsstyring",
      "Mastergrad i informasjonssikkerhet fra NTNU",
      "Bachelor, Politihøyskolen",
      "Tilleggsutdanning i økonomi, ledelse og juss",
      "Sertifisert for implementering av ISO 27001 (ISMS)",
    ],
  },
];
const Team = () => {
  return (
    <section id="team-section" className="py-12 bg-transparent">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Møt teamet i AviSafe </h2>
          <p className="text-xl text-muted-foreground">Erfarne eksperter dedikert til å gjøre luftfarten tryggere</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="p-8 hover:shadow-card-custom transition-all duration-300 hover:-translate-y-1 bg-card border-border animate-fade-in"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden mb-4 ring-4 ring-primary/20">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className={`w-full h-full object-cover ${index === 0 ? 'scale-150 object-[center_5%]' : 'object-top'}`} 
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
      </div>
    </section>
  );
};
export default Team;
