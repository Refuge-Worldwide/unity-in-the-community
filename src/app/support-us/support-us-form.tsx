'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Toggle } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

const oneTimePaymentOption = {
  title: 'One-Time Donation',
  fixedAmounts: [
    { value: '5', link: 'https://buy.stripe.com/eVq5kC316flH4A86h99R601' },
    { value: '10', link: 'https://buy.stripe.com/5kQeVc3163CZ3w4gVN9R603' },
  ],
  customAmountLink: 'https://buy.stripe.com/bJe4gygRW8XjfeMeNF9R604',
};

const monthlyPaymentOption = {
  title: 'Monthly Support',
  fixedAmounts: [
    { value: '5', link: 'https://buy.stripe.com/dRmbJ07hmc9v4A88ph9R600' },
    { value: '10', link: 'https://buy.stripe.com/8x2aEW1X28Xj5Ec5d59R605' },
  ],
};

interface PaymentAmount {
  value: string;
  link: string;
}

interface PaymentOptionProps {
  fixedAmounts: PaymentAmount[];
  customAmountLink?: string;
  isOneTime: boolean;
  selectedLink: string;
  onSelect: (link: string, amount: string) => void;
}

function PaymentOptions({
  fixedAmounts,
  customAmountLink,
  isOneTime,
  selectedLink,
  onSelect,
}: PaymentOptionProps) {
  const [customAmount, setCustomAmount] = useState<string>('');
  const [customExpanded, setCustomExpanded] = useState(false);
  const [customSelected, setCustomSelected] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (customExpanded) {
      inputRef.current?.focus();
    }
  }, [customExpanded]);

  const getCustomAmountLink = (amount: string) => {
    if (!customAmountLink) return '';
    return `${customAmountLink}?__prefilled_amount=${amount}00`;
  };

  return (
    <div className={cn('grid grid-cols-2 gap-2')}>
      {fixedAmounts.map((amount) => (
        <Toggle
          key={amount.value}
          pressed={selectedLink === amount.link && !customSelected}
          onClick={() => {
            setCustomSelected(false);
            onSelect(amount.link, amount.value);
          }}
          variant="outline"
          size="xl"
          className="w-full transition-all"
        >
          {isOneTime ? `${amount.value} EUR` : `${amount.value} EUR / month`}
        </Toggle>
      ))}
      {customAmountLink && (
        <Toggle
          pressed={customSelected}
          onClick={() => {
            setCustomSelected(true);
            setCustomExpanded(true);
            onSelect(getCustomAmountLink(customAmount), customAmount);
          }}
          variant="outline"
          size="xl"
          className="w-full col-span-full"
        >
          {customExpanded ? (
            <div className="flex items-center gap-1.5 w-fit text-lg">
              <Input
                ref={inputRef}
                variant="inline"
                type="text"
                inputMode="numeric"
                placeholder="0"
                value={customAmount}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, '');
                  setCustomAmount(digits);
                  onSelect(getCustomAmountLink(digits), digits);
                }}
                onBlur={() => {
                  if (!customAmount) {
                    setCustomExpanded(false);
                  }
                }}
                className="text-right w-16"
              />
              <span>EUR</span>
            </div>
          ) : (
            <span>Custom Amount</span>
          )}
        </Toggle>
      )}
    </div>
  );
}

type SupportUsFormProps = {
  oneTimeDescription: ReactNode;
  monthlyDescription: ReactNode;
  monthlyDisclaimer: ReactNode;
};

export function SupportUsForm({
  oneTimeDescription,
  monthlyDescription,
  monthlyDisclaimer,
}: SupportUsFormProps) {
  const [oneTimePayment, setOneTimePayment] = useState({
    selectedLink: oneTimePaymentOption.fixedAmounts[1].link,
    selectedAmount: oneTimePaymentOption.fixedAmounts[1].value,
  });

  const [monthlyPayment, setMonthlyPayment] = useState({
    selectedLink: monthlyPaymentOption.fixedAmounts[1].link,
    selectedAmount: monthlyPaymentOption.fixedAmounts[1].value,
  });

  const handleSelectOneTime = (link: string, amount: string) => {
    setOneTimePayment({ selectedLink: link, selectedAmount: amount });
  };

  const handleSelectMonthly = (link: string, amount: string) => {
    setMonthlyPayment({ selectedLink: link, selectedAmount: amount });
  };

  return (
    <div className="grid gap-6 self-start md:grid-cols-2 xl:grid-cols-1">
      <Card>
        <div className="space-y-2">
          <h2>{oneTimePaymentOption.title}</h2>
          {oneTimeDescription}
        </div>
        <PaymentOptions
          fixedAmounts={oneTimePaymentOption.fixedAmounts}
          customAmountLink={oneTimePaymentOption.customAmountLink}
          isOneTime={true}
          selectedLink={oneTimePayment.selectedLink}
          onSelect={handleSelectOneTime}
        />
        <a
          href={oneTimePayment.selectedLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!oneTimePayment.selectedAmount}
          tabIndex={!oneTimePayment.selectedAmount ? -1 : undefined}
          className={cn(
            buttonVariants({ variant: 'default', size: 'xl' }),
            'w-full text-center flex items-center justify-center',
            !oneTimePayment.selectedAmount && 'pointer-events-none opacity-50'
          )}
        >
          Donate {oneTimePayment.selectedAmount} EUR
        </a>
      </Card>

      <Card>
        <div className="space-y-2">
          <h2>{monthlyPaymentOption.title}</h2>
          {monthlyDescription}
        </div>
        <PaymentOptions
          fixedAmounts={monthlyPaymentOption.fixedAmounts}
          isOneTime={false}
          selectedLink={monthlyPayment.selectedLink}
          onSelect={handleSelectMonthly}
        />
        <div className="flex flex-1 items-center w-full">{monthlyDisclaimer}</div>
        <a
          href={monthlyPayment.selectedLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!monthlyPayment.selectedAmount}
          tabIndex={!monthlyPayment.selectedAmount ? -1 : undefined}
          className={cn(
            buttonVariants({ variant: 'default', size: 'xl' }),
            'w-full text-center flex items-center justify-center',
            !monthlyPayment.selectedAmount && 'pointer-events-none opacity-50'
          )}
        >
          Donate {monthlyPayment.selectedAmount} EUR / month
        </a>
      </Card>
    </div>
  );
}
