
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Footer = () => {
  const navigate = useNavigate();
  
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

          {/* Horizontal Accordion */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="quick-links" className="border-b-0">
              <AccordionTrigger className="flex-1 text-left py-3 px-4 bg-muted-foreground/10 rounded-t-lg hover:bg-muted-foreground/20 transition-colors [&[data-state=open]]:bg-primary/10 [&[data-state=open]]:text-primary font-semibold">
                Quick Links
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 bg-card border-x border-b rounded-b-lg">
                <ul className="space-y-2">
                  <li><Button variant="link" className="p-0 h-auto text-left justify-start text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95" onClick={() => navigate('/')}>Home</Button></li>
                  <li><Button variant="link" className="p-0 h-auto text-left justify-start text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95" onClick={() => navigate('/explore')}>Explore Sites</Button></li>
                  <li><Button variant="link" className="p-0 h-auto text-left justify-start text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95" onClick={() => navigate('/guides')}>Find Guides</Button></li>
                  <li><Button variant="link" className="p-0 h-auto text-left justify-start text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95" onClick={() => navigate('/')}>About Us</Button></li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="support" className="border-b-0 mt-2">
              <AccordionTrigger className="flex-1 text-left py-3 px-4 bg-muted-foreground/10 rounded-t-lg hover:bg-muted-foreground/20 transition-colors [&[data-state=open]]:bg-primary/10 [&[data-state=open]]:text-primary font-semibold">
                Support
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 bg-card border-x border-b rounded-b-lg">
                <ul className="space-y-2">
                  <li><Button variant="link" className="p-0 h-auto text-left justify-start text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95">FAQs</Button></li>
                  <li><Button variant="link" className="p-0 h-auto text-left justify-start text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95">Contact Us</Button></li>
                  <li><Button variant="link" className="p-0 h-auto text-left justify-start text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95" onClick={() => navigate('/terms')}>Terms of Service</Button></li>
                  <li><Button variant="link" className="p-0 h-auto text-left justify-start text-muted-foreground hover:text-foreground bg-transparent hover:bg-transparent transition-transform hover:scale-95" onClick={() => navigate('/privacy')}>Privacy Policy</Button></li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="connect" className="border-b-0 mt-2">
              <AccordionTrigger className="flex-1 text-left py-3 px-4 bg-muted-foreground/10 rounded-t-lg hover:bg-muted-foreground/20 transition-colors [&[data-state=open]]:bg-primary/10 [&[data-state=open]]:text-primary font-semibold">
                Connect With Us
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 bg-card border-x border-b rounded-b-lg">
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
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
