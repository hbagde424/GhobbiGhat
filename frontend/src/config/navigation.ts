import {
    LayoutDashboard,
    Users,
    Store,
    Package,
    Settings,
    IndianRupee,
    Star,
    User,
    ShieldCheck,
    UserCog,
    TrendingUp,
    Clock,
} from 'lucide-react';

export interface NavigationItem {
    title: string;
    href: string;
    icon: any;
    badge?: string;
}

export const navigationConfig: Record<string, NavigationItem[]> = {
    superadmin: [
        {
            title: 'Dashboard',
            href: '/superadmin/dashboard',
            icon: LayoutDashboard,
        },
        {
            title: 'Manage Admins',
            href: '/superadmin/admins',
            icon: ShieldCheck,
        },
        {
            title: 'All Users',
            href: '/superadmin/users',
            icon: Users,
        },
        {
            title: 'All Vendors',
            href: '/superadmin/vendors',
            icon: Store,
        },
        {
            title: 'All Orders',
            href: '/superadmin/orders',
            icon: Package,
        },
        {
            title: 'Platform Settings',
            href: '/superadmin/settings',
            icon: Settings,
        },
    ],
    admin: [
        {
            title: 'Dashboard',
            href: '/admin/dashboard',
            icon: LayoutDashboard,
        },
        {
            title: 'Users',
            href: '/admin/users',
            icon: Users,
        },
        {
            title: 'Vendors',
            href: '/admin/vendors',
            icon: Store,
        },
        {
            title: 'Orders',
            href: '/admin/orders',
            icon: Package,
        },
        {
            title: 'Settings',
            href: '/admin/settings',
            icon: Settings,
        },
    ],
    vendor: [
        {
            title: 'Dashboard',
            href: '/vendor/dashboard',
            icon: LayoutDashboard,
        },
        {
            title: 'Orders',
            href: '/vendor/orders',
            icon: Package,
        },
        {
            title: 'Earnings',
            href: '/vendor/earnings',
            icon: IndianRupee,
        },
        {
            title: 'Reviews',
            href: '/vendor/reviews',
            icon: Star,
        },
        {
            title: 'Profile',
            href: '/vendor/profile',
            icon: UserCog,
        },
    ],
    user: [
        {
            title: 'Dashboard',
            href: '/user/dashboard',
            icon: LayoutDashboard,
        },
        {
            title: 'My Orders',
            href: '/user/orders',
            icon: Package,
        },
        {
            title: 'Profile',
            href: '/user/profile',
            icon: User,
        },
        {
            title: 'Browse Vendors',
            href: '/vendors',
            icon: Store,
        },
    ],
};
