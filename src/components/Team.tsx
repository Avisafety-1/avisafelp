import { Card } from "@/components/ui/card";
import teamMember1 from "@/assets/team-member-1.jpg";
import teamMember2 from "@/assets/team-member-2.jpg";
import teamMember3 from "@/assets/team-member-3.jpg";

const teamMembers = [
  {
    name: "Rikard Bjørklund",
    title: "Safety Management Director",
    image: teamMember1,
    cv: [
      "20+ års erfaring innen luftfartssikkerhet",
      "Tidligere Safety Manager hos SAS",
      "Sertifisert SMS Auditor",
      "Master i Aviation Safety Management"
    ]
  },
  {
    name: "Maria Berg",
    title: "Operations & Compliance Lead",
    image: teamMember2,
    cv: [
      "15 års erfaring fra luftfartsoperasjoner",
      "Tidligere Quality Manager hos Norwegian",
      "EASA Part-145 spesialist",
      "Siviling. Luftfart, NTNU"
    ]
  },
  {
    name: "Thomas Andreassen",
    title: "Technical Safety Specialist",
    image: teamMember3,
    cv: [
      "12 års erfaring innen flysikkerhet",
      "Tidligere Flight Operations Officer",
      "Human Factors & SMS sertifisering",
      "Bachelor i Aviation Management"
    ]
  }
];

const Team = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Møt AviSafe Teamet
          </h2>
          <p className="text-xl text-muted-foreground">
            Erfarne eksperter dedikert til å gjøre luftfarten tryggere
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
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
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-1">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-4">
                  {member.title}
                </p>
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