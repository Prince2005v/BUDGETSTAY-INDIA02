import { useState } from "react";
import api from "@/lib/api";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  getAuth,
} from "firebase/auth";

declare global {
  interface Window {
    recaptchaVerifier?: RecaptchaVerifier;
  }
}
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Hotel,
  Mail,
  Phone,
  Lock,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const auth = getAuth();

  const [loginMethod, setLoginMethod] = useState("email");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    otp: "",
  });

  // ... (inside component)

  // ---------------- EMAIL LOGIN
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      const res = await api.post("/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      const data = res.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast({ title: "Welcome back 👋" });
      navigate("/");
    } catch (err) {
      toast({
        title: "Login failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- SEND OTP (REAL FIREBASE)
  const handleSendOtp = async () => {
    try {
      setIsLoading(true);

      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha",
          { size: "invisible" }
        );
      }

      const result = await signInWithPhoneNumber(
        auth,
        "+91" + formData.phone,
        window.recaptchaVerifier
      );

      setConfirmation(result);
      setOtpSent(true);

      toast({
        title: "OTP Sent 📲",
        description: `OTP sent to +91 ${formData.phone}`,
      });
    } catch (err) {
      toast({
        title: "OTP failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------- VERIFY OTP
  const handleOtpLogin = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await confirmation.confirm(formData.otp);

      toast({
        title: "Login successful 🎉",
        description: "Welcome to BudgetStay",
      });

      navigate("/");
    } catch {
      toast({
        title: "Invalid OTP",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 mb-4">
          <ArrowLeft size={16} /> Back
        </Link>

        <Card>
          <CardHeader className="text-center">
            <Hotel className="mx-auto mb-2" />
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Login to continue</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={loginMethod} onValueChange={setLoginMethod}>
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="email">
                  <Mail size={14} /> Email
                </TabsTrigger>
                <TabsTrigger value="phone">
                  <Phone size={14} /> Phone OTP
                </TabsTrigger>
              </TabsList>

              {/* EMAIL */}
              <TabsContent value="email">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <Input
                    placeholder="Email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />

                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      required
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>

                  <Button className="w-full" disabled={isLoading}>
                    Sign In
                  </Button>
                </form>
              </TabsContent>

              {/* PHONE OTP */}
              <TabsContent value="phone">
                <form onSubmit={handleOtpLogin} className="space-y-4">
                  <Input
                    placeholder="Phone Number"
                    disabled={otpSent}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />

                  {otpSent && (
                    <Input
                      placeholder="Enter OTP"
                      value={formData.otp}
                      onChange={(e) =>
                        setFormData({ ...formData, otp: e.target.value })
                      }
                    />
                  )}

                  {otpSent ? (
                    <Button className="w-full">Verify OTP</Button>
                  ) : (
                    <Button
                      type="button"
                      className="w-full"
                      onClick={handleSendOtp}
                    >
                      Send OTP
                    </Button>
                  )}
                </form>
              </TabsContent>
            </Tabs>

            <div id="recaptcha"></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
