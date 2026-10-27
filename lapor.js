// kirim form laporan (lapor-hilang dan lapor-temu)
const form = document.querySelector("[data-lapor]");
if (form) {
  form.onsubmit = (e) => {
    e.preventDefault();
    const id = "FIG-2026-" + (Math.floor(Math.random() * 9000) + 1000);
    location.href = "lapor-sukses.html?tipe=" + form.dataset.lapor + "&id=" + id;
  };
}

// tempat penitipan hanya muncul kalau barang sudah dititipkan (lapor-temu)
const titip = document.querySelector("#titip");
if (titip) {
  document.querySelectorAll("input[name=st]").forEach((r) => {
    r.onchange = () => {
      const buka = r.value == "titip" && r.checked;
      titip.classList.toggle("hide", !buka);
      titip.querySelector("select").required = buka;
    };
  });
}

// halaman konfirmasi
const idLap = document.querySelector("#idLap");
if (idLap) {
  const p = new URLSearchParams(location.search);
  idLap.textContent = p.get("id") || "-";
  document
    .querySelector(p.get("tipe") == "temu" ? "#next-temu" : "#next-hilang")
    .classList.remove("hide");
}
