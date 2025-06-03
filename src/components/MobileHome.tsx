
import React from 'react';
import { Heart, Moon, BookOpen, Smartphone, TrendingUp, Sun } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface MobileHomeProps {
  onFeatureSelect: (feature: string) => void;
}

const MobileHome = ({ onFeatureSelect }: MobileHomeProps) => {
  const quickStats = [
    { label: 'Mood Hari Ini', value: '😊', color: 'text-green-600' },
    { label: 'Screen Time', value: '2.5h', color: 'text-blue-600' },
    { label: 'Tidur Tadi Malam', value: '7.2h', color: 'text-purple-600' },
  ];

  const features = [
    {
      id: 'mood',
      title: 'Mood Tracker',
      description: 'Lacak suasana hati harian',
      icon: Heart,
      color: 'bg-pink-500',
      bgColor: 'bg-pink-50',
    },
    {
      id: 'detox',
      title: 'Media Detox',
      description: 'Kurangi screen time',
      icon: Smartphone,
      color: 'bg-emerald-500',
      bgColor: 'bg-emerald-50',
    },
    {
      id: 'diary',
      title: 'Diary AI',
      description: 'Jurnal digital',
      icon: BookOpen,
      color: 'bg-violet-500',
      bgColor: 'bg-violet-50',
    },
    {
      id: 'sleep',
      title: 'Sleep Tracker',
      description: 'Pantau pola tidur',
      icon: Moon,
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-50',
    },
  ];

  return (
    <div className="p-4 space-y-6">
      {/* Welcome Section */}
      <div className="text-center py-4">
        <div className="text-2xl mb-2">🌅</div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Selamat Pagi!
        </h2>
        <p className="text-gray-600 text-sm">
          Bagaimana perasaan Anda hari ini?
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        {quickStats.map((stat, index) => (
          <Card key={index} className="bg-white shadow-sm">
            <CardContent className="p-3 text-center">
              <div className={`text-lg font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-600">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Grid */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          Fitur Utama
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={feature.id}
                className="bg-white shadow-sm touch-feedback cursor-pointer hover:shadow-md transition-all"
                onClick={() => onFeatureSelect(feature.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full ${feature.bgColor} flex items-center justify-center`}>
                    <IconComponent className={`w-6 h-6 ${feature.color.replace('bg-', 'text-')}`} />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1 text-sm">
                    {feature.title}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Daily Tip */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Sun className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-gray-900 mb-1">Tips Hari Ini</h4>
              <p className="text-sm text-gray-600">
                Luangkan 5 menit untuk bernapas dalam dan refleksi
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MobileHome;
