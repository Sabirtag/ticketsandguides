import React from 'react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
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
            Privacy Policy
          </h1>
          
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground font-fitzgerald">
                Our Commitment to Your Privacy
              </h2>
              <p className="text-foreground">
                Welcome to TAG. Your trust is the cornerstone of our community, and protecting your privacy is a responsibility we take very seriously. This policy explains how we collect, use, and protect your personal information when you use our platform. This applies to all our users, whether you are in India or joining us from abroad.
              </p>
              <p className="text-foreground mt-4">
                By using TAG, you agree to the collection and use of information in accordance with this policy, which is in compliance with India's Digital Personal Data Protection Act (DPDPA), 2023, and other applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground font-fitzgerald">
                Information We Collect
              </h2>
              <p className="text-foreground mb-4">
                To provide you with a seamless experience, we collect certain information:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Personal Information:</h3>
                  <p className="text-foreground">
                    When you create an account, we ask for information like your name, email address, phone number, and date of birth.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Payment Information:</h3>
                  <p className="text-foreground">
                    To process bookings, we collect payment details, which are handled securely by our trusted payment partners.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Communications:</h3>
                  <p className="text-foreground">
                    We keep a record of communications between you, other users, and our support team.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Usage Data:</h3>
                  <p className="text-foreground">
                    We collect information about how you interact with our platform, such as pages visited and features used, to help us improve our service.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground font-fitzgerald">
                How We Use Your Information
              </h2>
              <p className="text-foreground mb-4">
                We use your data for specific, lawful purposes:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">To Operate the Platform:</h3>
                  <p className="text-foreground">
                    To facilitate bookings, process payments, and allow communication between travelers and Curators.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">To Ensure Security:</h3>
                  <p className="text-foreground">
                    To verify accounts, prevent fraud, and maintain a safe and secure environment for our community.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">To Improve Our Services:</h3>
                  <p className="text-foreground">
                    To analyze usage trends and get feedback to make TAG better for everyone.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">To Communicate With You:</h3>
                  <p className="text-foreground">
                    To send you booking confirmations, updates, and other essential information. With your explicit consent, we may also send you marketing communications.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground font-fitzgerald">
                Your Rights and Choices
              </h2>
              <p className="text-foreground mb-4">
                Under the DPDPA, you have control over your personal data:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Right to Access:</h3>
                  <p className="text-foreground">
                    You can request a summary of the personal data we hold about you.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Right to Correction and Erasure:</h3>
                  <p className="text-foreground">
                    You can correct inaccurate information in your profile and request the deletion of your data when it's no longer needed for the purpose it was collected.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Right to Withdraw Consent:</h3>
                  <p className="text-foreground">
                    You can withdraw your consent for data processing at any time, and it will be as easy to withdraw as it was to give.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">Right to Grievance Redressal:</h3>
                  <p className="text-foreground">
                    If you have any concerns about your data, you can contact our Grievance Officer. We are committed to resolving issues in a timely manner.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground font-fitzgerald">
                Data Sharing and Disclosure
              </h2>
              <p className="text-foreground mb-4">
                We only share your information in the following ways:
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">With Curators:</h3>
                  <p className="text-foreground">
                    We share necessary information (like your name) with a Curator when you book their Experience to facilitate the service.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">With Third-Party Service Providers:</h3>
                  <p className="text-foreground">
                    We work with trusted partners for services like payment processing and data storage. These partners are bound by strict data protection agreements.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-foreground">For Legal Compliance:</h3>
                  <p className="text-foreground">
                    We may disclose information if required by law or to protect the rights and safety of our community.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground font-fitzgerald">
                Data Security and Retention
              </h2>
              <p className="text-foreground">
                We use reasonable technical and security measures to protect your data. We retain your personal data only as long as necessary for the purposes for which it was collected or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4 text-foreground font-fitzgerald">
                Grievance Officer
              </h2>
              <p className="text-foreground mb-4">
                As required by law, we have appointed a Grievance Officer to address your concerns. You can reach them at:
              </p>
              <div className="bg-muted/30 p-6 rounded-lg space-y-2">
                <p className="text-foreground">
                  <span className="font-semibold">Name:</span> [Grievance Officer Name]
                </p>
                <p className="text-foreground">
                  <span className="font-semibold">Email:</span> grievance.officer@ticketsandguides.com
                </p>
                <p className="text-foreground">
                  <span className="font-semibold">Contact:</span> [Phone Number]
                </p>
              </div>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
