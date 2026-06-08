/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Calendar, ClipboardCheck, Clock, User, Mail, Sparkles, Send, BellRing } from 'lucide-react';
import { Property, TourBooking } from '../types';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  selectedProperty: Property | null;
}

export default function ContactModal({
  isOpen,
  onClose,
  properties,
  selectedProperty
}: ContactModalProps) {
  // Booking Form State
  const [targetPropertyId, setTargetPropertyId] = useState(selectedProperty?.id || properties[0]?.id || '');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');

  // Processing indicators
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<TourBooking | null>(null);
  const [errorText, setErrorText] = useState('');

  // Handle auto-update of property dropdown when prop updates
  React.useEffect(() => {
    if (selectedProperty) {
      setTargetPropertyId(selectedProperty.id);
    }
  }, [selectedProperty]);

  if (!isOpen) return null;

  const activeProperty = properties.find(p => p.id === targetPropertyId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');

    if (!name.trim()) return setErrorText('Dwellers name is required');
    if (!email.trim() || !email.includes('@')) return setErrorText('Valid client email is required');
    if (!date) return setErrorText('Desired consultation date is required');
    if (!time) return setErrorText('Consultation time window is required');

    setIsSubmitting(true);

    // Simulate luxury API handshake signature latency
    setTimeout(() => {
      const newBooking: TourBooking = {
        propertyId: targetPropertyId,
        propertyName: activeProperty?.name || 'Horizon Estates General Consultation',
        date,
        time,
        name,
        email,
        note,
        status: 'confirmed'
      };

      setSubmittedBooking(newBooking);
      setIsSubmitting(false);

      // Save to client context logs
      try {
        const currentLogs = localStorage.getItem('horizon_bookings');
        const list = currentLogs ? JSON.parse(currentLogs) : [];
        list.push(newBooking);
        localStorage.setItem('horizon_bookings', JSON.stringify(list));
      } catch {
        // Fallback
      }
    }, 1800);
  };

  const handleReset = () => {
    setSubmittedBooking(null);
    setName('');
    setEmail('');
    setDate('');
    setTime('');
    setNote('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center font-sans px-4"
      id="booking-modal-overlay"
    >
      {/* Backdrop overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-[#0B0F19]/85 backdrop-blur-md transition-opacity" 
      />

      {/* Main Glass Modal container */}
      <div 
        className="relative w-full max-w-lg bg-[#0B0F19]/90 border border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_32px_80px_rgba(0,0,0,0.8)] z-10 overflow-hidden"
        id="booking-modal-body"
      >
        {/* Glow corner elements */}
        <div className="absolute top-0 right-0 w-[15rem] h-[15rem] bg-sky-500/[0.03] blur-[60px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[12rem] h-[12rem] bg-amber-500/[0.02] blur-[50px] rounded-full pointer-events-none" />

        {/* Modal Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/[0.04] transition-all z-20"
          id="close-booking-modal-btn"
        >
          <X className="w-4 h-4" />
        </button>

        {submittedBooking ? (
          /* SUCCESS SCREEN DISPLAY */
          <div className="text-center py-6 select-none relative z-10" id="booking-success-block">
            <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
              <ClipboardCheck className="w-7 h-7 text-green-400 animate-bounce" />
            </div>

            <span className="text-[9px] font-mono tracking-[0.35em] text-[#7DD3FC] uppercase mb-2 block">
              Handshake Protocol Accomplished
            </span>
            <h3 className="text-2xl font-light text-white tracking-tight mb-4">
              Tour Schedule Registered
            </h3>
            <p className="text-slate-400 font-light text-xs sm:text-sm leading-relaxed max-w-sm mx-auto mb-8">
              Welcome, <span className="text-white font-medium">{submittedBooking.name}</span>. An elite Horizon Estates concierge representative has allocated your private viewing slot.
            </p>

            {/* Spec Receipt details */}
            <div className="bg-[#121826]/65 border border-white/[0.05] rounded-2xl p-5 mb-8 text-left text-xs max-w-sm mx-auto">
              <div className="flex justify-between border-b border-white/[0.03] pb-2 mb-2">
                <span className="text-slate-500 font-mono text-[9px] uppercase tracking-wider">Assigned Asset</span>
                <span className="text-white font-medium text-right truncate max-w-[200px]">{submittedBooking.propertyName}</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.03] pb-2 mb-2">
                <span className="text-slate-500 font-mono text-[9px] uppercase tracking-wider">Schedule date</span>
                <span className="text-[#F8FAFC] font-mono">{submittedBooking.date}</span>
              </div>
              <div className="flex justify-between border-b border-white/[0.03] pb-2 mb-2">
                <span className="text-slate-500 font-mono text-[9px] uppercase tracking-wider">Time corridor</span>
                <span className="text-[#F8FAFC] font-mono">{submittedBooking.time}</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-slate-500 font-mono text-[9px] uppercase tracking-wider">Client Email</span>
                <span className="text-slate-300 font-mono">{submittedBooking.email}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="px-8 py-3 bg-white text-[#0B0F19] hover:bg-slate-200 text-xs font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-300 shadow-[0_8px_20px_rgba(255,255,255,0.15)]"
              id="success-close-btn"
            >
              Conclude
            </button>
          </div>
        ) : (
          /* RESERVATION FORM SCREEN */
          <form onSubmit={handleSubmit} className="relative z-10" id="booking-modal-form">
            <div className="mb-6 pb-4 border-b border-white/[0.08]">
              <span className="text-[10px] font-mono tracking-[0.3em] text-sky-300 uppercase flex items-center gap-1.5 mb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" /> ELEVATED CONCIERGE
              </span>
              <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight">
                Schedule Private Consultation
              </h3>
            </div>

            {/* Error banner */}
            {errorText && (
              <div className="mb-4 px-4 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl font-light tracking-wide flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                <span>{errorText}</span>
              </div>
            )}

            <div className="flex flex-col gap-4">
              {/* Target Property Select Menu */}
              <div>
                <label className="block text-[8px] font-mono tracking-widest text-slate-500 uppercase mb-1.5">Selected Creation Model</label>
                <select
                  value={targetPropertyId}
                  onChange={(e) => setTargetPropertyId(e.target.value)}
                  className="w-full text-xs font-light bg-white/[0.03] border border-white/[0.08] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-sky-400/[0.4] cursor-pointer"
                >
                  <option value="" className="bg-[#121826] text-white">General Consultation</option>
                  {properties.map((prop) => (
                    <option key={prop.id} value={prop.id} className="bg-[#121826] text-white">
                      {prop.name} — {prop.location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Grid Client Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] font-mono tracking-widest text-slate-500 uppercase mb-1.5">Your Name</label>
                  <div className="relative flex items-center bg-white/[0.03] border border-white/[0.08] rounded-xl focus-within:border-sky-400/[0.4] px-3.5">
                    <User className="w-3.5 h-3.5 text-slate-500 mr-2 shrink-0" />
                    <input
                      type="text"
                      placeholder="Aldous Huxley"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-transparent text-xs text-white py-3 focus:outline-none placeholder-slate-600 font-light"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[8px] font-mono tracking-widest text-slate-500 uppercase mb-1.5">Registered Email</label>
                  <div className="relative flex items-center bg-white/[0.03] border border-white/[0.08] rounded-xl focus-within:border-sky-400/[0.4] px-3.5">
                    <Mail className="w-3.5 h-3.5 text-slate-500 mr-2 shrink-0" />
                    <input
                      type="email"
                      placeholder="client@horizonestates.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-transparent text-xs text-white py-3 focus:outline-none placeholder-slate-600 font-light"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              </div>

              {/* Grid Date & Time Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[8px] font-mono tracking-widest text-slate-500 uppercase mb-1.5">Appointment Date</label>
                  <div className="relative flex items-center bg-white/[0.03] border border-white/[0.08] rounded-xl focus-within:border-sky-400/[0.4] px-3.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-500 mr-2 shrink-0" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-transparent text-xs text-white py-3 focus:outline-none placeholder-slate-600 font-mono tracking-wide"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[8px] font-mono tracking-widest text-slate-500 uppercase mb-1.5">Private Hour Slot</label>
                  <div className="relative flex items-center bg-white/[0.03] border border-white/[0.08] rounded-xl focus-within:border-sky-400/[0.4] px-3.5">
                    <Clock className="w-3.5 h-3.5 text-slate-500 mr-2 shrink-0" />
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full bg-transparent text-xs text-white py-3 focus:outline-none cursor-pointer font-light"
                      disabled={isSubmitting}
                    >
                      <option value="" className="bg-[#121826] text-slate-500">Pick Window</option>
                      <option value="09:00 - 11:00 AM" className="bg-[#121826] text-white">09:00 - 11:00 AM [Morning]</option>
                      <option value="01:00 - 03:00 PM" className="bg-[#121826] text-white">01:00 - 03:00 PM [Afternoon]</option>
                      <option value="05:00 - 07:00 PM" className="bg-[#121826] text-white">05:00 - 07:00 PM [Sunset]</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Special instructions */}
              <div>
                <label className="block text-[8px] font-mono tracking-widest text-slate-500 uppercase mb-1.5">Special Directives (Optional)</label>
                <textarea
                  placeholder="Tell us about special concrete framing or custom geothermal requests..."
                  rows={2}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full text-xs font-light bg-white/[0.03] border border-white/[0.08] text-white rounded-xl px-4 py-3 focus:outline-none focus:border-sky-400/[0.4] resize-none h-16 leading-relaxed placeholder-slate-600"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* CTA action submission */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3.5 rounded-xl bg-[#F8FAFC] text-[#0B0F19] text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed text-slate-500' : 'hover:bg-slate-200 active:scale-[0.98]'
                }`}
                id="sumbit-booking-btn"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400 border-t-transparent animate-spin" />
                    <span>Authorizing Handshake...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Verify System Allocation</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center gap-2 mt-4 text-[9px] font-mono text-slate-500 justify-center">
              <BellRing className="w-3.5 h-3.5 text-[#7DD3FC]" />
              <span>Conclution triggers live SMS cryptographic notifications</span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
