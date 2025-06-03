
import React, { useState } from 'react';
import { Heart, Moon, BookOpen, Smartphone, Plus, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import MoodTracker from '@/components/MoodTracker';
import MediaDetox from '@/components/MediaDetox';
import DiaryAI from '@/components/DiaryAI';
import SleepTracker from '@/components/SleepTracker';

const Index = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const features = [
    {
      id: 'mood',
      title: 'Mood Tracker',
      description: 'Lacak suasana hati harian Anda',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      component: MoodTracker
    },
    {
      id: 'detox',
      title: 'Media Detox',
      description: 'Kurangi kecanduan media sosial',
      icon: Smartphone,
      color: 'from-emerald-500 to-teal-500',
      component: MediaDetox
    },
    {
      id: 'diary',
      title: 'Diary AI',
      description: 'Jurnal digital dengan bantuan AI',
      icon: BookOpen,
      color: 'from-violet-500 to-purple-500',
      component: DiaryAI
    },
    {
      id: 'sleep',
      title: 'Sleep Tracker',
      description: 'Pantau pola tidur Anda',
      icon: Moon,
      color: 'from-indigo-500 to-blue-500',
      component: SleepTracker
    }
  ];

  if (activeFeature) {
    const feature = features.find(f => f.id === activeFeature);
    const Component = feature?.component;
    
    return (
      <div className="min-h-screen safe-top safe-bottom">
        <div className="max-w-4xl mx-auto mobile-padding">
          <div className="flex items-center gap-4 mb-6 pt-4">
            <Button 
              variant="ghost" 
              onClick={() => setActiveFeature(null)}
              className="text-gray-600 hover:text-gray-800 mobile-button touch-feedback"
            >
              ← Kembali
            </Button>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">{feature?.title}</h1>
          </div>
          {Component && <Component />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen safe-top safe-bottom">
      {/* Header */}
      <div className="wellness-gradient text-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto mobile-padding text-center">
          <div className="float-animation">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Mental Wellness</h1>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Aplikasi komprehensif untuk mendukung kesehatan mental dan kebiasaan positif Anda
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto mobile-padding py-12 md:py-16">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Fitur Utama</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Jelajahi berbagai tools yang dirancang khusus untuk membantu Anda mencapai keseimbangan hidup yang lebih baik
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={feature.id}
                className="mood-card hover:scale-105 transition-all duration-300 cursor-pointer pulse-glow border-0 touch-feedback"
                onClick={() => setActiveFeature(feature.id)}
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg md:text-xl text-gray-800">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-sm md:text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 mobile-button touch-feedback">
                    Mulai Sekarang
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto mobile-padding">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
            <div className="p-4">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">30+</div>
              <div className="text-gray-600 text-sm md:text-base">Hari tracking mood</div>
            </div>
            <div className="p-4">
              <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">5h</div>
              <div className="text-gray-600 text-sm md:text-base">Screen time dikurangi</div>
            </div>
            <div className="p-4">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-2">85%</div>
              <div className="text-gray-600 text-sm md:text-base">Kualitas tidur membaik</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 md:py-8">
        <div className="max-w-6xl mx-auto mobile-padding text-center">
          <p className="text-gray-400 text-sm md:text-base">
            © 2024 Mental Wellness App. Dikembangkan untuk kesehatan mental yang lebih baik.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
