import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';

interface CreditCardProps {
  balance: string;
  cardNumber: string;
  expiry: string;
  name?: string;
  onClick?: () => void;
}

export const CreditCard = ({ balance, cardNumber, expiry, name = 'VISA' }: CreditCardProps) => {
  // Format card number for display
  const displayNumber = cardNumber.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  
  return (
    <div className="credit-card">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-sm font-medium mb-1">Current Balance:</h3>
          <div className="text-3xl font-bold">{balance}</div>
        </div>
        <button className="text-neutral-700 hover:text-black p-1">
          <EllipsisHorizontalIcon className="w-5 h-5" />
        </button>
      </div>
      
      <div className="text-lg tracking-widest mt-8">{displayNumber}</div>
      <div className="text-sm mt-2">{expiry}</div>
      
      <div className="absolute bottom-6 right-6 text-xl font-bold uppercase">{name}</div>
      
      {/* Card pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute right-0 top-0 w-32 h-32 rounded-full bg-white -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute left-0 bottom-0 w-24 h-24 rounded-full bg-white translate-y-1/2 -translate-x-1/2"></div>
      </div>
    </div>
  );
}; 