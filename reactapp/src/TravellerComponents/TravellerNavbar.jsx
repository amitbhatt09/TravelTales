import React from 'react';
import { Compass, MapPinned } from 'lucide-react';
import AppNavbar from '../ui/AppNavbar';

const navItems = [
    { label: 'Dashboard', to: '/traveller', icon: Compass },
    { label: 'Explore destinations', to: '/travellerviewplace', icon: MapPinned },
];

const TravellerNavbar = ({ username, role }) => {
    return <AppNavbar username={username} role={role} items={navItems} />;
};

export default TravellerNavbar;
