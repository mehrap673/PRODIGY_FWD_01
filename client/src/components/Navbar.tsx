import { Link, useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User, Shield } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [location] = useLocation();

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/">
              <a
                className="text-xl font-semibold text-foreground hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-colors"
                data-testid="link-home"
              >
                AuthSystem
              </a>
            </Link>

            {user && (
              <div className="hidden md:flex items-center gap-2">
                <Link href="/profile">
                  <a
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover-elevate active-elevate-2 ${
                      location === "/profile"
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    }`}
                    data-testid="link-profile"
                  >
                    Profile
                  </a>
                </Link>

                {user.role === "admin" && (
                  <Link href="/admin">
                    <a
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover-elevate active-elevate-2 ${
                        location === "/admin"
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground"
                      }`}
                      data-testid="link-admin"
                    >
                      Admin
                    </a>
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {!user ? (
              <>
                <Link href="/login">
                  <Button
                    variant="ghost"
                    data-testid="button-login"
                  >
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button data-testid="button-register">Register</Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center gap-3 hover-elevate active-elevate-2 px-3 py-2 rounded-md transition-colors"
                    data-testid="button-user-menu"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                        {getInitials(user.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:flex flex-col items-start">
                      <span className="text-sm font-medium">{user.name}</span>
                      {user.role === "admin" && (
                        <Badge
                          variant="secondary"
                          className="text-xs h-5"
                        >
                          <Shield className="h-3 w-3 mr-1" />
                          Admin
                        </Badge>
                      )}
                    </div>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile">
                    <DropdownMenuItem data-testid="menu-item-profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                  </Link>
                  {user.role === "admin" && (
                    <Link href="/admin">
                      <DropdownMenuItem data-testid="menu-item-admin">
                        <Shield className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </DropdownMenuItem>
                    </Link>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-destructive focus:text-destructive"
                    data-testid="button-logout"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
