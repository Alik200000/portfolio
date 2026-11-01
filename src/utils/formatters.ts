export const formatCurrency = (amount: number, options: { signDisplay?: 'always' | 'auto' | 'never'; showCents?: boolean } = {}): string => {
  const { signDisplay = 'auto', showCents = true } = options;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: showCents ? 2 : 0,
    maximumFractionDigits: showCents ? 2 : 0,
    signDisplay,
  }).format(amount);
};

export const formatCompactNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(num);
};

export const formatPercent = (percent: number, withSign = true): string => {
  const sign = withSign && percent > 0 ? '+' : '';
  return `${sign}${percent.toFixed(2)}%`;
};
