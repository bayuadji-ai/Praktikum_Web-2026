// src/FormTransaksi.jsx - formulir terkendali untuk mencatat transaksi (Tugas 3)
import { useState } from 'react';

function FormTransaksi({ onTambah }) {
  // Satu state untuk setiap input, semuanya berupa teks
  const [keterangan, setKeterangan] = useState('');
  const [nominal, setNominal] = useState('');
  const [jenis, setJenis] = useState('pemasukan');

  // Nilai dari input selalu teks, jadi diubah ke angka dulu sebelum dipakai
  const nominalAngka = Number(nominal);

  const keteranganTerlaluPanjang = keterangan.length > 50;
  const nominalSalah = nominal !== '' && nominalAngka <= 0;
  const tidakValid =
    keterangan.trim() === '' || keteranganTerlaluPanjang || nominal === '' || nominalAngka <= 0;

  const tanganiKirim = (event) => {
    event.preventDefault();
    if (tidakValid) return;

    // "Melapor" ke komponen induk dengan satu objek transaksi baru
    onTambah({
      id: Date.now(),
      keterangan: keterangan.trim(),
      nominal: nominalAngka,
      jenis: jenis,
    });
    setKeterangan('');
    setNominal('');
  };

  return (
    <form onSubmit={tanganiKirim}>
      <div className="baris">
        <input
          className="input"
          type="text"
          placeholder="Keterangan, contoh: Uang saku"
          value={keterangan}
          onChange={(event) => setKeterangan(event.target.value)}
        />
      </div>

      <div className="baris">
        <input
          className="input"
          type="number"
          min="1"
          step="1"
          placeholder="Nominal (Rp)"
          value={nominal}
          onChange={(event) => setNominal(event.target.value)}
        />
        <select
          className="input pilihan"
          value={jenis}
          onChange={(event) => setJenis(event.target.value)}
        >
          <option value="pemasukan">Pemasukan</option>
          <option value="pengeluaran">Pengeluaran</option>
        </select>
        <button className="tombol" type="submit" disabled={tidakValid}>
          Tambah
        </button>
      </div>

      {keteranganTerlaluPanjang && <p className="galat">Keterangan maksimal 50 karakter.</p>}
      {nominalSalah && <p className="galat">Nominal harus lebih dari 0.</p>}
    </form>
  );
}

export default FormTransaksi;