import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Services from "./pages/Services";
import Vendors from "./pages/Vendors";
import CreateOrder from "./pages/CreateOrder";

// User Pages
import UserDashboard from "./pages/user/Dashboard";
import UserOrders from "./pages/user/Orders";
import UserProfile from "./pages/user/Profile";

// Vendor Pages
import VendorDashboard from "./pages/vendor/Dashboard";
import VendorOrders from "./pages/vendor/Orders";
import VendorEarnings from "./pages/vendor/Earnings";
import VendorSetup from "./pages/vendor/Setup";
import VendorProfile from "./pages/vendor/Profile";
import VendorReviews from "./pages/vendor/Reviews";

// Admin Pages
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminVendors from "./pages/admin/Vendors";
import AdminOrders from "./pages/admin/Orders";

import { ProtectedRoute } from "./components/ProtectedRoute";
import { Navbar } from "./components/Navbar";
import { DashboardLayout } from "./components/layouts/DashboardLayout";
import SuperAdminDashboard from "./pages/superadmin/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/services" element={<Services />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/order/:vendorId" element={<CreateOrder />} />

              {/* Super Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={['superadmin']} />}>
                <Route path="/superadmin/dashboard" element={<DashboardLayout><SuperAdminDashboard /></DashboardLayout>} />
              </Route>

              {/* Admin Routes */}
              <Route element={<ProtectedRoute allowedRoles={['admin', 'superadmin']} />}>
                <Route path="/admin/dashboard" element={<DashboardLayout><AdminDashboard /></DashboardLayout>} />
                <Route path="/admin/users" element={<DashboardLayout><AdminUsers /></DashboardLayout>} />
                <Route path="/admin/vendors" element={<DashboardLayout><AdminVendors /></DashboardLayout>} />
                <Route path="/admin/orders" element={<DashboardLayout><AdminOrders /></DashboardLayout>} />
              </Route>

              {/* Vendor Routes */}
              <Route element={<ProtectedRoute allowedRoles={['vendor']} />}>
                <Route path="/vendor/setup" element={<VendorSetup />} />
                <Route path="/vendor/dashboard" element={<DashboardLayout><VendorDashboard /></DashboardLayout>} />
                <Route path="/vendor/orders" element={<DashboardLayout><VendorOrders /></DashboardLayout>} />
                <Route path="/vendor/earnings" element={<DashboardLayout><VendorEarnings /></DashboardLayout>} />
                <Route path="/vendor/profile" element={<DashboardLayout><VendorProfile /></DashboardLayout>} />
                <Route path="/vendor/reviews" element={<DashboardLayout><VendorReviews /></DashboardLayout>} />
              </Route>

              {/* Protected User Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/user/dashboard" element={<DashboardLayout><UserDashboard /></DashboardLayout>} />
                <Route path="/user/orders" element={<DashboardLayout><UserOrders /></DashboardLayout>} />
                <Route path="/user/profile" element={<DashboardLayout><UserProfile /></DashboardLayout>} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes >
          </ThemeProvider >
        </AuthProvider >
      </BrowserRouter >
    </TooltipProvider >
  </QueryClientProvider >
);

export default App;
