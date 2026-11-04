// src/FormTugas.jsx
import { useState } from 'react';
function FormTugas({ onTambah }) {
// State lokal untuk menampung isi input
const [teks, setTeks] = useState('');
// Validasi sederhana: tidak boleh kosong dan maksimal 50 karakter
const terlaluPanjang = teks.length > 50;
const tidakValid = teks.trim() === '' || terlaluPanjang;
const tanganiKirim = (event) => {
event.preventDefault(); // mencegah halaman reload saat formulir dikirim
if (tidakValid) return; // hentikan jika input tidak valid
onTambah(teks.trim()); // "melapor" ke komponen induk (App)
setTeks(''); // kosongkan kembali input
};
return (
<form onSubmit={tanganiKirim}>
<div className="baris">
<input
className="input"
type="text"
placeholder="Contoh: Kerjakan laporan Modul 2"
value={teks}
onChange={(event) => setTeks(event.target.value)}
/>
<button className="tombol" type="submit" disabled={tidakValid}>
Tambah
</button>
</div>
{terlaluPanjang && <p className="galat">Judul tugas maksimal 50 karakter.</p>}
</form>
);
}
export default FormTugas;