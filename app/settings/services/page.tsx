"use client";

import React, { useState } from 'react';
import { Plus, Edit, Trash2, Eye, EyeOff, Save, X, Search } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  basePrice: number;
  category: string;
  isCustom: boolean;
  isActive: boolean;
}

const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([
    {
      id: 'S001',
      name: 'Premium Hall Rental',
      nameAr: 'تأجير قاعة فاخرة',
      description: 'Luxury hall rental with capacity up to 500 guests',
      descriptionAr: 'تأجير قاعة فاخرة بسعة تصل إلى 500 ضيف',
      basePrice: 80000,
      category: 'Venue',
      isCustom: false,
      isActive: true
    },
    {
      id: 'S002',
      name: 'Luxury Decoration',
      nameAr: 'ديكور فاخر',
      description: 'Premium decoration package with flowers and lighting',
      descriptionAr: 'باقة ديكور فاخرة مع الزهور والإضاءة',
      basePrice: 45000,
      category: 'Decoration',
      isCustom: false,
      isActive: true
    },
    {
      id: 'S003',
      name: 'Premium Catering',
      nameAr: 'ضيافة راقية',
      description: 'Premium buffet with international and local cuisine',
      descriptionAr: 'بوفيه راقي مع المأكولات العالمية والمحلية',
      basePrice: 40000,
      category: 'Catering',
      isCustom: false,
      isActive: true
    },
    {
      id: 'S004',
      name: 'Professional Photography',
      nameAr: 'تصوير احترافي',
      description: 'Professional photography and videography services',
      descriptionAr: 'خدمات تصوير فوتوغرافي وفيديو احترافية',
      basePrice: 25000,
      category: 'Photography',
      isCustom: false,
      isActive: true
    },
    {
      id: 'S005',
      name: 'Live Band Entertainment',
      nameAr: 'فرقة موسيقية',
      description: 'Live band with professional musicians',
      descriptionAr: 'فرقة موسيقية حية مع موسيقيين محترفين',
      basePrice: 30000,
      category: 'Entertainment',
      isCustom: false,
      isActive: true
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    description: '',
    descriptionAr: '',
    basePrice: 0,
    category: 'Custom'
  });

  const categories = ['Venue', 'Decoration', 'Catering', 'Photography', 'Entertainment', 'Custom'];

  const filteredServices = services.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.nameAr.includes(searchQuery) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddService = () => {
    const newService: Service = {
      id: `S${String(services.length + 1).padStart(3, '0')}`,
      ...formData,
      isCustom: true,
      isActive: true
    };
    setServices([...services, newService]);
    resetForm();
  };

  const handleUpdateService = () => {
    if (!editingService) return;
    setServices(services.map(s => s.id === editingService.id ? { ...s, ...formData } : s));
    resetForm();
  };

  const handleToggleActive = (id: string) => {
    setServices(services.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  const handleDeleteService = (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      nameAr: service.nameAr,
      description: service.description,
      descriptionAr: service.descriptionAr,
      basePrice: service.basePrice,
      category: service.category
    });
    setIsAddModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      nameAr: '',
      description: '',
      descriptionAr: '',
      basePrice: 0,
      category: 'Custom'
    });
    setEditingService(null);
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-mavera-navy mb-2">Services Catalog</h1>
            <p className="text-gray-500">Manage your services and pricing</p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
            className="px-6 py-3 bg-mavera-gold text-white rounded-xl font-bold hover:bg-mavera-goldHover flex items-center gap-2 transition-all shadow-lg shadow-mavera-gold/20"
          >
            <Plus size={20} />
            Add Custom Service
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Total Services', count: services.length, color: 'text-gray-600' },
            { label: 'Active', count: services.filter(s => s.isActive).length, color: 'text-green-600' },
            { label: 'Custom', count: services.filter(s => s.isCustom).length, color: 'text-blue-600' },
            { label: 'Standard', count: services.filter(s => !s.isCustom).length, color: 'text-purple-600' },
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
        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services by name or category..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
            />
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`bg-white rounded-xl shadow-sm border-2 transition-all ${
                service.isActive ? 'border-gray-200 hover:border-mavera-gold' : 'border-gray-100 opacity-60'
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-mavera-navy">{service.name}</h3>
                      {service.isCustom && (
                        <span className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs font-bold">
                          CUSTOM
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{service.nameAr}</p>
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                      {service.category}
                    </span>
                  </div>
                  <button
                    onClick={() => handleToggleActive(service.id)}
                    className={`p-2 rounded-lg transition-colors ${
                      service.isActive
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title={service.isActive ? 'Deactivate' : 'Activate'}
                  >
                    {service.isActive ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-4">{service.description}</p>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Base Price</p>
                    <p className="text-xl font-bold text-mavera-gold">
                      {service.basePrice.toLocaleString()} SAR
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(service)}
                      className="p-2 text-gray-400 hover:text-mavera-navy hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </button>
                    {service.isCustom && (
                      <button
                        onClick={() => handleDeleteService(service.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <Search size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No services found</p>
          </div>
        )}
      </div>

      {/* Add/Edit Service Modal */}
      {isAddModalOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={resetForm} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-mavera-navy">
                  {editingService ? 'Edit Service' : 'Add Custom Service'}
                </h2>
                <button onClick={resetForm} className="text-gray-400 hover:text-red-500">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">
                      Service Name (English)
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
                      placeholder="e.g., VIP Valet Parking"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">
                      Service Name (Arabic)
                    </label>
                    <input
                      type="text"
                      value={formData.nameAr}
                      onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
                      placeholder="مثال: خدمة صف السيارات VIP"
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">
                      Description (English)
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none min-h-[100px]"
                      placeholder="Detailed description..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">
                      Description (Arabic)
                    </label>
                    <textarea
                      value={formData.descriptionAr}
                      onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none min-h-[100px]"
                      placeholder="وصف تفصيلي..."
                      dir="rtl"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-bold text-gray-700 mb-2 block">
                      Base Price (SAR)
                    </label>
                    <input
                      type="number"
                      value={formData.basePrice}
                      onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:border-mavera-gold focus:ring-2 focus:ring-mavera-gold/20 outline-none"
                      placeholder="0"
                      min="0"
                    />
                  </div>
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
                  onClick={editingService ? handleUpdateService : handleAddService}
                  disabled={!formData.name || !formData.nameAr || formData.basePrice <= 0}
                  className="px-6 py-2.5 bg-mavera-gold text-white rounded-xl font-bold hover:bg-mavera-goldHover disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                >
                  <Save size={18} />
                  {editingService ? 'Update Service' : 'Add Service'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ServicesPage;


