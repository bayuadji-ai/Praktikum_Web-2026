import React from "react";

function ItemMatkul({ kode, nama, sks, hari }) {
  return (
    <li className="matkul">
      <span className="matkul-hari">{hari}</span>
      <div>
        <span className="matkul-kode">{kode}</span>
        <span className="matkul-nama">{nama}</span>
      </div>
      <span className="matkul-sks">{sks} SKS</span>
    </li>
  );
}

export default ItemMatkul;