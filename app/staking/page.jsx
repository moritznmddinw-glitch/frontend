import React, { useState } from 'react';
import StakingDashboard from '../../components/StakingDashboard';

export default function StakingPage() {
  const [currentStake, setCurrentStake] = useState(0);
  const minStake = 800000; // IDR
  const [loading, setLoading] = useState(false);

  const handleDeposit = () => {
    setLoading(true);
    // TODO: call backend/contract deposit
    setTimeout(() => {
      setCurrentStake(currentStake + 100); // simulasi
      setLoading(false);
    }, 1000);
  };

  const handleWithdraw = () => {
    setLoading(true);
    // TODO: call backend/contract withdraw
    setTimeout(() => {
      setCurrentStake(currentStake - 50); // simulasi
      setLoading(false);
    }, 1000);
  };

  return (
    <StakingDashboard
      currentStake={currentStake}
      minStake={minStake}
      onDeposit={handleDeposit}
      onWithdraw={handleWithdraw}
      loading={loading}
    />
  );
}
