import { Shield, Zap, FileCheck, BarChart3, Users, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Shield,
    title: "Comprehensive Safety Management",
    description: "Centralized platform for managing all safety operations and compliance requirements"
  },
  {
    icon: Zap,
    title: "Real-Time Monitoring",
    description: "Track safety metrics and incidents as they happen with instant notifications"
  },
  {
    icon: FileCheck,
    title: "Automated Reporting",
    description: "Generate detailed safety reports and documentation with one click"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Gain insights from your safety data with powerful analytics tools"
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description: "Enable seamless communication across your entire safety team"
  },
  {
    icon: Lock,
    title: "Secure & Compliant",
    description: "Enterprise-grade security meeting all aviation industry standards"
  }
];

const Features = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-slide-up">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need for Aviation Safety
          </h2>
          <p className="text-xl text-muted-foreground">
            Powerful features designed to streamline your safety management operations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-8 hover:shadow-card-custom transition-all duration-300 hover:-translate-y-1 bg-card border-border animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="rounded-lg bg-primary/10 w-14 h-14 flex items-center justify-center mb-6">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
