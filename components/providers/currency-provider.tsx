"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type CurrencyCode = 'USD' | 'AED' | 'EUR' | 'GBP' | 'INR';

interface CurrencyContextType {
  currency: string;
  symbol: string;
  formatPrice: (amount: number) => string;
  setCurrency: (currency: string) => void;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const SYMBOLS: Record<string, string> = {
  USD: '$',
  AED: 'AED ',
  EUR: '€',
  GBP: '£',
  INR: '₹',
};

export function CurrencyProvider({ 
  children, 
  initialCurrency = 'USD' 
}: { 
  children: React.ReactNode; 
  initialCurrency?: string;
}) {
  const [currency, setCurrencyState] = useState(initialCurrency);

  // Sync with prop if it changes (e.g. from server revalidation)
  useEffect(() => {
    setCurrencyState(initialCurrency);
  }, [initialCurrency]);

  const setCurrency = (newCurrency: string) => {
    setCurrencyState(newCurrency);
    // basic cookie setting for simple client-side persistence if needed
    document.cookie = `currency=${newCurrency}; path=/; max-age=31536000`;
  };

  const formatPrice = (amount: number) => {
    const symbol = SYMBOLS[currency] || currency;
    const formattedAmount = amount.toFixed(2);
    
    if (currency === 'AED') {
        return `${symbol} ${formattedAmount}`;
    }
    return `${symbol}${formattedAmount}`;
  };

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      symbol: SYMBOLS[currency] || currency, 
      formatPrice,
      setCurrency 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
