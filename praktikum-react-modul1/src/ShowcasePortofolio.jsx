import React from "react";
import KartuProyek from "./KartuProyek";

const daftarProyek = [
  {
    id: 1,
    judul: "Aplikasi Toko Online",
    deskripsi:
      "Katalog produk dengan keranjang belanja dan checkout sederhana.",
    teknologi: ["React", "Vite", "CSS"],
    repoUrl: "https://github.com/bayuadji-ai",
  },
  {
    id: 2,
    judul: "Sistem Absensi Praktikum",
    deskripsi: "Pencatatan kehadiran praktikan beserta rekap per pertemuan.",
    teknologi: ["Laravel", "MySQL", "Bootstrap"],
    repoUrl: "https://github.com/bayuadji-ai",
  },
  {
    id: 3,
    judul: "Dashboard Cuaca",
    deskripsi: "Menampilkan prakiraan cuaca dari REST API publik.",
    teknologi: ["React", "REST API", "JavaScript"],
    repoUrl: "https://github.com/bayuadji-ai",
  },
  {
    id: 4,
    judul: "Landing Page Portofolio",
    deskripsi: "Halaman profil pribadi yang responsif dengan daftar proyek.",
    teknologi: ["HTML", "CSS", "JavaScript"],
    repoUrl: "https://github.com/bayuadji-ai",
  },
];

function ShowcasePortofolio() {
  return (
    <section className="seksi">
      <div className="seksi-kepala">
        <h2 className="seksi-judul">Showcase Portofolio Mini</h2>
        <span className="seksi-meta">{daftarProyek.length} proyek</span>
      </div>
      <div className="daftar-proyek">
        {daftarProyek.map((proyek) => (
          <KartuProyek
            key={proyek.id}
            judul={proyek.judul}
            deskripsi={proyek.deskripsi}
            teknologi={proyek.teknologi}
            repoUrl={proyek.repoUrl}
          />
        ))}
      </div>
    </section>
  );
}

export default ShowcasePortofolio;
