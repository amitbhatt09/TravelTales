import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LockKeyhole, Mail, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import baseUrl from '../apiConfig';
import Button from '../ui/Button';
import Card from '../ui/Card';
import BrandMark from '../ui/BrandMark';
import ThemeToggle from '../ui/ThemeToggle';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('tt_remember_email');
    if (savedEmail) {
      setFormData((current) => ({ ...current, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validate = () => {
    const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const formErrors = {};

    if (!formData.email) {
      formErrors.email = 'Email is required';
    } else if (!validEmail.test(formData.email)) {
      formErrors.email = 'Please enter a valid email.';
    }

    if (!formData.password) {
      formErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      formErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      const response = await axios.post(`${baseUrl}/api/login`, formData);
      const token = response.data.Token;

      localStorage.setItem('token', token);
      const decodedToken = jwtDecode(token);
      const username = decodedToken.name;
      const role = decodedToken.role;

      localStorage.setItem('username', username);
      localStorage.setItem('role', role);

      if (rememberMe) localStorage.setItem('tt_remember_email', formData.email);
      else localStorage.removeItem('tt_remember_email');

      navigate('/home');
    } catch (error) {
      setErrors({ apiError: 'Invalid email or password.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-transparent">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.16),transparent_25%)]" />
      <div className="absolute right-4 top-4 z-20 sm:right-8 sm:top-8">
        <ThemeToggle />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-4 py-8 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <motion.section
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative hidden min-h-[720px] overflow-hidden rounded-[36px] lg:block"
        >
          <img
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1200&q=80"
            alt="Travel landscape"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/40 to-teal-950/50" />
          <div className="absolute inset-0 p-10 text-white">
            <BrandMark className="[&>div:last-child>p:first-child]:text-slate-200 [&>div:last-child>p:last-child]:from-white [&>div:last-child>p:last-child]:via-sky-200 [&>div:last-child>p:last-child]:to-teal-200" />
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              Premium travel planning
            </div>
            <h1 className="mt-8 max-w-lg text-5xl font-bold leading-tight">Discover stays, stories, and destinations that feel ready for takeoff.</h1>
            <p className="mt-6 max-w-lg text-base leading-8 text-slate-100/85">
              Travel Tales now feels like a production-grade startup: bold visuals, clear hierarchy, responsive layouts, and premium interactions from the first screen.
            </p>
         
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 30, y: 24 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.65 }}
          className="w-full"
        >
          <Card className="mx-auto max-w-xl p-6 sm:p-8">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-500">Welcome back</p>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">Sign in to continue exploring</h2>
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">Access curated destinations, role-based tools, and a polished travel dashboard.</p>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
              <div>
                <label htmlFor="email" className="field-label">Email address</label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-slate-400" />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="field-input pl-12"
                    aria-invalid={Boolean(errors.email)}
                  />
                </div>
                {errors.email ? <p className="mt-2 text-sm text-rose-500">{errors.email}</p> : null}
              </div>

              <div>
                <label htmlFor="password" className="field-label">Password</label>
                <div className="relative">
                  <LockKeyhole className="pointer-events-none absolute left-4 top-4 h-5 w-5 text-slate-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="field-input pl-12 pr-12"
                    aria-invalid={Boolean(errors.password)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-4 top-4 text-slate-400 transition hover:text-slate-700 dark:hover:text-slate-200"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password ? <p className="mt-2 text-sm text-rose-500">{errors.password}</p> : null}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <label className="inline-flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400"
                  />
                  Remember me
                </label>
                <button type="button" className="text-sm font-semibold text-sky-500 transition hover:text-sky-600" onClick={() => navigate('/signup')}>
                  Need an account?
                </button>
              </div>

              {errors.apiError ? <p className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600 dark:bg-rose-500/10 dark:text-rose-300">{errors.apiError}</p> : null}

              <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                {submitting ? 'Signing in...' : 'Sign in'}
              </Button>

              <div className="relative py-2 text-center text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                <span className="relative z-10 bg-white px-3 dark:bg-slate-950">or continue with</span>
                <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-slate-200 dark:bg-slate-800" />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Button type="button" variant="outline" className="w-full justify-center">Google</Button>
                <Button type="button" variant="outline" className="w-full justify-center">Apple</Button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-300">
              New to Travel Tales?{' '}
              <button type="button" className="font-semibold text-sky-500 transition hover:text-sky-600" onClick={() => navigate('/signup')}>
                Create account
              </button>
            </p>
          </Card>
        </motion.section>
      </div>
    </div>
  );
};

export default Login;
