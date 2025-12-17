import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [walletTab, setWalletTab] = useState<'deposit' | 'withdraw' | 'history'>('deposit');

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

  const transactionHistory = [
    { id: 1, type: 'deposit', amount: 1000, date: '15.12.2024 14:30', status: 'success' },
    { id: 2, type: 'withdraw', amount: 500, date: '14.12.2024 18:20', status: 'success' },
    { id: 3, type: 'deposit', amount: 2500, date: '13.12.2024 09:15', status: 'pending' },
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
              <Button 
                size="sm" 
                onClick={() => setIsWalletOpen(true)}
                className="rounded-full h-9 px-4 bg-primary hover:bg-primary/90 text-white text-sm font-medium"
              >
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

      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border/50 z-40">
        <div className="flex items-center justify-around py-2 px-2">
          <button className="flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl">
            <Icon name="Home" className="text-primary" size={24} />
            <span className="text-[10px] font-medium text-primary">Игры</span>
          </button>

          <button className="flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl hover:bg-card/50">
            <Icon name="Star" className="text-muted-foreground" size={24} />
            <span className="text-[10px] font-medium text-muted-foreground">Бонусы</span>
          </button>

          <button 
            onClick={() => setIsWalletOpen(true)}
            className="flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-xl hover:bg-card/50 relative"
          >
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

      <Sheet open={isWalletOpen} onOpenChange={setIsWalletOpen}>
        <SheetContent side="bottom" className="h-[85vh] bg-background border-t border-border rounded-t-3xl">
          <SheetHeader className="mb-4">
            <SheetTitle className="text-xl font-bold text-white">Кошелёк</SheetTitle>
          </SheetHeader>

          <div className="flex items-center gap-2 mb-6 bg-card/50 p-1 rounded-2xl">
            <button
              onClick={() => setWalletTab('deposit')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                walletTab === 'deposit' ? 'bg-primary text-white' : 'text-muted-foreground'
              }`}
            >
              <Icon name="ArrowDownToLine" className="inline mr-1.5" size={16} />
              Пополнить
            </button>
            <button
              onClick={() => setWalletTab('withdraw')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                walletTab === 'withdraw' ? 'bg-primary text-white' : 'text-muted-foreground'
              }`}
            >
              <Icon name="ArrowUpFromLine" className="inline mr-1.5" size={16} />
              Вывести
            </button>
            <button
              onClick={() => setWalletTab('history')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                walletTab === 'history' ? 'bg-primary text-white' : 'text-muted-foreground'
              }`}
            >
              <Icon name="Clock" className="inline mr-1.5" size={16} />
              История
            </button>
          </div>

          <div className="overflow-y-auto h-[calc(85vh-140px)] pb-6">
            {walletTab === 'deposit' && (
              <div className="space-y-4">
                <div className="bg-card rounded-2xl p-4 border border-border/50">
                  <label className="text-sm text-muted-foreground mb-2 block">Сумма пополнения</label>
                  <div className="flex items-center gap-2 bg-background rounded-xl p-3 border border-border">
                    <Icon name="Coins" className="text-primary" size={20} />
                    <input 
                      type="number" 
                      placeholder="0" 
                      className="flex-1 bg-transparent text-white text-lg font-semibold outline-none"
                    />
                    <span className="text-muted-foreground">₽</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[100, 500, 1000, 2500, 5000, 10000].map((amount) => (
                    <button key={amount} className="bg-card hover:bg-card/80 rounded-xl py-3 text-white font-medium border border-border/50">
                      {amount} ₽
                    </button>
                  ))}
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Способ оплаты</p>
                  <button className="w-full bg-card hover:bg-card/80 rounded-xl p-4 flex items-center justify-between border border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                        <Icon name="CreditCard" className="text-primary" size={20} />
                      </div>
                      <span className="text-white font-medium">Банковская карта</span>
                    </div>
                    <Icon name="ChevronRight" className="text-muted-foreground" size={18} />
                  </button>
                </div>

                <Button className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-semibold text-base">
                  Пополнить счёт
                </Button>
              </div>
            )}

            {walletTab === 'withdraw' && (
              <div className="space-y-4">
                <div className="bg-card rounded-2xl p-4 border border-border/50">
                  <label className="text-sm text-muted-foreground mb-2 block">Сумма вывода</label>
                  <div className="flex items-center gap-2 bg-background rounded-xl p-3 border border-border">
                    <Icon name="Banknote" className="text-primary" size={20} />
                    <input 
                      type="number" 
                      placeholder="0" 
                      className="flex-1 bg-transparent text-white text-lg font-semibold outline-none"
                    />
                    <span className="text-muted-foreground">₽</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Доступно: 0 ₽</p>
                </div>

                <div className="bg-card rounded-2xl p-4 border border-border/50">
                  <label className="text-sm text-muted-foreground mb-2 block">Номер карты</label>
                  <div className="flex items-center gap-2 bg-background rounded-xl p-3 border border-border">
                    <Icon name="CreditCard" className="text-primary" size={20} />
                    <input 
                      type="text" 
                      placeholder="0000 0000 0000 0000" 
                      className="flex-1 bg-transparent text-white text-base outline-none"
                    />
                  </div>
                </div>

                <Button className="w-full h-12 rounded-2xl bg-primary hover:bg-primary/90 text-white font-semibold text-base">
                  Вывести средства
                </Button>
              </div>
            )}

            {walletTab === 'history' && (
              <div className="space-y-3">
                {transactionHistory.map((transaction) => (
                  <div key={transaction.id} className="bg-card rounded-2xl p-4 border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          transaction.type === 'deposit' ? 'bg-green-500/20' : 'bg-orange-500/20'
                        }`}>
                          <Icon 
                            name={transaction.type === 'deposit' ? 'ArrowDownToLine' : 'ArrowUpFromLine'} 
                            className={transaction.type === 'deposit' ? 'text-green-500' : 'text-orange-500'} 
                            size={20} 
                          />
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            {transaction.type === 'deposit' ? 'Пополнение' : 'Вывод'}
                          </p>
                          <p className="text-xs text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-semibold ${
                          transaction.type === 'deposit' ? 'text-green-500' : 'text-orange-500'
                        }`}>
                          {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount} ₽
                        </p>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          transaction.status === 'success' 
                            ? 'bg-green-500/20 text-green-500' 
                            : 'bg-yellow-500/20 text-yellow-500'
                        }`}>
                          {transaction.status === 'success' ? 'Выполнено' : 'В обработке'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {transactionHistory.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-2xl bg-card mx-auto mb-4 flex items-center justify-center">
                      <Icon name="Clock" className="text-muted-foreground" size={32} />
                    </div>
                    <p className="text-muted-foreground">История транзакций пуста</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;
