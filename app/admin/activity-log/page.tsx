"use client";

import React, { useState } from 'react';
import { Activity, Plus, Edit, Trash2, CheckCircle, XCircle, User, Calendar, Filter, Download } from 'lucide-react';

enum ActivityAction {
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

enum ActivityResource {
  BOOKING = 'BOOKING',
  INVOICE = 'INVOICE',
  PAYMENT = 'PAYMENT',
  CONTRACT = 'CONTRACT',
  ARRANGEMENT = 'ARRANGEMENT',
  VENDOR = 'VENDOR',
  DISCOUNT_CODE = 'DISCOUNT_CODE'
}

interface ActivityLogEntry {
  id: string;
  userId: string;
  userName: string;
  action: ActivityAction;
  resource: ActivityResource;
  resourceId: string;
  resourceName: string;
  details?: string;
  timestamp: string;
  ipAddress?: string;
}

const ActivityLogPage: React.FC = () => {
  const [logs] = useState<ActivityLogEntry[]>([
    {
      id: 'LOG001',
      userId: 'U001',
      userName: 'Ahmed (Sales)',
      action: ActivityAction.CREATED,
      resource: ActivityResource.BOOKING,
      resourceId: 'B001',
      resourceName: 'Al-Rajhi Wedding',
      details: 'Created new booking for Grand Ballroom',
      timestamp: '2024-11-30T10:30:00',
      ipAddress: '192.168.1.100'
    },
    {
      id: 'LOG002',
      userId: 'U002',
      userName: 'Sara (Finance)',
      action: ActivityAction.APPROVED,
      resource: ActivityResource.PAYMENT,
      resourceId: 'P001',
      resourceName: '57,000 SAR',
      details: 'Approved payment for booking B001',
      timestamp: '2024-11-30T09:15:00',
      ipAddress: '192.168.1.101'
    },
    {
      id: 'LOG003',
      userId: 'U001',
      userName: 'Ahmed (Sales)',
      action: ActivityAction.UPDATED,
      resource: ActivityResource.BOOKING,
      resourceId: 'B002',
      resourceName: 'Golden Gala',
      details: 'Updated guest count from 200 to 250',
      timestamp: '2024-11-29T16:45:00',
      ipAddress: '192.168.1.100'
    },
    {
      id: 'LOG004',
      userId: 'U003',
      userName: 'Khalid (Coordinator)',
      action: ActivityAction.CREATED,
      resource: ActivityResource.ARRANGEMENT,
      resourceId: 'ARR001',
      resourceName: 'Luxury Wedding',
      details: 'Created arrangement details',
      timestamp: '2024-11-29T14:20:00',
      ipAddress: '192.168.1.102'
    },
    {
      id: 'LOG005',
      userId: 'U002',
      userName: 'Sara (Finance)',
      action: ActivityAction.CREATED,
      resource: ActivityResource.INVOICE,
      resourceId: 'INV-2024-005',
      resourceName: 'Amendment Invoice',
      details: 'Created amendment invoice for additional services',
      timestamp: '2024-11-28T11:30:00',
      ipAddress: '192.168.1.101'
    },
    {
      id: 'LOG006',
      userId: 'U001',
      userName: 'Ahmed (Sales)',
      action: ActivityAction.DELETED,
      resource: ActivityResource.DISCOUNT_CODE,
      resourceId: 'DC002',
      resourceName: 'EXPIRED2024',
      details: 'Deleted expired discount code',
      timestamp: '2024-11-28T10:00:00',
      ipAddress: '192.168.1.100'
    }
  ]);

  const [filterAction, setFilterAction] = useState<ActivityAction | 'ALL'>('ALL');
  const [filterResource, setFilterResource] = useState<ActivityResource | 'ALL'>('ALL');
  const [filterUser, setFilterUser] = useState('ALL');

  const filteredLogs = logs.filter(log => {
    const actionMatch = filterAction === 'ALL' || log.action === filterAction;
    const resourceMatch = filterResource === 'ALL' || log.resource === filterResource;
    const userMatch = filterUser === 'ALL' || log.userName === filterUser;
    return actionMatch && resourceMatch && userMatch;
  });

  const getActionIcon = (action: ActivityAction) => {
    switch (action) {
      case ActivityAction.CREATED: return <Plus size={16} className="text-green-600" />;
      case ActivityAction.UPDATED: return <Edit size={16} className="text-blue-600" />;
      case ActivityAction.DELETED: return <Trash2 size={16} className="text-red-600" />;
      case ActivityAction.APPROVED: return <CheckCircle size={16} className="text-green-600" />;
      case ActivityAction.REJECTED: return <XCircle size={16} className="text-red-600" />;
      default: return <Activity size={16} className="text-gray-400" />;
    }
  };

  const getActionBadge = (action: ActivityAction) => {
    const styles = {
      [ActivityAction.CREATED]: 'bg-green-50 text-green-600 border-green-200',
      [ActivityAction.UPDATED]: 'bg-blue-50 text-blue-600 border-blue-200',
      [ActivityAction.DELETED]: 'bg-red-50 text-red-600 border-red-200',
      [ActivityAction.APPROVED]: 'bg-green-50 text-green-600 border-green-200',
      [ActivityAction.REJECTED]: 'bg-red-50 text-red-600 border-red-200'
    };
    
    return (
      <span className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-bold border ${styles[action]}`}>
        {getActionIcon(action)}
        {action}
      </span>
    );
  };

  const uniqueUsers = Array.from(new Set(logs.map(l => l.userName)));

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-mavera-navy mb-2 flex items-center gap-3">
              <Activity size={32} className="text-mavera-gold" />
              Activity Log
            </h1>
            <p className="text-gray-500">Complete audit trail of all system actions</p>
          </div>
          <button className="px-6 py-3 bg-mavera-navy text-white rounded-xl font-bold hover:bg-mavera-navyLight flex items-center gap-2 transition-all">
            <Download size={18} />
            Export Log
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {[
            { label: 'Total Actions', count: logs.length, color: 'text-gray-900' },
            { label: 'Created', count: logs.filter(l => l.action === ActivityAction.CREATED).length, color: 'text-green-600' },
            { label: 'Updated', count: logs.filter(l => l.action === ActivityAction.UPDATED).length, color: 'text-blue-600' },
            { label: 'Deleted', count: logs.filter(l => l.action === ActivityAction.DELETED).length, color: 'text-red-600' },
            { label: 'Approved', count: logs.filter(l => l.action === ActivityAction.APPROVED).length, color: 'text-purple-600' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.count}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-gray-400" />
            <span className="text-sm font-bold text-gray-700">Filters:</span>
          </div>
          
          <select
            value={filterAction}
            onChange={(e) => setFilterAction(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:border-mavera-gold outline-none text-sm"
          >
            <option value="ALL">All Actions</option>
            {Object.values(ActivityAction).map((action) => (
              <option key={action} value={action}>{action}</option>
            ))}
          </select>

          <select
            value={filterResource}
            onChange={(e) => setFilterResource(e.target.value as any)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:border-mavera-gold outline-none text-sm"
          >
            <option value="ALL">All Resources</option>
            {Object.values(ActivityResource).map((resource) => (
              <option key={resource} value={resource}>{resource}</option>
            ))}
          </select>

          <select
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:border-mavera-gold outline-none text-sm"
          >
            <option value="ALL">All Users</option>
            {uniqueUsers.map((user) => (
              <option key={user} value={user}>{user}</option>
            ))}
          </select>
        </div>

        {/* Activity Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Timestamp</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">User</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Action</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Resource</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">Details</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar size={14} />
                      <span>{new Date(log.timestamp).toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-gray-400" />
                      <span className="font-medium text-gray-900">{log.userName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getActionBadge(log.action)}
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                        {log.resource}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{log.resourceName}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-gray-600">{log.details || '-'}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-xs text-gray-500">{log.ipAddress || '-'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredLogs.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Activity size={48} className="mx-auto mb-4 opacity-20" />
              <p>No activity logs found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityLogPage;


