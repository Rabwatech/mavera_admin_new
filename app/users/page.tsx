"use client";

import React, { useState } from 'react';
import { Search, Plus, MoreHorizontal, Shield, CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '../../lib/i18n';
import { UserRole } from '../../types/auth';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'Active' | 'Inactive';
  lastLogin: string;
  avatar: string;
}

const UsersPage: React.FC = () => {
  const { t, direction } = useLanguage();
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Omar Hassan', email: 'omar@mavera.com', role: UserRole.SALES_AGENT, status: 'Active', lastLogin: '2 hours ago', avatar: 'OH' },
    { id: '2', name: 'Sara Ali', email: 'sara@mavera.com', role: UserRole.CALL_CENTER, status: 'Active', lastLogin: '10 mins ago', avatar: 'SA' },
    { id: '3', name: 'Admin User', email: 'admin@mavera.com', role: UserRole.SUPER_ADMIN, status: 'Active', lastLogin: 'Just now', avatar: 'AD' },
    { id: '4', name: 'Khaled Finance', email: 'khaled@mavera.com', role: UserRole.FINANCE_MANAGER, status: 'Inactive', lastLogin: '3 days ago', avatar: 'KF' },
  ]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-mavera-navy">{t('users.title')}</h1>
           <p className="text-gray-500 text-sm">{t('users.subtitle')}</p>
        </div>
        <button 
          onClick={() => setIsInviteOpen(true)}
          className="bg-mavera-navy hover:bg-mavera-navyLight text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all"
        >
           <Plus size={16} />
           {t('users.invite')}
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
           <div className="relative w-full sm:w-80">
              <Search size={16} className={`absolute top-3 text-gray-400 ${direction === 'rtl' ? 'left-3' : 'right-3'}`} />
              <input 
                type="text" 
                placeholder="Search by name or email..."
                className={`w-full bg-white border border-gray-200 rounded-lg py-2 text-sm outline-none focus:border-mavera-gold ${direction === 'rtl' ? 'pl-10 pr-4' : 'pr-10 pl-4'}`}
              />
           </div>
           <div className="flex gap-2">
              <select className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none">
                 <option>All Roles</option>
                 <option>Sales</option>
                 <option>Admin</option>
              </select>
           </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
           <table className="w-full text-sm min-w-[800px]">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                 <tr>
                    <th className="px-6 py-4 text-start">User</th>
                    <th className="px-6 py-4 text-start">Role</th>
                    <th className="px-6 py-4 text-start">Status</th>
                    <th className="px-6 py-4 text-start">Last Login</th>
                    <th className="px-6 py-4 text-end">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                 {users.map(user => (
                    <tr key={user.id} className="hover:bg-blue-50/30 transition-colors group">
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                             <div className="w-9 h-9 rounded-full bg-gray-100 text-mavera-navy font-bold flex items-center justify-center text-xs">
                                {user.avatar}
                             </div>
                             <div>
                                <p className="font-bold text-mavera-navy">{user.name}</p>
                                <p className="text-xs text-gray-400">{user.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">
                             <Shield size={12} />
                             {user.role.replace('_', ' ')}
                          </span>
                       </td>
                       <td className="px-6 py-4">
                          {user.status === 'Active' ? (
                             <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full text-xs font-bold border border-green-100">
                                <CheckCircle size={10} /> Active
                             </span>
                          ) : (
                             <span className="inline-flex items-center gap-1 text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full text-xs font-bold border border-gray-200">
                                <XCircle size={10} /> Inactive
                             </span>
                          )}
                       </td>
                       <td className="px-6 py-4 text-gray-500">{user.lastLogin}</td>
                       <td className="px-6 py-4 text-end">
                          <button className="text-gray-400 hover:text-mavera-navy p-2 rounded-lg hover:bg-gray-100 transition-colors">
                             <MoreHorizontal size={18} />
                          </button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>

      {/* Invite Modal Overlay */}
      {isInviteOpen && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-mavera-navy/60 backdrop-blur-sm" onClick={() => setIsInviteOpen(false)}></div>
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-up">
               <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-mavera-navy">Invite New User</h3>
                  <p className="text-sm text-gray-500">Send an email invitation to join the team.</p>
               </div>
               <div className="p-6 space-y-4">
                  <div>
                     <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Full Name</label>
                     <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-mavera-gold" />
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Email Address</label>
                     <input type="email" className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-mavera-gold" />
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Role</label>
                     <select className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-mavera-gold bg-white">
                        <option value={UserRole.SALES_AGENT}>Sales Agent</option>
                        <option value={UserRole.CALL_CENTER}>Call Center</option>
                        <option value={UserRole.FINANCE_MANAGER}>Finance Manager</option>
                        <option value={UserRole.SUPER_ADMIN}>Super Admin</option>
                     </select>
                  </div>
                  <div className="pt-4 flex gap-3">
                     <button onClick={() => setIsInviteOpen(false)} className="flex-1 py-2.5 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200">Cancel</button>
                     <button onClick={() => setIsInviteOpen(false)} className="flex-1 py-2.5 bg-mavera-gold text-white font-bold rounded-xl hover:bg-mavera-goldHover shadow-lg">Send Invite</button>
                  </div>
               </div>
            </div>
         </div>
      )}
    </div>
  );
};

export default UsersPage;