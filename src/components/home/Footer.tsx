
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CornerMandala } from "@/assets/mandala-patterns";

const Footer = () => {
  const navigate = useNavigate();
  
  return (
    <footer className="bg-[rgba(240,235,230,255)] py-12 relative overflow-hidden">
      {/* Subtle mandala background patterns */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none">
        <CornerMandala className="text-[rgba(100,73,37,255)] w-[300px] h-[300px]" />
      </div>
      <div className="absolute bottom-0 right-0 opacity-[0.07] pointer-events-none">
        <CornerMandala className="text-[rgba(100,73,37,255)] w-[150px] h-[150px]" />
      </div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 relative inline-block">
              TAG
              <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(100,73,37,0.3)] to-transparent"></div>
            </h3>
            <p className="text-muted-foreground">
              Your gateway to India's heritage. Book tickets and guides for ASI sites.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 relative inline-block">
              Quick Links
              <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(100,73,37,0.3)] to-transparent"></div>
            </h3>
            <ul className="space-y-2">
              <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent" onClick={() => navigate('/')}>Home</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent" onClick={() => navigate('/explore')}>Explore Sites</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent" onClick={() => navigate('/guides')}>Find Guides</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent" onClick={() => navigate('/')}>About Us</Button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 relative inline-block">
              Support
              <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(100,73,37,0.3)] to-transparent"></div>
            </h3>
            <ul className="space-y-2">
              <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent">FAQs</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent">Contact Us</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent" onClick={() => navigate('/terms')}>Terms of Service</Button></li>
              <li><Button variant="link" className="p-0 h-auto text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent" onClick={() => navigate('/privacy')}>Privacy Policy</Button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 relative inline-block">
              Connect With Us
              <div className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(100,73,37,0.3)] to-transparent"></div>
            </h3>
            <p className="text-muted-foreground mb-4">
              Follow us for updates on new sites and features
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground relative group overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                <div className="absolute inset-0 bg-[rgba(100,73,37,0.1)] scale-0 group-hover:scale-100 rounded-full transition-transform duration-300"></div>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground relative group overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
                <div className="absolute inset-0 bg-[rgba(100,73,37,0.1)] scale-0 group-hover:scale-100 rounded-full transition-transform duration-300"></div>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground relative group overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
                <div className="absolute inset-0 bg-[rgba(100,73,37,0.1)] scale-0 group-hover:scale-100 rounded-full transition-transform duration-300"></div>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-muted-foreground/20 text-center text-muted-foreground relative">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-[rgba(240,235,230,255)] px-4 py-1">
              <CornerMandala className="text-[rgba(100,73,37,255)] w-10 h-10 opacity-20" />
            </div>
          </div>
          <p>&copy; {new Date().getFullYear()} TAG. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
