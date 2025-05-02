
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Contacts = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Сообщение отправлено",
        description: "Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.",
      });
      
      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16 page-transition">
        {/* Header - Changed to green background as requested */}
        <div className="relative bg-fc-green text-white py-16">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-fc-green/90 to-fc-darkGreen/80"
            style={{ 
              backgroundImage: `url('https://images.unsplash.com/photo-1509824227185-9c5a01ceba0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay'
            }}
          ></div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl font-bold mb-4">Контакты</h1>
              <p className="max-w-2xl text-white/80 text-lg">
                Свяжитесь с нами, если у вас есть вопросы или предложения
              </p>
            </div>
          </div>
        </div>
        
        {/* Contact Information */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold mb-6">Наши контакты</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-fc-green/10 p-3 rounded-full text-fc-green">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Адрес</h3>
                    <p className="text-gray-600">
                      Новосибирск, ул. Спортивная, 20
                    </p>
                    <p className="text-gray-600">
                      Стадион "Спартак"
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-fc-green/10 p-3 rounded-full text-fc-green">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Телефон</h3>
                    <p className="text-gray-600">
                      +7 (383) 123-45-67
                    </p>
                    <p className="text-gray-600">
                      +7 (383) 123-45-68
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-fc-green/10 p-3 rounded-full text-fc-green">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Email</h3>
                    <p className="text-gray-600">
                      info@fcsibirsk.ru
                    </p>
                    <p className="text-gray-600">
                      press@fcsibirsk.ru
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-fc-green/10 p-3 rounded-full text-fc-green">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Время работы</h3>
                    <p className="text-gray-600">
                      Понедельник - Пятница: 9:00 - 18:00
                    </p>
                    <p className="text-gray-600">
                      Суббота: 10:00 - 16:00
                    </p>
                    <p className="text-gray-600">
                      Воскресенье: выходной
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="font-medium text-lg mb-4">Мы в социальных сетях</h3>
                <div className="flex space-x-4">
                  <a href="#" className="bg-fc-green text-white p-3 rounded-full hover:bg-fc-darkGreen transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                  </a>
                  <a href="#" className="bg-fc-green text-white p-3 rounded-full hover:bg-fc-darkGreen transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                  <a href="#" className="bg-fc-green text-white p-3 rounded-full hover:bg-fc-darkGreen transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </a>
                  <a href="#" className="bg-fc-green text-white p-3 rounded-full hover:bg-fc-darkGreen transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-6">Напишите нам</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Имя *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fc-green/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fc-green/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Телефон
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fc-green/50"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Сообщение *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fc-green/50"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-fc-green text-white rounded-md hover:bg-fc-darkGreen transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="mr-2 animate-spin" />
                      Отправка...
                    </>
                  ) : (
                    <>
                      <Send size={20} className="mr-2" />
                      Отправить сообщение
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>
        
        {/* Map */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Как нас найти</h2>
            
            <div className="aspect-video rounded-xl overflow-hidden shadow-md">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2288.4876717214894!2d82.9183!3d54.9833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTTCsDU5JzE4LjkiTiA4MsKwNTQnNTkuNiJF!5e0!3m2!1sen!2sru!4v1620836291220!5m2!1sen!2sru" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
                title="Google Maps"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contacts;
