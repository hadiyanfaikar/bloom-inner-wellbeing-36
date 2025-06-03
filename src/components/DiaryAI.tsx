
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Send, Sparkles, Calendar, Heart, MessageCircle } from 'lucide-react';
import useLocalStorage from '@/hooks/useLocalStorage';

interface DiaryEntry {
  id: number;
  date: string;
  content: string;
  aiInsight: string;
  mood: 'positive' | 'negative' | 'neutral';
}

const DiaryAI = () => {
  const [currentEntry, setCurrentEntry] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [entries, setEntries] = useLocalStorage<DiaryEntry[]>('diaryEntries', [
    {
      id: 1,
      date: '2024-06-02',
      content: 'Hari ini saya merasa sangat bersemangat karena berhasil menyelesaikan proyek yang sudah lama ditunda...',
      aiInsight: 'Saya melihat bahwa Anda merasakan kepuasan yang mendalam dari pencapaian ini. Perasaan bangga dan lega yang Anda rasakan menunjukkan betapa pentingnya penyelesaian tugas bagi kesejahteraan mental Anda.',
      mood: 'positive'
    },
    {
      id: 2,
      date: '2024-06-01',
      content: 'Minggu ini cukup menantang dengan banyak deadline yang harus dipenuhi...',
      aiInsight: 'Stres dari deadline memang bisa overwhelming. Cobalah untuk break down tugas menjadi bagian-bagian kecil dan celebrasi setiap small win. Jangan lupa untuk take breaks di antara pekerjaan.',
      mood: 'neutral'
    }
  ]);

  const analyzeEntry = async () => {
    if (!currentEntry.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const insights = [
        "Saya merasakan emosi yang kompleks dalam tulisan Anda. Sepertinya ada campuran antara kekhawatiran dan harapan. Ini normal dan menunjukkan bahwa Anda sedang dalam proses pertumbuhan.",
        "Dari yang Anda tulis, terlihat bahwa Anda memiliki kesadaran diri yang tinggi. Kemampuan untuk merefleksikan perasaan adalah kekuatan yang luar biasa.",
        "Saya melihat pola pikir yang positif dalam cara Anda mengekspresikan diri. Terus pertahankan perspektif ini, itu akan membantu Anda menghadapi tantangan.",
        "Sepertinya Anda sedang mencari keseimbangan dalam hidup. Ingatlah bahwa perjalanan menuju keseimbangan adalah proses, bukan destinasi.",
        "Tulisan Anda menunjukkan kematangan emosional. Anda mampu mengidentifikasi dan mengekspresikan perasaan dengan baik."
      ];
      
      const randomInsight = insights[Math.floor(Math.random() * insights.length)];
      setAiResponse(randomInsight);
      setIsAnalyzing(false);
    }, 2000);
  };

  const saveEntry = () => {
    if (!currentEntry.trim()) return;
    
    const newEntry: DiaryEntry = {
      id: entries.length + 1,
      date: new Date().toISOString().split('T')[0],
      content: currentEntry,
      aiInsight: aiResponse,
      mood: 'positive' // Could be determined by AI analysis
    };
    
    setEntries([newEntry, ...entries]);
    setCurrentEntry('');
    setAiResponse('');
  };

  const prompts = [
    "Ceritakan tentang momen terbaik hari ini",
    "Apa yang membuat Anda bersyukur hari ini?",
    "Bagaimana perasaan Anda tentang pencapaian minggu ini?",
    "Tuliskan tentang seseorang yang menginspirasi Anda",
    "Apa goals yang ingin Anda capai bulan depan?"
  ];

  return (
    <div className="space-y-6">
      {/* Writing Area */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Tulis Jurnal Hari Ini
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bagaimana perasaan Anda hari ini?
            </label>
            <textarea
              value={currentEntry}
              onChange={(e) => setCurrentEntry(e.target.value)}
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[200px]"
              placeholder="Tulis tentang hari Anda, perasaan, pikiran, atau apa pun yang ingin Anda ekspresikan..."
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              onClick={analyzeEntry}
              disabled={!currentEntry.trim() || isAnalyzing}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              {isAnalyzing ? 'Menganalisis...' : 'Analisis AI'}
            </Button>
            
            {aiResponse && (
              <Button 
                onClick={saveEntry}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              >
                <Send className="w-4 h-4 mr-2" />
                Simpan Jurnal
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* AI Response */}
      {(aiResponse || isAnalyzing) && (
        <Card className="mood-card border-purple-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <MessageCircle className="w-5 h-5" />
              Insight AI
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isAnalyzing ? (
              <div className="flex items-center gap-2 text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-500"></div>
                Sedang menganalisis tulisan Anda...
              </div>
            ) : (
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border-l-4 border-purple-500">
                <p className="text-gray-700 leading-relaxed">{aiResponse}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Writing Prompts */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle>Inspirasi Menulis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {prompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => setCurrentEntry(prompt + '\n\n')}
                className="p-3 text-left bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start gap-2">
                  <Heart className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{prompt}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Entries */}
      <Card className="mood-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Jurnal Sebelumnya
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {entries.slice(0, 3).map((entry) => (
              <div key={entry.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    {new Date(entry.date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  <div className={`w-3 h-3 rounded-full ${
                    entry.mood === 'positive' ? 'bg-green-500' : 
                    entry.mood === 'negative' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></div>
                </div>
                
                <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                  {entry.content.substring(0, 150)}...
                </p>
                
                {entry.aiInsight && (
                  <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-300">
                    <p className="text-sm text-purple-700">
                      💭 {entry.aiInsight}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiaryAI;
