
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Clock, TrendingUp, Bed, Coffee, Activity } from 'lucide-react';

const SleepTracker = () => {
  const [bedtime, setBedtime] = useState('22:00');
  const [wakeTime, setWakeTime] = useState('06:30');
  const [sleepQuality, setSleepQuality] = useState(4);
  const [sleepNotes, setSleepNotes] = useState('');
  
  const [sleepData, setSleepData] = useState([
    { date: '2024-06-02', bedtime: '22:30', wakeTime: '06:30', quality: 4, hours: 8, notes: 'Tidur nyenyak' },
    { date: '2024-06-01', bedtime: '23:15', wakeTime: '07:00', quality: 3, hours: 7.75, notes: 'Agak sulit tidur' },
    { date: '2024-05-31', bedtime: '22:00', wakeTime: '06:00', quality: 5, hours: 8, notes: 'Sangat segar' },
    { date: '2024-05-30', bedtime: '23:45', wakeTime: '07:30', quality: 2, hours: 7.75, notes: 'Sering terbangun' },
  ]);

  const calculateSleepHours = (bedtime: string, wakeTime: string) => {
    const bedDate = new Date(`2024-01-01 ${bedtime}`);
    let wakeDate = new Date(`2024-01-01 ${wakeTime}`);
    
    // If wake time is earlier than bedtime, assume next day
    if (wakeDate < bedDate) {
      wakeDate = new Date(`2024-01-02 ${wakeTime}`);
    }
    
    const diffMs = wakeDate.getTime() - bedDate.getTime();
    return Number((diffMs / (1000 * 60 * 60)).toFixed(1));
  };

  const saveSleepData = () => {
    const hours = calculateSleepHours(bedtime, wakeTime);
    const today = new Date().toISOString().split('T')[0];
    
    const newEntry = {
      date: today,
      bedtime,
      wakeTime,
      quality: sleepQuality,
      hours,
      notes: sleepNotes || 'Tidak ada catatan'
    };
    
    setSleepData([newEntry, ...sleepData.filter(d => d.date !== today)]);
    setSleepNotes('');
    alert('Data tidur berhasil disimpan!');
  };

  const averageHours = sleepData.length > 0 
    ? (sleepData.reduce((sum, entry) => sum + entry.hours, 0) / sleepData.length).toFixed(1)
    : 0;

  const averageQuality = sleepData.length > 0 
    ? (sleepData.reduce((sum, entry) => sum + entry.quality, 0) / sleepData.length).toFixed(1)
    : 0;

  const sleepGoal = 8; // hours
  const currentHours = calculateSleepHours(bedtime, wakeTime);

  const qualityLabels = ['Sangat Buruk', 'Buruk', 'Biasa', 'Baik', 'Sangat Baik'];

  return (
    <div className="space-y-6">
      {/* Sleep Input */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="w-5 h-5" />
            Catat Pola Tidur
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Bed className="w-4 h-4 inline mr-1" />
                Jam Tidur
              </label>
              <input
                type="time"
                value={bedtime}
                onChange={(e) => setBedtime(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Sun className="w-4 h-4 inline mr-1" />
                Jam Bangun
              </label>
              <input
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-800">
                Durasi Tidur: {currentHours} jam
              </span>
            </div>
            <div className="text-sm text-blue-600">
              {currentHours >= sleepGoal 
                ? '✅ Mencapai target tidur yang disarankan!' 
                : `⚠️ Kurang ${(sleepGoal - currentHours).toFixed(1)} jam dari target`
              }
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kualitas Tidur (1-5)
            </label>
            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setSleepQuality(rating)}
                  className={`p-3 rounded-lg text-center transition-all duration-200 ${
                    sleepQuality === rating
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <div className="text-lg font-bold">{rating}</div>
                  <div className="text-xs">{qualityLabels[rating - 1]}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Catatan Tidur (opsional)
            </label>
            <textarea
              value={sleepNotes}
              onChange={(e) => setSleepNotes(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Apakah ada yang mempengaruhi tidur Anda? (mimpi, gangguan, dll.)"
            />
          </div>

          <Button 
            onClick={saveSleepData}
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600"
          >
            Simpan Data Tidur
          </Button>
        </CardContent>
      </Card>

      {/* Sleep Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="mood-card">
          <CardContent className="p-6 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <div className="text-2xl font-bold text-blue-600">{averageHours}h</div>
            <div className="text-sm text-gray-600">Rata-rata Tidur</div>
          </CardContent>
        </Card>
        
        <Card className="mood-card">
          <CardContent className="p-6 text-center">
            <Activity className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <div className="text-2xl font-bold text-green-600">{averageQuality}/5</div>
            <div className="text-sm text-gray-600">Kualitas Rata-rata</div>
          </CardContent>
        </Card>
        
        <Card className="mood-card">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <div className="text-2xl font-bold text-purple-600">{sleepData.length}</div>
            <div className="text-sm text-gray-600">Hari Tercatat</div>
          </CardContent>
        </Card>
      </div>

      {/* Sleep Tips */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coffee className="w-5 h-5" />
            Tips Tidur Berkualitas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Hindari kafein 6 jam sebelum tidur",
              "Matikan layar 1 jam sebelum tidur",
              "Jaga suhu ruangan tetap sejuk",
              "Gunakan kasur dan bantal yang nyaman",
              "Lakukan rutinitas relaksasi",
              "Hindari makan berat sebelum tidur",
              "Olahraga rutin di pagi/sore hari",
              "Konsisten dengan jadwal tidur"
            ].map((tip, index) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-indigo-50 rounded-lg">
                <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-gray-700 text-sm">{tip}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sleep History */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle>Riwayat Tidur</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sleepData.slice(0, 7).map((entry, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="text-sm font-medium text-gray-800">
                    {new Date(entry.date).toLocaleDateString('id-ID', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
                
                <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Tidur:</span> {entry.bedtime}
                  </div>
                  <div>
                    <span className="text-gray-500">Bangun:</span> {entry.wakeTime}
                  </div>
                  <div>
                    <span className="text-gray-500">Durasi:</span> {entry.hours}h
                  </div>
                  <div>
                    <span className="text-gray-500">Kualitas:</span> {entry.quality}/5
                  </div>
                </div>
                
                <div className={`w-3 h-3 rounded-full ${
                  entry.quality >= 4 ? 'bg-green-500' : 
                  entry.quality >= 3 ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SleepTracker;
