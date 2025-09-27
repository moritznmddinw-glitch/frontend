import React from 'react';
import { Alert, Button, Input } from './ui';

export default function DisputeDetail({ status, reason, onResolve, decision }) {
  return (
    <section className="card max-w-md mx-auto mt-8 bg-white border border-neutral-200 shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-black">Dispute</h2>
      <Alert message={`Status: ${status}`} />
      <div className="mb-2 text-black">Reason: <span className="font-semibold">{reason}</span></div>
      <Button onClick={onResolve} className="w-full mb-4" variant="secondary">Resolve & Sign (Arbitrator)</Button>
      <div className="text-black">Decision: <span className="font-semibold">{decision}</span></div>
    </section>
  );
}
