import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [walletTab, setWalletTab] = useState<'deposit' | 'withdraw' | 'history'>('deposit');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState('');

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

  const paymentMethods = [
    { id: 'cryptobot', name: '@CryptoBot', icon: '💎', limits: 'От 10USDT до 5 000USDT', badge: '⚡' },
    { id: 'usdt-bsc', name: 'USDT (BSC/BNB)', icon: '₮', limits: 'От 10USDT до 5 000USDT', badge: '🔶' },
    { id: 'usdt-ton', name: 'USDT (TON)', icon: '₮', limits: 'От 10USDT до 5 000USDT', badge: '💠' },
    { id: 'usdt-trc20', name: 'USDT (TRC20/Tron)', icon: '₮', limits: 'От 10USDT до 5 000USDT', badge: '🔺' },
    { id: 'tonwallet', name: 'TonWallet', icon: '💼', limits: 'От 10USDT до 5 000USDT', badge: '💎' },
  ];

  const transactionHistory: any[] = [];

  const quickAmounts = [
    { amount: '10USDT', bonus: '+12USDT' },
    { amount: '50USDT', bonus: '+150USDT' },
    { amount: '100USDT', bonus: '+300USDT' },
    { amount: '500USDT', bonus: '+1 800USDT' },
    { amount: '1 000USDT', bonus: '+3 600USDT' },
    { amount: '5 000USDT', bonus: '+18 000USDT' },
  ];

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
  };

  const handleBackToMethods = () => {
    setSelectedPaymentMethod(null);
    setDepositAmount('');
  };

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
        <SheetContent side="bottom" className="h-[90vh] bg-background border-t border-border rounded-t-3xl p-0">
          {selectedPaymentMethod ? (
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-3 px-4 py-4 border-b border-border/50">
                <button onClick={handleBackToMethods} className="w-10 h-10 rounded-xl bg-card flex items-center justify-center">
                  <Icon name="ChevronLeft" className="text-white" size={20} />
                </button>
                <h2 className="text-lg font-semibold text-white">
                  Пополнение через {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                <div className="bg-card rounded-2xl p-4 border border-border/50 flex items-center gap-3">
                  <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center text-3xl">
                    {paymentMethods.find(m => m.id === selectedPaymentMethod)?.icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}</p>
                    <p className="text-xs text-muted-foreground">{paymentMethods.find(m => m.id === selectedPaymentMethod)?.limits}</p>
                  </div>
                </div>

                <div className="bg-card rounded-2xl p-4 border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm text-muted-foreground">Лидер среди криптокошельков в русскоязычном пространстве</span>
                    <button className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Icon name="HelpCircle" className="text-primary" size={16} />
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-white">Заплатите</p>
                    <p className="text-xs text-muted-foreground">Мин. сумма: 10USDT</p>
                  </div>
                  
                  <div className="bg-card rounded-2xl p-4 border-2 border-red-500/50 mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">₮</span>
                      <input 
                        type="text" 
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="0.00" 
                        className="flex-1 bg-transparent text-white text-xl font-semibold outline-none"
                      />
                      <span className="text-muted-foreground">USDT</span>
                    </div>
                  </div>
                  {!depositAmount && <p className="text-xs text-red-500 mb-4">Введите ₽</p>}

                  <div className="grid grid-cols-3 gap-2">
                    {quickAmounts.map((item, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setDepositAmount(item.amount.replace('USDT', ''))}
                        className="bg-card hover:bg-card/80 rounded-xl py-3 border border-border/50 transition-colors"
                      >
                        <p className="text-white font-semibold text-sm">{item.amount}</p>
                        <p className="text-green-500 text-xs">{item.bonus}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-4 py-4 border-t border-border/50">
                <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-semibold text-base">
                  Пополнить баланс<br/>
                  <span className="text-sm opacity-80">Баланс пополнен на 0₽</span>
                </Button>
              </div>
            </div>
          ) : (
            <>
              <SheetHeader className="px-4 py-4 border-b border-border/50">
                <SheetTitle className="text-xl font-bold text-white">Кошелёк</SheetTitle>
              </SheetHeader>

              <div className="flex items-center gap-2 mb-4 bg-card/50 p-1 rounded-2xl mx-4 mt-4">
                <button
                  onClick={() => setWalletTab('deposit')}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    walletTab === 'deposit' ? 'bg-primary text-white' : 'text-muted-foreground'
                  }`}
                >
                  Пополнить
                </button>
                <button
                  onClick={() => setWalletTab('withdraw')}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    walletTab === 'withdraw' ? 'bg-primary text-white' : 'text-muted-foreground'
                  }`}
                >
                  Вывести
                </button>
                <button
                  onClick={() => setWalletTab('history')}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    walletTab === 'history' ? 'bg-primary text-white' : 'text-muted-foreground'
                  }`}
                >
                  История
                </button>
              </div>

              <div className="overflow-y-auto h-[calc(90vh-160px)] px-4 pb-6">
                {walletTab === 'deposit' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
                        <span className="text-primary text-xs">ℹ️</span>
                      </div>
                      <p className="text-sm font-semibold text-white">Криптовалютный платеж</p>
                    </div>

                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => handlePaymentMethodSelect(method.id)}
                        className="w-full bg-card hover:bg-card/80 rounded-2xl p-4 border border-border/50 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center text-3xl relative">
                            {method.icon}
                            <span className="absolute -top-1 -right-1 text-sm">{method.badge}</span>
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-white font-semibold">{method.name}</p>
                            <p className="text-xs text-muted-foreground">{method.limits}</p>
                          </div>
                          <Icon name="ChevronRight" className="text-muted-foreground" size={20} />
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {walletTab === 'withdraw' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
                        <span className="text-primary text-xs">ℹ️</span>
                      </div>
                      <p className="text-sm font-semibold text-white">Вывод средств</p>
                    </div>

                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        className="w-full bg-card hover:bg-card/80 rounded-2xl p-4 border border-border/50 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center text-3xl relative">
                            {method.icon}
                            <span className="absolute -top-1 -right-1 text-sm">{method.badge}</span>
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-white font-semibold">{method.name}</p>
                            <p className="text-xs text-muted-foreground">{method.limits}</p>
                          </div>
                          <Icon name="ChevronRight" className="text-muted-foreground" size={20} />
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {walletTab === 'history' && (
                  <div>
                    {transactionHistory.length === 0 ? (
                      <div className="text-center py-20">
                        <div className="w-20 h-20 rounded-3xl bg-card mx-auto mb-4 flex items-center justify-center">
                          <Icon name="Clock" className="text-muted-foreground" size={40} />
                        </div>
                        <p className="text-muted-foreground text-lg">История транзакций пуста</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {transactionHistory.map((transaction) => (
                          <div key={transaction.id} className="bg-card rounded-2xl p-4 border border-border/50">
                            <div className="flex items-center justify-between">
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
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;
