/* =================================
   PILIHAN KOTA
================================= */

let jenisPilihan = "";


/* =================================
   BUKA MODAL KOTA
================================= */

function bukaPilihan(jenis) {

    jenisPilihan = jenis;

    const modal = document.getElementById("kotaModal");
    const judul = document.getElementById("judulModal");

    if (jenis === "keberangkatan") {
        judul.innerText = "Pilih Keberangkatan";
    } else {
        judul.innerText = "Pilih Tujuan";
    }

    modal.style.display = "flex";
}


/* =================================
   PILIH KOTA
================================= */

function pilihKota(kota, bandara, kode) {

    const hasil = kota + " - " + kode;

    if (jenisPilihan === "keberangkatan") {

        document.getElementById("keberangkatan").innerText = hasil;

        localStorage.setItem("departureCity", kota);
        localStorage.setItem("departureAirport", bandara);
        localStorage.setItem("departureCode", kode);

    } else {

        document.getElementById("tujuan").innerText = hasil;

        localStorage.setItem("destinationCity", kota);
        localStorage.setItem("destinationAirport", bandara);
        localStorage.setItem("destinationCode", kode);
    }

    tutupModal();
}


/* =================================
   TUTUP MODAL
================================= */

function tutupModal() {

    const modal = document.getElementById("kotaModal");

    if (modal) {
        modal.style.display = "none";
    }
}


/* =================================
   TUKAR KOTA
================================= */

function tukarKota() {

    const keberangkatan =
        document.getElementById("keberangkatan");

    const tujuan =
        document.getElementById("tujuan");


    const temp = keberangkatan.innerText;

    keberangkatan.innerText = tujuan.innerText;

    tujuan.innerText = temp;


    const departureCity =
        localStorage.getItem("departureCity");

    const departureAirport =
        localStorage.getItem("departureAirport");

    const departureCode =
        localStorage.getItem("departureCode");


    const destinationCity =
        localStorage.getItem("destinationCity");

    const destinationAirport =
        localStorage.getItem("destinationAirport");

    const destinationCode =
        localStorage.getItem("destinationCode");


    localStorage.setItem(
        "departureCity",
        destinationCity || ""
    );

    localStorage.setItem(
        "departureAirport",
        destinationAirport || ""
    );

    localStorage.setItem(
        "departureCode",
        destinationCode || ""
    );


    localStorage.setItem(
        "destinationCity",
        departureCity || ""
    );

    localStorage.setItem(
        "destinationAirport",
        departureAirport || ""
    );

    localStorage.setItem(
        "destinationCode",
        departureCode || ""
    );
}


/* =================================
   PILIH TANGGAL
================================= */

function bukaTanggal() {

    const input = document.createElement("input");

    input.type = "date";

    /* Supaya tanggal hari ini atau setelahnya saja */
    const hariIni = new Date();

    const tahun = hariIni.getFullYear();

    const bulan = String(
        hariIni.getMonth() + 1
    ).padStart(2, "0");

    const hari = String(
        hariIni.getDate()
    ).padStart(2, "0");


    input.min =
        `${tahun}-${bulan}-${hari}`;


    /*
    Membuat input berada di halaman
    tetapi tidak terlihat
    */

    input.style.position = "fixed";
    input.style.left = "50%";
    input.style.top = "50%";
    input.style.transform = "translate(-50%, -50%)";

    input.style.width = "1px";
    input.style.height = "1px";

    input.style.opacity = "0";

    input.style.zIndex = "9999";


    document.body.appendChild(input);


    /*
    Saat tanggal dipilih
    */

    input.addEventListener(
        "change",
        function () {

            if (!input.value) {
                return;
            }


            const tanggal =
                new Date(
                    input.value + "T00:00:00"
                );


            const options = {

                day: "numeric",

                month: "long",

                year: "numeric"

            };


            const hasil =
                tanggal.toLocaleDateString(
                    "id-ID",
                    options
                );


            document.getElementById(
                "tanggal"
            ).innerText = hasil;


            localStorage.setItem(
                "travelDate",
                hasil
            );


            input.remove();

        }
    );


    /*
    Kalau picker ditutup tanpa pilih
    */

    input.addEventListener(
        "blur",
        function () {

            setTimeout(function () {

                if (document.body.contains(input)) {
                    input.remove();
                }

            }, 500);

        }
    );


    /*
    Buka kalender
    */

    input.showPicker();

}


