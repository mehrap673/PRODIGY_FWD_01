import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Shield, Activity } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Admin() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="max-w-7xl mx-auto p-6 space-y-6">
            <Skeleton className="h-12 w-64" />
            <div className="grid gap-6 md:grid-cols-3">
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
              <Skeleton className="h-32" />
            </div>
            <Skeleton className="h-96" />
          </div>
        </div>
      </>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  // todo: remove mock functionality - Replace with actual API data
  const mockUsers = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      status: "active",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "user",
      status: "active",
    },
    {
      id: "3",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
      status: "active",
    },
    {
      id: "4",
      name: "Bob Wilson",
      email: "bob@example.com",
      role: "user",
      status: "inactive",
    },
  ];

  const stats = {
    totalUsers: mockUsers.length,
    adminUsers: mockUsers.filter((u) => u.role === "admin").length,
    activeUsers: mockUsers.filter((u) => u.status === "active").length,
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-primary/10">
        <div className="max-w-7xl mx-auto p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Manage users and monitor system activity
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                  <Users className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="text-total-users">
                  {stats.totalUsers}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Registered accounts
                </p>
              </CardContent>
            </Card>

            <Card className="shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
                <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
                <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="text-admin-users">
                  {stats.adminUsers}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  With admin privileges
                </p>
              </CardContent>
            </Card>

            <Card className="shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 gap-2">
                <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="text-active-users">
                  {stats.activeUsers}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Currently active
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="shadow">
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                View and manage all registered users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockUsers.map((mockUser) => (
                      <TableRow key={mockUser.id} data-testid={`row-user-${mockUser.id}`}>
                        <TableCell className="font-medium">{mockUser.name}</TableCell>
                        <TableCell>{mockUser.email}</TableCell>
                        <TableCell>
                          {mockUser.role === "admin" ? (
                            <Badge variant="default" className="gap-1">
                              <Shield className="h-3 w-3" />
                              Admin
                            </Badge>
                          ) : (
                            <Badge variant="secondary">User</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              mockUser.status === "active" ? "default" : "secondary"
                            }
                            className={
                              mockUser.status === "active"
                                ? "bg-chart-2 hover:bg-chart-2/80"
                                : ""
                            }
                          >
                            {mockUser.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
