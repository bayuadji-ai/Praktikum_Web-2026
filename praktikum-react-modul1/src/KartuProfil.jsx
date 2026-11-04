import React from "react";

function KartuProfil({ nama, npm, kelas, status, fotoUrl }) {
  const foto =
    fotoUrl ||
    `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(nama)}`;
  const aktif = status === "Aktif";

  return (
    <div className="kartu-profil">
      <div className="profil-atas">
        <img className="profil-foto" src={foto} alt={`Foto ${nama}`} />
        <div>
          <h3 className="profil-nama">{nama}</h3>
          <dl className="profil-data">
            <dt>NPM</dt>
            <dd>{npm}</dd>
            <dt>Kelas</dt>
            <dd>{kelas}</dd>
          </dl>
        </div>
      </div>

      <div className="profil-bawah">
        <span className={aktif ? "status status-aktif" : "status status-lain"}>
          <span className="status-titik" aria-hidden="true" />
          Status Akademik: {status}
        </span>
      </div>
    </div>
  );
}

export default KartuProfil;