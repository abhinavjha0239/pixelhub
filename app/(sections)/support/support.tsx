'use client';

import React from 'react';

export default function Support(): React.ReactNode {
  return (
    <section id="support" className="bg-[#0D0D0D] py-20 px-4 md:px-6 lg:px-8 relative">
      {/* Section Header */}
      <div className="container mx-auto mb-10">
        <div className="flex items-center justify-center mb-6">
          <div className="w-3 h-3 bg-[#FF6B6B] mr-1"></div>
          <div className="w-3 h-3 bg-[#4ECDC4] mr-1"></div>
          <div className="w-3 h-3 bg-[#FFE66D]"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mx-4">Support</h2>
          <div className="w-3 h-3 bg-[#FFE66D] ml-1"></div>
          <div className="w-3 h-3 bg-[#4ECDC4] ml-1"></div>
          <div className="w-3 h-3 bg-[#FF6B6B]"></div>
        </div>
        <p className="text-gray-300 text-center max-w-2xl mx-auto">Get help and assistance for all your PixelVerse needs.</p>
      </div>

      {/* Support Content */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FAQs */}
          <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-700">
              <h3 className="text-white font-bold text-xl">Frequently Asked Questions</h3>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div className="border-b border-neutral-700 pb-5">
                  <button className="w-full text-left flex justify-between items-center">
                    <h4 className="text-white font-bold">How do I create a PixelVerse account?</h4>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  <div className="mt-3">
                    <p className="text-gray-300 text-sm">
                      To create a PixelVerse account, click the "Sign Up" button in the top right corner of the homepage. 
                      Fill out the registration form with your email, username, and password. Verify your email address 
                      through the confirmation link we'll send you, and you're all set!
                    </p>
                  </div>
                </div>

                <div className="border-b border-neutral-700 pb-5">
                  <button className="w-full text-left flex justify-between items-center">
                    <h4 className="text-white font-bold">How do I earn PixelCoins?</h4>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                  <div className="mt-3">
                    <p className="text-gray-300 text-sm">
                      You can earn PixelCoins by completing quests, participating in community events, selling your creations 
                      in the marketplace, and through daily login bonuses. The more active you are in the PixelVerse, the more 
                      coins you'll earn!
                    </p>
                  </div>
                </div>

                <div className="border-b border-neutral-700 pb-5">
                  <button className="w-full text-left flex justify-between items-center">
                    <h4 className="text-white font-bold">How do I recover my password?</h4>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </button>
                </div>

                <div className="border-b border-neutral-700 pb-5">
                  <button className="w-full text-left flex justify-between items-center">
                    <h4 className="text-white font-bold">How do collectibles work?</h4>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </button>
                </div>

                <div className="border-b border-neutral-700 pb-5">
                  <button className="w-full text-left flex justify-between items-center">
                    <h4 className="text-white font-bold">Can I sell my own pixel art creations?</h4>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </button>
                </div>
              </div>

              <button className="w-full mt-6 py-2 bg-transparent border border-[#4ECDC4] text-[#4ECDC4] hover:bg-[#4ECDC4]/10 font-bold rounded text-sm transition-colors">
                View All FAQs
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-neutral-700">
              <h3 className="text-white font-bold text-xl">Contact Support</h3>
            </div>
            <div className="p-6">
              <form>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-white text-sm font-medium mb-2">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-[#0D0D0D] border border-neutral-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] focus:border-transparent"
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-white text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-[#0D0D0D] border border-neutral-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="category" className="block text-white text-sm font-medium mb-2">Issue Category</label>
                    <select
                      id="category"
                      className="w-full bg-[#0D0D0D] border border-neutral-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] focus:border-transparent"
                    >
                      <option value="" disabled selected>Select category</option>
                      <option value="account">Account Issues</option>
                      <option value="billing">Billing & Payments</option>
                      <option value="technical">Technical Problems</option>
                      <option value="marketplace">Marketplace</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-white text-sm font-medium mb-2">Your Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full bg-[#0D0D0D] border border-neutral-700 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] focus:border-transparent"
                      placeholder="Describe your issue in detail"
                    ></textarea>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      className="h-4 w-4 bg-[#0D0D0D] border border-neutral-700 rounded focus:ring-[#4ECDC4]"
                    />
                    <label htmlFor="terms" className="ml-2 block text-gray-300 text-sm">
                      I agree to the processing of my personal data
                    </label>
                  </div>
                </div>
                
                <button
                  type="submit"
                  className="w-full mt-6 py-3 bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 text-black font-bold rounded transition-colors"
                >
                  Submit Ticket
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-[#4ECDC4]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-[#4ECDC4] text-xl">📚</span>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Knowledge Base</h3>
            <p className="text-gray-300 text-sm mb-4">Browse our extensive documentation for detailed guides and tutorials.</p>
            <button className="py-2 px-4 bg-transparent border border-[#4ECDC4] text-[#4ECDC4] hover:bg-[#4ECDC4]/10 font-bold rounded text-sm transition-colors">
              Browse Articles
            </button>
          </div>

          <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-[#FF6B6B]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-[#FF6B6B] text-xl">💬</span>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Live Chat</h3>
            <p className="text-gray-300 text-sm mb-4">Chat with our support team for immediate assistance with urgent issues.</p>
            <button className="py-2 px-4 bg-[#FF6B6B] hover:bg-[#FF6B6B]/80 text-black font-bold rounded text-sm transition-colors">
              Start Chat
            </button>
          </div>

          <div className="bg-[#1A1A1A] border border-neutral-700 rounded-lg p-6 text-center">
            <div className="w-12 h-12 bg-[#FFE66D]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-[#FFE66D] text-xl">🤝</span>
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Community Forum</h3>
            <p className="text-gray-300 text-sm mb-4">Ask questions and get help from other PixelVerse community members.</p>
            <button className="py-2 px-4 bg-transparent border border-[#FFE66D] text-[#FFE66D] hover:bg-[#FFE66D]/10 font-bold rounded text-sm transition-colors">
              Visit Forum
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 