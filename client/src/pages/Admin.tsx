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

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminData {
  users: AdminUser[];
  stats: {
    totalUsers: number;
    adminUsers: number;
    regularUsers: number;
  };
}

export default function Admin() {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      setLocation("/login");
    }
  }, [user, isLoading, setLocation]);

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchAdminData();
    }
  }, [user]);

  const fetchAdminData = async () => {
    try {
      const response = await fetch('/api/admin', {
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setAdminData(data);
      }
    } catch (error) {
      console.error('Failed to fetch admin data', error);
    } finally {
      setDataLoading(false);
    }
  };

  if (isLoading || dataLoading) {
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

  const stats = adminData?.stats || {
    totalUsers: 0,
    adminUsers: 0,
    regularUsers: 0,
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
                <CardTitle className="text-sm font-medium">Regular Users</CardTitle>
                <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid="text-active-users">
                  {stats.regularUsers}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Standard access
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
              {adminData?.users && adminData.users.length > 0 ? (
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {adminData.users.map((adminUser) => (
                        <TableRow key={adminUser._id} data-testid={`row-user-${adminUser._id}`}>
                          <TableCell className="font-medium">{adminUser.name}</TableCell>
                          <TableCell>{adminUser.email}</TableCell>
                          <TableCell>
                            {adminUser.role === "admin" ? (
                              <Badge variant="default" className="gap-1">
                                <Shield className="h-3 w-3" />
                                Admin
                              </Badge>
                            ) : (
                              <Badge variant="secondary">User</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  No users found
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
