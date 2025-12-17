import Icon from '@/components/ui/icon';
import { Sheet, SheetContent } from '@/components/ui/sheet';

interface NotificationsSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const NotificationsSheet = ({ isOpen, onOpenChange }: NotificationsSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] bg-background border-t border-border rounded-t-2xl p-0">
        <div className="h-full flex flex-col">
          <div className="px-3 py-3 border-b border-border/30">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white">Уведомления</h2>
              <button onClick={() => onOpenChange(false)} className="w-8 h-8 rounded-lg bg-card/60 flex items-center justify-center hover:bg-card transition-colors">
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
  );
};

export default NotificationsSheet;
