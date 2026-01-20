"use client";
import { useCurrency } from "@/components/providers/currency-provider";
const Currency = ({ value, className = "" }: { value: number | string, className?: string }) => {
    const { formatPrice } = useCurrency();
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(numValue)) return null;

    return (
        <span className={className}>
            {formatPrice(numValue)}
        </span>
    );
}

export default Currency;