import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Все', icon: 'Grid3x3' },
    { id: 'slots', label: 'Слоты', icon: 'Cherry' },
    { id: 'fast', label: 'Быстрые Игры', icon: 'Zap' },
    { id: 'fire', label: 'Хиты', icon: 'Flame' }
  ];

  const quickActions = [
    { id: 'history', label: 'История', icon: 'Clock' },
    { id: 'important', label: 'Важное', icon: 'Heart' },
    { id: 'gift', label: 'Подарочный', icon: 'Gift' }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <header className="sticky top-0 z-50 bg-background border-b border-border/50">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                <Icon name="Gift" className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Gift Lot</h1>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-card/50 px-3 py-1.5 rounded-full border border-border/50">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary text-sm">₽</span>
                </div>
                <span className="text-base font-semibold text-white">0</span>
                <Icon name="ChevronDown" className="text-muted-foreground" size={14} />
              </div>
              <Button size="sm" className="rounded-full h-9 px-4 bg-primary hover:bg-primary/90 text-white text-sm font-medium">
                <Icon name="Wallet" className="mr-1.5" size={16} />
                Пополнить
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-4">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {quickActions.map((item) => (
            <button
              key={item.id}
              className="flex-shrink-0 flex flex-col items-center gap-1.5 min-w-[70px]"
            >
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center hover:bg-primary/30 transition-colors">
                <Icon name={item.icon} className="text-primary" size={22} />
              </div>
              <span className="text-xs font-medium text-foreground">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-primary text-white'
                  : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
              }`}
            >
              <Icon name={category.icon} size={16} />
              {category.label}
            </button>
          ))}
        </div>

        <div className="bg-card/30 rounded-2xl p-3 border border-border/50">
          <button className="w-full flex items-center justify-between py-2 hover:bg-card/50 rounded-xl px-3 transition-colors">
            <div className="flex items-center gap-2">
              <Icon name="Grid2x2" className="text-muted-foreground" size={20} />
              <span className="text-sm font-medium text-foreground">Провайдеры</span>
            </div>
            <Icon name="ChevronDown" className="text-muted-foreground" size={18} />
          </button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon name="Cherry" className="text-primary" size={20} />
              <h2 className="text-base font-semibold text-white">Слоты</h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-xs text-muted-foreground hover:text-primary">Все</button>
              <div className="flex items-center gap-1">
                <button className="w-7 h-7 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-secondary">
                  <Icon name="ChevronLeft" className="text-muted-foreground" size={16} />
                </button>
                <button className="w-7 h-7 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-secondary">
                  <Icon name="ChevronRight" className="text-muted-foreground" size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-purple-900/50 to-blue-900/50 border border-border/30 overflow-hidden hover:scale-105 transition-transform">
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="Sparkles" className="text-primary/50" size={32} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon name="Zap" className="text-primary" size={20} />
              <h2 className="text-base font-semibold text-white">Быстрые игры</h2>
            </div>
            <div className="flex items-center gap-3">
              <button className="text-xs text-muted-foreground hover:text-primary">Все</button>
              <div className="flex items-center gap-1">
                <button className="w-7 h-7 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-secondary">
                  <Icon name="ChevronLeft" className="text-muted-foreground" size={16} />
                </button>
                <button className="w-7 h-7 rounded-lg bg-secondary/50 flex items-center justify-center hover:bg-secondary">
                  <Icon name="ChevronRight" className="text-muted-foreground" size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-orange-900/50 to-red-900/50 border border-border/30 overflow-hidden hover:scale-105 transition-transform">
                <div className="w-full h-full flex items-center justify-center">
                  <Icon name="Gamepad2" className="text-primary/50" size={32} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border/50">
        <div className="flex items-center justify-around py-2 px-2">
          <button className="flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl">
            <Icon name="Home" className="text-primary" size={24} />
            <span className="text-[10px] font-medium text-primary">Игры</span>
          </button>

          <button className="flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl hover:bg-card/50">
            <Icon name="Star" className="text-muted-foreground" size={24} />
            <span className="text-[10px] font-medium text-muted-foreground">Бонусы</span>
          </button>

          <button className="flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl hover:bg-card/50 relative">
            <div className="absolute -top-1 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">💰</span>
            </div>
            <Icon name="Wallet" className="text-muted-foreground" size={24} />
            <span className="text-[10px] font-medium text-muted-foreground">Пополнить</span>
          </button>

          <button className="flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl hover:bg-card/50">
            <Icon name="User" className="text-muted-foreground" size={24} />
            <span className="text-[10px] font-medium text-muted-foreground">Профиль</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
