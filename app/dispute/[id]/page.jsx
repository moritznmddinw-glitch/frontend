import React, { useState } from 'react';
import DisputeDetail from '../../../components/DisputeDetail';

export default function DisputePage() {
  const [status, setStatus] = useState('Opened');
  const [reason, setReason] = useState('Barang tidak sesuai');
  const [decision, setDecision] = useState('');

  const handleResolve = () => {
    setStatus('Resolved');
    setDecision('Refund to buyer');
    // TODO: call backend/contract resolveAndExecute
  };

  return (
    <DisputeDetail
      status={status}
      reason={reason}
      onResolve={handleResolve}
      decision={decision}
    />
  );
}
