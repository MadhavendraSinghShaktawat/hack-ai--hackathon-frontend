import React from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
  >
    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
      <span className="text-2xl">{icon}</span>
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

export const Features: React.FC = () => {
  const features = [
    {
      icon: "🧠",
      title: "Personalized Therapy",
      description: "AI-powered sessions tailored to your unique needs and personal growth journey."
    },
    {
      icon: "⏰",
      title: "24/7 Availability",
      description: "Access therapeutic support anytime, anywhere - we're always here when you need us."
    },
    {
      icon: "🔒",
      title: "Complete Privacy",
      description: "Your conversations are private and secure, ensuring total confidentiality."
    },
    {
      icon: "📈",
      title: "Track Progress",
      description: "Monitor your emotional well-being with insights and progress tracking."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Choose Calmly?</h2>
          <p className="text-xl text-gray-600">
            Your companion on the journey to better mental health
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              {...feature}
              delay={index * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 