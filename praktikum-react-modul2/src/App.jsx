// src/App.jsx
import { useState, useEffect } from 'react';
import './App.css';
import Kartu from './Kartu';
import Penghitung from './Penghitung';
import FormTugas from './FormTugas';
import ItemTugas from './ItemTugas';
import CatatanKeuangan from './CatatanKeuangan';

// Pilihan filter untuk Latihan 1
const OPSI_FILTER = [
  { nilai: 'semua', label: 'Semua' },
  { nilai: 'belum', label: 'Belum Selesai' },
  { nilai: 'selesai', label: 'Selesai' },
];

function App() {
  // 1. State utama: coba ambil dari localStorage, jika kosong pakai data contoh
  const [daftarTugas, setDaftarTugas] = useState(() => {
    const dataTersimpan = localStorage.getItem('daftar-tugas');
    if (dataTersimpan) {
      return JSON.parse(dataTersimpan); // ubah teks JSON kembali menjadi array
    }
    return [
      { id: 1, judul: 'Install Node.js dan Vite', selesai: true },
      { id: 2, judul: 'Pelajari useState', selesai: false },
    ];
  });

  // Latihan 1: state baru untuk pilihan filter
  const [filter, setFilter] = useState('semua');

  // Efek A: dijalankan SEKALI saat App pertama kali tampil
  useEffect(() => {
    console.log('Aplikasi Daftar Tugas siap digunakan!');
  }, []);

  // Efek B: perbarui judul tab peramban setiap daftarTugas berubah
  useEffect(() => {
    const sisa = daftarTugas.filter((tugas) => !tugas.selesai).length;
    document.title = `(${sisa}) Tugas Belum Selesai`;
  }, [daftarTugas]);

  // Efek C: simpan daftarTugas ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem('daftar-tugas', JSON.stringify(daftarTugas));
  }, [daftarTugas]);

  // 2. Menambah tugas: buat array BARU berisi tugas lama + tugas baru
  const tambahTugas = (judul) => {
    const tugasBaru = { id: Date.now(), judul: judul, selesai: false };
    setDaftarTugas([...daftarTugas, tugasBaru]);
  };

  // 3. Mengubah status selesai: salin tugas yang dicentang, biarkan yang lain
  const ubahStatus = (id) => {
    const daftarBaru = daftarTugas.map((tugas) => {
      if (tugas.id === id) {
        return { ...tugas, selesai: !tugas.selesai }; // salinan dengan status dibalik
      }
      return tugas; // tugas lain tidak berubah
    });
    setDaftarTugas(daftarBaru);
  };

  // 4. Menghapus tugas: ambil semua tugas KECUALI yang id-nya sama
  const hapusTugas = (id) => {
    setDaftarTugas(daftarTugas.filter((tugas) => tugas.id !== id));
  };

  // Latihan 2: hapus semua tugas yang berstatus selesai
  const hapusSelesai = () => {
    setDaftarTugas(daftarTugas.filter((tugas) => !tugas.selesai));
  };

  // 5. Nilai turunan: dihitung dari state, tidak perlu state baru
  const jumlahSelesai = daftarTugas.filter((tugas) => tugas.selesai).length;

  // Latihan 1: saring daftar sesuai filter SEBELUM di-map
  const tugasTampil = daftarTugas.filter((tugas) => {
    if (filter === 'belum') return !tugas.selesai;
    if (filter === 'selesai') return tugas.selesai;
    return true; // filter 'semua'
  });

  return (
    <div className="wadah">
      <h1 className="judul">Daftar Tugas Praktikum</h1>
      <p className="subjudul">Laboratorium Informatika - Modul 2: React Lanjutan</p>

      <Penghitung />

      <Kartu judul="Tambah Tugas Baru">
        <FormTugas onTambah={tambahTugas} />
      </Kartu>

      <Kartu judul="Daftar Tugas">
        <p className="ringkasan">
          {jumlahSelesai} dari {daftarTugas.length} tugas selesai
        </p>

        {/* Latihan 1: tiga tombol filter, className dinamis untuk tombol yang aktif */}
        <div className="filter">
          {OPSI_FILTER.map((opsi) => (
            <button
              key={opsi.nilai}
              className={filter === opsi.nilai ? 'tombol-filter aktif' : 'tombol-filter'}
              onClick={() => setFilter(opsi.nilai)}
            >
              {opsi.label}
            </button>
          ))}
        </div>

        {/* Conditional rendering dengan ternary: tampilkan pesan jika kosong */}
        {daftarTugas.length === 0 ? (
          <p className="kosong">Belum ada tugas. Yuk tambahkan tugas pertamamu!</p>
        ) : (
          <>
            <ul className="daftar">
              {tugasTampil.map((tugas) => (
                <ItemTugas
                  key={tugas.id}
                  tugas={tugas}
                  onUbahStatus={ubahStatus}
                  onHapus={hapusTugas}
                />
              ))}
            </ul>
            {tugasTampil.length === 0 && <p className="kosong">Tidak ada tugas pada filter ini.</p>}
          </>
        )}

        {/* Latihan 2: tombol hanya muncul jika ada minimal satu tugas selesai */}
        {jumlahSelesai > 0 && (
          <button className="tombol tombol-merah aksi-massal" onClick={hapusSelesai}>
            Hapus Semua yang Selesai
          </button>
        )}
      </Kartu>

      {/* Tugas 3: Catatan Keuangan Mini */}
      <h2 className="bagian">Catatan Keuangan Mini</h2>
      <CatatanKeuangan />
    </div>
  );
}

export default App;