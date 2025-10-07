
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };
  
  return (
    <footer className="bg-muted py-12">
      <div className="container px-4 md:px-6">
        {/* Desktop Layout */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">TAG</h3>
            <p className="text-muted-foreground">
              Your gateway to India's heritage. Book tickets and guides for ASI sites.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95" onClick={() => navigate('/')}>Home</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95" onClick={() => navigate('/explore')}>Explore Sites</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95" onClick={() => navigate('/guides')}>Find Guides</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95" onClick={() => navigate('/')}>About Us</Button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95">FAQs</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95">Contact Us</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95" onClick={() => navigate('/terms')}>Terms of Service</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95" onClick={() => navigate('/privacy')}>Privacy Policy</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95" onClick={() => navigate('/policies')}>Other Policies</Button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
            <p className="text-muted-foreground mb-4">
              Follow us for updates on new sites and features
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-transform hover:scale-110">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-6">
          {/* TAG Section - Always visible */}
          <div className="text-center">
            <h3 className="text-lg font-bold mb-3">TAG</h3>
            <p className="text-muted-foreground text-sm">
              Your gateway to India's heritage. Book tickets and guides for ASI sites.
            </p>
          </div>

          {/* Horizontal Three-Section Layout */}
          <div className="flex space-x-1">
            {/* Quick Links Section */}
            <div className={`transition-all duration-300 ${
              activeSection === 'quick-links' ? 'flex-[2]' : 'flex-1'
            }`}>
              <button
                onClick={() => toggleSection('quick-links')}
                className={`w-full transition-all duration-300 ${
                  activeSection === 'quick-links' 
                    ? 'py-3 px-4 bg-primary/10 text-primary font-semibold text-base' 
                    : 'py-2 px-2 bg-muted-foreground/10 text-muted-foreground font-medium text-sm'
                } rounded-t-lg hover:bg-muted-foreground/20 flex items-center justify-center gap-2`}
              >
                <span className={activeSection !== 'quick-links' ? 'truncate' : ''}>
                  Quick Links
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                  activeSection === 'quick-links' ? 'rotate-180' : ''
                }`} />
              </button>
              
              {activeSection === 'quick-links' && (
                <div className="px-4 py-3 bg-card border-x border-b rounded-b-lg animate-accordion-down">
                  <ul className="space-y-2">
                    <li><Button variant="link" className="p-0 h-auto text-left justify-start text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95" onClick={() => navigate('/')}>Home</Button></li>
                    <li><Button variant="link" className="p-0 h-auto text-left justify-start text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95" onClick={() => navigate('/explore')}>Explore Sites</Button></li>
                    <li><Button variant="link" className="p-0 h-auto text-left justify-start text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95" onClick={() => navigate('/guides')}>Find Guides</Button></li>
                    <li><Button variant="link" className="p-0 h-auto text-left justify-start text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95" onClick={() => navigate('/')}>About Us</Button></li>
                  </ul>
                </div>
              )}
            </div>

            {/* Support Section */}
            <div className={`transition-all duration-300 ${
              activeSection === 'support' ? 'flex-[2]' : 'flex-1'
            }`}>
              <button
                onClick={() => toggleSection('support')}
                className={`w-full transition-all duration-300 ${
                  activeSection === 'support' 
                    ? 'py-3 px-4 bg-primary/10 text-primary font-semibold text-base' 
                    : 'py-2 px-2 bg-muted-foreground/10 text-muted-foreground font-medium text-sm'
                } rounded-t-lg hover:bg-muted-foreground/20 flex items-center justify-center gap-2`}
              >
                <span className={activeSection !== 'support' ? 'truncate' : ''}>
                  Support
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                  activeSection === 'support' ? 'rotate-180' : ''
                }`} />
              </button>
              
              {activeSection === 'support' && (
                <div className="px-4 py-3 bg-card border-x border-b rounded-b-lg animate-accordion-down">
                  <ul className="space-y-2">
                    <li><Button variant="link" className="p-0 h-auto text-left justify-start text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95">FAQs</Button></li>
                    <li><Button variant="link" className="p-0 h-auto text-left justify-start text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95">Contact Us</Button></li>
                    <li><Button variant="link" className="p-0 h-auto text-left justify-start text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95" onClick={() => navigate('/terms')}>Terms of Service</Button></li>
                    <li><Button variant="link" className="p-0 h-auto text-left justify-start text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95" onClick={() => navigate('/privacy')}>Privacy Policy</Button></li>
                    <li><Button variant="link" className="p-0 h-auto text-left justify-start text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95" onClick={() => navigate('/policies')}>Other Policies</Button></li>
                  </ul>
                </div>
              )}
            </div>

            {/* Connect Section */}
            <div className={`transition-all duration-300 ${
              activeSection === 'connect' ? 'flex-[2]' : 'flex-1'
            }`}>
              <button
                onClick={() => toggleSection('connect')}
                className={`w-full transition-all duration-300 ${
                  activeSection === 'connect' 
                    ? 'py-3 px-4 bg-primary/10 text-primary font-semibold text-base' 
                    : 'py-2 px-2 bg-muted-foreground/10 text-muted-foreground font-medium text-sm'
                } rounded-t-lg hover:bg-muted-foreground/20 flex items-center justify-center gap-2`}
              >
                <span className={activeSection !== 'connect' ? 'truncate' : ''}>
                  Connect
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${
                  activeSection === 'connect' ? 'rotate-180' : ''
                }`} />
              </button>
              
              {activeSection === 'connect' && (
                <div className="px-4 py-3 bg-card border-x border-b rounded-b-lg animate-accordion-down">
                  <p className="text-muted-foreground text-sm mb-3">
                    Follow us for updates on new sites and features
                  </p>
                  <div className="flex space-x-4 justify-center">
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-transform hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-transform hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-transform hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Copyright - Common for both layouts */}
        <div className="mt-12 pt-8 border-t border-muted-foreground/20 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TAG. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
