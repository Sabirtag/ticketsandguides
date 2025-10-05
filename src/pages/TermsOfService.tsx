import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex items-center text-muted-foreground mb-4 sm:mb-6"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        
        <article className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-foreground font-fitzgerald">
            Terms and Conditions for Travelers
          </h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
            <p className="text-lg text-muted-foreground">
              This document outlines the agreement between you, our valued traveler, and TAG when you book and enjoy an Experience through our platform.
            </p>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground font-fitzgerald">
                Welcome to TAG!
              </h2>
              <p className="text-foreground">
                We are thrilled to help you discover and book unique cultural and heritage experiences across India. Our platform connects you with talented local experts (our "Curators") who host these experiences. Before you begin your journey, please take a moment to read through our terms.
              </p>
              <p className="text-foreground font-medium mt-4">
                By booking an Experience on TAG, you agree to these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground font-fitzgerald">
                1. Our Role and Your Experience
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">We are a Marketplace:</h3>
                  <p className="text-foreground">
                    TAG acts as a platform to connect you with Experience Curators. The Curators are independent partners who are responsible for creating and delivering their own unique Experiences. While we have a vetting process for our Curators, we are not the direct providers of the Experiences.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Authentic Connections:</h3>
                  <p className="text-foreground">
                    Our goal is to facilitate authentic and respectful cultural exchanges. We encourage you to approach every experience with an open mind and a spirit of curiosity.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground font-fitzgerald">
                2. Booking and Payments
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Creating an Account:</h3>
                  <p className="text-foreground">
                    To book an Experience, you'll need to create a TAG account. Please ensure all the information you provide is accurate and up-to-date, as this is crucial for smooth communication. You are responsible for keeping your password safe.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Booking an Experience:</h3>
                  <p className="text-foreground">
                    When you find an Experience you love, you can book it for the available dates. By completing the booking, you agree to pay the total fees indicated, which include the Experience price and any applicable taxes like GST.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Payment:</h3>
                  <p className="text-foreground">
                    All payments are processed securely through our platform. We accept various payment methods, which will be displayed at checkout. Your booking is confirmed only after a successful payment.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Confirmation:</h3>
                  <p className="text-foreground">
                    For most Experiences, you will receive an instant confirmation via email. For some, the Curator may need up to 48 hours to confirm. Your confirmation email will contain all the important details, including the meeting point, Curator's contact information, and what to bring.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground font-fitzgerald">
                3. Cancellations and Refunds
              </h2>
              <p className="text-foreground mb-4">
                We understand that plans can change. Our cancellation policy is designed to be fair to both you and our Curators.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Cancellation by You:</h3>
                  <ul className="list-disc pl-6 space-y-2 text-foreground">
                    <li>To receive a full refund, you must cancel at least 7 days before the Experience is scheduled to start.</li>
                    <li>If you cancel between [e.g., 3 and 7 days] before the start time, you will receive a [e.g., 50%] refund.</li>
                    <li>Cancellations made within [e.g., 72 hours] of the Experience start time are non-refundable.</li>
                    <li>Specific Experiences may have unique cancellation policies, which will be clearly stated on the booking page. Please review them carefully before booking.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Cancellation by the Curator:</h3>
                  <p className="text-foreground">
                    If a Curator has to cancel an Experience for any reason, you will be notified immediately, and you will receive a 100% full refund. We will also do our best to help you find a similar alternative Experience.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">No-Shows:</h3>
                  <p className="text-foreground">
                    If you do not show up for your Experience at the designated time and place, no refund will be provided.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground font-fitzgerald">
                4. Your Responsibilities as a Traveler
              </h2>
              <p className="text-foreground mb-4">
                To ensure a wonderful and safe experience for everyone, we ask that you:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Communicate Respectfully:</h3>
                  <p className="text-foreground">
                    Treat your Curator and fellow travelers with kindness and respect.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Be Punctual:</h3>
                  <p className="text-foreground">
                    Please arrive at the meeting point on time. If a Curator is more than 15 minutes late without notice, it may be considered a cancellation on their part.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Read the Details:</h3>
                  <p className="text-foreground">
                    Carefully read the Experience description, including any requirements for participation (like age, fitness level, or skills needed) and what is included or excluded.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Ensure Your Safety:</h3>
                  <p className="text-foreground">
                    You are responsible for your own safety and well-being during the Experience. Please follow all safety instructions provided by the Curator.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Provide Accurate Information:</h3>
                  <p className="text-foreground">
                    Ensure all information provided for your booking, including for any guests you book for, is accurate.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground font-fitzgerald">
                5. Limitation of Liability
              </h2>
              <p className="text-foreground">
                As a marketplace, TAG is not liable for any personal injury, property damage, or other loss that may occur during an Experience provided by a Curator. We strongly recommend that you purchase comprehensive travel insurance. This does not affect your rights under Indian consumer protection laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground font-fitzgerald">
                6. Governing Law and Dispute Resolution
              </h2>
              <p className="text-foreground">
                These terms are governed by the laws of India. We hope you have an amazing time, but if any issues arise, we encourage you to first try and resolve them directly with your Curator. If that's not possible, please contact us, and we will do our best to help mediate. Any legal proceedings will be held in the courts of "District & Sessions Judge Court, Dibrugarh, Assam".
              </p>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
};

export default TermsOfService;
