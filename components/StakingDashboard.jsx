import React from 'react';
import { Alert, Button, Input, Spinner } from './ui';

export default function StakingDashboard({ currentStake, minStake, onDeposit, onWithdraw, loading }) {
  return (
    <section className="card max-w-md mx-auto mt-8 bg-white border border-neutral-200 shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-black">Seller Staking Dashboard</h2>
      <Alert message={`Minimum Required: ${minStake} IDR`} />
      <div className="mb-2 text-black">Current Stake: <span className="font-semibold">{currentStake} USDT</span></div>
      <Input placeholder="Deposit Amount" type="number" className="mb-2" />
      <Button onClick={onDeposit} className="w-full mb-4" variant="secondary">Deposit</Button>
      <Input placeholder="Withdraw Amount" type="number" className="mb-2" />
      <Button onClick={onWithdraw} className="w-full" variant="secondary">Withdraw</Button>
      {loading && <div className="flex justify-center mt-4"><Spinner /></div>}
    </section>
  );
}
