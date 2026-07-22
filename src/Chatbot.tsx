import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Dumbbell } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const GYM_CONTEXT = `You are a friendly AI assistant for Vj's Beastline Gym, located in Mangalam, Tirupati, Andhra Pradesh. Here is the gym information:

- Name: Vj's Beastline Gym
- Address: 506, AMK Arcade, Saptagiri Colony Mangalam, 12-505, Mangalam, Andhra Pradesh 517507
- Phone: +91 93939 36781
- Hours: Mon-Sat: 5:00 AM - 10:00 AM & 5:00 PM - 10:00 PM | Sunday: 5:00 AM - 10:00 AM
- Membership Plans: Monthly ₹2000, 6-Month ₹7000, Annual ₹10000 (SAVE ₹14,000/YR)
- Facilities: Cardio Zone, Free Weights, Expert Trainers
- Features: Affordable, Clean equipment, Supportive community, Personal training available
- Motto: "Discipline is Freedom"

Answer questions about the gym, membership, facilities, hours, and location. Be helpful, motivating, and concise. If asked about pricing, mention the plans. If someone wants to join, encourage them to call or visit.`;

const INITIAL_MESSAGE: Message = {
  id: 0,
  text: "Hey! Welcome to Vj's Beastline Gym! 💪 I'm here to help you with membership info, facilities, hours, or anything else. What would you like to know?",
  sender: 'bot',
  timestamp: new Date(),
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase();

    // Simple rule-based responses for common queries
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee') || lowerMessage.includes('membership')) {
      return "Here are our membership plans:\n\n📅 Monthly: ₹2,000/mo\n📅 6-Month: ₹7,000 (Best Value!)\n📅 Annual: ₹10,000 (SAVE ₹14,000/YR!)\n\nAll plans include full access to our facilities. Want to know more about any plan?";
    }

    if (lowerMessage.includes('hour') || lowerMessage.includes('time') || lowerMessage.includes('open') || lowerMessage.includes('close')) {
      return "Our gym hours are:\n\n🕐 Mon-Sat: 5:00 AM - 10:00 AM & 5:00 PM - 10:00 PM\n🕐 Sunday: 5:00 AM - 10:00 AM\n\nEarly bird or evening workout - we've got you covered!";
    }

    if (lowerMessage.includes('address') || lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('direction')) {
      return "We're located at:\n\n📍 506, AMK Arcade, Saptagiri Colony Mangalam\n12-505, Mangalam\nAndhra Pradesh 517507\n\nCome visit us for a free tour of the facility!";
    }

    if (lowerMessage.includes('phone') || lowerMessage.includes('call') || lowerMessage.includes('contact')) {
      return "You can reach us at:\n\n📞 +91 93939 36781\n\nFeel free to call us anytime during business hours!";
    }

    if (lowerMessage.includes('facility') || lowerMessage.includes('equipment') || lowerMessage.includes('machine')) {
      return "Our facilities include:\n\n🏃 Cardio Zone - Treadmills, ellipticals & bikes\n🏋️ Free Weights - Dumbbells, barbells & racks\n👨‍🏫 Expert Trainers - Certified professionals\n\nEverything you need for a complete workout!";
    }

    if (lowerMessage.includes('trainer') || lowerMessage.includes('personal') || lowerMessage.includes('coach')) {
      return "Yes! We have certified personal trainers ready to help you:\n\n✅ Custom workout programs\n✅ Form guidance\n✅ Nutrition advice\n✅ Progress tracking\n\nBook a free consultation at the front desk!";
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hey there! Welcome to Vj's Beastline! 💪 How can I help you today? You can ask about our membership plans, facilities, hours, or location!";
    }

    if (lowerMessage.includes('thank') || lowerMessage.includes('bye')) {
      return "You're welcome! Remember, 'Discipline is Freedom'! 💪 See you at the gym!";
    }

    if (lowerMessage.includes('join') || lowerMessage.includes('sign up') || lowerMessage.includes('register')) {
      return "Awesome! To join Vj's Beastline:\n\n1️⃣ Visit us at our location\n2️⃣ Call us at +91 93939 36781\n3️⃣ Choose your plan\n\nOur staff will help you get started. We can't wait to have you in our community!";
    }

    // Default response
    return "Thanks for your message! I can help you with:\n\n💰 Membership pricing\n🕐 Gym hours\n📍 Location & directions\n🏋️ Facilities & equipment\n📞 Contact info\n\nWhat would you like to know?";
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

    const botResponse = await generateBotResponse(userMessage.text);

    const botMessage: Message = {
      id: Date.now() + 1,
      text: botResponse,
      sender: 'bot',
      timestamp: new Date(),
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-brand-red text-white w-16 h-16 rounded-full shadow-2xl shadow-brand-red/30 flex items-center justify-center hover:brightness-110 transition-all"
          >
            <MessageCircle className="w-7 h-7" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[550px] max-h-[calc(100vh-6rem)] bg-brand-charcoal border border-brand-outline/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-brand-red p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">Vj's Beastline Assistant</h3>
                  <p className="text-xs text-white/80">Always here to help 💪</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl whitespace-pre-line ${message.sender === 'user'
                        ? 'bg-brand-red text-white rounded-br-md'
                        : 'bg-brand-surface text-brand-on-surface rounded-bl-md border border-brand-outline/20'
                      }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    <p className={`text-[10px] mt-1 ${message.sender === 'user' ? 'text-white/60' : 'text-brand-on-surface-variant/60'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-brand-surface border border-brand-outline/20 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-brand-red/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-brand-red/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-brand-red/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-brand-outline/20">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about membership, hours..."
                  className="flex-1 bg-brand-surface border border-brand-outline/30 rounded-xl px-4 py-3 text-sm text-brand-on-surface placeholder:text-brand-on-surface-variant/50 focus:outline-none focus:border-brand-red/50 transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="bg-brand-red text-white p-3 rounded-xl hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
