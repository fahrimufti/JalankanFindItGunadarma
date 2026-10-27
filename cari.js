// memakai BARANG dan tgl dari app.js
const idQ = new URLSearchParams(location.search).get("id");
const brg = BARANG.find((x) => x.id == idQ);
const ikon = (b) => b.ic || '<i class="fa-solid fa-box-open"></i>';

// daftar hasil (cari.html)
const daftar = document.querySelector("#hasil-list");
if (daftar) {
  const draw = () => {
    const q = document.querySelector("#q").value.toLowerCase(),
      k = document.querySelector("#fk").value,
      l = document.querySelector("#fl").value,
      t = document.querySelector("#ft").value;
    const r = BARANG.filter(
      (b) =>
        (b.nama + " " + b.desk).toLowerCase().includes(q) &&
        (!k || b.kat == k) &&
        (!l || b.kampus == l) &&
        (!t || b.tgl == t),
    );
    document.querySelector("#jml").textContent = r.length + " laporan ditemukan";
    daftar.innerHTML = r.length
      ? r.map((b) => `<a class="item" href="barang.html?id=${b.id}"><div class="ic">${ikon(b)}</div><div class="tx"><b>${b.nama}</b>${b.lok}<br>${tgl(b.tgl)}</div></a>`).join("")
      : '<p class="kosong">Belum ada laporan yang cocok.</p>';
  };
  ["#q", "#fk", "#fl", "#ft"].forEach((s) => (document.querySelector(s).oninput = draw));
  document.querySelector("#cb").onclick = draw;
  document.querySelector("#tf").onclick = () => document.querySelector("#panel").classList.toggle("open");
  draw();
}

// detail barang (barang.html)
const dNama = document.querySelector("#dNama");
if (dNama) {
  if (brg) {
    document.querySelector("#dIc").innerHTML = ikon(brg);
    dNama.textContent = brg.nama;
    document.querySelector("#dKat").textContent = brg.kat;
    document.querySelector("#dLok").textContent = brg.lok;
    document.querySelector("#dTgl").textContent = tgl(brg.tgl);
    document.querySelector("#dDesk").textContent = brg.desk;
    document.querySelector("#ajukan").href = "klaim.html?id=" + brg.id;
  } else {
    document.querySelector("#ada").classList.add("hide");
    document.querySelector("#tidak").classList.remove("hide");
  }
}

// form klaim (klaim.html)
const formKlaim = document.querySelector("[data-klaim]");
if (formKlaim) {
  document.querySelector("#info").textContent = brg ? brg.nama + ", " + brg.lok : "barang tidak diketahui";
  document.querySelectorAll("[data-back]").forEach((a) => (a.href = brg ? "barang.html?id=" + brg.id : "cari.html"));
  formKlaim.onsubmit = (e) => {
    e.preventDefault();
    const kid = "KLM-2026-" + (Math.floor(Math.random() * 9000) + 1000);
    location.href = "klaim-sukses.html?kid=" + kid;
  };
}

// konfirmasi klaim (klaim-sukses.html)
const kid = document.querySelector("#kid");
if (kid) kid.textContent = new URLSearchParams(location.search).get("kid") || "-";
