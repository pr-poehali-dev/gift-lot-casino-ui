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
  const [balance, setBalance] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isBonusOpen, setIsBonusOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedPrize, setSelectedPrize] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'Все', icon: 'Grid3x3' },
    { id: 'fast', label: 'Быстрые Игры', icon: 'Zap' }
  ];

  const quickActions: any[] = [];

  const prizes = [
    { value: 5, probability: 4, color: '#ef4444', label: '5₮' },
    { value: 0, probability: 80, color: '#64748b', label: '0₮' },
    { value: 10, probability: 3, color: '#f59e0b', label: '10₮' },
    { value: 0, probability: 0, color: '#64748b', label: '0₮' },
    { value: 25, probability: 2.6, color: '#8b5cf6', label: '25₮' },
    { value: 0, probability: 0, color: '#64748b', label: '0₮' },
    { value: 50, probability: 1.4, color: '#06b6d4', label: '50₮' },
    { value: 100, probability: 1, color: '#10b981', label: '100₮' },
  ];

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setSelectedPrize(null);

    const rand = Math.random() * 100;
    let winningIndex = 0;

    if (rand <= 80) {
      winningIndex = 1;
    } else {
      const remaining = rand - 80;
      if (remaining <= 4) winningIndex = 0;
      else if (remaining <= 7) winningIndex = 2;
      else if (remaining <= 9.6) winningIndex = 4;
      else if (remaining <= 11) winningIndex = 6;
      else winningIndex = 7;
    }

    const segmentAngle = 360 / prizes.length;
    const baseRotation = Math.floor(rotation / 360) * 360;
    const targetRotation = baseRotation + 360 * 5 + (360 - winningIndex * segmentAngle) + (segmentAngle / 2);
    
    setRotation(targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedPrize(prizes[winningIndex].value);
      if (prizes[winningIndex].value > 0) {
        setBalance(prev => prev + prizes[winningIndex].value);
      }
    }, 4000);
  };

  const paymentMethods = [
    { id: 'cryptobot', name: '@CryptoBot', icon: '💎', limits: 'От 10USDT до 5 000USDT', badge: '⚡' },
    { id: 'usdt-bsc', name: 'USDT (BSC/BNB)', icon: '₮', limits: 'От 10USDT до 5 000USDT', badge: '🔶' },
    { id: 'usdt-ton', name: 'USDT (TON)', icon: '₮', limits: 'От 10USDT до 5 000USDT', badge: '💠' },
    { id: 'usdt-trc20', name: 'USDT (TRC20/Tron)', icon: '₮', limits: 'От 10USDT до 5 000USDT', badge: '🔺' },
    { id: 'tonwallet', name: 'TonWallet', icon: '💼', limits: 'От 10USDT до 5 000USDT', badge: '💎' },
  ];

  const withdrawMethods = [
    { id: 'cryptobot', name: '@CryptoBot', icon: '💎', limits: 'От 10USDT до 5 000USDT', badge: '⚡' },
    { id: 'usdt-bsc', name: 'USDT (BSC/BNB)', icon: '₮', limits: 'От 10USDT до 5 000USDT', badge: '🔶' },
    { id: 'usdt-ton', name: 'USDT (TON)', icon: '₮', limits: 'От 10USDT до 5 000USDT', badge: '💠' },
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
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/30">
        <div className="px-3 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg shadow-primary/20">
                <Icon name="Gift" className="text-white" size={16} />
              </div>
              <h1 className="text-base font-bold text-white">Gift Lot</h1>
            </div>

            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 bg-card/60 px-2.5 py-1.5 rounded-lg border border-border/30 hover:bg-card/80 transition-all">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-bold">₮</span>
                </div>
                <span className="text-white font-bold text-sm">{balance}</span>
                <Icon name="ChevronDown" className="text-gray-500" size={14} />
              </button>
              <Button 
                size="sm" 
                onClick={() => {
                  setIsWalletOpen(true);
                  setWalletTab('deposit');
                  setSelectedPaymentMethod(null);
                }}
                className="rounded-lg h-8 px-3 bg-[#0ea5e9] hover:bg-[#0284c7] text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg shadow-primary/25"
              >
                <Icon name="Wallet" size={14} />
                Пополнить
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="px-3 py-3 space-y-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-primary to-primary/90 text-white shadow-primary/25'
                  : 'bg-card/60 text-muted-foreground hover:bg-card border border-border/30'
              }`}
            >
              <Icon name={category.icon} size={14} />
              {category.label}
            </button>
          ))}
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-background/98 backdrop-blur-xl border-t border-border/30 z-40 shadow-2xl">
        <div className="flex items-center justify-around py-1.5 px-2">
          <button className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg">
            <Icon name="Home" className="text-primary" size={20} />
            <span className="text-[9px] font-medium text-primary">Игры</span>
          </button>

          <button 
            onClick={() => setIsBonusOpen(true)}
            className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg hover:bg-card/30 transition-colors"
          >
            <Icon name="Star" className="text-muted-foreground" size={20} />
            <span className="text-[9px] font-medium text-muted-foreground">Бонусы</span>
          </button>

          <button 
            onClick={() => setIsWalletOpen(true)}
            className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg hover:bg-card/30 transition-colors relative"
          >
            <div className="absolute -top-0.5 right-1 w-4 h-4 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
              <span className="text-[8px] font-bold text-white">💰</span>
            </div>
            <Icon name="Wallet" className="text-muted-foreground" size={20} />
            <span className="text-[9px] font-medium text-muted-foreground">Кошелёк</span>
          </button>

          <button 
            onClick={() => setIsProfileOpen(true)}
            className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg hover:bg-card/30 transition-colors"
          >
            <Icon name="User" className="text-muted-foreground" size={20} />
            <span className="text-[9px] font-medium text-muted-foreground">Профиль</span>
          </button>
        </div>
      </nav>

      <Sheet open={isWalletOpen} onOpenChange={setIsWalletOpen}>
        <SheetContent side="bottom" className="h-[85vh] bg-background border-t border-border rounded-t-2xl p-0">
          {selectedPaymentMethod ? (
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-2 px-3 py-3 border-b border-border/30">
                <button onClick={handleBackToMethods} className="w-8 h-8 rounded-lg bg-card/60 flex items-center justify-center hover:bg-card transition-colors">
                  <Icon name="ChevronLeft" className="text-white" size={18} />
                </button>
                <h2 className="text-sm font-semibold text-white truncate">
                  {paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
                <div className="bg-card/60 rounded-xl p-3 border border-border/30 flex items-center gap-2 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-2xl flex-shrink-0">
                    {paymentMethods.find(m => m.id === selectedPaymentMethod)?.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{paymentMethods.find(m => m.id === selectedPaymentMethod)?.name}</p>
                    <p className="text-[10px] text-muted-foreground truncate">{paymentMethods.find(m => m.id === selectedPaymentMethod)?.limits}</p>
                  </div>
                </div>

                <div className="bg-card/40 rounded-xl p-2.5 border border-border/30">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-muted-foreground leading-tight flex-1">Быстрый и надёжный способ оплаты</span>
                    <button className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="HelpCircle" className="text-primary" size={14} />
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium text-white">Сумма</p>
                    <p className="text-[10px] text-muted-foreground">Мин: 10USDT</p>
                  </div>
                  
                  <div className="bg-card/60 rounded-xl p-3 border-2 border-red-500/50 mb-1.5 shadow-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-xl flex-shrink-0">₮</span>
                      <input 
                        type="number" 
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="0.00" 
                        className="flex-1 bg-transparent text-white text-lg font-semibold outline-none min-w-0"
                      />
                      <span className="text-muted-foreground text-xs flex-shrink-0">USDT</span>
                    </div>
                  </div>
                  {!depositAmount && <p className="text-[10px] text-red-500 mb-3">Введите сумму</p>}

                  <div className="grid grid-cols-3 gap-1.5">
                    {quickAmounts.map((item, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setDepositAmount(item.amount.replace('USDT', ''))}
                        className="bg-card/60 hover:bg-card rounded-lg py-2 border border-border/30 transition-all shadow-sm"
                      >
                        <p className="text-white font-semibold text-[11px] truncate px-1">{item.amount}</p>
                        <p className="text-green-500 text-[9px] truncate px-1">{item.bonus}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-3 py-3 border-t border-border/30">
                <Button 
                  onClick={() => {
                    const amount = parseFloat(depositAmount) || 0;
                    if (amount >= 10) {
                      setBalance(prev => prev + amount);
                      setIsWalletOpen(false);
                      setSelectedPaymentMethod(null);
                      setDepositAmount('');
                      setWalletTab('deposit');
                    }
                  }}
                  disabled={!depositAmount || parseFloat(depositAmount) < 10}
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  Пополнить на {depositAmount || 0}₮
                </Button>
              </div>
            </div>
          ) : (
            <>
              <SheetHeader className="px-3 py-3 border-b border-border/30">
                <SheetTitle className="text-base font-bold text-white">Кошелёк</SheetTitle>
              </SheetHeader>

              <div className="flex items-center gap-1.5 mb-3 bg-card/50 p-1 rounded-xl mx-3 mt-3">
                <button
                  onClick={() => setWalletTab('deposit')}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                    walletTab === 'deposit' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground'
                  }`}
                >
                  Пополнить
                </button>
                <button
                  onClick={() => setWalletTab('withdraw')}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                    walletTab === 'withdraw' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground'
                  }`}
                >
                  Вывести
                </button>
                <button
                  onClick={() => setWalletTab('history')}
                  className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                    walletTab === 'history' ? 'bg-primary text-white shadow-md' : 'text-muted-foreground'
                  }`}
                >
                  История
                </button>
              </div>

              <div className="overflow-y-auto h-[calc(85vh-130px)] px-3 pb-4">
                {walletTab === 'deposit' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px]">ℹ️</span>
                      </div>
                      <p className="text-xs font-semibold text-white">Криптовалютный платеж</p>
                    </div>

                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => handlePaymentMethodSelect(method.id)}
                        className="w-full bg-card/60 hover:bg-card rounded-xl p-3 border border-border/30 transition-all shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center text-2xl relative flex-shrink-0">
                            {method.icon}
                            <span className="absolute -top-1 -right-1 text-xs">{method.badge}</span>
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <p className="text-white font-semibold text-sm truncate">{method.name}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{method.limits}</p>
                          </div>
                          <Icon name="ChevronRight" className="text-muted-foreground flex-shrink-0" size={18} />
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {walletTab === 'withdraw' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-5 h-5 rounded bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[10px]">ℹ️</span>
                      </div>
                      <p className="text-xs font-semibold text-white">Вывод средств</p>
                    </div>

                    {withdrawMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => handlePaymentMethodSelect(method.id)}
                        className="w-full bg-card/60 hover:bg-card rounded-xl p-3 border border-border/30 transition-all shadow-sm"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-12 h-12 rounded-xl bg-secondary/50 flex items-center justify-center text-2xl relative flex-shrink-0">
                            {method.icon}
                            <span className="absolute -top-1 -right-1 text-xs">{method.badge}</span>
                          </div>
                          <div className="flex-1 text-left min-w-0">
                            <p className="text-white font-semibold text-sm truncate">{method.name}</p>
                            <p className="text-[10px] text-muted-foreground truncate">{method.limits}</p>
                          </div>
                          <Icon name="ChevronRight" className="text-muted-foreground flex-shrink-0" size={18} />
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {walletTab === 'history' && (
                  <div>
                    {transactionHistory.length === 0 ? (
                      <div className="text-center py-16">
                        <div className="w-16 h-16 rounded-2xl bg-card/60 mx-auto mb-3 flex items-center justify-center">
                          <Icon name="Clock" className="text-muted-foreground" size={32} />
                        </div>
                        <p className="text-muted-foreground text-sm">История транзакций пуста</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {transactionHistory.map((transaction) => (
                          <div key={transaction.id} className="bg-card/60 rounded-xl p-3 border border-border/30 shadow-sm">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                  transaction.type === 'deposit' ? 'bg-green-500/20' : 'bg-orange-500/20'
                                }`}>
                                  <Icon 
                                    name={transaction.type === 'deposit' ? 'ArrowDownToLine' : 'ArrowUpFromLine'} 
                                    className={transaction.type === 'deposit' ? 'text-green-500' : 'text-orange-500'} 
                                    size={16} 
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-white font-medium text-sm truncate">
                                    {transaction.type === 'deposit' ? 'Пополнение' : 'Вывод'}
                                  </p>
                                  <p className="text-[10px] text-muted-foreground truncate">{transaction.date}</p>
                                </div>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <p className={`text-sm font-semibold ${
                                  transaction.type === 'deposit' ? 'text-green-500' : 'text-orange-500'
                                }`}>
                                  {transaction.type === 'deposit' ? '+' : '-'}{transaction.amount}₮
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

      <Sheet open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <SheetContent side="bottom" className="h-[90vh] bg-background border-t border-border rounded-t-2xl p-0">
          <div className="h-full flex flex-col">
            <div className="px-3 py-3 border-b border-border/30">
              <h2 className="text-base font-bold text-white">Профиль</h2>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
              <div className="bg-card/40 rounded-xl p-3 border border-border/30 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg flex-shrink-0">
                      <Icon name="User" className="text-white" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-sm truncate">Серия-dy</h3>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] text-muted-foreground">UID: 1704028377</span>
                        <button className="w-4 h-4 rounded bg-card/60 flex items-center justify-center flex-shrink-0">
                          <Icon name="Copy" className="text-muted-foreground" size={10} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center py-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 flex items-center justify-center shadow-xl">
                        <div className="w-16 h-16 rounded-full bg-background/90 flex items-center justify-center">
                          <Icon name="Star" className="text-cyan-400" size={28} />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full blur-lg"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card/40 rounded-xl p-3 border border-border/30">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">₮</span>
                    </div>
                    <span className="text-white font-bold text-xl">{balance}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-background/50 rounded-lg p-2 border border-border/30">
                    <div className="flex items-center gap-0.5 mb-0.5">
                      <p className="text-[10px] text-green-500 font-medium leading-tight">Доступно для вывода</p>
                      <Icon name="HelpCircle" className="text-muted-foreground flex-shrink-0" size={10} />
                    </div>
                    <p className="text-white font-bold text-sm">0₮ &gt;</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-2 border border-border/30">
                    <div className="flex items-center gap-0.5 mb-0.5">
                      <p className="text-[10px] text-blue-500 font-medium leading-tight">Сумма к разблокировке</p>
                      <Icon name="HelpCircle" className="text-muted-foreground flex-shrink-0" size={10} />
                    </div>
                    <p className="text-white font-bold text-sm">0₮ &gt;</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={() => {
                    setIsProfileOpen(false);
                    setIsWalletOpen(true);
                    setWalletTab('deposit');
                    setSelectedPaymentMethod(null);
                  }}
                  className="h-12 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold text-sm flex items-center justify-center gap-1.5 shadow-lg"
                >
                  <Icon name="ArrowDownToLine" size={16} />
                  Пополнить
                </Button>
                <Button 
                  onClick={() => {
                    setIsProfileOpen(false);
                    setIsWalletOpen(true);
                    setWalletTab('withdraw');
                    setSelectedPaymentMethod(null);
                  }}
                  className="h-12 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold text-sm flex items-center justify-center gap-1.5 shadow-lg"
                >
                  <Icon name="ArrowUpFromLine" size={16} />
                  Вывести
                </Button>
              </div>

              <div className="space-y-2">
                <button 
                  onClick={() => {
                    setIsProfileOpen(false);
                    setIsNotificationsOpen(true);
                  }}
                  className="w-full bg-card/40 hover:bg-card/60 rounded-lg p-3 border border-border/30 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="Bell" className="text-blue-500" size={16} />
                    </div>
                    <span className="text-white font-medium text-xs">Уведомления</span>
                  </div>
                  <Icon name="ChevronRight" className="text-muted-foreground" size={16} />
                </button>

                <button className="w-full bg-card/40 hover:bg-card/60 rounded-lg p-3 border border-border/30 transition-all flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="Headphones" className="text-orange-500" size={16} />
                    </div>
                    <span className="text-white font-medium text-xs">Поддержка</span>
                  </div>
                  <Icon name="ChevronRight" className="text-muted-foreground" size={16} />
                </button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={isNotificationsOpen} onOpenChange={setIsNotificationsOpen}>
        <SheetContent side="bottom" className="h-[85vh] bg-background border-t border-border rounded-t-2xl p-0">
          <div className="h-full flex flex-col">
            <div className="px-3 py-3 border-b border-border/30">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-white">Уведомления</h2>
                <button onClick={() => setIsNotificationsOpen(false)} className="w-8 h-8 rounded-lg bg-card/60 flex items-center justify-center hover:bg-card transition-colors">
                  <Icon name="X" className="text-white" size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-3">
              <div className="space-y-2">
                <div className="bg-card/40 rounded-lg p-3 border border-border/30">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Gift" className="text-primary" size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-white font-semibold text-xs">Бонус на первое пополнение</h3>
                        <span className="text-[9px] text-muted-foreground flex-shrink-0">2ч назад</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-tight">Получите +20% к первому пополнению от 100₮</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card/40 rounded-lg p-3 border border-border/30">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="CheckCircle" className="text-green-500" size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-white font-semibold text-xs">Добро пожаловать!</h3>
                        <span className="text-[9px] text-muted-foreground flex-shrink-0">5ч назад</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-tight">Спасибо за регистрацию в Gift Lot. Желаем удачи!</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card/40 rounded-lg p-3 border border-border/30">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Info" className="text-blue-500" size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-white font-semibold text-xs">Новые игры</h3>
                        <span className="text-[9px] text-muted-foreground flex-shrink-0">1д назад</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-tight">В каталоге появились новые слоты от топовых провайдеров</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card/40 rounded-lg p-3 border border-border/30 opacity-60">
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Zap" className="text-orange-500" size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-white font-semibold text-xs">Акция выходного дня</h3>
                        <span className="text-[9px] text-muted-foreground flex-shrink-0">2д назад</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-tight">Удвоенные бонусы на все пополнения в субботу и воскресенье</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={isBonusOpen} onOpenChange={setIsBonusOpen}>
        <SheetContent side="bottom" className="h-[90vh] bg-background border-t border-border rounded-t-2xl p-0">
          <div className="h-full flex flex-col">
            <div className="px-3 py-3 border-b border-border/30">
              <h2 className="text-base font-bold text-white">Колесо Фортуны</h2>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4">
              <div className="bg-gradient-to-b from-card/60 to-card/40 rounded-2xl p-4 border border-border/30 mb-4">
                <div className="text-center mb-3">
                  <p className="text-xs text-muted-foreground mb-1">Ваш баланс</p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">₮</span>
                    </div>
                    <span className="text-white font-bold text-2xl">{balance}</span>
                  </div>
                </div>

                <div className="relative w-full max-w-[300px] mx-auto aspect-square">
                  <svg
                    viewBox="0 0 200 200"
                    className="w-full h-full"
                    style={{
                      transform: `rotate(${rotation}deg)`,
                      transition: isSpinning ? 'transform 4s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'
                    }}
                  >
                    <circle cx="100" cy="100" r="95" fill="#dc2626" stroke="#fff" strokeWidth="3" />
                    
                    {prizes.map((prize, index) => {
                      const angle = (360 / prizes.length) * index;
                      const nextAngle = (360 / prizes.length) * (index + 1);
                      const startRad = (angle - 90) * (Math.PI / 180);
                      const endRad = (nextAngle - 90) * (Math.PI / 180);
                      const x1 = 100 + 95 * Math.cos(startRad);
                      const y1 = 100 + 95 * Math.sin(startRad);
                      const x2 = 100 + 95 * Math.cos(endRad);
                      const y2 = 100 + 95 * Math.sin(endRad);

                      const textAngle = angle + (360 / prizes.length) / 2;
                      const textRad = (textAngle - 90) * (Math.PI / 180);
                      const textX = 100 + 65 * Math.cos(textRad);
                      const textY = 100 + 65 * Math.sin(textRad);

                      return (
                        <g key={index}>
                          <path
                            d={`M 100 100 L ${x1} ${y1} A 95 95 0 0 1 ${x2} ${y2} Z`}
                            fill={prize.color}
                            stroke="#fff"
                            strokeWidth="2"
                          />
                          <text
                            x={textX}
                            y={textY}
                            fill="white"
                            fontSize="14"
                            fontWeight="bold"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            transform={`rotate(${textAngle}, ${textX}, ${textY})`}
                          >
                            {prize.label}
                          </text>
                        </g>
                      );
                    })}

                    <circle cx="100" cy="100" r="15" fill="#fbbf24" stroke="#fff" strokeWidth="2" />
                  </svg>

                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10">
                    <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-red-500 drop-shadow-lg"></div>
                  </div>
                </div>

                <div className="mt-4 flex justify-center">
                  <Button
                    onClick={spinWheel}
                    disabled={isSpinning}
                    className="h-14 px-8 rounded-xl bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-700 text-white font-bold text-base shadow-xl shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSpinning ? 'Крутится...' : 'Крутить'}
                  </Button>
                </div>

                {selectedPrize !== null && (
                  <div className="mt-4 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                      {selectedPrize > 0 ? (
                        <>
                          <p className="text-sm text-muted-foreground mb-1">🎉 Поздравляем!</p>
                          <p className="text-white font-bold text-xl">Вы выиграли {selectedPrize}₮</p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm text-muted-foreground mb-1">😔 Не повезло</p>
                          <p className="text-white font-semibold text-base">Попробуйте ещё раз!</p>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-card/40 rounded-xl p-3 border border-border/30">
                <h3 className="text-white font-semibold text-xs mb-2 flex items-center gap-1.5">
                  <Icon name="Info" className="text-primary" size={14} />
                  Шансы выигрыша
                </h3>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">0₮</span>
                    <span className="text-gray-500 font-medium">80%</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">5₮</span>
                    <span className="text-red-500 font-medium">4%</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">10₮</span>
                    <span className="text-orange-500 font-medium">3%</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">25₮</span>
                    <span className="text-purple-500 font-medium">2.6%</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">50₮</span>
                    <span className="text-cyan-500 font-medium">1.4%</span>
                  </div>
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-muted-foreground">100₮</span>
                    <span className="text-green-500 font-medium">1%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Index;