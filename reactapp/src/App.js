import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import GuideDashboard from './GuideComponents/GuideDashboard';
import PlaceForm from './GuideComponents/PlaceForm';
import Login from './Components/Login';
import TravellerDashboard from './TravellerComponents/TravellerDashboard';
import Signup from './Components/Signup';
import ViewPlace from './GuideComponents/ViewPlace';
import HomePage from './Components/HomePage';
import ErrorPage from './Components/ErrorPage';
import PrivateRoute from './Components/PrivateRoute';
import TravellerViewPlace from './TravellerComponents/TravellerViewPlace';
import ToastProvider from './ui/ToastProvider';

const transitionProps = {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
    transition: { duration: 0.35 },
};

const Page = ({ children }) => <motion.div {...transitionProps}>{children}</motion.div>;

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Page><Login /></Page>} />
                <Route path="/signup" element={<Page><Signup /></Page>} />
                <Route path="/login" element={<Page><Login /></Page>} />
                <Route path="/home" element={<Page><HomePage /></Page>} />
                <Route path="*" element={<Page><ErrorPage /></Page>} />

                <Route
                    path="/guide"
                    element={
                        <PrivateRoute allowedRoles={['Guide']}>
                            <Page><GuideDashboard /></Page>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/placeform"
                    element={
                        <PrivateRoute allowedRoles={['Guide']}>
                            <Page><PlaceForm mode="add" /></Page>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/editplace/:id"
                    element={
                        <PrivateRoute allowedRoles={['Guide']}>
                            <Page><PlaceForm mode="edit" /></Page>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/viewplace"
                    element={
                        <PrivateRoute allowedRoles={['Guide']}>
                            <Page><ViewPlace /></Page>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/traveller"
                    element={
                        <PrivateRoute allowedRoles={['Traveller']}>
                            <Page><TravellerDashboard /></Page>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/travellerviewplace"
                    element={
                        <PrivateRoute allowedRoles={['Traveller']}>
                            <Page><TravellerViewPlace /></Page>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};

const App = () => {
    return (
        <Router>
            <div className="min-h-screen bg-transparent">
                <ToastProvider />
                <AnimatedRoutes />
            </div>
        </Router>
    );
};

export default App;
