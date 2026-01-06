import React, { useState, useEffect, useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { X } from 'lucide-react';
import { authModalOpenState, authModalTabState, authModalDismissedState } from '../store/authModal.state';
import { userState } from '../store/userstate';
import { LoadingStateApi } from '../store/Loading.State';
import { handleError, handlesuccess } from '../toast.util';

function AuthModal() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useRecoilState(authModalOpenState);
    const [activeTab, setActiveTab] = useRecoilState(authModalTabState);
    const [, setDismissed] = useRecoilState(authModalDismissedState);
    const setUser = useSetRecoilState(userState);
    const setLoading = useSetRecoilState(LoadingStateApi);

    const [showPassword, setShowPassword] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // Login form state
    const [loginForm, setLoginForm] = useState({ email: '', password: '' });

    // Register form state
    const [registerForm, setRegisterForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    // Handle modal open animation
    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        }
    }, [isOpen]);

    // Handle ESC key to close
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape' && isOpen) {
                handleClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleClose = useCallback(() => {
        setIsAnimating(false);
        setTimeout(() => {
            setIsOpen(false);
            setDismissed(true);
            sessionStorage.setItem('authModalDismissed', 'true');
        }, 200);
    }, [setIsOpen, setDismissed]);

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    // Login handler
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/login`,
                loginForm,
                { withCredentials: true }
            );
            handlesuccess(response.data.message);
            setIsOpen(false);
            setTimeout(() => {
                // Force full page reload to refresh Recoil state
                window.location.href = '/';
            }, 1000);
        } catch (error) {
            handleError(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    // Register handler
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/signup`,
                registerForm,
                { withCredentials: true }
            );
            handlesuccess(response.data.message);
            setUser({
                userID: response.data.data.userID,
                firstName: response.data.data.firstName,
            });
            setIsOpen(false);
            setTimeout(() => {
                navigate('/mobileNo');
            }, 1500);
        } catch (error) {
            handleError(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${isAnimating ? 'bg-black/50 backdrop-blur-sm' : 'bg-transparent'
                }`}
            onClick={handleBackdropClick}
        >
            {/* Modal Container */}
            <div
                className={`relative w-full max-w-md transform transition-all duration-300 ${isAnimating
                    ? 'translate-y-0 opacity-100 scale-100'
                    : 'translate-y-8 opacity-0 scale-95'
                    }`}
            >
                {/* Glassmorphism Card */}
                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden">
                    {/* Gradient Border Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#647FBC]/20 via-transparent to-[#7C5CFC]/20 pointer-events-none" />

                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors group"
                    >
                        <X className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
                    </button>

                    {/* Header */}
                    <div className="pt-8 pb-4 px-8">
                        <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-[#647FBC] to-[#7C5CFC] bg-clip-text text-transparent">
                            Quick Diagnostics
                        </h2>
                        <p className="text-center text-gray-500 text-sm mt-2">
                            {activeTab === 'login'
                                ? 'Welcome back! Please sign in to continue'
                                : 'Create an account to get started'}
                        </p>
                    </div>

                    {/* Tab Switcher */}
                    <div className="px-8 pb-4">
                        <div className="flex bg-gray-100 rounded-2xl p-1 relative">
                            {/* Animated Indicator */}
                            <div
                                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-md transition-transform duration-300 ease-out ${activeTab === 'register' ? 'translate-x-[calc(100%+4px)]' : 'translate-x-0'
                                    }`}
                            />
                            <button
                                onClick={() => setActiveTab('login')}
                                className={`flex-1 py-2.5 text-sm font-semibold rounded-xl z-10 transition-colors duration-200 ${activeTab === 'login' ? 'text-[#647FBC]' : 'text-gray-500'
                                    }`}
                            >
                                Login
                            </button>
                            <button
                                onClick={() => setActiveTab('register')}
                                className={`flex-1 py-2.5 text-sm font-semibold rounded-xl z-10 transition-colors duration-200 ${activeTab === 'register' ? 'text-[#647FBC]' : 'text-gray-500'
                                    }`}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>

                    {/* Form Content */}
                    <div className="px-8 pb-8">
                        {activeTab === 'login' ? (
                            /* Login Form */
                            <form onSubmit={handleLogin} className="space-y-5">
                                {/* Email Input */}
                                <div className="relative group">
                                    <input
                                        type="email"
                                        value={loginForm.email}
                                        onChange={(e) => setLoginForm((p) => ({ ...p, email: e.target.value }))}
                                        placeholder="Email address"
                                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#647FBC] transition-all duration-200"
                                        required
                                    />
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#647FBC] to-[#7C5CFC] opacity-0 group-focus-within:opacity-100 -z-10 blur-sm transition-opacity duration-200" />
                                </div>

                                {/* Password Input */}
                                <div className="relative group">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={loginForm.password}
                                        onChange={(e) => setLoginForm((p) => ({ ...p, password: e.target.value }))}
                                        placeholder="Password"
                                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#647FBC] transition-all duration-200 pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Forgot Password */}
                                <div className="text-right">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsOpen(false);
                                            navigate('/forgotPassword');
                                        }}
                                        className="text-sm font-medium text-[#647FBC] hover:text-[#7C5CFC] transition-colors"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full py-3.5 bg-gradient-to-r from-[#647FBC] to-[#647FBC] text-white font-semibold rounded-xl shadow-lg shadow-[#647FBC]/25 hover:shadow-xl hover:shadow-[#647FBC]/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                                >
                                    Sign In
                                </button>
                            </form>
                        ) : (
                            /* Register Form */
                            <form onSubmit={handleRegister} className="space-y-4">
                                {/* Name Row */}
                                <div className="grid grid-cols-2 gap-3">
                                    <input
                                        type="text"
                                        value={registerForm.firstName}
                                        onChange={(e) => setRegisterForm((p) => ({ ...p, firstName: e.target.value }))}
                                        placeholder="First Name"
                                        className="px-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#647FBC] transition-all duration-200"
                                        required
                                    />
                                    <input
                                        type="text"
                                        value={registerForm.lastName}
                                        onChange={(e) => setRegisterForm((p) => ({ ...p, lastName: e.target.value }))}
                                        placeholder="Last Name"
                                        className="px-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#647FBC] transition-all duration-200"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <input
                                    type="email"
                                    value={registerForm.email}
                                    onChange={(e) => setRegisterForm((p) => ({ ...p, email: e.target.value }))}
                                    placeholder="Email address"
                                    className="w-full px-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#647FBC] transition-all duration-200"
                                    required
                                />

                                {/* Password */}
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={registerForm.password}
                                        onChange={(e) => setRegisterForm((p) => ({ ...p, password: e.target.value }))}
                                        placeholder="Create Password"
                                        className="w-full px-4 py-3.5 bg-gray-50 border-2 border-transparent rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-[#647FBC] transition-all duration-200 pr-12"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                                            <path
                                                d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"
                                                stroke="currentColor"
                                                strokeWidth="1.5"
                                            />
                                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Demo Note */}
                                <div className="bg-[#647FBC]/10 border border-[#647FBC]/20 rounded-xl p-3">
                                    <p className="text-xs text-[#647FBC] font-medium text-center">
                                        ⚡ Demo Note: Backend may take 2-3 minutes to respond on first request
                                    </p>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full py-3.5 bg-gradient-to-r from-[#647FBC] to-[#647FBC] text-white font-semibold rounded-xl shadow-lg shadow-[#647FBC]/25 hover:shadow-xl hover:shadow-[#647FBC]/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                                >
                                    Create Account
                                </button>
                            </form>
                        )}

                        {/* Skip Link */}
                        <button
                            onClick={handleClose}
                            className="w-full mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                        >
                            Continue browsing without signing in →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuthModal;
