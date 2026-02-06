import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Hotel, Sun, Moon, Menu, User, LogOut, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface HeaderProps {
  isDark?: boolean;
  onToggleTheme?: () => void;
}

export function Header({ isDark = false, onToggleTheme }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/hotels", label: "Hotels" },
    { href: "/partner/dashboard", label: "List Property" },
  ];

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    setIsOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Hotel className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">BudgetStay</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                isActive(link.href) ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onToggleTheme}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer border">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{user.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" /> My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-500 flex items-center gap-2">
                  <LogOut className="h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/auth/login"><Button variant="outline" size="sm">Login</Button></Link>
              <Link to="/auth/signup"><Button size="sm">Sign Up</Button></Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="flex flex-col gap-4 mt-8">
              {user && (
                <div className="flex items-center gap-3 p-2 border-b pb-4">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              )}
              
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "text-lg font-medium py-2",
                    isActive(link.href) ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              
              <hr />

              {user ? (
                <>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="text-lg py-2">My Profile</Link>
                  <Button variant="destructive" onClick={handleLogout} className="w-full mt-4">
                    Logout
                  </Button>
                </>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link to="/auth/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link to="/auth/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}