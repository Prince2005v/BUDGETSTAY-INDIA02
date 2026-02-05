import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hotel, Mail, Phone, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
 const [loginMethod, setLoginMethod] = useState("email");

  const [otpSent, setOtpSent] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    otp: "",
  });

  const handleEmailLogin = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setIsLoading(true);

    const res = await fetch("http://localhost:5001/api/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: formData.email,
    password: formData.password,
  }),
});

const data = await res.json().catch(() => ({}));

if (!res.ok) {
  throw new Error(data.message || "Invalid email or password");
}


    // 🔐 save session
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    toast({
      title: "Welcome back 👋",
      description: `Hello ${data.user.name}`,
    });

    navigate("/");
  } catch (err: any) {
    toast({
      title: "Login failed",
      description: err.message,
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};


  const handleSendOtp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      toast({
        title: "OTP Sent!",
        description: `A 6-digit OTP has been sent to ${formData.phone}`,
      });
    }, 1000);
  };

  const handleOtpLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome!",
        description: "You have successfully logged in.",
      });
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <Card className="shadow-strong">
          <CardHeader className="text-center">
            <Link to="/" className="inline-flex items-center justify-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Hotel className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">BudgetStay</span>
            </Link>
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={loginMethod} onValueChange={(v) => setLoginMethod(v as "email" | "phone")}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="email" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="phone" className="gap-2">
                  <Phone className="h-4 w-4" />
                  Phone OTP
                </TabsTrigger>
              </TabsList>

              <TabsContent value="email">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        to="#"
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="phone">
                <form onSubmit={handleOtpLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                        +91
                      </span>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        placeholder="XXXXX XXXXX"
                        className="pl-12"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        disabled={otpSent}
                      />
                    </div>
                  </div>

                  {otpSent ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="otp">Enter OTP</Label>
                        <Input
                          id="otp"
                          type="text"
                          required
                          placeholder="Enter 6-digit OTP"
                          maxLength={6}
                          className="text-center text-lg tracking-widest"
                          value={formData.otp}
                          onChange={(e) =>
                            setFormData({ ...formData, otp: e.target.value })
                          }
                        />
                        <button
                          type="button"
                          className="text-sm text-primary hover:underline"
                          onClick={() => setOtpSent(false)}
                        >
                          Change phone number
                        </button>
                      </div>
                      <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Verifying..." : "Verify & Sign In"}
                      </Button>
                    </>
                  ) : (
                    <Button
                      type="button"
                      className="w-full"
                      onClick={handleSendOtp}
                      disabled={isLoading || !formData.phone}
                    >
                      {isLoading ? "Sending..." : "Send OTP"}
                    </Button>
                  )}
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/auth/signup" className="text-primary font-medium hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
