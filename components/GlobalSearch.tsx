"use client";

import React, { useState, useEffect } from 'react';
import { Search, X, FileText, Users, Calendar, DollarSign, Hash } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'CLIENT' | 'BOOKING' | 'INVOICE' | 'CONTRACT';
  title: string;
  subtitle: string;
  link: string;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  // Mock search data
  const allData: SearchResult[] = [
    { id: '1', type: 'CLIENT', title: 'Dr. Khalid Al-Rasheed', subtitle: '+966 50 123 4567 • khalid@example.com', link: '/clients/1' },
    { id: '2', type: 'CLIENT', title: 'Fatima Al-Sayed', subtitle: '+966 50 111 2222 • fatima@example.com', link: '/clients/2' },
    { id: '3', type: 'BOOKING', title: 'Al-Rajhi Wedding', subtitle: 'B001 • 2026-02-15 • Grand Ballroom', link: '/bookings/B001' },
    { id: '4', type: 'BOOKING', title: 'Golden Gala', subtitle: 'B002 • 2026-03-20 • Royal Hall', link: '/bookings/B002' },
    { id: '5', type: 'INVOICE', title: 'INV-2024-001', subtitle: '50,000 SAR • Paid', link: '/admin/finance/invoices' },
    { id: '6', type: 'INVOICE', title: 'INV-2024-002', subtitle: '15,000 SAR • Unpaid', link: '/admin/finance/invoices' },
    { id: '7', type: 'CONTRACT', title: 'Contract #C001', subtitle: 'Al-Rajhi Wedding • Signed', link: '/bookings/B001' },
  ];

  useEffect(() => {
    if (query.trim()) {
      const filtered = allData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.subtitle.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!isOpen) {
          // Open search
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'CLIENT': return <Users size={20} className="text-blue-600" />;
      case 'BOOKING': return <Calendar size={20} className="text-purple-600" />;
      case 'INVOICE': return <DollarSign size={20} className="text-green-600" />;
      case 'CONTRACT': return <FileText size={20} className="text-orange-600" />;
      default: return <Hash size={20} className="text-gray-400" />;
    }
  };

  const getTypeBadge = (type: SearchResult['type']) => {
    const styles = {
      CLIENT: 'bg-blue-50 text-blue-600',
      BOOKING: 'bg-purple-50 text-purple-600',
      INVOICE: 'bg-green-50 text-green-600',
      CONTRACT: 'bg-orange-50 text-orange-600'
    };
    
    return (
      <span className={`px-2 py-0.5 rounded text-xs font-bold ${styles[type]}`}>
        {type}
      </span>
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={onClose} />

      {/* Search Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[70vh] flex flex-col border border-gray-200">
          {/* Search Input */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Search size={24} className="text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search clients, bookings, invoices, contracts..."
                className="flex-1 text-lg outline-none"
                autoFocus
              />
              <div className="flex items-center gap-2">
                <kbd className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-mono">
                  ⌘K
                </kbd>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto p-2">
            {query.trim() === '' ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <Search size={48} className="mb-4 opacity-20" />
                <p className="text-sm">Start typing to search...</p>
                <div className="mt-4 text-xs text-gray-500 space-y-1">
                  <p>• Search by client name, phone, or email</p>
                  <p>• Search bookings by ID or date</p>
                  <p>• Search invoices by number or amount</p>
                </div>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-1">
                {results.map((result) => (
                  <a
                    key={result.id}
                    href={result.link}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group"
                  >
                    <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white border border-gray-100">
                      {getIcon(result.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 truncate">{result.title}</h3>
                        {getTypeBadge(result.type)}
                      </div>
                      <p className="text-sm text-gray-500 truncate">{result.subtitle}</p>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                <Search size={48} className="mb-4 opacity-20" />
                <p className="text-sm">No results found for "{query}"</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded">↵</kbd> to select</span>
                <span>Press <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded">ESC</kbd> to close</span>
              </div>
              <span>{results.length} results</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlobalSearch;


