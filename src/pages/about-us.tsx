import React from 'react';
import { motion } from 'framer-motion';

export const AboutUsPage: React.FC = () => {
  const values = [
    {
      title: "Accessibility",
      description: "Making mental health support available to everyone, anywhere, anytime.",
      icon: "🌍"
    },
    {
      title: "Privacy",
      description: "Ensuring complete confidentiality and secure conversations.",
      icon: "🔒"
    },
    {
      title: "Innovation",
      description: "Using cutting-edge AI technology to provide personalized support.",
      icon: "💡"
    },
    {
      title: "Empathy",
      description: "Creating a safe, judgment-free space for emotional expression.",
      icon: "💚"
    }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-16">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial="initial"
          animate="animate"
          className="max-w-4xl mx-auto space-y-16"
        >
          {/* Hero Section */}
          <motion.section {...fadeIn} className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Making Mental Wellness <br />
              <span className="text-blue-600">Accessible to Everyone</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Calmly combines artificial intelligence with evidence-based therapeutic approaches 
              to provide personalized mental health support when you need it most.
            </p>
          </motion.section>

          {/* Mission Section */}
          <motion.section {...fadeIn} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                At Calmly, we believe that everyone deserves access to mental health support. 
                Our mission is to break down barriers to mental wellness by providing an 
                accessible, affordable, and always-available platform for emotional support 
                and personal growth.
              </p>
              <p>
                Through innovative AI technology and a deep understanding of human psychology, 
                we've created a space where you can freely express your thoughts and feelings, 
                receive supportive guidance, and develop healthy coping strategies.
              </p>
            </div>
          </motion.section>

          {/* Values Section */}
          <motion.section {...fadeIn}>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                >
                  <div className="text-3xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Technology Section */}
          <motion.section {...fadeIn} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Technology</h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                Calmly leverages state-of-the-art artificial intelligence to provide 
                personalized, context-aware conversations. Our AI is trained on evidence-based 
                therapeutic approaches and continuously learns to better understand and support 
                your unique needs.
              </p>
              <div className="mt-6 flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Natural Language Processing</h3>
                  <p className="text-gray-600">Advanced AI that understands context and emotions in conversations.</p>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Personalized Support</h3>
                  <p className="text-gray-600">Adaptive responses based on your unique situation and needs.</p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Call to Action */}
          <motion.section {...fadeIn} className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Start Your Journey Today</h2>
            <p className="text-xl text-gray-600 mb-8">
              Experience the future of mental wellness support with Calmly.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/chat'}
              className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors"
            >
              Start a Conversation
            </motion.button>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}; 