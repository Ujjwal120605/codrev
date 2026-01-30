import React, { useState } from 'react';
import PixelBlast from './PixelBlast';
import Nav from './Nav';

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    if (!formData.fullName || !formData.email || !formData.message) {
      setStatus('error');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://formsubmit.co/ajax/bajpaiujjwal3@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          message: formData.message
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ fullName: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Nav />
      {/* PixelBlast Background */}
      <div className="fixed inset-0 z-0">
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#B19EEF"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      </div>

      {/* Contact Form - Centered */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-2xl">
          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
              Let's Talk
            </h1>
            <p className="text-xl text-purple-200">
              Have a project in mind? Let's create something amazing together.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-10 border border-purple-500/30 shadow-[0_0_60px_rgba(177,158,239,0.3)]">
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-white text-lg font-semibold mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-5 py-4 text-lg rounded-xl bg-white/10 border-2 border-purple-400/40 text-white placeholder-purple-300/60 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all"
                  placeholder="John Doe"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-white text-lg font-semibold mb-3">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 text-lg rounded-xl bg-white/10 border-2 border-purple-400/40 text-white placeholder-purple-300/60 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all"
                  placeholder="john@example.com"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-white text-lg font-semibold mb-3">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-5 py-4 text-lg rounded-xl bg-white/10 border-2 border-purple-400/40 text-white placeholder-purple-300/60 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all resize-none"
                  placeholder="Tell us about your project..."
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white text-xl font-bold py-5 px-8 rounded-xl hover:from-purple-600 hover:via-pink-600 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(177,158,239,0.5)]"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>

              {/* Success Message */}
              {status === 'success' && (
                <div className="bg-green-500/20 border-2 border-green-400 text-white px-6 py-4 rounded-xl flex items-center gap-3 text-lg animate-in fade-in slide-in-from-top duration-500">
                  <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">Message sent successfully! We'll get back to you soon.</span>
                </div>
              )}

              {/* Error Message */}
              {status === 'error' && (
                <div className="bg-red-500/20 border-2 border-red-400 text-white px-6 py-4 rounded-xl flex items-center gap-3 text-lg animate-in fade-in slide-in-from-top duration-500">
                  <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">Failed to send message. Please try again or email us directly.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;