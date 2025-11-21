import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Navbar } from "@/components/Navbar";
import { Sparkles } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get("mode") === "signup" ? "signup" : "login";
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string) || '';
    const password = (formData.get("password") as string) || '';

    try {
      if (mode === "login") {
        await login(email, password);
      } else {
        const name = (formData.get("name") as string) || '';
        const phone = (formData.get("phone") as string) || '';
        const confirmPassword = (formData.get("confirmPassword") as string) || '';
        const role = (formData.get('role') as string) || 'user';
        const address = (formData.get('address') as string) || '';
        const city = (formData.get('city') as string) || '';
        const state = (formData.get('state') as string) || '';
        const pincode = (formData.get('pincode') as string) || '';
        const businessName = (formData.get('businessName') as string) || '';
        const businessPhone = (formData.get('businessPhone') as string) || '';

        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }

        await register({ name, email, password, phone, role: role as 'user' | 'vendor', address, city, state, pincode, businessName, businessPhone });
      }
    } catch (error) {
      // Error is handled in auth context
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex items-center justify-center py-20 px-4">
        <Card className="w-full max-w-md shadow-elevated">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-hero rounded-full">
                <Sparkles className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
            <CardTitle className="text-2xl">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription>
              {mode === "login"
                ? "Enter your credentials to access your account"
                : "Sign up to start using our laundry services"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" name="name" placeholder="John Doe" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Account Type</Label>
                    <select id="role" name="role" className="w-full rounded-md border px-3 py-2">
                      <option value="user">User</option>
                      <option value="vendor">Vendor</option>
                    </select>
                  </div>
                </>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="••••••••" required />
              </div>
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="••••••••" required />
                </div>
              )}

              {mode === 'signup' && (
                <div className="mt-4 grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" name="address" placeholder="House / Flat, Street" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <Input id="city" name="city" placeholder="City" />
                    <Input id="state" name="state" placeholder="State" />
                    <Input id="pincode" name="pincode" placeholder="Pincode" maxLength={6} />
                  </div>
                  {/* Vendor fields */}
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name (vendors)</Label>
                    <Input id="businessName" name="businessName" placeholder="Business name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessPhone">Business Phone (vendors)</Label>
                    <Input id="businessPhone" name="businessPhone" placeholder="Business phone" />
                  </div>
                </div>
              )}
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
              </Button>
              <div className="text-center text-sm">
                <span className="text-muted-foreground">
                  {mode === "login" ? "Don't have an account? " : "Already have an account? "}
                </span>
                <button
                  type="button"
                  onClick={() => setMode(mode === "login" ? "signup" : "login")}
                  className="text-primary hover:underline font-medium"
                >
                  {mode === "login" ? "Sign Up" : "Sign In"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
