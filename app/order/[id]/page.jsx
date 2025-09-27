import React, { useState } from 'react';
import OrderDetail from '../../../components/OrderDetail';

export default function OrderPage() {
  const [status, setStatus] = useState('Funded');
  const buyer = '0xBuyer...';
  const seller = '0xSeller...';
  const amount = 500;

  const handleDeliver = () => {
    setStatus('Delivered');
    // TODO: call backend/contract deliver
  };

  const handleOpenDispute = () => {
    setStatus('Disputed');
    // TODO: call backend/contract openDispute
  };

  return (
    <OrderDetail
      status={status}
      buyer={buyer}
      seller={seller}
      amount={amount}
      onDeliver={handleDeliver}
      onOpenDispute={handleOpenDispute}
    />
  );
}
