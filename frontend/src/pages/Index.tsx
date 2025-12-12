import { GlassCard } from "@/components/ui/glass-card";
import { PremiumButton } from "@/components/ui/premium-button";
import { InteractiveGrid } from "@/components/ui/interactive-grid";
import { Navbar } from "@/components/Navbar";
import { MapPin, Clock, Shield, Star, Sparkles, Zap, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-laundry.jpg";
import pickupIcon from "@/assets/pickup-icon.png";
import washIcon from "@/assets/wash-icon.png";
import deliveryIcon from "@/assets/delivery-icon.png";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: pickupIcon,
      title: "Free Pickup & Delivery",
      description: "We collect and deliver your clothes at your doorstep",
    },
    {
      icon: washIcon,
      title: "Professional Cleaning",
      description: "Expert laundry service with eco-friendly products",
    },
    {
      icon: deliveryIcon,
      title: "Quick Turnaround",
      description: "Get your fresh clothes back within 24-48 hours",
    },
  ];

  const stats = [
    { value: "10K+", label: "Happy Customers" },
    { value: "50+", label: "Partner Vendors" },
    { value: "15+", label: "Cities Covered" },
    { value: "4.8★", label: "Average Rating" },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />

      {/* Hero Section with Interactive Grid */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Interactive Grid Background */}
        <div className="absolute inset-0 opacity-30">
          <InteractiveGrid rows={10} cols={16} />
        </div>

        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-block float">
                <GlassCard className="px-4 py-2 inline-flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium gradient-text">
                    India's First Digital Dhobighat
                  </span>
                </GlassCard>
              </div>

              {/* Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                Fresh, Clean Clothes{" "}
                <span className="gradient-text text-glow">
                  Delivered to Your Door
                </span>
              </h1>

              {/* Description */}
              <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
                Professional laundry services at your fingertips. Schedule a pickup, track your
                order, and enjoy fresh, clean clothes without the hassle.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <PremiumButton
                  variant="premium"
                  size="lg"
                  onClick={() => navigate("/vendors")}
                  className="group"
                >
                  <MapPin className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  Find Vendors Near You
                </PremiumButton>
                <PremiumButton
                  variant="glass"
                  size="lg"
                  onClick={() => navigate("/services")}
                >
                  View Services
                </PremiumButton>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <GlassCard className="px-4 py-2 inline-flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>100% Safe & Secure</span>
                </GlassCard>
                <GlassCard className="px-4 py-2 inline-flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent" />
                  <span>24-48 Hour Delivery</span>
                </GlassCard>
                <GlassCard className="px-4 py-2 inline-flex items-center gap-2">
                  <Star className="h-4 w-4 text-secondary fill-secondary" />
                  <span>4.8★ Rating</span>
                </GlassCard>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative float">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-3xl blur-3xl glow" />
              <GlassCard className="relative p-2" hover glow>
                <img
                  src={heroImage}
                  alt="Fresh laundry"
                  className="relative rounded-2xl w-full shadow-2xl"
                />
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <GlassCard
                key={index}
                className="p-8 text-center hover-lift shimmer"
                hover
              >
                <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <GlassCard className="px-4 py-2 inline-flex items-center gap-2">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">Simple Process</span>
              </GlassCard>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold mb-4">
              How It <span className="gradient-text">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to fresh, clean clothes
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <GlassCard
                key={index}
                className="p-8 text-center group gradient-border"
                hover
                glow
              >
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-all" />
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="relative h-24 w-24 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary font-bold mb-4">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20" />
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <InteractiveGrid rows={8} cols={12} />
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <GlassCard className="p-12 md:p-16" glow>
            <div className="inline-block mb-6 float">
              <div className="flex items-center gap-2 text-primary">
                <Sparkles className="h-6 w-6" />
                <Sparkles className="h-8 w-8" />
                <Sparkles className="h-6 w-6" />
              </div>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Experience{" "}
              <span className="gradient-text">Hassle-Free Laundry?</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers and let us take care of your laundry needs
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <PremiumButton
                variant="premium"
                size="lg"
                onClick={() => navigate("/auth?mode=signup")}
                className="group"
              >
                <CheckCircle2 className="h-5 w-5 group-hover:scale-110 transition-transform" />
                Get Started Today
              </PremiumButton>
              <PremiumButton
                variant="glass"
                size="lg"
                onClick={() => navigate("/vendors")}
              >
                Browse Vendors
              </PremiumButton>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="font-bold text-xl mb-4 gradient-text">Digital Dhobighat</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                India's premier online laundry service platform bringing professional cleaning to your doorstep.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Customers</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    Track Order
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Vendors</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    Partner With Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    Vendor Dashboard
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors inline-flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 Digital Dhobighat. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Made with</span>
              <span className="text-primary">❤</span>
              <span className="text-xs text-muted-foreground">in India</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
