// src/App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import Kartu from "./Kartu";
import Penghitung from "./Penghitung";
import FormTugas from "./FormTugas";
import ItemTugas from "./ItemTugas";

function App() {
  // State utama: coba ambil dari localStorage, jika kosong pakai data contoh
  const [daftarTugas, setDaftarTugas] = useState(() => {
    const dataTersimpan = localStorage.getItem("daftar-tugas");
    if (dataTersimpan) {
      return JSON.parse(dataTersimpan);
    }
    return [
      { id: 1, judul: "Install Node.js dan Vite", selesai: true },
      { id: 2, judul: "Pelajari useState", selesai: false },
    ];
  });

  // LATIHAN 1: state untuk pilihan filter
  const [filter, setFilter] = useState("semua");

  // Efek A: dijalankan SEKALI saat App pertama kali tampil
  useEffect(() => {
    console.log("Aplikasi Daftar Tugas siap digunakan!");
  }, []);

  // Efek B: perbarui judul tab peramban setiap daftarTugas berubah
  useEffect(() => {
    const sisa = daftarTugas.filter((tugas) => !tugas.selesai).length;
    document.title = `(${sisa}) Tugas Belum Selesai`;
  }, [daftarTugas]);

  // Efek C: simpan daftarTugas ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("daftar-tugas", JSON.stringify(daftarTugas));
  }, [daftarTugas]);

  // Menambah tugas: buat array BARU berisi tugas lama + tugas baru
  const tambahTugas = (judul) => {
    const tugasBaru = { id: Date.now(), judul: judul, selesai: false };
    setDaftarTugas([...daftarTugas, tugasBaru]);
  };

  // Mengubah status selesai: salin tugas yang dicentang, biarkan yang lain
  const ubahStatus = (id) => {
    const daftarBaru = daftarTugas.map((tugas) => {
      if (tugas.id === id) {
        return { ...tugas, selesai: !tugas.selesai };
      }
      return tugas;
    });
    setDaftarTugas(daftarBaru);
  };

  // Menghapus satu tugas: ambil semua tugas KECUALI yang id-nya sama
  const hapusTugas = (id) => {
    setDaftarTugas(daftarTugas.filter((tugas) => tugas.id !== id));
  };

  // LATIHAN 2: hapus semua tugas yang berstatus selesai
  const hapusSelesai = () => {
    setDaftarTugas(daftarTugas.filter((tugas) => !tugas.selesai));
  };

  // Nilai turunan: dihitung dari state, tidak perlu state baru
  const jumlahSelesai = daftarTugas.filter((tugas) => tugas.selesai).length;

  // LATIHAN 1: saring daftar sesuai filter SEBELUM di-map
  const daftarTampil = daftarTugas.filter((tugas) => {
    if (filter === "selesai") return tugas.selesai;
    if (filter === "belum") return !tugas.selesai;
    return true; // 'semua'
  });

  const pilihanFilter = [
    { nilai: "semua", label: "Semua" },
    { nilai: "belum", label: "Belum Selesai" },
    { nilai: "selesai", label: "Selesai" },
  ];

  return (
    <div className="wadah">
      <h1 className="judul">Daftar Tugas Praktikum</h1>
      <p className="subjudul">
        Laboratorium Informatika - Modul 2: React Lanjutan
      </p>

      <Penghitung />

      <Kartu judul="Tambah Tugas Baru">
        <FormTugas onTambah={tambahTugas} />
      </Kartu>

      <Kartu judul="Daftar Tugas">
        <p className="ringkasan">
          {jumlahSelesai} dari {daftarTugas.length} tugas selesai
        </p>

        {/* LATIHAN 1: tombol filter, yang aktif tampil berbeda (className dinamis) */}
        <div className="filter">
          {pilihanFilter.map((pilihan) => (
            <button
              key={pilihan.nilai}
              className={
                filter === pilihan.nilai
                  ? "tombol tombol-kecil"
                  : "tombol tombol-kecil tombol-pasif"
              }
              onClick={() => setFilter(pilihan.nilai)}
            >
              {pilihan.label}
            </button>
          ))}
        </div>

        {/* Conditional rendering: pesan kosong atau daftar */}
        {daftarTampil.length === 0 ? (
          <p className="kosong">
            {daftarTugas.length === 0
              ? "Belum ada tugas. Yuk tambahkan tugas pertamamu!"
              : "Tidak ada tugas pada filter ini."}
          </p>
        ) : (
          <ul className="daftar">
            {daftarTampil.map((tugas) => (
              <ItemTugas
                key={tugas.id}
                tugas={tugas}
                onUbahStatus={ubahStatus}
                onHapus={hapusTugas}
              />
            ))}
          </ul>
        )}

        {/* LATIHAN 2: tombol hanya muncul jika ada minimal satu tugas selesai */}
        {jumlahSelesai > 0 && (
          <div className="aksi">
            <button
              className="tombol tombol-merah tombol-kecil"
              onClick={hapusSelesai}
            >
              Hapus Semua yang Selesai
            </button>
          </div>
        )}
      </Kartu>
    </div>
  );
}

export default App;