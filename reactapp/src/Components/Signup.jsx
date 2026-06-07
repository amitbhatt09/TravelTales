import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import { CheckCircle2, ChevronLeft, ChevronRight, Mail, Phone, ShieldCheck, UserRound } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Modal from '../ui/Modal';
import ThemeToggle from '../ui/ThemeToggle';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [userRole, setUserRole] = useState('');
    const [errors, setErrors] = useState({});
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();

    const steps = useMemo(() => [
        { id: 1, title: 'Personal details' },
        { id: 2, title: 'Account information' },
        { id: 3, title: 'Choose your role' },
    ], []);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSignup = async (e) => {
        e.preventDefault()
        let validationErrors = {};

        if (!username) {
            validationErrors.username = 'User Name is required';
        }

        if (!email) {
            validationErrors.email = 'Email is required';
        } else if (!validateEmail(email)) {
            validationErrors.email = 'Please enter a valid email';
        }

        if (!mobileNumber) {
            validationErrors.mobileNumber = 'Mobile number is required';
        } 
        else if (!/^\d{10}$/.test(mobileNumber)) {
            validationErrors.mobileNumber = 'Mobile number must be exactly 10 digits and no special characters allowed';
        }
        

        if (!password) {
            validationErrors.password = 'Password is required';
        } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password)) {
            validationErrors.password = 'Password must be strong\n Password at least contain 1 lowercase letter\nPassword at least contain 1 uppercase letter\nPassword at least contain 1 Special character.\nPassword at least contain 1 number.';
        }
        

        if (!confirmPassword) {
            validationErrors.confirmPassword = 'Confirm Password is required';
        } else if (password !== confirmPassword) {
            validationErrors.confirmPassword = 'Passwords do not match';
        }

        if (!userRole) {
            validationErrors.userRole = 'User Role is required';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            setSubmitting(true);
            try {
                const response = await axios.post(`${API_BASE_URL}/api/register`, {
                    username,
                    email,
                    mobileNumber,
                    password,
                    userRole
                });

                if (response.status === 201) {
                    setShowSuccessModal(true);
                } else {
                    setErrors({ form: response.data.Message });
                }
            } catch (err) {
                setErrors({ form: 'An error occurred. Please try again later.' });
            } finally {
                setSubmitting(false);
            }
        }
    };

    const nextStep = () => {
        if (step === 1) {
            const stepErrors = {};
            if (!username) stepErrors.username = 'User Name is required';
            if (!email) stepErrors.email = 'Email is required';
            else if (!validateEmail(email)) stepErrors.email = 'Please enter a valid email';
            if (!mobileNumber) stepErrors.mobileNumber = 'Mobile number is required';
            else if (!/^\d{10}$/.test(mobileNumber)) stepErrors.mobileNumber = 'Mobile number must be exactly 10 digits and no special characters allowed';
            if (Object.keys(stepErrors).length > 0) {
                setErrors((current) => ({ ...current, ...stepErrors }));
                return;
            }
        }

        if (step === 2) {
            const stepErrors = {};
            if (!password) stepErrors.password = 'Password is required';
            else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/.test(password)) {
                stepErrors.password = 'Password must include uppercase, number, special character, and 8+ characters.';
            }
            if (!confirmPassword) stepErrors.confirmPassword = 'Confirm Password is required';
            else if (password !== confirmPassword) stepErrors.confirmPassword = 'Passwords do not match';
            if (Object.keys(stepErrors).length > 0) {
                setErrors((current) => ({ ...current, ...stepErrors }));
                return;
            }
        }

        setStep((current) => Math.min(3, current + 1));
    };

    const renderStep = () => {
        if (step === 1) {
            return (
                <div className="grid gap-5">
                    <div>
                        <label htmlFor="userName" className="field-label">User name</label>
                        <div className="relative">
                            <UserRound className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-slate-400" />
                            <input id="userName" type="text" className="field-input pl-12" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter username" />
                        </div>
                        {errors.username ? <p className="mt-2 text-sm text-rose-500">{errors.username}</p> : null}
                    </div>
                    <div>
                        <label htmlFor="email" className="field-label">Email</label>
                        <div className="relative">
                            <Mail className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-slate-400" />
                            <input id="email" type="email" className="field-input pl-12" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                        </div>
                        {errors.email ? <p className="mt-2 text-sm text-rose-500">{errors.email}</p> : null}
                    </div>
                    <div>
                        <label htmlFor="mobileNumber" className="field-label">Mobile number</label>
                        <div className="relative">
                            <Phone className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-slate-400" />
                            <input id="mobileNumber" type="text" className="field-input pl-12" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} placeholder="Enter mobile number" />
                        </div>
                        {errors.mobileNumber ? <p className="mt-2 text-sm text-rose-500">{errors.mobileNumber}</p> : null}
                    </div>
                </div>
            );
        }

        if (step === 2) {
            return (
                <div className="grid gap-5">
                    <div>
                        <label htmlFor="password" className="field-label">Password</label>
                        <input id="password" type="password" className="field-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create password" />
                        {errors.password ? <p className="mt-2 whitespace-pre-line text-sm text-rose-500">{errors.password}</p> : null}
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="field-label">Confirm Password</label>
                        <input id="confirmPassword" type="password" className="field-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm password" />
                        {errors.confirmPassword ? <p className="mt-2 text-sm text-rose-500">{errors.confirmPassword}</p> : null}
                    </div>
                    <div className="rounded-[24px] border border-sky-100 bg-sky-50 p-4 text-sm leading-7 text-slate-600 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-slate-200">
                        Use at least 8 characters with one uppercase letter, one number, and one special character.
                    </div>
                </div>
            );
        }

        return (
            <div className="grid gap-4 sm:grid-cols-2">
                {[
                    {
                        value: 'Guide',
                        title: 'Guide',
                        description: 'Publish destinations, manage places, and track platform activity.',
                        icon: ShieldCheck,
                    },
                    {
                        value: 'Traveller',
                        title: 'Traveller',
                        description: 'Browse curated destinations and explore immersive travel recommendations.',
                        icon: CheckCircle2,
                    },
                ].map((item) => (
                    <button
                        key={item.value}
                        type="button"
                        onClick={() => setUserRole(item.value)}
                        className={`rounded-[28px] border p-6 text-left transition ${userRole === item.value ? 'border-sky-400 bg-sky-50 shadow-lg shadow-sky-500/10 dark:border-sky-400 dark:bg-sky-500/10' : 'border-slate-200 bg-white/80 hover:-translate-y-1 hover:border-sky-200 dark:border-slate-800 dark:bg-slate-950/60'}`}
                    >
                        <item.icon className="h-7 w-7 text-sky-500" />
                        <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                        <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
                    </button>
                ))}
                {errors.userRole ? <p className="sm:col-span-2 text-sm text-rose-500">{errors.userRole}</p> : null}
            </div>
        );
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigate('/');
    };

    return (
        <div className="relative min-h-screen overflow-hidden px-4 py-8 sm:px-6 lg:px-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.18),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(20,184,166,0.16),transparent_22%)]" />
            <div className="absolute right-4 top-4 z-20 sm:right-8 sm:top-8">
                <ThemeToggle />
            </div>
            <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
                <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }} className="hidden rounded-[36px] bg-gradient-to-br from-slate-950 to-sky-950 p-10 text-white lg:block">
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-300">Join Travel Tales</p>
                    <h1 className="mt-6 text-5xl font-bold leading-tight">Create a premium travel account in three guided steps.</h1>
                    <p className="mt-6 text-base leading-8 text-slate-200">The onboarding flow now feels modern and role-aware, with clear validation and polished decision points for guides and travellers.</p>
                    <div className="mt-10 space-y-4">
                        {steps.map((item) => (
                            <div key={item.id} className={`rounded-[24px] border px-5 py-4 ${step === item.id ? 'border-sky-300 bg-white/10' : 'border-white/10 bg-white/5'}`}>
                                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">Step {item.id}</p>
                                <p className="mt-2 text-lg font-semibold">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </motion.section>

                <motion.section initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.08 }}>
                    <Card className="mx-auto max-w-2xl p-6 sm:p-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-500">Signup</p>
                                <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">Build your Travel Tales identity</h2>
                            </div>
                            <div className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-200">Step {step} of 3</div>
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-3">
                            {steps.map((item) => (
                                <div key={item.id} className={`h-2 rounded-full ${item.id <= step ? 'bg-sky-500' : 'bg-slate-200 dark:bg-slate-800'}`} />
                            ))}
                        </div>

                        <form className="mt-8 space-y-6" onSubmit={handleSignup} noValidate>
                            {renderStep()}
                            {errors.form ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">{errors.form}</p> : null}

                            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                                <Button type="button" variant="outline" onClick={() => step === 1 ? navigate('/login') : setStep((current) => current - 1)}>
                                    <ChevronLeft className="h-4 w-4" />
                                    {step === 1 ? 'Back to login' : 'Previous'}
                                </Button>

                                {step < 3 ? (
                                    <Button type="button" onClick={nextStep}>
                                        Next step
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                ) : (
                                    <Button type="submit" disabled={submitting}>
                                        {submitting ? 'Creating account...' : 'Create account'}
                                    </Button>
                                )}
                            </div>
                        </form>

                        <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
                            Already have an account?{' '}
                            <button type="button" className="font-semibold text-sky-500 transition hover:text-sky-600" onClick={() => navigate('/login')}>
                                Login
                            </button>
                        </p>
                    </Card>
                </motion.section>
            </div>

            <Modal open={showSuccessModal} onOpenChange={setShowSuccessModal} title="Account created" description="Your registration completed successfully.">
                <div className="space-y-4">
                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">User registration is successful. Continue to the login screen and start exploring the redesigned travel experience.</p>
                    <div className="flex justify-end">
                        <Button onClick={handleCloseModal}>Go to login</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Signup;