import React from 'react';
import { Alert, Button, Input } from './ui';

export default function OrderDetail({ status, buyer, seller, amount, onDeliver, onOpenDispute }) {
  return (
    <section className="card max-w-md mx-auto mt-8 bg-white border border-neutral-200 shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-black">Order Detail</h2>
      <Alert message={`Status: ${status}`} />
      <div className="mb-2 text-black">Buyer: <span className="font-semibold">{buyer}</span></div>
      <div className="mb-2 text-black">Seller: <span className="font-semibold">{seller}</span></div>
      <div className="mb-4 text-black">Amount: <span className="font-semibold">{amount} USDT</span></div>
      <Input placeholder="Deliver File (IPFS)" className="mb-2" />
      <Button onClick={onDeliver} className="w-full mb-2" variant="secondary">Submit Delivery</Button>
      <Button onClick={onOpenDispute} className="w-full" variant="danger">Open Dispute</Button>
    </section>
  );
}
