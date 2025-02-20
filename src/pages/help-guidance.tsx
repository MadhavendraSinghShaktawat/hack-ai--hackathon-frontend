import React from 'react';
import { motion } from 'framer-motion';

export const HelpGuidancePage: React.FC = () => {
  const faqs = [
    {
      question: "How does Calmly work?",
      answer: "Calmly uses advanced AI to provide supportive conversations and mental health guidance. You can chat via text or voice, track your mood, and access various mental wellness resources."
    },
    {
      question: "Is Calmly a replacement for therapy?",
      answer: "No, Calmly is not a replacement for professional therapy. We provide supportive conversations and coping strategies, but recommend seeking professional help for serious mental health concerns."
    },
    {
      question: "How do I start using Calmly?",
      answer: "Simply click 'Start Session' to begin a conversation. You can choose between text or voice chat, and our AI will guide you through the process."
    },
    {
      question: "What should I do in a crisis?",
      answer: "If you're experiencing a mental health crisis, please contact emergency services or crisis helplines immediately. Calmly is not equipped to handle emergency situations."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-16">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Help & Guidance</h1>

          <div className="space-y-12">
            {/* Quick Start Guide */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Quick Start Guide</h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">1</span>
                    <div>
                      <h3 className="font-medium text-gray-900">Start a Session</h3>
                      <p className="text-gray-600">Click the "Start Session" button to begin your conversation.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">2</span>
                    <div>
                      <h3 className="font-medium text-gray-900">Choose Your Mode</h3>
                      <p className="text-gray-600">Select between text chat or voice chat based on your preference.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">3</span>
                    <div>
                      <h3 className="font-medium text-gray-900">Express Yourself</h3>
                      <p className="text-gray-600">Share your thoughts and feelings openly with our AI companion.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium">4</span>
                    <div>
                      <h3 className="font-medium text-gray-900">Track Your Progress</h3>
                      <p className="text-gray-600">Use our mood tracking feature to monitor your emotional well-being.</p>
                    </div>
                  </li>
                </ol>
              </div>
            </section>

            {/* FAQs */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                  >
                    <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Support Resources */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Additional Resources</h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-900">Emergency Contacts</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>Emergency Services: 911</li>
                    <li>National Suicide Prevention Lifeline: 1-800-273-8255</li>
                    <li>Crisis Text Line: Text HOME to 741741</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}; 