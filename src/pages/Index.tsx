import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import WalletSheet from '@/components/WalletSheet';
import ProfileSheet from '@/components/ProfileSheet';
import BonusSheet from '@/components/BonusSheet';
import NotificationsSheet from '@/components/NotificationsSheet';

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

    const winningIndex = 1;

    const segmentAngle = 360 / prizes.length;
    const baseRotation = Math.floor(rotation / 360) * 360;
    const randomSpins = Math.floor(Math.random() * 4) + 5;
    const targetAngle = winningIndex * segmentAngle + segmentAngle / 2;
    const targetRotation = baseRotation + 360 * randomSpins - targetAngle;
    
    setRotation(targetRotation);

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedPrize(prizes[winningIndex].value);
      if (prizes[winningIndex].value > 0) {
        setBalance(prev => prev + prizes[winningIndex].value);
      }
    }, 4000);
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

      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border/30 z-40">
        <div className="flex items-center justify-around py-2 px-2">
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

      <WalletSheet
        isOpen={isWalletOpen}
        onOpenChange={setIsWalletOpen}
        walletTab={walletTab}
        setWalletTab={setWalletTab}
        selectedPaymentMethod={selectedPaymentMethod}
        setSelectedPaymentMethod={setSelectedPaymentMethod}
        depositAmount={depositAmount}
        setDepositAmount={setDepositAmount}
        balance={balance}
        setBalance={setBalance}
      />

      <ProfileSheet
        isOpen={isProfileOpen}
        onOpenChange={setIsProfileOpen}
        balance={balance}
        onDepositClick={() => {
          setIsProfileOpen(false);
          setIsWalletOpen(true);
          setWalletTab('deposit');
          setSelectedPaymentMethod(null);
        }}
        onWithdrawClick={() => {
          setIsProfileOpen(false);
          setIsWalletOpen(true);
          setWalletTab('withdraw');
          setSelectedPaymentMethod(null);
        }}
        onNotificationsClick={() => {
          setIsProfileOpen(false);
          setIsNotificationsOpen(true);
        }}
      />

      <BonusSheet
        isOpen={isBonusOpen}
        onOpenChange={setIsBonusOpen}
        balance={balance}
        isSpinning={isSpinning}
        rotation={rotation}
        selectedPrize={selectedPrize}
        onSpinWheel={spinWheel}
      />

      <NotificationsSheet
        isOpen={isNotificationsOpen}
        onOpenChange={setIsNotificationsOpen}
      />
    </div>
  );
};

export default Index;