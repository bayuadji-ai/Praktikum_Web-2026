import React from "react";

function KartuProyek({ judul, deskripsi, teknologi, repoUrl }) {
  return (
    <article className="kartu-proyek">
      <h3 className="proyek-judul">{judul}</h3>
      <p className="proyek-deskripsi">{deskripsi}</p>

      <ul className="tagar">
        {teknologi.map((tag) => (
          <li key={tag}>#{tag}</li>
        ))}
      </ul>

      {repoUrl ? (
        <a
          className="tombol-repo"
          href={repoUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          Lihat Repositori GitHub
        </a>
      ) : (
        <span className="tombol-repo-nonaktif" aria-disabled="true">
          Repositori belum tersedia
        </span>
      )}
    </article>
  );
}

export default KartuProyek;