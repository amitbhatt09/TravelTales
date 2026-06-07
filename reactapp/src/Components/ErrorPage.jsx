import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Compass } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import ThemeToggle from '../ui/ThemeToggle';

const ErrorPage = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/home'); // Redirects to the homepage
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
            <div className="absolute right-4 top-4 sm:right-8 sm:top-8">
                <ThemeToggle />
            </div>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-2xl">
                <Card className="p-8 text-center sm:p-12">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300">
                        <AlertTriangle className="h-10 w-10" />
                    </div>
                    <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-sky-500">Unexpected route</p>
                    <h1 className="mt-3 text-4xl font-bold text-slate-900 dark:text-white">Oops! Something went off the itinerary.</h1>
                    <p className="mt-4 text-sm leading-8 text-slate-600 dark:text-slate-300">The page you requested is unavailable or moved. Return to the redesigned home experience and continue exploring destinations.</p>
                    <div className="mt-8 flex justify-center">
                        <Button onClick={handleRedirect}>
                            <Compass className="h-4 w-4" />
                            Go to homepage
                        </Button>
                    </div>
                </Card>
            </motion.div>
        </div>
    );
};

export default ErrorPage;