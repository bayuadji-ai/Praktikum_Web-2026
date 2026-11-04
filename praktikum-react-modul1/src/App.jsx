import React from "react";
import "./App.css";
import KartuProfil from "./KartuProfil";
import BadgeSkill from "./BadgeSkill";
import ItemMatkul from "./ItemMatkul";
import ShowcasePortofolio from "./ShowcasePortofolio";

function App() {
  const daftarPraktikum = [
    {id: 101,kode: "IF211",nama: "Pemrograman Web (React & Laravel)",sks: 3,hari: "Senin", },
    {id: 102,kode: "IF212", nama: "Sistem Basis Data (PostgreSQL)",sks: 3,hari: "Rabu",},
    {id: 103,kode: "IF213",nama: "Rekayasa Perangkat Lunak Terapan",sks: 3,hari: "Kamis",},
    {id: 104,kode: "IF214",nama: "Arsitektur Sistem Terdistribusi",sks: 2,hari: "Jumat",},
  ];

  const daftarSkill = [
    { id: 1, namaSkill: "HTML & CSS", level: "Mahir" },
    { id: 2, namaSkill: "JavaScript", level: "Menengah" },
    { id: 3, namaSkill: "React", level: "Pemula" },
    { id: 4, namaSkill: "Laravel", level: "Pemula" },
  ];

  const totalSks = daftarPraktikum.reduce(
    (jumlah, matkul) => jumlah + matkul.sks,
    0,
  );

  const notifikasiSapaan = () => {
    alert(
      "Selamat datang di Modul 1! Anda berhasil menguasai fondasi arsitektur React JS.",
    );
  };

  return (
    <div className="halaman">
      <header className="hero">
        <div className="hero-teks">
          <h1 className="judul">Praktikum Pemrograman Web</h1>
          <p className="subjudul">
            Laboratorium Informatika - Modul 1: Pengenalan React JS & Vite
          </p>
        </div>

        <section>
          <div className="seksi-kepala">
            <h2 className="seksi-judul">Profil Mahasiswa Praktikan</h2>
          </div>
          <KartuProfil nama="Bayu Adji Prakoso" npm="243040040" kelas="D" status="Aktif" fotoUrl="/pp.jpeg"/>
          <div className="keahlian">
            <h3 className="keahlian-judul">Keahlian</h3>
            <div className="daftar-skill">
              {daftarSkill.map((skill) => (
                <BadgeSkill
                  key={skill.id}
                  namaSkill={skill.namaSkill}
                  level={skill.level}
                />
              ))}
            </div>
          </div>
        </section>
      </header>

      <section className="seksi">
        <div className="seksi-kepala">
          <h2 className="seksi-judul">Daftar Rencana Praktikum Semester</h2>
          <span className="seksi-meta">
            {daftarPraktikum.length} mata kuliah, {totalSks} SKS
          </span>
        </div>
        <ul className="daftar-matkul">
          {daftarPraktikum.map((matkul) => (
            <ItemMatkul key={matkul.id} {...matkul} />
          ))}
        </ul>
      </section>

      <ShowcasePortofolio />

      <div className="aksi">
        <button className="tombol-utama" onClick={notifikasiSapaan}>
          Uji Interaktivitas Event (Klik Disini)
        </button>
      </div>
    </div>
  );
}

export default App;
