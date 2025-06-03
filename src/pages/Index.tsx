
import React, { useState } from 'react';
import MobileLayout from '@/components/MobileLayout';
import MobileHome from '@/components/MobileHome';
import MoodTracker from '@/components/MoodTracker';
import MediaDetox from '@/components/MediaDetox';
import DiaryAI from '@/components/DiaryAI';
import SleepTracker from '@/components/SleepTracker';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <MobileHome onFeatureSelect={setActiveTab} />;
      case 'mood':
        return (
          <div className="p-4">
            <MoodTracker />
          </div>
        );
      case 'detox':
        return (
          <div className="p-4">
            <MediaDetox />
          </div>
        );
      case 'diary':
        return (
          <div className="p-4">
            <DiaryAI />
          </div>
        );
      case 'sleep':
        return (
          <div className="p-4">
            <SleepTracker />
          </div>
        );
      default:
        return <MobileHome onFeatureSelect={setActiveTab} />;
    }
  };

  return (
    <MobileLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {renderContent()}
    </MobileLayout>
  );
};

export default Index;
