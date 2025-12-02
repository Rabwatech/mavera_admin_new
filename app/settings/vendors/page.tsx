"use client";

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Star, Phone, Mail, MapPin, FileText, Eye, EyeOff, Search } from 'lucide-react';

enum VendorCategory {
  FLOWERS = 'FLOWERS',
  LIGHTING = 'LIGHTING',
  STAGE = 'STAGE',
  SOUND = 'SOUND',
  CATERING = 'CATERING'
}

interface Vendor {
  id: string;
  name: string;
  nameAr: string;
  category: VendorCategory;
  contactPerson: string;
  phone: string;
  email: string;
  address?: string;
  priceList?: string;
  rating: number;
  totalJobs: number;
  isActive: boolean;
  notes?: string;
}

const VendorsPage: React.FC = () => {
  const [vendors, setVendors] = useState<Vendor[]>([
    {
      id: 'V001',
      name: 'Royal Flowers',
      nameAr: 'الزهور الملكية',
      category: VendorCategory.FLOWERS,
      contactPerson: 'Ahmed Al-Rashid',
      phone: '+966 50 111 2222',
      email: 'info@royalflowers.sa',
      address: 'Riyadh, Saudi Arabia',
      priceList: 'https://example.com/prices.pdf',
      rating: 4.8,
      totalJobs: 45,
      isActive: true,
      notes: 'Excellent quality, reliable delivery'
    },
    {
      id: 'V002',
      name: 'Brilliant Lighting',
      nameAr: 'الإضاءة المتألقة',
      category: VendorCategory.LIGHTING,
      contactPerson: 'Mohammed Saleh',
      phone: '+966 55 333 4444',
      email: 'contact@brilliantlighting.sa',
      address: 'Jeddah, Saudi Arabia',
      rating: 4.5,
      totalJobs: 38,
      isActive: true,
      notes: 'Creative lighting designs'
    },
    {
      id: 'V003',
      name: 'Golden Stage',
      nameAr: 'المنصة الذهبية',
      category: VendorCategory.STAGE,
      contactPerson: 'Khalid Ahmed',
      phone: '+966 54 555 6666',
      email: 'info@goldenstage.sa',
      address: 'Riyadh, Saudi Arabia',
      rating: 4.9,
      totalJobs: 52,
      isActive: true
    },
    {
      id: 'V004',
      name: 'Premium Sound Systems',
      nameAr: 'أنظمة الصوت المتميزة',
      category: VendorCategory.SOUND,
      contactPerson: 'Omar Hassan',
      phone: '+966 56 777 8888',
      email: 'info@premiumsound.sa',
      address: 'Dammam, Saudi Arabia',
      rating: 4.7,
      totalJobs: 30,
      isActive: true
    },
    {
      id: 'V005',
      name: 'Luxury Catering',
      nameAr: 'الضيافة الفاخرة',
      category: VendorCategory.CATERING,
      contactPerson: 'Sara Abdullah',
      phone: '+966 59 999 0000',
      email: 'info@luxurycatering.sa',
      address: 'Riyadh, Saudi Arabia',
      rating: 4.6,
      totalJobs: 40,
      isActive: true,
      notes: 'Wide variety of menus'
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<VendorCategory | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    category: VendorCategory.FLOWERS,
    contactPerson: '',
    phone: '',
    email: '',
    address: '',
    priceList: '',
    notes: ''
  });

  const filteredVendors = vendors.filter(v => {
    const categoryMatch = selectedCategory === 'ALL' || v.category === selectedCategory;
    const searchMatch = 
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.nameAr.includes(searchQuery) ||
      v.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    return categoryMatch && searchMatch;
  });

  const handleAddVendor = () => {
    const newVendor: Vendor = {
      id: `V${String(vendors.length + 1).padStart(3, '0')}`,
      ...formData,
      rating: 0,
      totalJobs: 0,
      isActive: true
    };
    setVendors([...vendors, newVendor]);
    resetForm();
  };

  const handleUpdateVendor = () => {
    if (!editingVendor) return;
    setVendors(vendors.map(v => v.id === editingVendor.id ? { ...v, ...formData } : v));
    resetForm();
  };

  const handleToggleActive = (id: string) => {
    setVendors(vendors.map(v => v.id === id ? { ...v, isActive: !v.isActive } : v));
  };

  const handleDeleteVendor = (id: string) => {
    if (confirm('Are you sure you want to delete this vendor?')) {
      setVendors(vendors.filter(v => v.id !== id));
    }
  };

  const openEditModal = (vendor: Vendor) => {
    setEditingVendor(vendor);
    setFormData({
      name: vendor.name,
      nameAr: vendor.nameAr,
      category: vendor.category,
      contactPerson: vendor.contactPerson,
      phone: vendor.phone,
      email: vendor.email,
      address: vendor.address || '',
      priceList: vendor.priceList || '',
      notes: vendor.notes || ''
    });
    setIsAddModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      nameAr: '',
      category: VendorCategory.FLOWERS,
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
      priceList: '',
      notes: ''
    });
    setEditingVendor(null);
    setIsAddModalOpen(false);
  };

  const getCategoryBadge = (category: VendorCategory) => {
    const styles = {
      [VendorCategory.FLOWERS]: 'bg-pink-50 text-pink-600 border-pink-200',
      [VendorCategory.LIGHTING]: 'bg-yellow-50 text-yellow-600 border-yellow-200',
      [VendorCategory.STAGE]: 'bg-purple-50 text-purple-600 border-purple-200',
      [VendorCategory.SOUND]: 'bg-blue-50 text-blue-600 border-blue-200',
      [VendorCategory.CATERING]: 'bg-green-50 text-green-600 border-green-200'
    };
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-bold border ${styles[category]}`}>
        {category}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-mavera-navy mb-2">Vendors Management</h1>
            <p className="text-gray-500">Manage your approved vendor network</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
            className="px-6 py-3 bg-mavera-gold text-white rounded-xl font-bold hover:bg-mavera-goldHover flex items-center gap-2 transition-all shadow-lg shadow-mavera-gold/20"
          >
            <Plus size={20} />
            Add Vendor
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
          <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="text-xs text-gray-500 mb-1">Total Vendors</p>
            <p className="text-2xl font-bold text-gray-900">{vendors.length}</p>
          </div>
          {Object.values(VendorCategory).map((cat) => (
            <div key={cat} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-xs text-gray-500 mb-1">{cat}</p>
              <p className="text-2xl font-bold text-gray-900">
                {vendors.filter(v => v.category === cat).length}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vendors..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
            />
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as any)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
          >
            <option value="ALL">All Categories</option>
            {Object.values(VendorCategory).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map((vendor) => (
            <div
              key={vendor.id}
              className={`bg-white rounded-xl shadow-sm border-2 transition-all ${
                vendor.isActive ? 'border-gray-200 hover:border-mavera-gold' : 'border-gray-100 opacity-60'
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-mavera-navy">{vendor.name}</h3>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">{vendor.nameAr}</p>
                    {getCategoryBadge(vendor.category)}
                  </div>
                  <button
                    onClick={() => handleToggleActive(vendor.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      vendor.isActive
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title={vendor.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {vendor.isActive ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>

                {/* Contact Info */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={14} className="text-gray-400" />
                    <span className="font-mono">{vendor.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={14} className="text-gray-400" />
                    <span>{vendor.email}</span>
                  </div>
                  {vendor.address && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={14} className="text-gray-400" />
                      <span>{vendor.address}</span>
                    </div>
                  )}
                </div>

                {/* Rating & Jobs */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 mb-4">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Star size={16} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-bold text-gray-900">{vendor.rating.toFixed(1)}</span>
                    </div>
                    <p className="text-xs text-gray-500">{vendor.totalJobs} jobs completed</p>
                  </div>
                  {vendor.priceList && (
                    <a
                      href={vendor.priceList}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-mavera-gold hover:text-mavera-goldHover font-medium"
                    >
                      <FileText size={14} />
                      Price List
                    </a>
                  )}
                </div>

                {/* Contact Person */}
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-500 mb-1">Contact Person</p>
                  <p className="text-sm font-medium text-gray-900">{vendor.contactPerson}</p>
                </div>

                {/* Notes */}
                {vendor.notes && (
                  <p className="text-xs text-gray-600 mb-4 italic">"{vendor.notes}"</p>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(vendor)}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 flex items-center justify-center gap-2 transition-colors"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteVendor(vendor.id)}
                    className="px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Search size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No vendors found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={resetForm} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-xl font-bold text-mavera-navy">
                  {editingVendor ? 'Edit Vendor' : 'Add New Vendor'}
                </h2>
              </div>

              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">
                      Vendor Name (English)
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
                      placeholder="e.g., Royal Flowers"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">
                      Vendor Name (Arabic)
                    </label>
                    <input
                      type="text"
                      value={formData.nameAr}
                      onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
                      placeholder="الزهور الملكية"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as VendorCategory })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
                  >
                    {Object.values(VendorCategory).map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
                      placeholder="Ahmed Al-Rashid"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none font-mono"
                      placeholder="+966 50 123 4567"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
                    placeholder="info@vendor.sa"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
                    placeholder="Riyadh, Saudi Arabia"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">
                    Price List URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.priceList}
                    onChange={(e) => setFormData({ ...formData, priceList: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
                    placeholder="https://example.com/prices.pdf"
                  />
                </div>

                <div>
                  <label className="text-sm font-bold text-gray-700 mb-2 block">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none min-h-[80px]"
                    placeholder="Internal notes about this vendor..."
                  />
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                <button
                  onClick={resetForm}
                  className="px-6 py-2.5 text-gray-700 hover:bg-gray-100 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingVendor ? handleUpdateVendor : handleAddVendor}
                  disabled={!formData.name || !formData.nameAr || !formData.contactPerson || !formData.phone || !formData.email}
                  className="px-6 py-2.5 bg-mavera-gold text-white rounded-xl font-bold hover:bg-mavera-goldHover disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {editingVendor ? 'Update Vendor' : 'Add Vendor'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VendorsPage;


