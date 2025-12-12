import { GlassCard } from "@/components/ui/glass-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { InteractiveGrid } from "@/components/ui/interactive-grid";
import { Navbar } from "@/components/Navbar";
import { Sparkles, Shirt, Wind, Droplet, Shield, CheckCircle2, Zap } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Shirt,
      title: "Wash & Fold",
      description: "Professional washing, drying, and folding of your everyday clothes",
      price: "Starting at ₹50/kg",
      features: ["Fresh cleaning", "Neatly folded", "Same-day service available"],
    },
    {
      icon: Wind,
      title: "Dry Cleaning",
      description: "Expert dry cleaning for delicate fabrics and special garments",
      price: "Starting at ₹100/piece",
      features: ["Delicate care", "Stain treatment", "Premium packaging"],
    },
    {
      icon: Sparkles,
      title: "Iron & Press",
      description: "Crisp ironing service for your formal wear and daily clothes",
      price: "Starting at ₹30/piece",
      features: ["Professional pressing", "Wrinkle-free finish", "Quick turnaround"],
    },
    {
      icon: Droplet,
      title: "Stain Removal",
      description: "Specialized treatment for tough stains and marks",
      price: "Starting at ₹75/piece",
      features: ["Expert treatment", "Safe for fabrics", "Money-back guarantee"],
    },
    {
      icon: Shield,
      title: "Premium Care",
      description: "Special care for luxury items, leather, and designer wear",
      price: "Custom pricing",
      features: ["White glove service", "Expert handlers", "Insurance coverage"],
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />

      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <InteractiveGrid rows={12} cols={16} />
      </div>
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <GlassCard className="px-4 py-2 inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Professional Services</span>
            </GlassCard>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Professional laundry solutions tailored to your needs. From everyday wear to special
            garments, we've got you covered.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <GlassCard
              key={index}
              className="p-8 group gradient-border"
              hover
              glow
            >
              <div className="mb-6">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-primary/30 rounded-2xl blur-xl group-hover:bg-primary/50 transition-all" />
                  <div className="relative p-4 bg-gradient-to-br from-primary to-accent rounded-2xl">
                    <service.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>

              <div className="text-3xl font-bold gradient-text mb-6">{service.price}</div>

              <ul className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <PremiumButton
                variant="premium"
                className="w-full"
                onClick={() => window.location.href = '/vendors'}
              >
                Book Now
              </PremiumButton>
            </GlassCard>
          ))}
        </div>

        {/* Add-on Services */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <GlassCard className="px-4 py-2 inline-flex items-center gap-2">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">Enhance Your Experience</span>
              </GlassCard>
            </div>
            <h2 className="text-4xl font-bold mb-4">
              Add-On <span className="gradient-text">Services</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Express Delivery", desc: "Get it in 12 hours", icon: "⚡" },
              { name: "Eco-Friendly", desc: "Green cleaning products", icon: "🌿" },
              { name: "Fabric Softener", desc: "Extra soft finish", icon: "✨" },
              { name: "Sanitization", desc: "99.9% germ-free", icon: "🛡️" },
            ].map((addon, idx) => (
              <GlassCard
                key={idx}
                className="p-6 text-center hover-lift shimmer"
                hover
              >
                <div className="text-4xl mb-3">{addon.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{addon.name}</h3>
                <p className="text-sm text-muted-foreground">{addon.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
