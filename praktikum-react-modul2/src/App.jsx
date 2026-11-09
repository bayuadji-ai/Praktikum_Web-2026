import { useState, useEffect } from "react";
import "./App.css";
import Kartu from "./Kartu";
import Penghitung from "./Penghitung";
import FormTugas from "./FormTugas";
import ItemTugas from "./ItemTugas";
import CatatanKeuangan from "./CatatanKeuangan";

const OPSI_FILTER = [
  { nilai: "semua", label: "Semua" },
  { nilai: "belum", label: "Belum Selesai" },
  { nilai: "selesai", label: "Selesai" },
];

function App() {
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

  const [filter, setFilter] = useState("semua");

  useEffect(() => {
    console.log("Aplikasi Daftar Tugas siap digunakan!");
  }, []);

  useEffect(() => {
    const sisa = daftarTugas.filter((tugas) => !tugas.selesai).length;
    document.title = `(${sisa}) Daftar Tugas Praktikum`;
  }, [daftarTugas]);

  useEffect(() => {
    localStorage.setItem("daftar-tugas", JSON.stringify(daftarTugas));
  }, [daftarTugas]);

  const tambahTugas = (judul) => {
    const tugasBaru = { id: Date.now(), judul: judul, selesai: false };
    setDaftarTugas([...daftarTugas, tugasBaru]);
  };

  const ubahStatus = (id) => {
    const daftarBaru = daftarTugas.map((tugas) => {
      if (tugas.id === id) {
        return { ...tugas, selesai: !tugas.selesai };
      }
      return tugas;
    });
    setDaftarTugas(daftarBaru);
  };

  const hapusTugas = (id) => {
    setDaftarTugas(daftarTugas.filter((tugas) => tugas.id !== id));
  };

  const hapusSelesai = () => {
    setDaftarTugas(daftarTugas.filter((tugas) => !tugas.selesai));
  };

  const jumlahSelesai = daftarTugas.filter((tugas) => tugas.selesai).length;

  const tugasTampil = daftarTugas.filter((tugas) => {
    if (filter === "belum") return !tugas.selesai;
    if (filter === "selesai") return tugas.selesai;
    return true; // filter 'semua'
  });

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

        <div className="filter">
          {OPSI_FILTER.map((opsi) => (
            <button
              key={opsi.nilai}
              className={
                filter === opsi.nilai ? "tombol-filter aktif" : "tombol-filter"
              }
              onClick={() => setFilter(opsi.nilai)}
            >
              {opsi.label}
            </button>
          ))}
        </div>

        {daftarTugas.length === 0 ? (
          <p className="kosong">
            Belum ada tugas. Yuk tambahkan tugas pertamamu!
          </p>
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
            {tugasTampil.length === 0 && (
              <p className="kosong">Tidak ada tugas pada filter ini.</p>
            )}
          </>
        )}

        {jumlahSelesai > 0 && (
          <button
            className="tombol tombol-merah aksi-massal"
            onClick={hapusSelesai}
          >
            Hapus Semua yang Selesai
          </button>
        )}
      </Kartu>

      <h2 className="bagian">Catatan Keuangan Mini</h2>
      <CatatanKeuangan />
    </div>
  );
}

export default App;
