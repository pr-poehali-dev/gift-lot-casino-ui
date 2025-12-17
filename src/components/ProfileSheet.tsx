import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface ProfileSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  balance: number;
  onDepositClick: () => void;
  onWithdrawClick: () => void;
  onNotificationsClick: () => void;
}

const ProfileSheet = ({
  isOpen,
  onOpenChange,
  balance,
  onDepositClick,
  onWithdrawClick,
  onNotificationsClick,
}: ProfileSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
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
                onClick={onDepositClick}
                className="h-12 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold text-sm flex items-center justify-center gap-1.5 shadow-lg"
              >
                <Icon name="ArrowDownToLine" size={16} />
                Пополнить
              </Button>
              <Button 
                onClick={onWithdrawClick}
                className="h-12 rounded-lg bg-green-600 hover:bg-green-700 text-white font-semibold text-sm flex items-center justify-center gap-1.5 shadow-lg"
              >
                <Icon name="ArrowUpFromLine" size={16} />
                Вывести
              </Button>
            </div>

            <div className="space-y-2">
              <button 
                onClick={onNotificationsClick}
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
  );
};

export default ProfileSheet;
