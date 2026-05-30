'use client';

import { useEffect, useState } from 'react';
import { Mail, Phone, MessageCircle, X } from 'lucide-react';
import './ContactModal.css';

export function openContactModal() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('open-contact-modal'));
  }
}

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('open-contact-modal', handler);
    return () => window.removeEventListener('open-contact-modal', handler);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="contact-modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="contact-modal-box" onClick={e => e.stopPropagation()}>
        <button 
          onClick={() => setIsOpen(false)} 
          className="contact-modal-close"
          data-cursor-hover
        >
          <X size={20}/>
        </button>
        
        <h3 className="contact-modal-title">Let's Connect</h3>
        
        <div className="contact-modal-list">
          <a 
            href="https://wa.me/917205395299" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="contact-option whatsapp"
            data-cursor-hover
          >
            <div className="contact-option-icon">
              <MessageCircle size={22} />
            </div>
            <div className="contact-option-info">
              <p className="contact-option-label">WhatsApp</p>
              <p className="contact-option-value">+91 7205395299</p>
            </div>
          </a>

          <a 
            href="tel:+917205395299" 
            className="contact-option call"
            data-cursor-hover
          >
            <div className="contact-option-icon">
              <Phone size={22} />
            </div>
            <div className="contact-option-info">
              <p className="contact-option-label">Call</p>
              <p className="contact-option-value">+91 7205395299</p>
            </div>
          </a>

          <a 
            href="mailto:shbuchwani@gmail.com" 
            className="contact-option email"
            data-cursor-hover
          >
            <div className="contact-option-icon">
              <Mail size={22} />
            </div>
            <div className="contact-option-info">
              <p className="contact-option-label">Email</p>
              <p className="contact-option-value">shbuchwani@gmail.com</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
