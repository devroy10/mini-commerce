import { cn } from '@/lib/utils';

interface PriceProps {
  amount: number;
  currency?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Price({ amount, currency = 'USD', className, size = 'md' }: PriceProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <span
      className={cn(
        'font-semibold text-gray-900',
        {
          'text-sm': size === 'sm',
          'text-base': size === 'md',
          'text-lg': size === 'lg',
          'text-2xl': size === 'xl',
        },
        className,
      )}
    >
      {formatPrice(amount)}
    </span>
  );
}
