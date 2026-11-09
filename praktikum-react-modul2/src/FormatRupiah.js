export function formatRupiah(angka) {
  const tanda = angka < 0 ? '-' : '';
  return `${tanda}Rp ${Math.abs(angka).toLocaleString('id-ID')}`;
}