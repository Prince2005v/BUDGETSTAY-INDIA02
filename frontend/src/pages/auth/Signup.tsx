import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Hotel, Mail, Lock, User, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";

export default function Signup() {
const navigate = useNavigate();
const { toast } = useToast();

const [showPassword, setShowPassword] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [agreedToTerms, setAgreedToTerms] = useState(false);

// Email OTP states
const [otpSent, setOtpSent] = useState(false);
const [otp, setOtp] = useState("");

const [formData, setFormData] = useState({
name: "",
email: "",
password: "",
});

// Send Email OTP
const handleSendOtp = async () => {
if (!formData.email) {
toast({
title: "Enter email first",
variant: "destructive",
});
return;
}


// Send Email OTP
const handleSendOtp = async () => {
  if (!formData.email) {
    toast({
      title: "Enter email first",
      variant: "destructive",
    });
    return;
  }

  try {
    setIsLoading(true);

    await api.post("/auth/send-otp", {
      email: formData.email,
    });

    setOtpSent(true);

    toast({
      title: "OTP Sent",
      description: "Check your email for OTP",
    });
  } catch (err: any) {
    toast({
      title: "Failed to send OTP",
      description: err.response?.data?.message || "Error",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};


};

// Signup
const handleSignup = async (e: React.FormEvent) => {
e.preventDefault();


// Signup
const handleSignup = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!agreedToTerms) {
    toast({
      title: "Please accept terms",
      variant: "destructive",
    });
    return;
  }

  if (!otpSent || !otp) {
    toast({
      title: "Email verification required",
      variant: "destructive",
    });
    return;
  }

  try {
    setIsLoading(true);

    await api.post("/auth/register", {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      otp: otp,
    });

    toast({
      title: "Account created 🎉",
      description: "Please login",
    });

    navigate("/auth/login");
  } catch (err: any) {
    toast({
      title: "Signup failed",
      description: err.response?.data?.message || "Something went wrong",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};


};

return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
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

            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>
              Sign up using your email
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">

              {/* Name */}
              <div className="space-y-2">
                <Label>Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    required
                    placeholder="Enter your name"
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label>Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
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

                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={handleSendOtp}
                  disabled={isLoading}
                >
                  {otpSent ? "OTP Sent" : "Send OTP"}
                </Button>
              </div>

              {/* OTP Input */}
              {otpSent && (
                <div className="space-y-2">
                  <Label>Enter OTP</Label>
                  <Input
                    placeholder="6-digit OTP"
                    value={otp}
                    maxLength={6}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>
              )}

              {/* Password */}
              <div className="space-y-2">
                <Label>Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    className="pl-10 pr-10"
                    placeholder="Create password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <Checkbox
                  checked={agreedToTerms}
                  onCheckedChange={(checked) =>
                    setAgreedToTerms(checked as boolean)
                  }
                />
                <span className="text-sm text-muted-foreground">
                  I agree to Terms & Privacy Policy
                </span>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-primary font-medium">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

}