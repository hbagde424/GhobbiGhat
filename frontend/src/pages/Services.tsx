import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Sparkles, Shirt, Wind, Droplet, Shield } from "lucide-react";

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
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional laundry solutions tailored to your needs. From everyday wear to special
            garments, we've got you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-elevated transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <div className="p-3 bg-gradient-hero rounded-lg w-fit mb-4 shadow-lg shadow-primary/20">
                  <service.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="text-base">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-2xl font-bold text-primary">{service.price}</div>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px] shadow-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                  onClick={() => window.location.href = '/vendors'}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Add-on Services */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8 text-center">Add-On Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Express Delivery", desc: "Get it in 12 hours" },
              { name: "Eco-Friendly", desc: "Green cleaning products" },
              { name: "Fabric Softener", desc: "Extra soft finish" },
              { name: "Sanitization", desc: "99.9% germ-free" },
            ].map((addon, idx) => (
              <Card key={idx} className="text-center">
                <CardContent className="pt-6">
                  <h3 className="font-semibold mb-2">{addon.name}</h3>
                  <p className="text-sm text-muted-foreground">{addon.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
