import { formatRupiah } from './formatRupiah';

function ItemTransaksi({ transaksi, onHapus }) {
  const pemasukan = transaksi.jenis === 'pemasukan';

  return (
    <li className="item">
      <span>{transaksi.keterangan}</span>

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