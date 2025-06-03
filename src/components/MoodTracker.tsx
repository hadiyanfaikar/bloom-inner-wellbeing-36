
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, TrendingUp, Smile, Meh, Frown, Angry, Heart } from 'lucide-react';
import useLocalStorage from '@/hooks/useLocalStorage';

interface MoodEntry {
  date: string;
  mood: number;
  note: string;
}

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [moodHistory, setMoodHistory] = useLocalStorage<MoodEntry[]>('moodHistory', [
    { date: '2024-06-01', mood: 4, note: 'Hari yang produktif!' },
    { date: '2024-06-02', mood: 3, note: 'Biasa saja' },
    { date: '2024-05-31', mood: 5, note: 'Sangat bahagia hari ini' },
  ]);

  const moods = [
    { value: 1, icon: Angry, label: 'Sangat Buruk', color: 'text-red-500' },
    { value: 2, icon: Frown, label: 'Buruk', color: 'text-orange-500' },
    { value: 3, icon: Meh, label: 'Biasa', color: 'text-yellow-500' },
    { value: 4, icon: Smile, label: 'Baik', color: 'text-green-500' },
    { value: 5, icon: Heart, label: 'Sangat Baik', color: 'text-pink-500' },
  ];

  const handleSaveMood = () => {
    if (selectedMood) {
      const today = new Date().toISOString().split('T')[0];
      const newEntry: MoodEntry = {
        date: today,
        mood: selectedMood,
        note: note || 'Tidak ada catatan'
      };
      
      setMoodHistory([newEntry, ...moodHistory.filter(h => h.date !== today)]);
      setSelectedMood(null);
      setNote('');
      
      // Show success message
      alert('Mood berhasil disimpan!');
    }
  };

  const averageMood = moodHistory.length > 0 
    ? (moodHistory.reduce((sum, entry) => sum + entry.mood, 0) / moodHistory.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-6">
      {/* Today's Mood Selection */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Bagaimana perasaan Anda hari ini?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-5 gap-4">
            {moods.map((mood) => {
              const IconComponent = mood.icon;
              return (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`p-4 rounded-lg text-center transition-all duration-200 hover:scale-105 ${
                    selectedMood === mood.value
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <IconComponent className={`w-8 h-8 mx-auto mb-2 ${mood.color}`} />
                  <div className="text-xs font-medium text-gray-700">{mood.label}</div>
                </button>
              );
            })}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catatan (opsional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Ceritakan lebih detail tentang perasaan Anda hari ini..."
            />
          </div>
          
          <Button 
            onClick={handleSaveMood}
            disabled={!selectedMood}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            Simpan Mood Hari Ini
          </Button>
        </CardContent>
      </Card>

      {/* Mood Statistics */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Statistik Mood
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{averageMood}</div>
              <div className="text-sm text-gray-600">Rata-rata Mood</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{moodHistory.length}</div>
              <div className="text-sm text-gray-600">Hari Tercatat</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mood History */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle>Riwayat Mood</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {moodHistory.slice(0, 7).map((entry, index) => {
              const mood = moods.find(m => m.value === entry.mood);
              const IconComponent = mood?.icon || Meh;
              
              return (
                <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                  <IconComponent className={`w-6 h-6 ${mood?.color}`} />
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">
                      {new Date(entry.date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="text-sm text-gray-600">{entry.note}</div>
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    {mood?.label}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MoodTracker;
