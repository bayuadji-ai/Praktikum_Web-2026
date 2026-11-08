// src/RingkasanSaldo.jsx - menampilkan total pemasukan, pengeluaran, dan saldo (Tugas 3)
import { formatRupiah } from './formatRupiah';

function RingkasanSaldo({ totalPemasukan, totalPengeluaran, saldo }) {
  return (
    <div className="ringkasan-saldo">
      <div>
        <span>Pemasukan</span>
        <strong className="pemasukan">{formatRupiah(totalPemasukan)}</strong>
      </div>
      <div>
        <span>Pengeluaran</span>
        <strong className="pengeluaran">{formatRupiah(totalPengeluaran)}</strong>
      </div>
      <div>
        <span>Saldo</span>
        <strong className={saldo < 0 ? 'pengeluaran' : 'pemasukan'}>{formatRupiah(saldo)}</strong>
      </div>
    </div>
  );
}

export default RingkasanSaldo;