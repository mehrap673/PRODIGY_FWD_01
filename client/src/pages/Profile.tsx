import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Mail, User as UserIcon, Shield, Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Profile() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            <Skeleton className="h-48 w-full" />
            <div className="grid gap-6 md:grid-cols-2">
              <Skeleton className="h-40" />
              <Skeleton className="h-40" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 py-12">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
                  <AvatarFallback className="bg-primary text-primary-foreground text-3xl">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-center space-y-2">
                  <CardTitle className="text-3xl" data-testid="text-username">
                    {user.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {user.role === "admin" ? (
                      <Badge variant="default" className="gap-1">
                        <Shield className="h-3 w-3" />
                        Administrator
                      </Badge>
                    ) : (
                      <Badge variant="secondary">User</Badge>
                    )}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow">
              <CardHeader className="space-y-0 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <UserIcon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Personal Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Full Name
                  </p>
                  <p className="text-lg font-medium" data-testid="text-name">
                    {user.name}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    User ID
                  </p>
                  <p className="text-lg font-mono font-medium text-muted-foreground">
                    {user.id}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow">
              <CardHeader className="space-y-0 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Contact Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Email Address
                  </p>
                  <p className="text-lg font-medium" data-testid="text-email">
                    {user.email}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow">
              <CardHeader className="space-y-0 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Account Role</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Role
                  </p>
                  <p className="text-lg font-medium capitalize" data-testid="text-role">
                    {user.role}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Permissions
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {user.role === "admin"
                      ? "Full access to all features and admin dashboard"
                      : "Access to profile and user features"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow">
              <CardHeader className="space-y-0 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-md bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">Account Activity</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Member Since
                  </p>
                  <p className="text-lg font-medium">
                    {new Date().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Last Login
                  </p>
                  <p className="text-sm text-muted-foreground">Just now</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
