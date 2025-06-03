
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smartphone, Clock, Target, TrendingDown, Play, Pause, RotateCcw } from 'lucide-react';

const MediaDetox = () => {
  const [isDetoxActive, setIsDetoxActive] = useState(false);
  const [detoxTimer, setDetoxTimer] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(2); // hours
  const [screenTimeToday, setScreenTimeToday] = useState(3.5);
  const [detoxStreak, setDetoxStreak] = useState(5);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isDetoxActive) {
      interval = setInterval(() => {
        setDetoxTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isDetoxActive]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const startDetox = () => {
    setIsDetoxActive(true);
  };

  const pauseDetox = () => {
    setIsDetoxActive(false);
  };

  const resetDetox = () => {
    setIsDetoxActive(false);
    setDetoxTimer(0);
  };

  const detoxSuggestions = [
    "Baca buku atau artikel",
    "Lakukan meditasi 5 menit",
    "Jalan-jalan di luar rumah",
    "Hubungi teman atau keluarga",
    "Lakukan stretching",
    "Menulis jurnal",
    "Dengarkan musik atau podcast",
    "Masak sesuatu yang sehat"
  ];

  return (
    <div className="space-y-6">
      {/* Detox Timer */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            Media Detox Timer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-6xl font-bold text-blue-600 mb-4">
              {formatTime(detoxTimer)}
            </div>
            <div className="text-gray-600 mb-6">
              {isDetoxActive ? 'Sesi detox sedang berjalan' : 'Mulai sesi media detox Anda'}
            </div>
            
            <div className="flex gap-4 justify-center">
              {!isDetoxActive ? (
                <Button 
                  onClick={startDetox}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Mulai Detox
                </Button>
              ) : (
                <Button 
                  onClick={pauseDetox}
                  variant="outline"
                  className="border-orange-500 text-orange-500 hover:bg-orange-50"
                >
                  <Pause className="w-4 h-4 mr-2" />
                  Jeda
                </Button>
              )}
              
              <Button 
                onClick={resetDetox}
                variant="outline"
                className="border-gray-500 text-gray-500 hover:bg-gray-50"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="mood-card">
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold text-blue-600">{screenTimeToday}h</div>
            <div className="text-sm text-gray-600">Screen Time Hari Ini</div>
          </CardContent>
        </Card>
        
        <Card className="mood-card">
          <CardContent className="p-6 text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold text-green-600">{dailyGoal}h</div>
            <div className="text-sm text-gray-600">Target Harian</div>
          </CardContent>
        </Card>
        
        <Card className="mood-card">
          <CardContent className="p-6 text-center">
            <TrendingDown className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold text-purple-600">{detoxStreak}</div>
            <div className="text-sm text-gray-600">Hari Berturut-turut</div>
          </CardContent>
        </Card>
      </div>

      {/* Goal Setting */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle>Atur Target Harian</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Screen Time Maksimal (jam per hari)
              </label>
              <input
                type="range"
                min="1"
                max="8"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>1 jam</span>
                <span className="font-medium text-blue-600">{dailyGoal} jam</span>
                <span>8 jam</span>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-4 h-4 rounded-full ${screenTimeToday <= dailyGoal ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="font-medium">
                  {screenTimeToday <= dailyGoal ? 'Target tercapai!' : 'Melebihi target'}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                {screenTimeToday <= dailyGoal 
                  ? `Anda telah berhasil membatasi screen time dalam ${dailyGoal} jam`
                  : `Anda telah melebihi target sebanyak ${(screenTimeToday - dailyGoal).toFixed(1)} jam`
                }
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suggestions */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle>Aktivitas Alternatif</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {detoxSuggestions.map((suggestion, index) => (
              <div 
                key={index}
                className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100 hover:border-blue-300 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">{suggestion}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaDetox;
