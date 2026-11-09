import { useState, useEffect } from 'react';
import Kartu from './Kartu';
import FormTransaksi from './FormTransaksi';
import ItemTransaksi from './ItemTransaksi';
import RingkasanSaldo from './RingkasanSaldo';

const KUNCI_STORAGE = 'catatan-keuangan';

function CatatanKeuangan() {
  const [daftarTransaksi, setDaftarTransaksi] = useState(() => {
    try {
      const dataTersimpan = localStorage.getItem(KUNCI_STORAGE);
      return dataTersimpan ? JSON.parse(dataTersimpan) : [];
    } catch {
      return []; 
    }
  });

  useEffect(() => {
    localStorage.setItem(KUNCI_STORAGE, JSON.stringify(daftarTransaksi));
  }, [daftarTransaksi]);

  const tambahTransaksi = (transaksiBaru) => {
    setDaftarTransaksi([transaksiBaru, ...daftarTransaksi]);
  };

  const hapusTransaksi = (id) => {
    setDaftarTransaksi(daftarTransaksi.filter((transaksi) => transaksi.id !== id));
  };

  const totalPemasukan = daftarTransaksi
    .filter((transaksi) => transaksi.jenis === 'pemasukan')
    .reduce((jumlah, transaksi) => jumlah + transaksi.nominal, 0);

  const totalPengeluaran = daftarTransaksi
    .filter((transaksi) => transaksi.jenis === 'pengeluaran')
    .reduce((jumlah, transaksi) => jumlah + transaksi.nominal, 0);

  const saldo = totalPemasukan - totalPengeluaran;

  return (
    <div className="tema-uang">
      <Kartu judul="Ringkasan Saldo">
        <RingkasanSaldo
          totalPemasukan={totalPemasukan}
          totalPengeluaran={totalPengeluaran}
          saldo={saldo}
        />
      </Kartu>

      <Kartu judul="Catat Transaksi">
        <FormTransaksi onTambah={tambahTransaksi} />
      </Kartu>

      <Kartu judul="Daftar Transaksi">
        {daftarTransaksi.length === 0 ? (
          <p className="kosong">Belum ada transaksi. Catat pemasukan atau pengeluaran pertamamu!</p>
        ) : (
          <ul className="daftar">
            {daftarTransaksi.map((transaksi) => (
              <ItemTransaksi key={transaksi.id} transaksi={transaksi} onHapus={hapusTransaksi} />
            ))}
          </ul>
        )}
      </Kartu>
    </div>
  );
}

export default CatatanKeuangan;