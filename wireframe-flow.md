# Wireframe & Flow Frontend

## 1. Staking

**Flow:**
- Seller login
- Seller deposit USDT (form input amount, info minimum stake)
- Status stake tampil (current stake, minimum, withdraw button)

**Wireframe:**
```
+-----------------------------+
|   Seller Staking Dashboard  |
+-----------------------------+
| Current Stake: 1,000 USDT   |
| Minimum Required: 800,000 IDR|
| [Deposit Amount] [Deposit]  |
| [Withdraw Amount] [Withdraw]|
+-----------------------------+
```

---

## 2. Order

**Flow:**
- Buyer pilih produk/order
- Buyer fund order (input amount, confirm)
- Seller deliver (upload file/IPFS, confirm)
- Status order tampil (Pending, Funded, Delivered, etc)

**Wireframe:**
```
+-----------------------------+
|        Order Detail         |
+-----------------------------+
| Status: Funded              |
| Buyer: 0x...                |
| Seller: 0x...               |
| Amount: 500 USDT            |
| [Deliver File] [Submit]     |
| [Open Dispute]              |
+-----------------------------+
```

---

## 3. Dispute

**Flow:**
- Buyer/Seller klik "Open Dispute"
- Form input alasan dispute
- Status dispute tampil (Opened, Resolved, etc)
- Arbitrator dapat akses resolve (sign via Metamask)

**Wireframe:**
```
+-----------------------------+
|         Dispute             |
+-----------------------------+
| Status: Opened              |
| Reason: [text]              |
| [Resolve & Sign]            |
| [Decision]                  |
+-----------------------------+
```

---

## 4. Event-driven Status

- Semua status order/dispute diupdate otomatis dari backend event-listener
- UI menampilkan status real-time

---

## Catatan
- Setiap halaman harus jelas status, aksi, dan info terkait.
- Integrasi event-driven backend untuk update status otomatis.
- Komponen UI: Alert, Button, Input, Spinner sudah tersedia di `components/ui/`.

---

## Saran Struktur Halaman
- `/staking` : Dashboard staking seller
- `/order/[id]` : Detail order
- `/dispute/[id]` : Detail dispute
- `/threads` : List order/dispute
