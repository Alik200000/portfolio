import React from 'react';
import {
  ShoppingBag,
  Coffee,
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
  Sparkles,
  UtensilsCrossed,
  Car,
  Laptop,
  Home,
  Gamepad2,
  Building2,
  PiggyBank,
  TrendingUp,
  Coins,
  ShieldCheck,
  CreditCard,
  DollarSign,
  HeartPulse,
} from 'lucide-react';

interface CategoryIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  name,
  className = 'w-5 h-5',
  size = 20,
}) => {
  const iconMap: Record<string, React.ReactElement> = {
    ShoppingBag: <ShoppingBag className={className} size={size} />,
    Coffee: <Coffee className={className} size={size} />,
    ArrowDownLeft: <ArrowDownLeft className={className} size={size} />,
    ArrowUpRight: <ArrowUpRight className={className} size={size} />,
    ArrowLeftRight: <ArrowLeftRight className={className} size={size} />,
    Sparkles: <Sparkles className={className} size={size} />,
    UtensilsCrossed: <UtensilsCrossed className={className} size={size} />,
    Car: <Car className={className} size={size} />,
    Laptop: <Laptop className={className} size={size} />,
    Home: <Home className={className} size={size} />,
    Gamepad2: <Gamepad2 className={className} size={size} />,
    Building2: <Building2 className={className} size={size} />,
    PiggyBank: <PiggyBank className={className} size={size} />,
    TrendingUp: <TrendingUp className={className} size={size} />,
    Coins: <Coins className={className} size={size} />,
    ShieldCheck: <ShieldCheck className={className} size={size} />,
    CreditCard: <CreditCard className={className} size={size} />,
    DollarSign: <DollarSign className={className} size={size} />,
    HeartPulse: <HeartPulse className={className} size={size} />,
  };

  return iconMap[name] || <CreditCard className={className} size={size} />;
};
