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

  const categories = [
    { id: 'all', label: 'Все', icon: 'Grid3x3' },
    { id: 'fast', label: 'Быстрые Игры', icon: 'Zap' }
  ];

  const quickActions: any[] = [];

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

          <button className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg hover:bg-card/30 transition-colors">
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

          <button className="flex flex-col items-center gap-0.5 py-1 px-2 rounded-lg hover:bg-card/30 transition-colors">
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
    </div>
  );
};

export default Index;