// src/ItemTransaksi.jsx - satu baris transaksi (Tugas 3)
import { formatRupiah } from './formatRupiah';

function ItemTransaksi({ transaksi, onHapus }) {
  const pemasukan = transaksi.jenis === 'pemasukan';

  return (
    <li className="item">
      <span>{transaksi.keterangan}</span>

      {/* className dinamis: hijau untuk pemasukan, merah untuk pengeluaran */}
      <strong className={pemasukan ? 'nominal pemasukan' : 'nominal pengeluaran'}>
        {pemasukan ? '+' : '-'} {formatRupiah(transaksi.nominal)}
      </strong>

      <button
        className="tombol tombol-merah tombol-kecil"
        onClick={() => onHapus(transaksi.id)}
      >
        Hapus
      </button>
    </li>
  );
}

export default ItemTransaksi;