/* =================================
   CARI PERJALANAN
================================= */

function cariPerjalanan() {

    const keberangkatan =
        document.getElementById(
            "keberangkatan"
        ).innerText;


    const tujuan =
        document.getElementById(
            "tujuan"
        ).innerText;


    const tanggal =
        document.getElementById(
            "tanggal"
        ).innerText;


    if (keberangkatan === "Pilih kota") {

        alert(
            "Silakan pilih kota keberangkatan terlebih dahulu."
        );

        return;
    }


    if (tujuan === "Pilih kota") {

        alert(
            "Silakan pilih kota tujuan terlebih dahulu."
        );

        return;
    }


    if (tanggal === "Pilih tanggal") {

        alert(
            "Silakan pilih tanggal perjalanan terlebih dahulu."
        );

        return;
    }


    const isLogin =
        localStorage.getItem("isLogin");


    if (isLogin === "true") {

        window.location.href = "hasil.html";

    } else {

        alert(
            "Silakan login terlebih dahulu untuk melanjutkan."
        );

        window.location.href = "login.html";
    }
}


/* =================================
   CEK STATUS LOGIN
================================= */

function cekStatusLogin() {

    const loginArea =
        document.getElementById("loginArea");


    if (!loginArea) {
        return;
    }


    const isLogin =
        localStorage.getItem("isLogin");


    if (isLogin === "true") {

        loginArea.innerHTML = `

            <button
                class="logout-btn"
                onclick="logout()">

                Logout

            </button>

        `;

    } else {

        loginArea.innerHTML = `

            <a
                href="login.html"
                class="login-btn">

                Login / Signin

            </a>

        `;
    }
}


/* =================================
   LOGOUT
================================= */

function logout() {

    localStorage.removeItem("isLogin");

    localStorage.removeItem("role");

    alert("Kamu berhasil logout!");

    window.location.href = "login.html";
}


/* =================================
   KLIK LUAR MODAL
================================= */

window.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById("kotaModal");


        if (
            modal &&
            event.target === modal
        ) {

            tutupModal();
        }

    }
);


/* =================================
   CAROUSEL POPULER
================================= */

const popularList =
    document.getElementById("popularList");


function geserPopuler(arah) {

    if (!popularList) {
        return;
    }


    popularList.scrollBy({

        left: arah * 450,

        behavior: "smooth"

    });
}


/* =================================
   DRAG CAROUSEL
================================= */

let sedangDrag = false;

let posisiAwal = 0;

let scrollAwal = 0;


if (popularList) {

    popularList.addEventListener(
        "pointerdown",
        function (event) {

            sedangDrag = true;

            posisiAwal =
                event.clientX;

            scrollAwal =
                popularList.scrollLeft;

            popularList.setPointerCapture(
                event.pointerId
            );

            popularList.style.cursor =
                "grabbing";
        }
    );


    popularList.addEventListener(
        "pointermove",
        function (event) {

            if (!sedangDrag) {
                return;
            }


            const jarak =
                event.clientX -
                posisiAwal;


            popularList.scrollLeft =
                scrollAwal - jarak;
        }
    );


    popularList.addEventListener(
        "pointerup",
        function () {

            sedangDrag = false;

            popularList.style.cursor =
                "grab";
        }
    );


    popularList.addEventListener(
        "pointercancel",
        function () {

            sedangDrag = false;

            popularList.style.cursor =
                "grab";
        }
    );

}


/* =================================
   JALANKAN CEK LOGIN
================================= */

cekStatusLogin();