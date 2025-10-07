import Navbar from "@/components/Navbar";
import Footer from "@/components/home/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const OtherPolicies = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8 mt-16">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Other Policies</h1>
        
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-semibold">
              Account Authenticity and Requirements
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Who Can Have a TAG Account</h3>
                <p>You must be at least 18 years old to create an account and book Experiences on TAG. Experiences involving certain activities may have higher age requirements, which will be clearly stated in the listing.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Representing Yourself Authentically</h3>
                <p>Trust is essential to our community. We require all users to provide accurate and truthful information when creating an account and booking reservations.</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Do not use false names or impersonate someone else.</li>
                  <li>Keep your account information, such as your contact details, current and complete.</li>
                  <li>You are responsible for all activities that occur under your account, so please keep your password confidential.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Booking Requirements for Reservations</h3>
                <p>To ensure a smooth and safe experience for everyone, please adhere to the following when making a reservation:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Read the Experience description, including any specific requirements for participation (e.g., fitness level, skills), before booking.</li>
                  <li>If you are booking for additional guests, you are responsible for ensuring they meet all requirements and agree to these terms.</li>
                  <li>Do not make speculative or fraudulent bookings. We reserve the right to cancel any bookings that violate our policies.</li>
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-semibold">
              Community Expectations
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-4">
              <p>Our mission is to foster a community built on respect, curiosity, and authentic connection. When you join TAG, you agree to uphold these values.</p>
              <div>
                <h3 className="font-semibold text-foreground mb-2">What's Expected of Guests</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Be Respectful:</strong> Treat your Curator and fellow travelers with kindness and courtesy, even if your opinions differ.</li>
                  <li><strong>Be Curious:</strong> Approach every Experience with an open mind and a willingness to learn and participate.</li>
                  <li><strong>Be Punctual:</strong> Arrive on time for your Experience to ensure a smooth start for everyone.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Interacting Honestly</h3>
                <p>Authenticity is key. Always communicate truthfully with Curators and other members of the community. Do not misrepresent yourself or the purpose of your travel. Falsely presenting yourself as a consumer to post fake reviews is strictly prohibited.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Guest Limits</h3>
                <p>Each Experience has a specific guest limit set by the Curator for quality and safety reasons. Please respect these limits and do not bring extra people who are not part of your official booking.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Community Disturbance Policy</h3>
                <p>You are responsible for your behavior during an Experience. Any activity that disrupts the Experience, disrespects the local community, or violates the Curator's ground rules is not permitted. This includes excessive noise, unsafe behavior, or failure to follow instructions.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Ground Rules for Guests</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Follow all safety instructions provided by your Curator.</li>
                  <li>Respect local customs, traditions, and environments.</li>
                  <li>Do not engage in any illegal activities.</li>
                  <li>Do not harass, threaten, or discriminate against anyone.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Off-Platform and Fee Transparency Policy</h3>
                <p>To protect our community, all payments and communications related to a booking must be kept on the TAG platform.</p>
                <p className="mt-2"><strong>Circumvention Policy:</strong> Do not request, make, or accept any booking or payment outside of the TAG platform to avoid fees or for any other reason. This helps us protect your payment and personal information.</p>
                <p className="mt-2"><strong>Fee Transparency:</strong> All applicable fees, including the Experience price and taxes, will be clearly displayed at checkout. There are no hidden charges.</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-semibold">
              Payments and Payouts
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-4">
              <p>We've designed our payment system to be secure, transparent, and easy to use for both travelers and Curators.</p>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Avoiding Fraud, Scams, and Abuse</h3>
                <p><strong>Pay on TAG:</strong> Always complete your payments through the official TAG platform. Never agree to pay a Curator directly via bank transfer, cash, or any third-party payment service. Paying through our system protects you with our refund policies and support.</p>
                <p className="mt-2"><strong>Report Suspicious Activity:</strong> If a Curator asks you to pay outside our platform or you encounter any suspicious requests, please report it to us immediately.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Security Deposits</h3>
                <p>For certain high-value or equipment-intensive Experiences, a Curator may require a security deposit. This will be clearly stated in the Experience listing. Security deposits are managed through the TAG platform and will be refunded to you after the Experience is completed, provided there are no damages.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Collecting Fees Outside TAG</h3>
                <p>Attempting to collect fees outside of our platform is a violation of our terms for both travelers and Curators. This practice undermines the security of our community and may result in account suspension or termination.</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-semibold">
              Safety
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-4">
              <p>Your safety is our top priority. We have created a framework to foster a secure environment, but safety is a shared responsibility.</p>
              <p><strong>For Travelers:</strong> Please carefully review all safety information and requirements provided in an Experience listing. During the Experience, follow all instructions from your Curator. We strongly recommend purchasing comprehensive travel insurance for your trip.</p>
              <p><strong>For Curators:</strong> You are responsible for creating a safe environment for your guests. This includes ensuring all equipment is in good working order, choosing safe locations, and providing clear safety briefings. You must have all necessary licenses and insurance to operate your Experience legally.</p>
              <p><strong>Verification:</strong> We have processes in place to verify the identity of our users to help prevent misbehavior and build trust within the community.</p>
              <p><strong>Prohibited Activities:</strong> We do not allow any illegal activities or experiences that pose a heightened risk to our community, such as those involving weapons, drugs, or exploitation.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-semibold">
              Nondiscrimination and Accessibility
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Nondiscrimination Policy</h3>
                <p>TAG is an open and inclusive community. We are committed to building a world where people from every background can connect with confidence. Discrimination of any kind has no place on our platform.</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>We prohibit discrimination based on race, color, ethnicity, national origin, religion, sexual orientation, gender identity, marital status, or disability.</li>
                  <li>This policy applies to both our travelers and our Experience Curators. Any user found to be violating this policy will be removed from our platform.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Combating Hate and Harassment</h3>
                <p>We have a zero-tolerance policy for hate speech, harassment, and bullying. All members of our community must treat each other with respect and dignity. This includes:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>No personal attacks, insults, or threats.</li>
                  <li>No content that promotes hate or prejudice against any group.</li>
                  <li>No harassment or unwanted advances.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Accessibility Policy</h3>
                <p>We are committed to making our platform and the experiences on it accessible to everyone, including people with disabilities.</p>
                <p className="mt-2"><strong>Digital Accessibility:</strong> We are working to ensure our website and app comply with the Web Content Accessibility Guidelines (WCAG) 2.0 Level AA standards, as mandated by Indian law for digital platforms. This includes making our content perceivable, operable, and understandable for users with visual, hearing, motor, or cognitive impairments.</p>
                <p className="mt-2"><strong>Experience Accessibility:</strong> We encourage our Curators to provide detailed information about the accessibility features of their Experiences so travelers can make informed decisions.</p>
                <p className="mt-2"><strong>Feedback:</strong> If you encounter any accessibility barriers on our platform, please contact us so we can address them.</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-semibold">
              Cancellations and Refunds
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-4">
              <p>We aim for our cancellation policies to be fair and clear for both travelers and Curators.</p>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Rebooking and Refund Policy for Experiences</h3>
                <p><strong>Guest Eligibility for Refund:</strong> You may be eligible for a full or partial refund if your Experience is disrupted by a "Covered Issue." Covered Issues include:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>The Curator cancels the Experience.</li>
                  <li>The Curator is more than 15 minutes late or does not show up.</li>
                  <li>The Experience is substantially different from what was advertised in the listing.</li>
                </ul>
                <p className="mt-2"><strong>Requesting a Refund:</strong> If you encounter a Covered Issue, we encourage you to first try and resolve it with your Curator. If that is not possible, you must contact us within [e.g., 72 hours] of the issue occurring to request a refund.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Major Disruptive Events Policy</h3>
                <p>We may issue a full refund if your Experience is canceled due to a Major Disruptive Event beyond your control. These events include:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Government-declared public health emergencies.</li>
                  <li>Government travel restrictions.</li>
                  <li>Large-scale natural disasters (e.g., earthquakes, floods).</li>
                  <li>Endemic disease outbreaks.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Events Excluded from this Policy</h3>
                <p>This policy does not cover cancellations due to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Unexpected personal illness or injury (we recommend travel insurance for this).</li>
                  <li>Unpleasant but not dangerous weather conditions (e.g., rain during a walking tour).</li>
                  <li>Government advisories or other events that do not directly prohibit travel to the area.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Finding the Cancellation Policy for Any Experience</h3>
                <p>Each Experience has its own cancellation policy set by the Curator. You can find this policy clearly displayed on the Experience booking page before you confirm your reservation. Please review it carefully.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">What Guests Need to Know About Cancellations</h3>
                <p><strong>Standard Guest Cancellation:</strong> For standard cancellations (not related to a Covered Issue), the refund amount depends on when you cancel. A typical policy might be:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Full refund if you cancel more than [e.g., 7 days] before.</li>
                  <li>Partial refund if you cancel within [e.g., 3-7 days].</li>
                  <li>No refund if you cancel within [e.g., 72 hours] or are a no-show.</li>
                </ul>
                <p className="mt-2"><strong>Curator Cancellation:</strong> If a Curator cancels, you will automatically receive a 100% full refund.</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7" className="border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-semibold">
              Copyright Policy
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-4">
              <p>TAG respects the intellectual property rights of others and expects our users to do the same.</p>
              <p><strong>Our Content:</strong> All content on the TAG platform, including text, graphics, logos, and software, is the property of TAG and is protected by copyright and other intellectual property laws. You may not copy, modify, or distribute our content without our permission.</p>
              <p><strong>Your Content:</strong> When Curators upload content (like photos and descriptions) to our platform, they grant us a license to use it for promotional purposes. Curators must ensure they own the rights to any content they post.</p>
              <p><strong>Reporting Infringement:</strong> We comply with the Copyright Act, 1957, and the IT Act, 2000. If you believe your copyright has been infringed upon by content on our platform, please notify us with specific details. Upon receiving a valid complaint, we will take appropriate action to remove the infringing content. As an intermediary, we are not obligated to proactively screen all content but will act upon receiving "actual knowledge" of infringement.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8" className="border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-semibold">
              Cookie Policy
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">What Are Cookies?</h3>
                <p>Cookies are small text files stored on your device when you visit a website. They help us provide a better, more personalized experience.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">How We Use Cookies</h3>
                <p><strong>Essential Cookies:</strong> These are necessary for the platform to function, such as keeping you logged in and processing payments.</p>
                <p className="mt-2"><strong>Performance Cookies:</strong> These help us understand how you use our site, so we can analyze and improve its performance.</p>
                <p className="mt-2"><strong>Functionality Cookies:</strong> These remember your preferences (like language or currency) to make your visit more convenient.</p>
                <p className="mt-2"><strong>Marketing Cookies:</strong> These are used to show you relevant advertisements on and off our platform.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Your Choices</h3>
                <p>You can manage your cookie preferences through your browser settings. Please note that disabling certain cookies may affect the functionality of the TAG platform.</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9" className="border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-semibold">
              Ad Choice Policy
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-4">
              <p>We may use information collected on our platform to show you more relevant advertising. This helps us keep our platform running and allows us to offer you personalized recommendations.</p>
              <p><strong>Personalized Ads:</strong> We may partner with third-party ad networks to display ads that are tailored to your interests, based on your activity on our platform.</p>
              <p><strong>Your Control:</strong> You have choices about the ads you see. You can manage your preferences through your account settings and by adjusting the cookie settings on your browser. We are committed to transparency and will not use your sensitive personal data for advertising without your explicit consent.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10" className="border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-semibold">
              Reviews Policy
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-4">
              <p className="font-semibold text-foreground">Our Reviews Policy: Building a Community on Trust</p>
              <p>At TAG, we believe that honest and transparent feedback is the heart of our community. Reviews help travelers make informed decisions and give our Experience Curators valuable insights to improve. To ensure the integrity of our review system, we have the following guidelines.</p>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Who Can Leave a Review?</h3>
                <p>To keep reviews authentic, only travelers who have completed a booked Experience through TAG can leave a review. Once an Experience is finished, the traveler will be invited to share their feedback.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Our Review Principles</h3>
                <p>We ask that all reviews are:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>Honest and Unbiased:</strong> Share your genuine experience. Reviews should not be influenced by threats or promises of discounts. Curators are not allowed to ask guests to leave a positive review in exchange for a partial refund or other benefits.</li>
                  <li><strong>Relevant and Helpful:</strong> Provide details that would be useful to future travelers. What did you love? What could have been better? Focus on the Experience itself and your interaction with the Curator.</li>
                  <li><strong>Respectful:</strong> We encourage constructive feedback. However, reviews must not contain hate speech, discriminatory language, personal attacks, or explicit content. Please refer to our Nondiscrimination Policy and Community Expectations for more details.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">What We Don't Allow</h3>
                <p>The following types of reviews will be removed:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>Reviews that Violate Our Policies:</strong> Any review containing harassment, hate speech, or discriminatory content will be removed.</li>
                  <li><strong>Spam and Fake Reviews:</strong> Reviews that are not related to a genuine experience, are posted for promotional purposes, or are intended to manipulate ratings are not allowed. Posting fake reviews is a violation of the Consumer Protection (E-Commerce) Rules, 2020.</li>
                  <li><strong>Extortion:</strong> Travelers and Curators are not permitted to use reviews as a tool for extortion. For example, a traveler cannot threaten a bad review to get a refund, and a Curator cannot demand a positive review for a discount.</li>
                  <li><strong>Off-Topic Content:</strong> Reviews should focus on the Experience. Please do not include personal political, religious, or social commentary.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Reporting a Review</h3>
                <p>If you believe a review violates our policies, you can report it to us. Our team will investigate the claim and take appropriate action. We are committed to maintaining a fair and trustworthy review system for everyone.</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-11" className="border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-semibold">
              Content Policy
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-4">
              <p className="font-semibold text-foreground">Our Content Policy: Keeping Our Platform Safe and Respectful</p>
              <p>TAG is a platform for sharing stories and creating connections. The content you share—from your profile and Experience listings to reviews and messages—helps build our community. To ensure TAG remains a safe and welcoming space, all user-generated content must adhere to the following policy.</p>
              <div>
                <h3 className="font-semibold text-foreground mb-2">What is "Content"?</h3>
                <p>Content includes any text, photos, videos, or other information you create, upload, or share on the TAG platform.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Prohibited Content</h3>
                <p>We have a zero-tolerance policy for content that is:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>Illegal or Promotes Harmful Activities:</strong> Any content that facilitates or promotes illegal acts, such as the use of illicit drugs, violence, or exploitation, is strictly forbidden.</li>
                  <li><strong>Discriminatory or Hateful:</strong> Content that attacks or demeans individuals based on race, ethnicity, national origin, religion, gender, sexual orientation, disability, or any other protected characteristic is not allowed.</li>
                  <li><strong>Harassing or Abusive:</strong> We do not permit bullying, personal attacks, threats, or any form of harassment directed at other users.</li>
                  <li><strong>Explicit or Pornographic:</strong> Sexually explicit content or content that involves pornography or commercial sex work is prohibited.</li>
                  <li><strong>Spam or Unsolicited Commercial Content:</strong> Do not use our platform to post repetitive, unwanted, or unauthorized promotional content.</li>
                  <li><strong>Infringing on Intellectual Property:</strong> You may only post content that you own or have the legal right to share. Do not post content that violates another person's copyright or trademark. Please see our Copyright Policy for more details.</li>
                  <li><strong>Sharing Private Information:</strong> Do not share the personal or confidential information of others without their explicit consent. This is often referred to as "doxing" and is a serious violation of trust.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Our Role as an Intermediary</h3>
                <p>Under India's Information Technology Act, 2000, TAG operates as an "intermediary". This means we provide a platform for users to connect and share content. While we do not proactively screen all content, we are obligated to take action when we receive "actual knowledge" of a policy violation or illegal content.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Consequences of Violations</h3>
                <p>If you post content that violates our policies, we may take actions including:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Removing the content.</li>
                  <li>Issuing a warning.</li>
                  <li>Temporarily suspending or permanently terminating your account.</li>
                </ul>
                <p className="mt-2">We encourage our community to help us maintain these standards by reporting any content that seems to violate these guidelines.</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-12" className="border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-semibold">
              Dispute Resolution Policy
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-4">
              <p className="font-semibold text-foreground">Our Dispute Resolution Policy: Finding a Fair Path Forward</p>
              <p>We hope every TAG Experience is a positive one, but we understand that sometimes things don't go as planned. This policy outlines the steps to take if a dispute arises between a traveler and an Experience Curator.</p>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Step 1: Communicate Directly</h3>
                <p>The fastest and best way to resolve an issue is often through direct and respectful communication. We encourage travelers and Curators to first try to solve the problem amongst themselves. Many misunderstandings can be cleared up with a simple conversation.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Step 2: Involve TAG Through the Resolution Center</h3>
                <p>If you are unable to resolve the issue directly, you can formally request our help through the TAG Resolution Center. This must be done within [e.g., 72 hours] of the Experience's scheduled end time.</p>
                <p className="mt-2">To open a dispute, you will need to provide:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>A clear explanation of the issue.</li>
                  <li>Any supporting evidence, such as photos, videos, or screenshots of your communication with the other party.</li>
                  <li>The outcome you are seeking (e.g., a partial refund, a full refund).</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Step 3: Our Mediation Process</h3>
                <p>Once a dispute is opened, our dedicated support team will step in to act as a neutral mediator. Here's what you can expect:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>Review:</strong> We will review all the information and evidence provided by both the traveler and the Curator.</li>
                  <li><strong>Investigation:</strong> We may contact both parties to ask for additional information or clarification.</li>
                  <li><strong>Decision:</strong> Based on our Terms and Conditions, Cancellation Policy, and the evidence provided, we will make a fair and impartial decision. Possible outcomes include issuing a full refund, a partial refund, a booking credit, or denying the refund request.</li>
                </ul>
                <p className="mt-2">Our goal is to resolve all disputes within [e.g., 14 business days] of them being reported.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Formal Grievance Redressal</h3>
                <p>In compliance with the Consumer Protection (E-Commerce) Rules, 2020, every e-commerce entity must have a grievance redressal mechanism. If you are not satisfied with the outcome of the dispute resolution process, you may file a formal complaint with our Grievance Officer, whose contact details are available in our Privacy Policy. The Grievance Officer will acknowledge your complaint within 48 hours and will work to redress it within one month.</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-13" className="border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-semibold">
              Curator Quality Standards
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground space-y-4">
              <p className="font-semibold text-foreground">Our Curator Quality Standards: A Guide to Creating Unforgettable Experiences</p>
              <p>Our Experience Curators are the heart of TAG. You are the storytellers, the experts, and the local ambassadors who bring India's culture and heritage to life. To ensure every traveler has an exceptional experience, we have established these quality standards. Meeting these standards is essential to being a successful Curator on our platform.</p>
              <div>
                <h3 className="font-semibold text-foreground mb-2">The Pillars of a High-Quality Experience</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Expertise and Passion:</strong> Curators must demonstrate deep knowledge and a genuine passion for their subject. Whether you are a historian, a chef, a musician, or an artisan, your expertise should shine through, offering travelers insights they couldn't get anywhere else.</li>
                  <li><strong>Authenticity and Local Connection:</strong> We look for Experiences that offer a true window into local culture. Your Experience should be unique, personal, and provide an authentic connection to the place and its people.</li>
                  <li><strong>Safety First:</strong> The safety of our travelers is paramount. Curators are responsible for ensuring their Experience is safe from start to finish. This includes choosing safe locations, providing clear safety instructions, ensuring any equipment is in good working order, and holding all necessary permits, licenses, and insurance required to operate legally.</li>
                  <li><strong>Professionalism and Hospitality:</strong> A great Curator is also a great host. This means:
                    <ul className="list-circle pl-6 mt-1">
                      <li>Clear Communication: Responding to guest inquiries promptly and providing clear pre-trip information.</li>
                      <li>Punctuality: Starting and ending the Experience on time.</li>
                      <li>Inclusivity: Making every guest feel welcome and respected, regardless of their background.</li>
                    </ul>
                  </li>
                  <li><strong>Listing Accuracy:</strong> Your Experience listing on TAG must be a true and accurate representation of what you offer. This includes the description, itinerary, photos, and what is included or excluded. Misleading information can lead to poor reviews and removal from the platform.</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Maintaining Your Status as a Curator</h3>
                <p>Being a Curator on TAG is an ongoing partnership. We continuously monitor the quality of Experiences through:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>Guest Reviews and Ratings:</strong> Consistently high ratings are the best indicator of a quality experience.</li>
                  <li><strong>Guest Feedback:</strong> We pay close attention to feedback provided to our customer support team.</li>
                  <li><strong>Operational Metrics:</strong> This includes your cancellation rate and responsiveness to guest messages.</li>
                </ul>
                <p className="mt-2">Curators who consistently fail to meet these standards may receive a warning, have their listings temporarily suspended, or be permanently removed from the platform. We are here to support you and will provide feedback and resources to help you succeed.</p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
      <Footer />
    </div>
  );
};

export default OtherPolicies;