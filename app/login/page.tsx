"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, LogIn, Shield, Users, Phone, DollarSign, Calendar } from 'lucide-react';
import { useAuth, UserRole } from '../../lib/auth';

interface MockUser {
  email: string;
  password: string;
  name: string;
  role: UserRole;
  icon: React.ReactNode;
  color: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock users for testing
  const mockUsers: MockUser[] = [
    {
      email: 'admin@mavera.sa',
      password: 'admin123',
      name: 'Ahmed Al-Saud',
      role: UserRole.SUPER_ADMIN,
      icon: <Shield size={24} />,
      color: 'bg-red-500'
    },
    {
      email: 'sales@mavera.sa',
      password: 'sales123',
      name: 'Mohammed Al-Rasheed',
      role: UserRole.SALES_AGENT,
      icon: <Users size={24} />,
      color: 'bg-blue-500'
    },
    {
      email: 'callcenter@mavera.sa',
      password: 'call123',
      name: 'Sara Abdullah',
      role: UserRole.CALL_CENTER,
      icon: <Phone size={24} />,
      color: 'bg-green-500'
    },
    {
      email: 'finance@mavera.sa',
      password: 'finance123',
      name: 'Khalid Hassan',
      role: UserRole.FINANCE_MANAGER,
      icon: <DollarSign size={24} />,
      color: 'bg-purple-500'
    },
    {
      email: 'coordinator@mavera.sa',
      password: 'coord123',
      name: 'Fatima Al-Otaibi',
      role: UserRole.COORDINATOR,
      icon: <Calendar size={24} />,
      color: 'bg-orange-500'
    }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find matching user
    const user = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      login({
        id: user.email,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
      });

      // Redirect based on role
      switch (user.role) {
        case UserRole.SUPER_ADMIN:
          router.push('/admin');
          break;
        case UserRole.SALES_AGENT:
          router.push('/sales-dashboard');
          break;
        case UserRole.CALL_CENTER:
          router.push('/leads');
          break;
        case UserRole.FINANCE_MANAGER:
          router.push('/admin/finance');
          break;
        case UserRole.COORDINATOR:
          router.push('/arrangements/enhanced');
          break;
        default:
          router.push('/sales-dashboard');
      }
    } else {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      setIsLoading(false);
    }
  };

  const handleQuickLogin = (user: MockUser) => {
    setEmail(user.email);
    setPassword(user.password);
    setSelectedRole(user.role);
  };

  const getRoleLabel = (role: UserRole) => {
    const labels = {
      [UserRole.SUPER_ADMIN]: 'Super Admin',
      [UserRole.SALES_AGENT]: 'Sales Agent',
      [UserRole.CALL_CENTER]: 'Call Center',
      [UserRole.FINANCE_MANAGER]: 'Finance Manager',
      [UserRole.COORDINATOR]: 'Coordinator'
    };
    return labels[role];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mavera-navy via-mavera-navy/95 to-mavera-gold/20 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Left Side - Branding */}
          <div className="hidden lg:flex flex-col justify-center text-white">
            <div className="mb-8">
              <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-6">
                <span className="text-mavera-gold font-bold">Mavera Luxury Events</span>
              </div>
              <h1 className="text-5xl font-bold mb-4">
                نظام إدارة الفعاليات
              </h1>
              <p className="text-xl text-white/80 mb-8">
                منصة متكاملة لإدارة الحجوزات والفعاليات الفاخرة
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Shield size={24} className="text-mavera-gold" />
                </div>
                <div>
                  <h3 className="font-bold">نظام صلاحيات متقدم</h3>
                  <p className="text-sm text-white/70">تحكم كامل في صلاحيات المستخدمين</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <Users size={24} className="text-mavera-gold" />
                </div>
                <div>
                  <h3 className="font-bold">إدارة شاملة</h3>
                  <p className="text-sm text-white/70">من العملاء المحتملين إلى التنفيذ</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-mavera-navy mb-2">مرحباً بك</h2>
              <p className="text-gray-500">قم بتسجيل الدخول للوصول إلى لوحة التحكم</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 block">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-mavera-gold outline-none transition-colors"
                  placeholder="example@mavera.sa"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 block">
                  كلمة المرور
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-mavera-gold outline-none transition-colors"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-4 bg-mavera-gold text-white rounded-xl font-bold hover:bg-mavera-goldHover disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-lg shadow-mavera-gold/30"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    جاري تسجيل الدخول...
                  </>
                ) : (
                  <>
                    <LogIn size={20} />
                    تسجيل الدخول
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">أو تسجيل دخول سريع</span>
              </div>
            </div>

            {/* Quick Login Options */}
            <div className="space-y-3">
              <p className="text-xs text-gray-500 text-center mb-3">للتجربة: اختر أحد الحسابات التجريبية</p>
              {mockUsers.map((user) => (
                <button
                  key={user.role}
                  type="button"
                  onClick={() => handleQuickLogin(user)}
                  className={`w-full p-4 border-2 rounded-xl transition-all flex items-center gap-3 ${selectedRole === user.role
                      ? 'border-mavera-gold bg-mavera-gold/5'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  <div className={`w-10 h-10 ${user.color} rounded-lg flex items-center justify-center text-white shrink-0`}>
                    {user.icon}
                  </div>
                  <div className="flex-1 text-right">
                    <p className="font-bold text-gray-900 text-sm">{getRoleLabel(user.role)}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-gray-400">
                جميع الحسابات أعلاه تجريبية • كلمة المرور لكل حساب موضحة في الكود
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

