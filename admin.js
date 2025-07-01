// Ganti sesuai kebutuhan, id & password admin hardcoded (contoh)
const ADMIN_CREDENTIALS = {
  id: "adminjay",
  password: "satset123"
};

// Login logic
document.getElementById("admin-login-form").onsubmit = function (e) {
  e.preventDefault();
  const id = document.getElementById("admin-id").value.trim();
  const pass = document.getElementById("admin-pass").value;
  const errorBox = document.getElementById("admin-login-error");

  if (id === ADMIN_CREDENTIALS.id && pass === ADMIN_CREDENTIALS.password) {
    document.getElementById("admin-login-overlay").style.display = "none";
    document.getElementById("admin-panel").style.display = "";
    // Inisialisasi data setelah login
    renderProduk();
    renderTransaksi();
  } else {
    errorBox.style.display = "block";
    setTimeout(() => { errorBox.style.display = "none"; }, 2500);
  }
};

// Simulasi data awal
let produkList = [
  { id: 1, nama: "Netflix Premium", stok: 12, harga: 38000, kategori: "Streaming" },
  { id: 2, nama: "Spotify Premium Family", stok: 8, harga: 38000, kategori: "Streaming" },
  { id: 3, nama: "Youtube Premium", stok: 15, harga: 38000, kategori: "Streaming" },
  { id: 4, nama: "PUBG Mobile UC", stok: 100, harga: 13000, kategori: "Game" },
];
let transaksiList = [
  { id: 1001, waktu: "2025-07-01 17:45", pelanggan: "Adit", produk: "Netflix Premium", jumlah: 1, total: 38000, status: "Sukses" },
  { id: 1002, waktu: "2025-07-01 17:48", pelanggan: "Putri", produk: "PUBG Mobile UC", jumlah: 3, total: 39000, status: "Sukses" },
  { id: 1003, waktu: "2025-07-01 18:07", pelanggan: "Rizky", produk: "Spotify Premium Family", jumlah: 2, total: 76000, status: "Pending" },
];

// Render Produk
function renderProduk() {
  const tbody = document.querySelector("#table-produk tbody");
  tbody.innerHTML = "";
  produkList.forEach((prod, idx) => {
    tbody.innerHTML += `
      <tr>
        <td><input type="text" value="${prod.nama}" data-idx="${idx}" data-field="nama" /></td>
        <td><input type="number" min="0" value="${prod.stok}" data-idx="${idx}" data-field="stok" /></td>
        <td><input type="number" min="0" value="${prod.harga}" data-idx="${idx}" data-field="harga" /></td>
        <td>
          <select data-idx="${idx}" data-field="kategori">
            <option value="Streaming" ${prod.kategori === "Streaming" ? "selected" : ""}>Streaming</option>
            <option value="Game" ${prod.kategori === "Game" ? "selected" : ""}>Game</option>
            <option value="Lainnya" ${prod.kategori === "Lainnya" ? "selected" : ""}>Lainnya</option>
          </select>
        </td>
        <td>
          <button class="admin-btn" onclick="hapusProduk(${idx})">Hapus</button>
        </td>
      </tr>
    `;
  });

  // Event: Edit produk langsung di tabel
  tbody.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("change", function () {
      const idx = parseInt(this.dataset.idx);
      const field = this.dataset.field;
      let val = this.value;
      if (field === "stok" || field === "harga") val = parseInt(val);
      produkList[idx][field] = val;
      renderProduk();
    });
  });
}

// Hapus produk
function hapusProduk(idx) {
  if (confirm("Yakin hapus produk ini?")) {
    produkList.splice(idx, 1);
    renderProduk();
  }
}

// Tambah produk
document.getElementById("form-tambah").onsubmit = function (e) {
  e.preventDefault();
  const nama = document.getElementById("add-nama").value.trim();
  const stok = parseInt(document.getElementById("add-stok").value);
  const harga = parseInt(document.getElementById("add-harga").value);
  const kategori = document.getElementById("add-kategori").value;
  if (nama && !isNaN(stok) && !isNaN(harga)) {
    produkList.push({ id: Date.now(), nama, stok, harga, kategori });
    renderProduk();
    this.reset();
  }
};

// Render Transaksi
function renderTransaksi() {
  const tbody = document.querySelector("#table-transaksi tbody");
  tbody.innerHTML = "";
  transaksiList.forEach(trx => {
    tbody.innerHTML += `
      <tr>
        <td>#${trx.id}</td>
        <td>${trx.waktu}</td>
        <td>${trx.pelanggan}</td>
        <td>${trx.produk}</td>
        <td>${trx.jumlah}</td>
        <td>Rp${trx.total.toLocaleString("id-ID")}</td>
        <td>${trx.status}</td>
      </tr>
    `;
  });
}

// Tidak render data sebelum login