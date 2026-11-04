import React from "react";

const LEVEL = {
  Pemula: { kelas: "badge-pemula", titik: 1 },
  Menengah: { kelas: "badge-menengah", titik: 2 },
  Mahir: { kelas: "badge-mahir", titik: 3 },
};
const LEVEL_DEFAULT = { kelas: "badge-netral", titik: 0 };

function BadgeSkill({ namaSkill, level }) {
  const info = LEVEL[level] || LEVEL_DEFAULT;

  return (
    <span className={`badge-skill ${info.kelas}`}>
      {namaSkill}
      <span className="badge-level">
        <span className="titik-level" aria-hidden="true">
          {[1, 2, 3].map((n) => (
            <span key={n} className={n <= info.titik ? "titik titik-isi" : "titik"} />
          ))}
        </span>
        {level}
      </span>
    </span>
  );
}

export default BadgeSkill;