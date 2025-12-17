import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Все', icon: 'Grid3x3' },
    { id: 'slots', label: 'Слоты', icon: 'Cherry' },
    { id: 'fast', label: 'Быстрые Игры', icon: 'Zap' }
  ];

  const menuItems = [
    { id: 'history', label: 'История', icon: 'Clock', color: 'bg-blue-500/20' },
    { id: 'important', label: 'Важное', icon: 'Heart', color: 'bg-pink-500/20' },
    { id: 'gift', label: 'Подарочный', icon: 'Gift', color: 'bg-purple-500/20' }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                <Icon name="Gift" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Gift Lot</h1>
                <p className="text-xs text-muted-foreground">Казино премиум-класса</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-card px-4 py-2.5 rounded-2xl border border-border">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Icon name="Coins" className="text-primary" size={18} />
                </div>
                <span className="text-xl font-semibold text-white">0 ₽</span>
              </div>
              <Button className="rounded-2xl h-11 px-6 bg-primary hover:bg-primary/90 text-white font-medium">
                <Icon name="Wallet" className="mr-2" size={18} />
                Пополнить
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className="group relative overflow-hidden rounded-3xl bg-card border border-border p-6 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className={`absolute inset-0 ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="relative flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon name={item.icon} className="text-primary" size={28} />
                </div>
                <span className="text-lg font-medium text-white">{item.label}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-card rounded-3xl border border-border p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Icon name="LayoutGrid" className="text-primary" size={20} />
            </div>
            <h2 className="text-xl font-semibold text-white">Категории</h2>
          </div>

          <div className="flex gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-2xl font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                }`}
              >
                <Icon name={category.icon} size={20} />
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-3xl border border-border p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Icon name="Sparkles" className="text-primary" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-white">Игры скоро появятся</h2>
            </div>
            <Button variant="ghost" className="rounded-xl text-primary hover:bg-primary/10">
              <Icon name="Search" className="mr-2" size={18} />
              Поиск
            </Button>
          </div>

          <div className="text-center py-20">
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center mx-auto mb-6">
              <Icon name="Gamepad2" className="text-primary" size={48} />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-3">Запуск совсем скоро!</h3>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              Мы готовим для вас захватывающие игры. Скоро здесь появятся слоты, быстрые игры и многое другое.
            </p>
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border backdrop-blur-lg bg-card/95">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-4">
            <button className="flex flex-col items-center gap-1.5 group">
              <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center transition-transform group-hover:scale-110">
                <Icon name="Home" className="text-white" size={24} />
              </div>
              <span className="text-xs font-medium text-primary">Игры</span>
            </button>

            <button className="flex flex-col items-center gap-1.5 group">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-primary/20">
                <Icon name="Award" className="text-muted-foreground group-hover:text-primary" size={24} />
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-primary">Бонусы</span>
            </button>

            <button className="flex flex-col items-center gap-1.5 group">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-primary/20">
                <Icon name="Wallet" className="text-muted-foreground group-hover:text-primary" size={24} />
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-primary">Пополнить</span>
            </button>

            <button className="flex flex-col items-center gap-1.5 group">
              <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center transition-transform group-hover:scale-110 group-hover:bg-primary/20">
                <Icon name="User" className="text-muted-foreground group-hover:text-primary" size={24} />
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-primary">Профиль</span>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;
