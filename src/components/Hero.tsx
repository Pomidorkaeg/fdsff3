import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getAssetUrl } from '@/utils/assetUtils';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Full-screen team photo as background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${getAssetUrl('lovable-uploads/e711e51e-481c-438c-987e-2aa5f999290a.png')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      ></div>
      
      {/* Dark gradient overlay to ensure text visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-fc-darkGreen/80 to-fc-green/75 z-10"></div>
      
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="animate-slide-up max-w-5xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-fc-yellow mb-6 drop-shadow-lg tracking-tight leading-tight">
            ФК ГУДАУТА <span className="text-white text-4xl md:text-5xl lg:text-6xl">НОВОСИБИРСК</span>
          </h1>
          
          <p className="text-xl md:text-2xl lg:text-3xl text-white max-w-3xl mx-auto mb-12 drop-shadow-md font-medium tracking-wide leading-relaxed">
            Футбольный клуб с богатой историей и традициями
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
            <Button 
              asChild
              size="lg"
              variant="secondary"
              className="text-lg"
            >
              <Link to="/tournaments">
                Турнирные таблицы
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg border-fc-yellow/50 text-white hover:text-fc-yellow"
            >
              <Link to="/team">
                О команде
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-fc-darkGreen to-transparent z-10"></div>
    </div>
  );
};

export default Hero;
