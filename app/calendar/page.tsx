"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Users, MapPin, Clock } from 'lucide-react';

interface CalendarEvent {
  id: string;
  title: string;
  type: 'BOOKING' | 'TOUR' | 'ARRANGEMENT';
  date: string;
  time: string;
  location: string;
  guests?: number;
  color: string;
}

const CalendarPage: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedType, setSelectedType] = useState<'ALL' | 'BOOKING' | 'TOUR' | 'ARRANGEMENT'>('ALL');

  const events: CalendarEvent[] = [
    { id: 'E1', title: 'Al-Rajhi Wedding', type: 'BOOKING', date: '2024-12-05', time: '18:00', location: 'Grand Ballroom', guests: 350, color: 'bg-blue-500' },
    { id: 'E2', title: 'Site Tour - Mohammed', type: 'TOUR', date: '2024-12-02', time: '14:00', location: 'Main Hall', color: 'bg-purple-500' },
    { id: 'E3', title: 'Arrangement Meeting', type: 'ARRANGEMENT', date: '2024-12-08', time: '10:00', location: 'Office', color: 'bg-green-500' },
    { id: 'E4', title: 'Golden Gala', type: 'BOOKING', date: '2024-12-15', time: '19:00', location: 'Royal Hall', guests: 250, color: 'bg-blue-500' },
    { id: 'E5', title: 'Luxury Wedding', type: 'BOOKING', date: '2024-12-20', time: '20:00', location: 'Crystal Hall', guests: 400, color: 'bg-blue-500' },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => {
      const typeMatch = selectedType === 'ALL' || e.type === selectedType;
      return e.date === dateStr && typeMatch;
    });
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-mavera-navy mb-2 flex items-center gap-3">
              <CalendarIcon size={32} className="text-mavera-gold" />
              Calendar
            </h1>
            <p className="text-gray-500">View all bookings, tours, and arrangement meetings</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={previousMonth}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="px-6 py-2 bg-mavera-navy text-white rounded-lg font-bold">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </div>
            <button
              onClick={nextMonth}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mt-4">
          {[
            { id: 'ALL', label: 'All Events', color: 'bg-gray-100 text-gray-700' },
            { id: 'BOOKING', label: 'Bookings', color: 'bg-blue-50 text-blue-600' },
            { id: 'TOUR', label: 'Tours', color: 'bg-purple-50 text-purple-600' },
            { id: 'ARRANGEMENT', label: 'Arrangements', color: 'bg-green-50 text-green-600' }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedType(filter.id as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedType === filter.id
                  ? 'bg-mavera-gold text-white shadow-md'
                  : filter.color
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="px-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
            {dayNames.map((day) => (
              <div key={day} className="px-4 py-3 text-center text-sm font-bold text-gray-600">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: startingDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} className="border-b border-r border-gray-100 min-h-[120px] bg-gray-50/50" />
            ))}
            
            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const dayEvents = getEventsForDate(day);
              const isToday = 
                day === new Date().getDate() &&
                currentDate.getMonth() === new Date().getMonth() &&
                currentDate.getFullYear() === new Date().getFullYear();

              return (
                <div
                  key={day}
                  className={`border-b border-r border-gray-100 min-h-[120px] p-2 hover:bg-gray-50 transition-colors ${
                    isToday ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <div className={`text-sm font-bold mb-2 ${
                    isToday 
                      ? 'text-white bg-mavera-gold rounded-full w-6 h-6 flex items-center justify-center'
                      : 'text-gray-700'
                  }`}>
                    {day}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.map((event) => (
                      <div
                        key={event.id}
                        className={`${event.color} text-white px-2 py-1 rounded text-xs font-medium truncate cursor-pointer hover:shadow-md transition-all`}
                        title={`${event.title} - ${event.time}`}
                      >
                        <div className="flex items-center gap-1">
                          <Clock size={10} />
                          <span>{event.time}</span>
                        </div>
                        <div className="truncate">{event.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Events List */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-mavera-navy mb-4">Upcoming Events</h2>
          <div className="space-y-3">
            {events
              .filter(e => {
                const eventDate = new Date(e.date);
                const today = new Date();
                return eventDate >= today && (selectedType === 'ALL' || e.type === selectedType);
              })
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 5)
              .map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-mavera-gold transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-1 h-16 ${event.color} rounded-full`} />
                    <div>
                      <h3 className="font-bold text-gray-900">{event.title}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <CalendarIcon size={14} />
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {event.location}
                        </span>
                        {event.guests && (
                          <span className="flex items-center gap-1">
                            <Users size={14} />
                            {event.guests} guests
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-xs font-bold ${
                    event.type === 'BOOKING' ? 'bg-blue-50 text-blue-600' :
                    event.type === 'TOUR' ? 'bg-purple-50 text-purple-600' :
                    'bg-green-50 text-green-600'
                  }`}>
                    {event.type}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;


