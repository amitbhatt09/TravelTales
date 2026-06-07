import React from 'react';
import { Activity, BarChart3, MapPinned, PlusCircle, UserRound } from 'lucide-react';
import AppNavbar from '../ui/AppNavbar';

const navItems = [
    { label: 'Dashboard', to: '/guide', icon: Activity },
    { label: 'My Places', to: '/viewplace', icon: MapPinned },
    { label: 'Analytics', to: '/guide', icon: BarChart3 },
    { label: 'Add Destination', to: '/placeform', icon: PlusCircle },
    { label: 'Profile', to: '/guide', icon: UserRound },
];

const GuideNavbar = ({ username, role }) => {
    return <AppNavbar username={username} role={role} items={navItems} />;
};

export default GuideNavbar;