<a target='_blank' href= "https://david-dm.org/geraldsamosir/work"><img src='https://david-dm.org/geraldsamosir/work.svg'></a>

#Tugas Pemrograman Web Lanjutan Stambuk 2013 (MW-A SORE)

#Dibuat oleh:
- Gerald Halomoan Samosir - 131113816
  - Manajerial Server VPS dan Server Kantor
  - Backend Developer (Major)
  - Frontend Developer (halaman landing page (halaman awal website yang berisi login,register,dll..))
- Herris Suhendra - 131113514
  - Backend Developer (Major) 
  - Frontend Developer (Halaman Pertemanan dan Operasi-Operasi Pertemanan)
- Kevin Griffinsu - 131111670 
  - Backend Developer (Minor) 
  - Frontend Developer (Halaman Profil User / Teman dan Halaman Pengaturan)
- Johanes Novenus Demak - 131111203
  - Backend Developer (Minor) 
  - Frontend Developer (Update Halaman Utama / Landing Page, Halaman Detail Artikel (Carousel beserta Load Gambar Utama & Sampingan saja), Halaman Admin Panel dan Operasi-Operasi Posting)
- William Limianto - 131111335
  - Backend Developer (Minor)
  - Frontend Developer (Halaman Beranda, Halaman Detail Artikel,  Templating & Routing Angular dan Token Security)

#Teknologi yang digunakan:
- Frontend : AngularJS v1.4.8 & Jquery 
- Backend : NodeJS dengan Framework Express
- API : Disqus

#Langkah-Langka Instalasi:
1. Install nodeJS.
2. Install XAMPP
3. Import DB dengan Buka XAMPP dan Start Service Apache dan MySQL kemudian klik tombol ADMIN pada bagian MySQL.
4. Create New Database dengan nama: blogengine
5. Klik DB blogengine, kemudian pilih tab import.
6. Klik Choose File dan Pilih file blogengine.sql (yang akan dilampirkan di email Submit Tugas)
7. Klik Go.
8. Lakukan Git Clone terhadap Repository ini.

#Langkah-Langkah Menjalankan:
1. Buka XAMPP dan Start Service Apache dan MySQL.
2. Buka Terminal/ Command Prompt kemudian lakukan perintah cd ke directory folder hasil Git Clone Anda.
3. Ketikkan npm start kemudian tekan enter.
4. Access Web dengan mengetikkan localhost:3000.
5. Sebagai data sampel, Anda bisa melakukan login dengan 2 user, yakni :
  a. Admin : Username : admin & Password : 12345
	b. User  : Username : user & Password : 12345

#KNOWN ISSUES :
1. Pada saat Buat Post Baru, Edit Post ataupun Update Data User (Pengaturan), Mohon ditunggu untuk keluar Alert / Modal Konfirmasi bahwa Operasi berhasil. (Lupa taruh gambar animasi Loading pada Hari-H)
2. Pada saat hendak ingin Edit Post jika Modal Muncul tapi Tidak ada Data (Kosong), coba untuk refresh page kemudian lakukan Edit Post kembali. (Tidak tahu apa yang menyebabkan hal ini terjadi dari kemarin-kemarin, Kemungkinan karena koneksi Server terlalu berat).

#NB : 
1. Saat Pengembangan & Pengujian langkah-langkah ini kembali,kami menggunakan NodeJS 2 versi yakni 4.4.4 dan LTS 4.4.7. 
2. Sementara untuk XAMPP, kami menggunakan versi 7.0.6.  
