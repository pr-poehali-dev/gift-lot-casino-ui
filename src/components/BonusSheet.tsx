import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface BonusSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  balance: number;
  isSpinning: boolean;
  rotation: number;
  selectedPrize: number | null;
  onSpinWheel: () => void;
}

const BonusSheet = ({
  isOpen,
  onOpenChange,
  balance,
  isSpinning,
  rotation,
  selectedPrize,
  onSpinWheel,
}: BonusSheetProps) => {
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

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
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
                  onClick={onSpinWheel}
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
  );
};

export default BonusSheet;
