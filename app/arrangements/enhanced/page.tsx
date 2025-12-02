"use client";

import React, { useState } from 'react';
import { 
  Upload, FileText, CheckCircle, Clock, Send, Users, 
  Flower, Lightbulb, Mic2, Coffee, AlertCircle, X, Check, Link as LinkIcon 
} from 'lucide-react';

enum ArrangementApprovalStatus {
  DRAFT = 'DRAFT',
  PENDING_CLIENT_APPROVAL = 'PENDING_CLIENT_APPROVAL',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}

enum VendorStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED'
}

interface ArrangementVendor {
  id: string;
  vendorName: string;
  category: string;
  status: VendorStatus;
  contactPhone: string;
  assignedDate: string;
  confirmedDate?: string;
}

interface Arrangement {
  id: string;
  bookingId: string;
  clientName: string;
  eventDate: string;
  hallType?: string;
  decoration?: string;
  stageType?: string;
  lighting?: string;
  catering?: string;
  specialRequests?: string;
  clientNotes?: string;
  approvalStatus: ArrangementApprovalStatus;
  sentForApprovalDate?: string;
  approvedDate?: string;
  vendors: ArrangementVendor[];
}

const EnhancedArrangementsPage: React.FC = () => {
  const [arrangements, setArrangements] = useState<Arrangement[]>([
    {
      id: 'ARR001',
      bookingId: 'B001',
      clientName: 'Al-Rajhi Wedding',
      eventDate: '2026-02-15',
      hallType: 'Grand Ballroom',
      decoration: 'Royal Flowers + Gold Theme',
      stageType: 'Premium Crystal Stage',
      lighting: 'Luxury LED Lights',
      catering: 'International Buffet - 300 guests',
      specialRequests: 'Red carpet entrance, special spotlight for cake ceremony',
      clientNotes: 'Client prefers white roses over red',
      approvalStatus: ArrangementApprovalStatus.APPROVED,
      sentForApprovalDate: '2024-11-20',
      approvedDate: '2024-11-22',
      vendors: [
        { id: 'V1', vendorName: 'Royal Flowers', category: 'FLOWERS', status: VendorStatus.CONFIRMED, contactPhone: '+966 50 111 2222', assignedDate: '2024-11-23', confirmedDate: '2024-11-24' },
        { id: 'V2', vendorName: 'Brilliant Lighting', category: 'LIGHTING', status: VendorStatus.CONFIRMED, contactPhone: '+966 55 333 4444', assignedDate: '2024-11-23', confirmedDate: '2024-11-24' },
        { id: 'V3', vendorName: 'Golden Stage', category: 'STAGE', status: VendorStatus.CONFIRMED, contactPhone: '+966 54 555 6666', assignedDate: '2024-11-23', confirmedDate: '2024-11-25' },
      ]
    },
    {
      id: 'ARR002',
      bookingId: 'B002',
      clientName: 'Golden Gala',
      eventDate: '2026-03-20',
      approvalStatus: ArrangementApprovalStatus.PENDING_CLIENT_APPROVAL,
      sentForApprovalDate: '2024-11-25',
      vendors: [
        { id: 'V4', vendorName: 'Premium Sound Systems', category: 'SOUND', status: VendorStatus.PENDING, contactPhone: '+966 56 777 8888', assignedDate: '2024-11-25' },
      ]
    },
    {
      id: 'ARR003',
      bookingId: 'B003',
      clientName: 'Luxury Wedding',
      eventDate: '2026-04-10',
      approvalStatus: ArrangementApprovalStatus.DRAFT,
      vendors: []
    }
  ]);

  const [selectedArrangement, setSelectedArrangement] = useState<Arrangement | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);

  const handleSendForApproval = (id: string) => {
    setArrangements(arrangements.map(arr => 
      arr.id === id 
        ? { ...arr, approvalStatus: ArrangementApprovalStatus.PENDING_CLIENT_APPROVAL, sentForApprovalDate: new Date().toISOString().split('T')[0] }
        : arr
    ));
    alert('Sent to client for approval via Nafath');
  };

  const handleContactVendor = (phone: string) => {
    alert(`Calling vendor at ${phone}...`);
  };

  const getStatusBadge = (status: ArrangementApprovalStatus) => {
    const styles = {
      [ArrangementApprovalStatus.DRAFT]: { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200', icon: <FileText size={12} /> },
      [ArrangementApprovalStatus.PENDING_CLIENT_APPROVAL]: { bg: 'bg-yellow-50', text: 'text-yellow-600', border: 'border-yellow-200', icon: <Clock size={12} /> },
      [ArrangementApprovalStatus.APPROVED]: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200', icon: <CheckCircle size={12} /> },
      [ArrangementApprovalStatus.REJECTED]: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200', icon: <X size={12} /> }
    };
    
    const style = styles[status];
    return (
      <span className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-bold border ${style.bg} ${style.text} ${style.border}`}>
        {style.icon}
        {status.replace(/_/g, ' ')}
      </span>
    );
  };

  const getVendorStatusBadge = (status: VendorStatus) => {
    const styles = {
      [VendorStatus.PENDING]: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      [VendorStatus.CONFIRMED]: 'bg-green-50 text-green-600 border-green-200',
      [VendorStatus.CANCELLED]: 'bg-red-50 text-red-600 border-red-200'
    };
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-bold border ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 mb-6">
        <h1 className="text-3xl font-bold text-mavera-navy mb-2">Arrangements Management</h1>
        <p className="text-gray-500">Manage event arrangements and vendor coordination</p>
      </div>

      {/* Main Content */}
      <div className="px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Arrangements List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h2 className="font-bold text-mavera-navy">All Arrangements</h2>
            </div>
            <div className="divide-y divide-gray-100 max-h-[calc(100vh-300px)] overflow-y-auto">
              {arrangements.map((arr) => (
                <button
                  key={arr.id}
                  onClick={() => setSelectedArrangement(arr)}
                  className={`w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors ${
                    selectedArrangement?.id === arr.id ? 'bg-blue-50 border-l-4 border-mavera-gold' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900">{arr.clientName}</h3>
                    {getStatusBadge(arr.approvalStatus)}
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Event: {new Date(arr.eventDate).toLocaleDateString()}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-mono">{arr.bookingId}</span>
                    {arr.vendors.length > 0 && (
                      <span className="text-xs bg-purple-50 text-purple-600 px-2 py-0.5 rounded">
                        {arr.vendors.length} vendors
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Details Panel */}
          <div className="lg:col-span-2">
            {selectedArrangement ? (
              <div className="space-y-6">
                {/* Header Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-mavera-navy mb-2">{selectedArrangement.clientName}</h2>
                      <p className="text-gray-600">Booking: {selectedArrangement.bookingId}</p>
                      <p className="text-gray-600">Event Date: {new Date(selectedArrangement.eventDate).toLocaleDateString()}</p>
                    </div>
                    {getStatusBadge(selectedArrangement.approvalStatus)}
                  </div>

                  {selectedArrangement.approvalStatus === ArrangementApprovalStatus.DRAFT && (
                    <button
                      onClick={() => setIsEditMode(!isEditMode)}
                      className="w-full px-6 py-3 bg-mavera-navy text-white rounded-xl font-bold hover:bg-mavera-navyLight transition-all"
                    >
                      {isEditMode ? 'Save & Preview' : 'Edit Arrangement Details'}
                    </button>
                  )}

                  {selectedArrangement.approvalStatus === ArrangementApprovalStatus.DRAFT && !isEditMode && (
                    <button
                      onClick={() => handleSendForApproval(selectedArrangement.id)}
                      className="w-full mt-3 px-6 py-3 bg-mavera-gold text-white rounded-xl font-bold hover:bg-mavera-goldHover flex items-center justify-center gap-2 transition-all"
                    >
                      <Send size={18} />
                      Send for Client Approval via Nafath
                    </button>
                  )}

                  {selectedArrangement.approvalStatus === ArrangementApprovalStatus.PENDING_CLIENT_APPROVAL && (
                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                      <p className="text-sm text-yellow-800 flex items-center gap-2">
                        <Clock size={16} />
                        Sent to client on {new Date(selectedArrangement.sentForApprovalDate!).toLocaleDateString()}. Awaiting approval via Nafath.
                      </p>
                    </div>
                  )}

                  {selectedArrangement.approvalStatus === ArrangementApprovalStatus.APPROVED && (
                    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                      <p className="text-sm text-green-800 flex items-center gap-2">
                        <CheckCircle size={16} />
                        Approved by client on {new Date(selectedArrangement.approvedDate!).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>

                {/* Arrangement Details */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-bold text-mavera-navy mb-4">Arrangement Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Hall Type</label>
                      {isEditMode ? (
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold outline-none"
                          defaultValue={selectedArrangement.hallType}
                        />
                      ) : (
                        <p className="text-gray-900">{selectedArrangement.hallType || 'Not specified'}</p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <label className="text-sm font-bold text-gray-700 mb-2 block flex items-center gap-2">
                        <Flower size={16} className="text-pink-600" />
                        Decoration
                      </label>
                      {isEditMode ? (
                        <textarea
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold outline-none"
                          rows={2}
                          defaultValue={selectedArrangement.decoration}
                        />
                      ) : (
                        <p className="text-gray-900">{selectedArrangement.decoration || 'Not specified'}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Stage Type</label>
                      {isEditMode ? (
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold outline-none"
                          defaultValue={selectedArrangement.stageType}
                        />
                      ) : (
                        <p className="text-gray-900">{selectedArrangement.stageType || 'Not specified'}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block flex items-center gap-2">
                        <Lightbulb size={16} className="text-yellow-600" />
                        Lighting
                      </label>
                      {isEditMode ? (
                        <input
                          type="text"
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold outline-none"
                          defaultValue={selectedArrangement.lighting}
                        />
                      ) : (
                        <p className="text-gray-900">{selectedArrangement.lighting || 'Not specified'}</p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <label className="text-sm font-bold text-gray-700 mb-2 block flex items-center gap-2">
                        <Coffee size={16} className="text-brown-600" />
                        Catering
                      </label>
                      {isEditMode ? (
                        <textarea
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold outline-none"
                          rows={2}
                          defaultValue={selectedArrangement.catering}
                        />
                      ) : (
                        <p className="text-gray-900">{selectedArrangement.catering || 'Not specified'}</p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Special Requests</label>
                      {isEditMode ? (
                        <textarea
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold outline-none"
                          rows={3}
                          defaultValue={selectedArrangement.specialRequests}
                        />
                      ) : (
                        <p className="text-gray-900">{selectedArrangement.specialRequests || 'None'}</p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Client Notes</label>
                      {isEditMode ? (
                        <textarea
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold outline-none"
                          rows={2}
                          defaultValue={selectedArrangement.clientNotes}
                        />
                      ) : (
                        <p className="text-gray-900 italic">{selectedArrangement.clientNotes || 'None'}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Assigned Vendors */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-mavera-navy flex items-center gap-2">
                      <Users size={20} />
                      Assigned Vendors
                    </h3>
                    <button
                      onClick={() => setShowVendorModal(true)}
                      className="px-4 py-2 bg-mavera-gold text-white rounded-lg text-sm font-medium hover:bg-mavera-goldHover transition-all"
                    >
                      + Assign Vendor
                    </button>
                  </div>

                  {selectedArrangement.vendors.length > 0 ? (
                    <div className="space-y-3">
                      {selectedArrangement.vendors.map((vendor) => (
                        <div key={vendor.id} className="border border-gray-200 rounded-xl p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h4 className="font-bold text-gray-900">{vendor.vendorName}</h4>
                              <p className="text-sm text-gray-500">{vendor.category}</p>
                            </div>
                            {getVendorStatusBadge(vendor.status)}
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Assigned: {new Date(vendor.assignedDate).toLocaleDateString()}</p>
                              {vendor.confirmedDate && (
                                <p className="text-xs text-green-600 font-medium">
                                  Confirmed: {new Date(vendor.confirmedDate).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => handleContactVendor(vendor.contactPhone)}
                              className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-xs font-medium hover:bg-blue-100 transition-colors"
                            >
                              Contact
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <Users size={48} className="mx-auto mb-4 opacity-20" />
                      <p>No vendors assigned yet</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 h-full flex flex-col items-center justify-center text-gray-400 min-h-[500px]">
                <FileText size={48} className="mb-4 opacity-20" />
                <p>Select an arrangement to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vendor Assignment Modal */}
      {showVendorModal && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => setShowVendorModal(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-mavera-navy">Assign Vendor</h2>
                <button onClick={() => setShowVendorModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">Select a vendor from your approved list to assign to this arrangement.</p>
                <button
                  onClick={() => {
                    alert('Vendor assignment feature - integrate with vendors page');
                    setShowVendorModal(false);
                  }}
                  className="w-full px-6 py-3 bg-mavera-gold text-white rounded-xl font-bold hover:bg-mavera-goldHover transition-all"
                >
                  Browse Vendors
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default EnhancedArrangementsPage;


