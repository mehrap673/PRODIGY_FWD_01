import { Link } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Users, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-20 text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Secure Authentication System
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A modern, full-stack authentication solution with role-based access
                control and JWT security
              </p>
            </div>

            {!user ? (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="gap-2" data-testid="button-get-started">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" data-testid="button-login-home">
                    Login
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/profile">
                  <Button size="lg" className="gap-2" data-testid="button-view-profile">
                    View Profile
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                {user.role === "admin" && (
                  <Link href="/admin">
                    <Button size="lg" variant="outline" data-testid="button-admin-dashboard">
                      Admin Dashboard
                    </Button>
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="grid gap-8 md:grid-cols-3 pb-20">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Secure by Default</CardTitle>
                <CardDescription>
                  Industry-standard security with bcrypt password hashing and JWT
                  authentication
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>HttpOnly Cookies</CardTitle>
                <CardDescription>
                  Protected against XSS attacks with secure, HttpOnly cookie storage
                  for authentication tokens
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Role-Based Access</CardTitle>
                <CardDescription>
                  Flexible role management with user and admin roles for granular
                  access control
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
