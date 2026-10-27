const $ = (s) => document.querySelector(s),
  $$ = (s) => document.querySelectorAll(s);

// NAVBAR MENGECIL SAAT SCROLL
const nav = $(".nav");
if (nav) {
  const cek = () => {
    const y = window.scrollY;
    if (y > 60) nav.classList.add("scrolled");
    else if (y < 20) nav.classList.remove("scrolled");
  };
  window.addEventListener("scroll", cek);
  cek();
}
const KAT = [
    "Handphone",
    "Dompet",
    "Kartu identitas",
    "Elektronik",
    "Aksesori",
    "Tas",
    "Alat tulis",
    "Kunci",
    "Lainnya",
  ],
  LOK = ["Kampus D", "Kampus E", "Kampus G"];
const BARANG = [
  {
    id: 1,
    nama: "Dompet Hitam",
    kat: "Dompet",
    lok: "Kampus E, gedung 2",
    kampus: "Kampus E",
    tgl: "2026-10-18",
    ic: "",
    desk: "Dompet kulit hitam ukuran sedang.",
  },
  {
    id: 2,
    nama: "Charger",
    kat: "Elektronik",
    lok: "Kampus D, gedung 2",
    kampus: "Kampus D",
    tgl: "2026-10-20",
    ic: "",
    desk: "Charger putih lengkap dengan kabel.",
  },
  {
    id: 3,
    nama: "Kunci Motor",
    kat: "Kunci",
    lok: "Kampus G, parkir",
    kampus: "Kampus G",
    tgl: "2026-10-19",
    ic: "",
    desk: "Kunci motor dengan gantungan.",
  },
];
const tgl = (d) =>
  new Date(d).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
$$("select[data-opts]").forEach((s) =>
  (s.dataset.opts == "kat" ? KAT : LOK).forEach((o) => s.add(new Option(o, o))),
);

// halaman Cari Barang
const list = $("#list");
if (list) {
  

  const draw = () => {
    const q = $("#q").value.toLowerCase(),
      k = $("#fk").value,
      l = $("#fl").value,
      t = $("#ft").value;
    const r = BARANG.filter(
      (b) =>
        (b.nama + " " + b.desk).toLowerCase().includes(q) &&
        (!k || b.kat == k) &&
        (!l || b.kampus == l) &&
        (!t || b.tgl == t),
    );
    $("#jml").textContent = r.length + " laporan ditemukan";
    list.innerHTML = r
      .map(
        (b) =>
          `<div class="item" data-id="${b.id}"><div class="ic">${b.ic}</div><div class="tx"><b>${b.nama}</b>${b.lok}<br>${tgl(b.tgl)}</div></div>`,
      )
      .join("");
  };
  ["#q", "#fk", "#fl", "#ft"].forEach((s) => ($(s).oninput = draw));
  $("#cb").onclick = draw;
  $("#tf").onclick = () => $("#panel").classList.toggle("open");
  list.onclick = (e) => {
    const c = e.target.closest(".item");
    if (!c) return;
    const b = BARANG.find((x) => x.id == c.dataset.id);
    $("#dIc").textContent = b.ic;
    $("#dNama").textContent = b.nama;
    $("#dLok").textContent = b.lok;
    $("#dTgl").textContent = tgl(b.tgl);
    $("#dDesk").textContent = b.desk;
    $("#hasil").classList.add("hide");
    $("#detail").classList.remove("hide");
  };
  $("#kembali").onclick = () => {
    ["#detail", "#klaim", "#klOk"].forEach((s) => $(s).classList.add("hide"));
    $("#hasil").classList.remove("hide");
  };
  $("#ajukan").onclick = () => {
    $("#klaim").classList.remove("hide");
    $("#klOk").classList.add("hide");
  };
  $("#kb").onclick = () => $("#klaim").classList.add("hide");
  $("#klaim").onsubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    e.target.classList.add("hide");
    $("#klOk").classList.remove("hide");
  };
  draw();
}

// halaman Laporkan Barang
const tipe = $$("[data-tipe]");
if (tipe.length) {
  const reset = () => {
    tipe.forEach((x) => x.classList.remove("on"));
    $$("[data-lapor]").forEach((f) => f.classList.add("hide"));
  };
  tipe.forEach(
    (c) =>
      (c.onclick = () => {
        reset();
        c.classList.add("on");
        $("#ok").classList.add("hide");
        $("#f-" + c.dataset.tipe).classList.remove("hide");
      }),
  );
  $$("[data-lapor]").forEach((f) => {
    f.querySelector("[data-batal]").onclick = () => {
      f.reset();
      reset();
    };
    f.onsubmit = (e) => {
      e.preventDefault();
      f.reset();
      reset();
      $("#idLap").textContent =
        "FIG-2026-" + (Math.floor(Math.random() * 9000) + 1000);
      $("#ok").classList.remove("hide");
    };
  });
}
