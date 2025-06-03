import React from 'react';
import { Heart, Moon, BookOpen, Smartphone, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
interface MobileLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}
const MobileLayout = ({
  children,
  activeTab,
  onTabChange
}: MobileLayoutProps) => {
  const tabs = [{
    id: 'home',
    label: 'Home',
    icon: Home
  }, {
    id: 'mood',
    label: 'Mood',
    icon: Heart
  }, {
    id: 'detox',
    label: 'Detox',
    icon: Smartphone
  }, {
    id: 'diary',
    label: 'Diary',
    icon: BookOpen
  }, {
    id: 'sleep',
    label: 'Sleep',
    icon: Moon
  }];
  return <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Header */}
      <div className="bg-white shadow-sm border-b safe-top">
        <div className="px-4 py-3">
          <h1 className="text-lg font-semibold text-gray-900 text-center">Mood Tracker</h1>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto pb-20">
        {children}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-bottom">
        <div className="flex items-center justify-around py-2">
          {tabs.map(tab => {
          const IconComponent = tab.icon;
          const isActive = activeTab === tab.id;
          return <button key={tab.id} onClick={() => onTabChange(tab.id)} className={cn("flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 touch-feedback", isActive ? "text-blue-600 bg-blue-50" : "text-gray-500 hover:text-gray-700")}>
                <IconComponent className={cn("w-5 h-5 mb-1", isActive ? "text-blue-600" : "text-gray-500")} />
                <span className={cn("text-xs font-medium", isActive ? "text-blue-600" : "text-gray-500")}>
                  {tab.label}
                </span>
              </button>;
        })}
        </div>
      </div>
    </div>;
};
export default MobileLayout;