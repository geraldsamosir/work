-- phpMyAdmin SQL Dump
-- version 4.4.15.7
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 18, 2016 at 08:15 AM
-- Server version: 5.5.50
-- PHP Version: 5.4.45

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `admin_blogengine`
--

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE IF NOT EXISTS `image` (
  `id` int(9) unsigned NOT NULL,
  `id_post` varchar(299) NOT NULL,
  `urlfoto` varchar(255) DEFAULT NULL,
  `iskronologi` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`id`, `id_post`, `urlfoto`, `iskronologi`) VALUES
(1, '2016-07-01T03:03:21.494Z-32-1', '/images/app/gbrUtamaInputFile-1467343546293.jpg', 1),
(2, '2016-07-01T03:03:21.494Z-32-1', '/images/app/gbr2SampinganInputFile-1467342335250.jpg', 0),
(3, '2016-07-01T03:03:21.494Z-32-1', '/images/app/gbr2SampinganInputFile-1467342183533.jpg', 0),
(4, '2016-07-01T03:09:14.399Z-33-0', '/images/app/gbrUtamaInputFile-1467342550969.jpg', 1),
(5, '2016-07-01T03:12:03.118Z-31-1', '/images/app/gbrUtamaInputFile-1467342594391.jpg', 1),
(6, '2016-07-01T03:12:03.118Z-31-1', '/images/app/gbr2SampinganInputFile-1467342597433.jpg', 0),
(7, '2016-07-01T03:12:03.118Z-31-1', '/images/app/gbr2SampinganInputFile-1467342600639.jpg', 0),
(8, '2016-07-01T03:16:39.369Z-34-0', '/images/app/gbrUtamaInputFile-1467342989744.jpg', 1),
(9, '2016-07-01T03:23:33.147Z-34-2', '/images/app/gbrUtamaInputFile-1467343285426.jpg', 1),
(13, '2016-07-01T06:24:31.779Z-34-5', '/images/app/gbrUtamaInputFile-1467353973842.jpg', 1),
(17, '2016-07-01T08:11:10.140Z-31-9', '/images/app/gbrUtamaInputFile-1467438421022.jpg', 1),
(18, '2016-07-02T07:00:36.529Z-44-1', '/images/app/gbrUtamaInputFile-1467471763315.jpg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE IF NOT EXISTS `kategori` (
  `id` int(9) unsigned NOT NULL,
  `nama` varchar(299) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id`, `nama`) VALUES
(1, 'Romantis'),
(2, 'komedy'),
(3, 'cerita'),
(4, 'inspirasi'),
(5, 'petualangan'),
(6, 'aneh');

-- --------------------------------------------------------

--
-- Table structure for table `like_post`
--

CREATE TABLE IF NOT EXISTS `like_post` (
  `id` int(9) unsigned NOT NULL,
  `id_post` varchar(299) NOT NULL,
  `id_user_like` int(9) unsigned DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `pertemanan`
--

CREATE TABLE IF NOT EXISTS `pertemanan` (
  `id` int(9) unsigned NOT NULL,
  `id_yang_add` int(9) unsigned DEFAULT NULL,
  `id_yang_aprove` int(9) unsigned DEFAULT NULL,
  `status_add` int(11) NOT NULL DEFAULT '1',
  `status_aprove` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pertemanan`
--

INSERT INTO `pertemanan` (`id`, `id_yang_add`, `id_yang_aprove`, `status_add`, `status_aprove`) VALUES
(13, 34, 31, 1, 1),
(14, 34, 32, 1, 1),
(15, 31, 32, 1, 1),
(16, 33, 34, 1, 1),
(17, 33, 31, 1, 1),
(18, 33, 32, 1, 1),
(19, 31, 36, 1, 0),
(20, 31, 37, 1, 0),
(21, 34, 38, 1, 0),
(22, 42, 33, 1, 0),
(23, 32, 35, 1, 1),
(25, 32, 41, 1, 0),
(26, 32, 43, 1, 1),
(27, 31, 43, 1, 0),
(28, 31, 35, 1, 1),
(29, 44, 43, 1, 0),
(30, 44, 31, 1, 1),
(31, 44, 35, 1, 1),
(32, 44, 32, 1, 1),
(33, 31, 46, 1, 1),
(34, 46, 32, 1, 1),
(35, 47, 31, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE IF NOT EXISTS `post` (
  `id` varchar(299) NOT NULL,
  `id_user` int(9) unsigned DEFAULT NULL,
  `title` varchar(200) NOT NULL,
  `body` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`id`, `id_user`, `title`, `body`) VALUES
('2016-07-01T03:00:51.066Z-32-0', 32, 'Music Video', '<p style="text-align: center;"><span style="color: #0000ff;"><strong><em>Link : <a href="https://www.youtube.com/watch?v=t2B5tH8JoHA">https://www.youtube.com/watch?v=t2B5tH8JoHA</a></em></strong></span></p>\n<p style="text-align: center;"><span style="color: #0000ff;"><strong><em><iframe src="//www.youtube.com/embed/t2B5tH8JoHA" width="560" height="314" allowfullscreen="allowfullscreen"></iframe></em></strong></span></p>'),
('2016-07-01T03:03:21.494Z-32-1', 32, 'Musik Video', '<p style="text-align: center;"><em><strong><span style="color: #0000ff; background-color: #ffffff;">Link : <a href="https://www.youtube.com/watch?v=t2B5tH8JoHA">https://www.youtube.com/watch?v=t2B5tH8JoHA</a></span></strong></em></p>\n<p style="text-align: center;">&nbsp;</p>\n<p style="text-align: center;"><em><strong><span style="color: #0000ff; background-color: #ffffff;"><iframe src="//www.youtube.com/embed/t2B5tH8JoHA" width="800" height="600" allowfullscreen="allowfullscreen"></iframe></span></strong></em></p>\n<p style="text-align: justify;">&nbsp;</p>'),
('2016-07-01T03:09:14.399Z-33-0', 33, '<script>alert(''test'');</script>', '<p>test doank bro :D</p>'),
('2016-07-01T03:10:02.778Z-31-0', 31, 'test', '<p>test</p>'),
('2016-07-01T03:12:03.118Z-31-1', 31, 'hai nona manis', '<p><iframe src="//www.youtube.com/embed/AUsFMicKpAc" width="560" height="314" allowfullscreen="allowfullscreen"></iframe></p>\n<p>&nbsp;</p>\n<p>&nbsp;</p>\n<p>Film "<strong>Rudy Habibie</strong>" atau Habibie &amp; Ainun 2 merupakan film yang berasal dari tanah air Indonesia dengan genre Drama. Film <strong>Rudy Habibie 2016</strong> disutradarai oleh Hanung Bramantyo dan produser terkenal Manoj punjabi. Artist yang akan bermain di film Rudy Habibie adalah artist yang sudah berkompeten seperti Reza Rahadian, Chelsea Islan, Ernes prakasa, dan Indah permatasari. Film Indonesia Rudy Habibie akan tayang di bioskop pada tanggal 25 Juni 2016.<br /><br /><strong>Rudy Habibie</strong> adalah film kedua produksi MD pictures setelah film pertamanya yang berjudul Habibie &amp; Ainun. Film ini merupakan prekuel yang akan bercerita sosok BJ Habibie di kala muda yang kerab disapa dengan Rudie Habibie. Film Habibie &amp; Ainun merupakan film tersukses pada tahun 2012 mengalahkan film 5 Cm dan the Raid. Dan diharap Film Rudy Habibie ini akan mengulangi kesuksesan film Habibie &amp; Ainun.<br /><br /><strong>Rudy Habibie Movie </strong>akan menceritakan tentang cinta pertama Rudy yang bernama Ilona, Ilona adalah seorang gadis tulen berdarah Jerman. Ditambah lagi akan unsur comedy yang berada di film ini dengan kehadiran beberapa komika yaitu Ernest prakasa, Boris Bokir, dan pandji pragiwaksono.<br /><br />URL DCMA : <a href="http://www.pusatsinopsis.com/2016/03/sinopsis-film-rudy-habibie.html#ixzz4D7jQMDcU">http://www.pusatsinopsis.com/2016/03/sinopsis-film-rudy-habibie.html#ixzz4D7jQMDcU</a></p>\n<p>&nbsp;</p>\n<p>tailer</p>\n<p><iframe src="//www.youtube.com/embed/G4HH8kVI4OY" width="560" height="314" allowfullscreen="allowfullscreen"></iframe></p>\n<p>&nbsp;</p>'),
('2016-07-01T03:16:39.369Z-34-0', 34, 'Ingin Internet Gratis Android? Gunakan Aplikasi Ini', '<p>Android merupakan sistem operasi paling digandrungi oleh para pengguna smartphone saat ini. Sistem yang dikembangkan oleh Google ini memiliki bermacam versi, dan selalu membuat inovasi baru yang memanjakan para penggunanya. Pengguna smartphone berbasis android memang memerlukan pulsa untuk bisa berselancar di dunia maya, namun kamu bisa menikmati internet gratis android dengan menggunakan beberapa aplikasi. Tidak usah khawatir karena aplikasi ini bisa diunduh secara gratis, dan bisa digunakan melalui semua provider atau all operator. Dengan menggunakan aplikasi ini, kamu para pengguna android tidak perlu lagi mengeluhkan borosnya kuota untuk internetan karena cara ini tidak menyedot kuotamu alias gratis. Penasaran apa saja aplikasinya? Yuk, simak.</p>\n<h2>Software Internet Gratis Android</h2>\n<p>Para pengembang software memang pintar membaca situasi dimana kebutuhan akan internet gratis di ponsel pintar berbasis android sangat diminati sehingga muncullah berbagai software gratis untuk mengakses internet gratis. Pertama yaitu software Vortex VPN yang menjadi software paling banyak dipakai oleh kebanyakan orang. Software ini sangat mudah digunakan dan memberikan kepuasan bagi para pengguna untuk menikmati internet gratis android. Selain itu, software ini pun disediakan gratis sehingga memanjakan para penggila internet. Kedua yaitu software Open VPN yang bisa diunduh secara gratis di play store android. Software ini juga patut dicoba untuk mengakses internet secara gratis. Software selanjutnya yaitu Troid VPN yang telah banyak digunakan para pemburu internet gratisan. Troid VPN digandrungi orang kebanyakan karena memiliki keunggulan yakni adanya bonus kuota dari 40 MB hingga 1 GB dalam satu hari.</p>\n<p>Nah, sekarang kamu sudah tahu tentang gambaran aplikasi apa saja yang wajib diunduh demi mengakses internet tanpa biaya di ponsel pintarmu, kan? Jadi, tidak perlu galau lagi jika kamu tidak bisa eksis di dunia maya karena kuota internetmu habis karena itu semua bisa diakali dengan aplikasi-aplikasi di atas. Namun, dengan adanya kemudahan dalam berinternet, jangan sampai kamu keblabasan menggunakannya, dan jadilah pengguna internet yang bijak yang hanya memanfaatkan internet untuk hal-hal berguna. Untuk mengetahui aplikasi yang dapat diunduh demi mendapatkan akses internet gratis lainnya, coba cek saja di <a href="http://www.lintashape.com">http://www.lintashape.com</a>. Selamat berselancar gratis!</p>'),
('2016-07-01T03:21:32.747Z-34-1', 34, 'Download Video YouTube for Free Here!', '<p>YouTube is a social media which enables the users to download the video. There are lots of video that you can actually watch, such as, music video, tutorial information, movie and so on. Commonly, people also like to Download Video YouTube since they can watch it more conveniently so that they search for a site to download. There is a way that can be taken to download the video on YouTube. It is the convenient way that people like for the most so that they can watch the video without being afraid of buffering and so on. Well, it is such a good way to go.</p>\n<h2>How to Freely Download Video YouTube</h2>\n<p>In addition, it is very convenient that the process of downloading the video is very easy as well. Even it does not take a long time so that they can download as many as video that they like. It is known that many kinds of video on YouTube that can be downloaded. Hence, it is good to use when there is a site to Download Video YouTube. This is such a convenient way that people like for the most. Hence, you can just select the one that you like for the most to be downloaded.</p>\n<p>The site can be used conveniently so there will be no difficulties that people will have in downloading the video. You can just get the site of the YouTube and click the sign of downloading. On the other hand, you can try another way like copying the URL video and stat downloading. Both of the ways can be taken so that you can select the one which is very convenient all the way. This is very important for you to get the video with good quality. Hence, if you want to have the video just click <a href="http://www.linkgenerate.com/">Download Video YouTube</a> and select the one that you like.</p>'),
('2016-07-01T03:23:33.147Z-34-2', 34, 'Download Video YouTube for Free Here!', '<p>YouTube is a social media which enables the users to download the video. There are lots of video that you can actually watch, such as, music video, tutorial information, movie and so on. Commonly, people also like to Download Video YouTube since they can watch it more conveniently so that they search for a site to download. There is a way that can be taken to download the video on YouTube. It is the convenient way that people like for the most so that they can watch the video without being afraid of buffering and so on. Well, it is such a good way to go.</p>\n<h2>How to Freely Download Video YouTube</h2>\n<p>In addition, it is very convenient that the process of downloading the video is very easy as well. Even it does not take a long time so that they can download as many as video that they like. It is known that many kinds of video on YouTube that can be downloaded. Hence, it is good to use when there is a site to Download Video YouTube. This is such a convenient way that people like for the most. Hence, you can just select the one that you like for the most to be downloaded.</p>\n<p>The site can be used conveniently so there will be no difficulties that people will have in downloading the video. You can just get the site of the YouTube and click the sign of downloading. On the other hand, you can try another way like copying the URL video and stat downloading. Both of the ways can be taken so that you can select the one which is very convenient all the way. This is very important for you to get the video with good quality. Hence, if you want to have the video just click <a href="http://www.linkgenerate.com/">Download Video YouTube</a> and select the one that you like.</p>'),
('2016-07-01T04:53:29.687Z-32-2', 32, 'A', '<p>A</p>'),
('2016-07-01T04:55:08.128Z-32-3', 32, 'A', '<p>A</p>'),
('2016-07-01T04:55:37.927Z-31-2', 31, 'test', '<p>test</p>'),
('2016-07-01T04:58:08.899Z-32-4', 32, 'A', '<p>A</p>'),
('2016-07-01T05:00:09.625Z-32-5', 32, 'A', '<p>A</p>'),
('2016-07-01T06:20:30.122Z-34-3', 34, 'TEST', '<p>Ini Test ya</p>'),
('2016-07-01T06:22:30.485Z-34-4', 34, 'TEST', '<p>Ini Test ya</p>'),
('2016-07-01T06:24:31.779Z-34-5', 34, 'TEST', '<p>Ini Test ya</p>'),
('2016-07-01T07:42:23.363Z-31-3', 31, 'testing lagi', '<p>Kata siapa jadi jomblo itu ngenes? Akhir-akhir ini sepertinya para jomblowan dan jomblowati seringkali jadi sasaran empuk buat digencet dan jadi bahan ketawaan. Eits, jangan keburu seneng dulu udah bisa ngetawain temen-temen kamu yang masih jomblo.<br /><br />Dalam beberapa hal, orang-orang yang masih jomblo bisa ngetawain balik dan bikin kamu-kamu yang udah punya pasangan pada sirik sama mereka. Kalau kamu yang udah nggak single bisa pamer pacar kamu, orang jomblo juga bisa pamer kebahagian mereka loh.<br /><br /><strong>1. Nggak ada yang namanya stres karena cinta</strong><br /><br />Gimana mau stress karena cinta? Punya pacar aja enggak. Yang namanya pacaran, pasti dong beberapa kali ngalamin yang namanya konflik sama pacar. Nah, karena nggak punya pacar, nggak ada yang namanya berantem-berantem sama pacar, stress atau galau karena mikirin masalah pacaran. Yang dipikirin ya hidupnya sendiri, bukan orang lain.<br /><br /><strong>2. Bebas mau ngapain aja</strong><br /><br />Orang-orang jomblo pastinya bebas mau ngapain aja sesuka hati mereka. Mereka bebas ngelakuin hal-hal apa aja tanpa harus memikirkan dan mengedepankan orang lain.<br /><br /><strong>3. Kalau mau pergi nggak perlu pake ijin</strong><br /><br />Kalau yang satu ini, udah pasti mutlak nggak akan bisa dilakuin sama orang yang udah punya pasangan. Sekalinya pergi tanpa ijin dari sang pacar, udah pasti hati was-was dan pusing tujuh keliling nyari alesan buat nanti ngejelasin ke pacar. Kalau yang masih jomblo, mau pergi kemana aja juga santai.<br /><br /><strong>4. Nggak perlu repot-repot laporan</strong><br /><br />Kalau lagi hang out sama temen-temen, nggak perlu banget yang namanya wajib lapor sama pacar. Nggak perlu repot-repot ngabarin pergi sama siapa aja, ke mana, naik apa, sampai jam berapa atau pulang jam berapa.<br /><br /><strong>5. Kalau handphone lowbat, nggak bingung cari colokan</strong><br /><br />Orang-orang yang belum punya pasangan, nggak akan khawatir sama sekali kalau handphone miliknya habis baterai. Mereka nggak harus setiap saat rajin ngecek handphone. Beda kalau yang udah punya pacar. Kalau baterai udah tinggal 10%, kebanyakan mereka akan buru-buru nyari stop kontak buat nge-charge. Kalau handphone sampai mati, bisa-bisa kena omel sang pacar tuh.<br /><br /><strong>6. Nggak ada yang ngatur atau ngelarang</strong><br /><br />Kalau udah punya pacar, sedikit banyak pasti ada semacam perjanjian dan aturan-aturan yang udah disepakati bersama. Sebebas-bebasnya orang pacaran, nggak akan bisa sebebas orang yang masih menjomblo. Mereka bisa ikutan kegiatan apapun yang disukai, bisa ngelakuin apa aja tanpa ada syarat apapun.<br /><br /><strong>7. Bisa fokus sama diri sendiri</strong><br /><br />Orang jomblo bisa fokus penuh pada dirinya sendiri. Mereka punya banyak waktu hanya untuk dirinya sendiri, dan nggak harus ikut memikirkan kehidupan seseorang yang selalu ada di sampingnya.<br /><br /><strong>8. Nggak ada yang ganggu jadwal</strong><br /><br />Nggak ada yang bisa tiba-tiba ngeganggu jadwal main, olahraga atau lainnya hanya karena tiba-tiba disuruh nganterin dan ngejemput pacar, apalagi kalau pacarnya yang kelewat manja. Yang ada, jadwal seringkali jadi berantakan.<br /><br /><strong>9. Bebas dari tuntutan</strong><br /><br />Kalau udah sepakat komitmen sama pacar, pasti deh ada yang namanya sebuah tuntutan. Ada kan, pacar yang suka nuntut untuk selalu perhatianlah, nuntut untuk jadi seperti ini itulah, ada yang selalu nuntut traktir makan dan jalan-jalan lah. Nah, beruntunglah buat yang masih jomblo, karena nggak ada yang berani nuntut kamu untuk begini begitu.<br /><br /><strong>10. Terserah mau main sama siapa aja</strong><br /><br />Orang yang masih single, itu bebas banget mau main sama siapa aja. Mereka nggak perlu khawatir untuk dibatesin main sama sahabat-sahabat kamu. Nggak ada yang jealous kalau lagi main sama sahabat deket yang beda jenis kelamin.<br /><br /><strong>11. Bisa jalan-jalan kemana dan kapan aja sesuka hati</strong><br /><br />Hal yang paling membahagiakan dari orang yang nggak punya pacar adalah kebebasan. Orang yang masih single itu bisa travelling kemana dan kapan aja. Bisa bebas jalan-jalan menikmati hidup tanpa terusik dengan kewajiban-kewajiban yang harus dilakukan sebagai seorang pacar. Mau pergi jalan-jalan selama apapun juga, orang jomblo nggak akan takut bakal diancem putus.<br /><br />Tuh, jadi jomblo itu juga banyak enaknya kok! Nggak se-ngenes dan se-suram yang orang-orang tudingkan. Orang-orang yang masih single memang punya hidup yang sangat menyenangkan, karena mereka bebas bisa ngelakuin apapun yang mereka mau. Ya, mau jomblo atau udah pacaran, semuanya ada plus dan minusnya. Meskipun orang jomblo belum punya seseorang yang menempati hati mereka, mereka masih bisa bilang I&rsquo;m single and very happy!<br /><br />Jadi, setelah baca artikel ini,&nbsp; masih mau pacaran atau mau jomblo nih guys?</p>'),
('2016-07-01T07:53:07.751Z-31-4', 31, 'Kamu jomblo jangan sedih', '<p>Kata siapa jadi jomblo itu ngenes? Akhir-akhir ini sepertinya para jomblowan dan jomblowati seringkali jadi sasaran empuk buat digencet dan jadi bahan ketawaan. Eits, jangan keburu seneng dulu udah bisa ngetawain temen-temen kamu yang masih jomblo.<br /><br />Dalam beberapa hal, orang-orang yang masih jomblo bisa ngetawain balik dan bikin kamu-kamu yang udah punya pasangan pada sirik sama mereka. Kalau kamu yang udah nggak single bisa pamer pacar kamu, orang jomblo juga bisa pamer kebahagian mereka loh.<br /><br /><strong>1. Nggak ada yang namanya stres karena cinta</strong><br /><br />Gimana mau stress karena cinta? Punya pacar aja enggak. Yang namanya pacaran, pasti dong beberapa kali ngalamin yang namanya konflik sama pacar. Nah, karena nggak punya pacar, nggak ada yang namanya berantem-berantem sama pacar, stress atau galau karena mikirin masalah pacaran. Yang dipikirin ya hidupnya sendiri, bukan orang lain.<br /><br /><strong>2. Bebas mau ngapain aja</strong><br /><br />Orang-orang jomblo pastinya bebas mau ngapain aja sesuka hati mereka. Mereka bebas ngelakuin hal-hal apa aja tanpa harus memikirkan dan mengedepankan orang lain.<br /><br /><strong>3. Kalau mau pergi nggak perlu pake ijin</strong><br /><br />Kalau yang satu ini, udah pasti mutlak nggak akan bisa dilakuin sama orang yang udah punya pasangan. Sekalinya pergi tanpa ijin dari sang pacar, udah pasti hati was-was dan pusing tujuh keliling nyari alesan buat nanti ngejelasin ke pacar. Kalau yang masih jomblo, mau pergi kemana aja juga santai.<br /><br /><strong>4. Nggak perlu repot-repot laporan</strong><br /><br />Kalau lagi hang out sama temen-temen, nggak perlu banget yang namanya wajib lapor sama pacar. Nggak perlu repot-repot ngabarin pergi sama siapa aja, ke mana, naik apa, sampai jam berapa atau pulang jam berapa.<br /><br /><strong>5. Kalau handphone lowbat, nggak bingung cari colokan</strong><br /><br />Orang-orang yang belum punya pasangan, nggak akan khawatir sama sekali kalau handphone miliknya habis baterai. Mereka nggak harus setiap saat rajin ngecek handphone. Beda kalau yang udah punya pacar. Kalau baterai udah tinggal 10%, kebanyakan mereka akan buru-buru nyari stop kontak buat nge-charge. Kalau handphone sampai mati, bisa-bisa kena omel sang pacar tuh.<br /><br /><strong>6. Nggak ada yang ngatur atau ngelarang</strong><br /><br />Kalau udah punya pacar, sedikit banyak pasti ada semacam perjanjian dan aturan-aturan yang udah disepakati bersama. Sebebas-bebasnya orang pacaran, nggak akan bisa sebebas orang yang masih menjomblo. Mereka bisa ikutan kegiatan apapun yang disukai, bisa ngelakuin apa aja tanpa ada syarat apapun.<br /><br /><strong>7. Bisa fokus sama diri sendiri</strong><br /><br />Orang jomblo bisa fokus penuh pada dirinya sendiri. Mereka punya banyak waktu hanya untuk dirinya sendiri, dan nggak harus ikut memikirkan kehidupan seseorang yang selalu ada di sampingnya.<br /><br /><strong>8. Nggak ada yang ganggu jadwal</strong><br /><br />Nggak ada yang bisa tiba-tiba ngeganggu jadwal main, olahraga atau lainnya hanya karena tiba-tiba disuruh nganterin dan ngejemput pacar, apalagi kalau pacarnya yang kelewat manja. Yang ada, jadwal seringkali jadi berantakan.<br /><br /><strong>9. Bebas dari tuntutan</strong><br /><br />Kalau udah sepakat komitmen sama pacar, pasti deh ada yang namanya sebuah tuntutan. Ada kan, pacar yang suka nuntut untuk selalu perhatianlah, nuntut untuk jadi seperti ini itulah, ada yang selalu nuntut traktir makan dan jalan-jalan lah. Nah, beruntunglah buat yang masih jomblo, karena nggak ada yang berani nuntut kamu untuk begini begitu.<br /><br /><strong>10. Terserah mau main sama siapa aja</strong><br /><br />Orang yang masih single, itu bebas banget mau main sama siapa aja. Mereka nggak perlu khawatir untuk dibatesin main sama sahabat-sahabat kamu. Nggak ada yang jealous kalau lagi main sama sahabat deket yang beda jenis kelamin.<br /><br /><strong>11. Bisa jalan-jalan kemana dan kapan aja sesuka hati</strong><br /><br />Hal yang paling membahagiakan dari orang yang nggak punya pacar adalah kebebasan. Orang yang masih single itu bisa travelling kemana dan kapan aja. Bisa bebas jalan-jalan menikmati hidup tanpa terusik dengan kewajiban-kewajiban yang harus dilakukan sebagai seorang pacar. Mau pergi jalan-jalan selama apapun juga, orang jomblo nggak akan takut bakal diancem putus.<br /><br />Tuh, jadi jomblo itu juga banyak enaknya kok! Nggak se-ngenes dan se-suram yang orang-orang tudingkan. Orang-orang yang masih single memang punya hidup yang sangat menyenangkan, karena mereka bebas bisa ngelakuin apapun yang mereka mau. Ya, mau jomblo atau udah pacaran, semuanya ada plus dan minusnya. Meskipun orang jomblo belum punya seseorang yang menempati hati mereka, mereka masih bisa bilang I&rsquo;m single and very happy!<br /><br />Jadi, setelah baca artikel ini,&nbsp; masih mau pacaran atau mau jomblo nih guys?</p>'),
('2016-07-01T07:54:33.568Z-31-5', 31, 'Kamu jomblo jangan sedih', '<p>Kata siapa jadi jomblo itu ngenes? Akhir-akhir ini sepertinya para jomblowan dan jomblowati seringkali jadi sasaran empuk buat digencet dan jadi bahan ketawaan. Eits, jangan keburu seneng dulu udah bisa ngetawain temen-temen kamu yang masih jomblo.<br /><br />Dalam beberapa hal, orang-orang yang masih jomblo bisa ngetawain balik dan bikin kamu-kamu yang udah punya pasangan pada sirik sama mereka. Kalau kamu yang udah nggak single bisa pamer pacar kamu, orang jomblo juga bisa pamer kebahagian mereka loh.<br /><br /><strong>1. Nggak ada yang namanya stres karena cinta</strong><br /><br />Gimana mau stress karena cinta? Punya pacar aja enggak. Yang namanya pacaran, pasti dong beberapa kali ngalamin yang namanya konflik sama pacar. Nah, karena nggak punya pacar, nggak ada yang namanya berantem-berantem sama pacar, stress atau galau karena mikirin masalah pacaran. Yang dipikirin ya hidupnya sendiri, bukan orang lain.<br /><br /><strong>2. Bebas mau ngapain aja</strong><br /><br />Orang-orang jomblo pastinya bebas mau ngapain aja sesuka hati mereka. Mereka bebas ngelakuin hal-hal apa aja tanpa harus memikirkan dan mengedepankan orang lain.<br /><br /><strong>3. Kalau mau pergi nggak perlu pake ijin</strong><br /><br />Kalau yang satu ini, udah pasti mutlak nggak akan bisa dilakuin sama orang yang udah punya pasangan. Sekalinya pergi tanpa ijin dari sang pacar, udah pasti hati was-was dan pusing tujuh keliling nyari alesan buat nanti ngejelasin ke pacar. Kalau yang masih jomblo, mau pergi kemana aja juga santai.<br /><br /><strong>4. Nggak perlu repot-repot laporan</strong><br /><br />Kalau lagi hang out sama temen-temen, nggak perlu banget yang namanya wajib lapor sama pacar. Nggak perlu repot-repot ngabarin pergi sama siapa aja, ke mana, naik apa, sampai jam berapa atau pulang jam berapa.<br /><br /><strong>5. Kalau handphone lowbat, nggak bingung cari colokan</strong><br /><br />Orang-orang yang belum punya pasangan, nggak akan khawatir sama sekali kalau handphone miliknya habis baterai. Mereka nggak harus setiap saat rajin ngecek handphone. Beda kalau yang udah punya pacar. Kalau baterai udah tinggal 10%, kebanyakan mereka akan buru-buru nyari stop kontak buat nge-charge. Kalau handphone sampai mati, bisa-bisa kena omel sang pacar tuh.<br /><br /><strong>6. Nggak ada yang ngatur atau ngelarang</strong><br /><br />Kalau udah punya pacar, sedikit banyak pasti ada semacam perjanjian dan aturan-aturan yang udah disepakati bersama. Sebebas-bebasnya orang pacaran, nggak akan bisa sebebas orang yang masih menjomblo. Mereka bisa ikutan kegiatan apapun yang disukai, bisa ngelakuin apa aja tanpa ada syarat apapun.<br /><br /><strong>7. Bisa fokus sama diri sendiri</strong><br /><br />Orang jomblo bisa fokus penuh pada dirinya sendiri. Mereka punya banyak waktu hanya untuk dirinya sendiri, dan nggak harus ikut memikirkan kehidupan seseorang yang selalu ada di sampingnya.<br /><br /><strong>8. Nggak ada yang ganggu jadwal</strong><br /><br />Nggak ada yang bisa tiba-tiba ngeganggu jadwal main, olahraga atau lainnya hanya karena tiba-tiba disuruh nganterin dan ngejemput pacar, apalagi kalau pacarnya yang kelewat manja. Yang ada, jadwal seringkali jadi berantakan.<br /><br /><strong>9. Bebas dari tuntutan</strong><br /><br />Kalau udah sepakat komitmen sama pacar, pasti deh ada yang namanya sebuah tuntutan. Ada kan, pacar yang suka nuntut untuk selalu perhatianlah, nuntut untuk jadi seperti ini itulah, ada yang selalu nuntut traktir makan dan jalan-jalan lah. Nah, beruntunglah buat yang masih jomblo, karena nggak ada yang berani nuntut kamu untuk begini begitu.<br /><br /><strong>10. Terserah mau main sama siapa aja</strong><br /><br />Orang yang masih single, itu bebas banget mau main sama siapa aja. Mereka nggak perlu khawatir untuk dibatesin main sama sahabat-sahabat kamu. Nggak ada yang jealous kalau lagi main sama sahabat deket yang beda jenis kelamin.<br /><br /><strong>11. Bisa jalan-jalan kemana dan kapan aja sesuka hati</strong><br />&nbsp;<br />Hal yang paling membahagiakan dari orang yang nggak punya pacar adalah kebebasan. Orang yang masih single itu bisa travelling kemana dan kapan aja. Bisa bebas jalan-jalan menikmati hidup tanpa terusik dengan kewajiban-kewajiban yang harus dilakukan sebagai seorang pacar. Mau pergi jalan-jalan selama apapun juga, orang jomblo nggak akan takut bakal diancem putus.<br /><br />Tuh, jadi jomblo itu juga banyak enaknya kok! Nggak se-ngenes dan se-suram yang orang-orang tudingkan. Orang-orang yang masih single memang punya hidup yang sangat menyenangkan, karena mereka bebas bisa ngelakuin apapun yang mereka mau. Ya, mau jomblo atau udah pacaran, semuanya ada plus dan minusnya. Meskipun orang jomblo belum punya seseorang yang menempati hati mereka, mereka masih bisa bilang I&rsquo;m single and very happy!<br /><br />Jadi, setelah baca artikel ini,&nbsp; masih mau pacaran atau mau jomblo nih guys?</p>'),
('2016-07-01T07:55:08.446Z-31-6', 31, 'Kamu jomblo jangan sedih', '<p>Kata siapa jadi jomblo itu ngenes? Akhir-akhir ini sepertinya para jomblowan dan jomblowati seringkali jadi sasaran empuk buat digencet dan jadi bahan ketawaan. Eits, jangan keburu seneng dulu udah bisa ngetawain temen-temen kamu yang masih jomblo.<br /><br />Dalam beberapa hal, orang-orang yang masih jomblo bisa ngetawain balik dan bikin kamu-kamu yang udah punya pasangan pada sirik sama mereka. Kalau kamu yang udah nggak single bisa pamer pacar kamu, orang jomblo juga bisa pamer kebahagian mereka loh.<br /><br /><strong>1. Nggak ada yang namanya stres karena cinta</strong><br /><br />Gimana mau stress karena cinta? Punya pacar aja enggak. Yang namanya pacaran, pasti dong beberapa kali ngalamin yang namanya konflik sama pacar. Nah, karena nggak punya pacar, nggak ada yang namanya berantem-berantem sama pacar, stress atau galau karena mikirin masalah pacaran. Yang dipikirin ya hidupnya sendiri, bukan orang lain.<br /><br /><strong>2. Bebas mau ngapain aja</strong><br /><br />Orang-orang jomblo pastinya bebas mau ngapain aja sesuka hati mereka. Mereka bebas ngelakuin hal-hal apa aja tanpa harus memikirkan dan mengedepankan orang lain.<br /><br /><strong>3. Kalau mau pergi nggak perlu pake ijin</strong><br /><br />Kalau yang satu ini, udah pasti mutlak nggak akan bisa dilakuin sama orang yang udah punya pasangan. Sekalinya pergi tanpa ijin dari sang pacar, udah pasti hati was-was dan pusing tujuh keliling nyari alesan buat nanti ngejelasin ke pacar. Kalau yang masih jomblo, mau pergi kemana aja juga santai.<br /><br /><strong>4. Nggak perlu repot-repot laporan</strong><br /><br />Kalau lagi hang out sama temen-temen, nggak perlu banget yang namanya wajib lapor sama pacar. Nggak perlu repot-repot ngabarin pergi sama siapa aja, ke mana, naik apa, sampai jam berapa atau pulang jam berapa.<br /><br /><strong>5. Kalau handphone lowbat, nggak bingung cari colokan</strong><br /><br />Orang-orang yang belum punya pasangan, nggak akan khawatir sama sekali kalau handphone miliknya habis baterai. Mereka nggak harus setiap saat rajin ngecek handphone. Beda kalau yang udah punya pacar. Kalau baterai udah tinggal 10%, kebanyakan mereka akan buru-buru nyari stop kontak buat nge-charge. Kalau handphone sampai mati, bisa-bisa kena omel sang pacar tuh.<br /><br /><strong>6. Nggak ada yang ngatur atau ngelarang</strong><br /><br />Kalau udah punya pacar, sedikit banyak pasti ada semacam perjanjian dan aturan-aturan yang udah disepakati bersama. Sebebas-bebasnya orang pacaran, nggak akan bisa sebebas orang yang masih menjomblo. Mereka bisa ikutan kegiatan apapun yang disukai, bisa ngelakuin apa aja tanpa ada syarat apapun.<br /><br /><strong>7. Bisa fokus sama diri sendiri</strong><br /><br />Orang jomblo bisa fokus penuh pada dirinya sendiri. Mereka punya banyak waktu hanya untuk dirinya sendiri, dan nggak harus ikut memikirkan kehidupan seseorang yang selalu ada di sampingnya.<br /><br /><strong>8. Nggak ada yang ganggu jadwal</strong><br /><br />Nggak ada yang bisa tiba-tiba ngeganggu jadwal main, olahraga atau lainnya hanya karena tiba-tiba disuruh nganterin dan ngejemput pacar, apalagi kalau pacarnya yang kelewat manja. Yang ada, jadwal seringkali jadi berantakan.<br /><br /><strong>9. Bebas dari tuntutan</strong><br /><br />Kalau udah sepakat komitmen sama pacar, pasti deh ada yang namanya sebuah tuntutan. Ada kan, pacar yang suka nuntut untuk selalu perhatianlah, nuntut untuk jadi seperti ini itulah, ada yang selalu nuntut traktir makan dan jalan-jalan lah. Nah, beruntunglah buat yang masih jomblo, karena nggak ada yang berani nuntut kamu untuk begini begitu.<br /><br /><strong>10. Terserah mau main sama siapa aja</strong><br /><br />Orang yang masih single, itu bebas banget mau main sama siapa aja. Mereka nggak perlu khawatir untuk dibatesin main sama sahabat-sahabat kamu. Nggak ada yang jealous kalau lagi main sama sahabat deket yang beda jenis kelamin.<br /><br /><strong>11. Bisa jalan-jalan kemana dan kapan aja sesuka hati</strong><br /><br />Hal yang paling membahagiakan dari orang yang nggak punya pacar adalah kebebasan. Orang yang masih single itu bisa travelling kemana dan kapan aja. Bisa bebas jalan-jalan menikmati hidup tanpa terusik dengan kewajiban-kewajiban yang harus dilakukan sebagai seorang pacar. Mau pergi jalan-jalan selama apapun juga, orang jomblo nggak akan takut bakal diancem putus.<br /><br />Tuh, jadi jomblo itu juga banyak enaknya kok! Nggak se-ngenes dan se-suram yang orang-orang tudingkan. Orang-orang yang masih single memang punya hidup yang sangat menyenangkan, karena mereka bebas bisa ngelakuin apapun yang mereka mau. Ya, mau jomblo atau udah pacaran, semuanya ada plus dan minusnya. Meskipun orang jomblo belum punya seseorang yang menempati hati mereka, mereka masih bisa bilang I&rsquo;m single and very happy!<br /><br />Jadi, setelah baca artikel ini,&nbsp; masih mau pacaran atau mau jomblo nih guys?</p>'),
('2016-07-01T08:00:43.600Z-31-7', 31, 'Jomblo ?', '<div id="post15636463192754320261">\n<div>enjadi Jomblo memang suatu pilihan hidup. buat kalian yang Jomblo jangan terlalu sedih memikirkan perasaan yang kadang mengiris hati, memang <strong>Jomblo</strong> selalu dikait-kaitkan dengan rasa Kesepian dan Kesendirian, tapi ngga jarang juga kok yang pacaran masih galau terus-terusan. apa kalian ngga malu menghina jomblo terus-terusan sampai kalian ngga sadar kalau kebahagiaan kalian pun ngga jelas ? kalian yang menghina para jomblo pasti bakalan ngerasain gimana sih jadi jomblo, sebelum kalian pacaran juga pasti <em>Jomblo </em>dulu kan? jadi jangan terlalu sombong untuk memamerkan statusnya, ibaratkan kacang lupa kulitnya, ingat sob, dunia ini bulat dan selalu berputar kadang kamu berada diatas dan kadang kamu berada dibawah, jangan merendahkan siapapun didalam hidup. malah orang-orang yang Jomblo itu justru lebih kreatif mereka lebih mandiri, ya ngga jarang juga yang Jomblo malah sukses duluan.</div>\n<div>&nbsp;</div>\n<div><u><em><strong>Kata Kata Jomblo Sejati</strong></em></u> - memang didalam urusan Asmara jomblo terbilang gagal, atau mungkin buat sebagian orang status asmara bukanlah menjadi tujuan utama saat ini. mereka lebih mementingkan karir terlebih dahulu baru deh mikirin soal Cinta, apa iya kalian bakalan makan cinta nantinya ? kalian pacaran juga masih minta uang orang tua kan? kalo emang pacaran membuat kamu lebih maju dan lebih sukses buat meraih masa depan ya good luck deh, nah tapi kalo pacar kamu malah melorotin kamu, malah mengganggu karir kamu gimana coba? kalian yang bakalan rugi sendiri, masa depan kalian ya tergantung pasanganmu sekarang. inget, kalian itu udah dewasa, bukan lagi pacaran buat seneng-seneng, buat gaya-gayaan, tapi buat merencanakan masa depan dan kehidupan bersama.</div>\n<div>&nbsp;</div>\n<div><a href="http://www.kalimatcinta.com/2014/04/kata-kata-mutiara-jomblo-bahagia.html" target="_blank" rel="nofollow"><u><strong>Kata Kata Bijak Jomblo</strong></u></a> - buat kamu yang Jomblo usahakan ya dipikirin lah dari sekarang mengenai Kondisi Asmaramu, memang mengejar karir itu sangatlah penting agar hidup kita ngga bakalan susah nantinya, tapi kalau kamu selalu melewatkan kesempatan yang ada, nanti malah kamu kehabisan umur dan terjebak dengan pasangan yang seadanya mau? ya diimbangi lah usaha sama doa, karena kalian juga butuh sosok penyemangat dan pemberi perhatian agar hidup kalian itu lebih berwarna.</div>\n<div>&nbsp;</div>\n<table class="tr-caption-container" cellspacing="0" cellpadding="0" align="center">\n<tbody>\n<tr>\n<td><a href="http://1.bp.blogspot.com/-DYpEnKxLsr4/U0z_i0BRo6I/AAAAAAAAAbY/3Mxxza_oSlM/s1600/Kata+Kata+Mutiara+Jomblo+Bahagia.gif"><img title="Kata Kata Mutiara Jomblo Bahagia " src="https://1.bp.blogspot.com/-DYpEnKxLsr4/U0z_i0BRo6I/AAAAAAAAAbY/3Mxxza_oSlM/s1600/Kata+Kata+Mutiara+Jomblo+Bahagia.gif" alt="Kata Kata Mutiara Jomblo Bahagia " width="320" height="128" border="0" /></a></td>\n</tr>\n<tr>\n<td class="tr-caption">Sumber : <span class="_Uk"><span class="irc_ho" dir="ltr">www.thedailytouch.com</span></span></td>\n</tr>\n</tbody>\n</table>\n<div>&nbsp;</div>\n<div>Nah, buat kalian yang sedang <u>Jomblo atau Single</u> jangan terlalu bersedih berikut silahkan disimak <u><strong>Kata Kata Mutiara Indah Jomblo Sejati</strong></u> :</div>\n<div>&nbsp;</div>\n<div>\n<blockquote class="tr_bq">Yang penting mulia disisi Allah,nikah memang mulia tapi blum brani mengambil kputusan tuk mnikah,mending jomblo gar tetap mulia disisi Allah<br /><br />Menjadi kebiasaan terdiam di rumah bukan hanya malam minggu,bukan karna jomblo,tp memang wanita muslimah hendaknya tdk keluar malam<br /><br />Jomblo?ada dua alasan: apa memang dia nggak laku atau memang dia selektif.<br /><br />kamu jomblo itu memang bukan maunya kamu. tapi maunya tuhan.<br /><br />jomblo itu gak boleh ngeluh. kita harus menjadi pemicu semangat untuk orang-orang yang sedang patah hati.<br /><br />Single atau jomblo selalu diidentikkan dengan kesendirian dan kegalauan padahal menjadi single tidak selalu jelek loh<br /><br />Jomblo bukanlah aib, jikalau saat ini itu menjadi pilihan yang tepat maka pilihlah pilihan itu, karena Jomblo lebih mulia daripada pacaran<br /><br />Menjadi lajang/single/jomblo bukan berarti tidak bahagia dan tidak laku. Mungkin hanya sedang tidak ingin terlibat dengan drama berlebihan<br /><br />Jomblo Pasti Berlalu... Semua ada saatnya, saat semua kesendirian menjadi sebuah kebersamaan dengannya kekasih halal. Bersabarlah<br /><br />Untuk apa aku melakukan hal yang dilarang Tuhanku? Aku senang menjadi jomblo karena menurutku ini adlh cara Tuhan dlm melindungi keimananku</blockquote>\n</div>\n</div>\n<div class="googlepublisherads">&nbsp;</div>\n<div id="post25636463192754320261">Menjadi jomblo ternyata membuat Anda lebih ekonomis. Sehingga anda bisa lebih irit dan anda juga bisa menyimpan/menabung uang anda. <br /><br />Saat menjadi JOMBLO anda bisa lebih fokus mengejar karier dan meraih impian anda tanpa gangguan yg bernama cinta dan asmara.<br /><br />Jomblo bukan hal menyedihkan nak, jika punya waktu untuk berkarya kenapa tidak? Kekasih terbaik datang saat dirimu menjadi terbaik<br /><br />Kecemasan menjadi jomblo tidak akan membuatmu menjadi tidak jomblo. Lebih baik dewasakan hidupmu, sembari menunggu dia datang.<br /><br />Sebenarnya banyak keuntungan menjadi Jomblo. Salah satu keuntungannya, kamu bebas memilih mana calon pasangan yang cocok buat kamu. Betul?<br /><br />Jomblo: ingin pacaran tapi tak ada yang bisa dipacarin. Single: tak ingin pacaran tapi banyak yang siap menjadi pacarnya<br /><br />Bangga menjadi jomblo. Tidak malam mingguan. Tidak menghabiskan uang. Dan mengisi aktivitas bermanfaat.<br /><br />Saat jomblo, Anda akan punya banyak untuk bertemu dengan teman atau orang baru. Hal ini bisa menjadi satu cara untuk menemukan cinta baru.<br /><br />Nikmati aja status kamu saat ini dan jangan iri. Karena ada orang yg bosan menjadi jomblo dan ada juga orang yg bosan saat pacaran.<br /><br />Banggalah menjadi jomblo berkualitas yang menghasilkan karya, daripada pacaran galau yang menghambat kamu berkarya.<br /><br />Banggalah menjadi jomblo. Tunjukkan sikap produktif dan mental sukses. Lalu nikahilah wanita anggun yg lebih hebat dari pacar kawan2mu.<br /><br />Dengan Jomblo. Kamu bisa fokus sama diri sendiri. Fokus perbaikan diri, memantaskan diri menjadi yang terbaik untuk sang halal nanti.<br /><br />Karena jomblo tidak jomblo biarlah menjadi urusan masing-masing darimu. Karena kebahagiaan bagi tiap-tiap kamu adalah berbeda.<br /><br />jomblo mengajarkanmu bagaimana membenahi diri dan menjadi lebih baik lagi, mblo<br /><br />menjadi jomblo itu bukanlah sebuah kekurangan, tetapi proses yg harus dilewati untuk menemukan pasangan sejatinya<br /><br />Lebih baik menjadi jomblo, untuk bernafas sejenak karena cinta itu melelahkan; saat orang yang tepat tak kunjung didapatkan.<br /><br />seorang jomblo itu di jaga Allah. jomblo itu di sayang Allah. ia terhindar dari nafsu syetan yang menjelma menjadi &ldquo;cinta&rdquo;<br /><br />Meratapi nasib menjadi jomblo adalah hal ''cengeng'' yang gak pantas dilakukan bagi manusia istimewa sepertimu. Move on kawan :)<br /><br />Jodoh tidak serta merta menjadi dekat hanya karena kamu pacaran, pun tidak akan menjadi sangat jauh hanya gara-gara kamu jomblo<br /><br />Memilih menjadi jomblowati memang tak mudah ditengah kemajuan zaman yg menganggap JOMBLO ketinggalan zaman. Tapi untuk Allah, apa yg sulit?<br /><br />Yang mesti kamu takuti bukanlah saat menjadi Jomblo, tapi saat kamu punya pasangan namun tak mampu membahagiakan...<br /><br />Memilih JOMBLO itu bahagia. Karena menjadi pribadi tak mudah tergoda.<br /><br />Jomblo bahagia itu bisa diusahakan. Tapi berusaha menjadi jomblo tabah lebih mudah.<br /><br />Pacarmu belum tentu mnjadi jodohmu! Tapi jodohmu sudah pasti menjadi pacarmu, berbanggalah menjadi seorang Jomblo.. Sudahi atau Nikahi!<br /><br />Single/Jomblo! Syukuri dulu aja. Nikmati waktu" bebasnya. Sebelum kebebasan kalian direnggut ketika menjadi couple!<br /><br />Ngejomblo itu enak kok.Krn dgn menjadi jomblo lo bebas menjalani aktifitas banyak tanpa hrs mikirin cewek lo dan bebas berteman dgn sapa aja<br /><br />Jadilah jomblo yang ikhlas. Menjadi jomblo karena benar-benar ingin mendapatkan kebaikan di sisi-Nya<br /><br />Menjadi jomblo itu gak perlu sedih atau menangis dan hal" yg gak penting menjadi jomblo itu lebih baik bahagiain org lain lebih asik<br /><br />Menjadi jomblo itu bukanlah merupakan suatu dosa, karena di alam kubur nanti yang ditanya adalah siapa Tuhanmu, bukan siapa pacarmu ?<br /><br />Menjadi Jomblo itu lebih sehat. Bisa tidur lebih awal, juga ga ada keharusan ngangkat Telp malam-malam.<br /><br />Jangan sedih menjadi jomblo ataupun single. Karena jodoh ada di tangan Tuhan. Lagipula, jomblo/single seru kok. Bisa bebas :D<br /><br />Gpp masih jomblo dan status ga rubah juga, yg penting sikap dan akhlak kita berubah menjadi lebih baik.<br /><br />Ketika Jomblo Bertasbih, ga ada lagi hati yang sedih, yang ada semangat memperpantaskan diri menjadi makin gigih..<br /><br />Kita ngak harus melakukan apapun untuk bertahan menjadi jomblo sejati.. Pasrah dan sabar aja.. itu udah lebih dari cukup kok&hellip;<br /><br />Jodoh tidak serta merta menjadi dekat hanya karena kamu pacaran, pun tidak akan menjadi sangat jauh hanya gara-gara kamu jomblo<br /><br />Jangan sedih menjadi jomblo, seharusnya yg sedih itu mereka yg punya pacar, karena mereka iri dengan kebebasan kaum jomblo\n<div>&nbsp;</div>\n<div>Itulah informasi terbaru seputar <a href="http://www.kalimatcinta.com/2014/04/kata-kata-mutiara-jomblo-bahagia.html" target="_blank" rel="nofollow"><em><strong>Kata Kata Mutiara Jomblo Bahagia</strong></em></a>, semoga artikel diatas dapat bermanfaat buat kalian semuanya. jadikan kata-kata diatas untuk inspirasi dan motivasi agar kehidupan kalian menjadi lebih baik. inget, jangan terlalu bersedih dengan status kamu yang masih Jomblo, tunjukin lah kalau kamu bisa berkarya dan bermanfaat, tunjukin kalau Jomblo itu ngga seburuk yang dibayangkan kok. tetep semangat jadikan<strong>Jomblo</strong> ini sebagai waktu kamu mengeksplore diri kamu.</div>\n</div>');
INSERT INTO `post` (`id`, `id_user`, `title`, `body`) VALUES
('2016-07-01T08:09:09.345Z-31-8', 31, 'jomblo ?', '<div id="post15636463192754320261">\n<div>menjadi Jomblo memang suatu pilihan hidup. buat kalian yang Jomblo jangan terlalu sedih memikirkan perasaan yang kadang mengiris hati, memang <strong>Jomblo</strong> selalu dikait-kaitkan dengan rasa Kesepian dan Kesendirian, tapi ngga jarang juga kok yang pacaran masih galau terus-terusan. apa kalian ngga malu menghina jomblo terus-terusan sampai kalian ngga sadar kalau kebahagiaan kalian pun ngga jelas ? kalian yang menghina para jomblo pasti bakalan ngerasain gimana sih jadi jomblo, sebelum kalian pacaran juga pasti <em>Jomblo </em>dulu kan? jadi jangan terlalu sombong untuk memamerkan statusnya, ibaratkan kacang lupa kulitnya, ingat sob, dunia ini bulat dan selalu berputar kadang kamu berada diatas dan kadang kamu berada dibawah, jangan merendahkan siapapun didalam hidup. malah orang-orang yang Jomblo itu justru lebih kreatif mereka lebih mandiri, ya ngga jarang juga yang Jomblo malah sukses duluan.&nbsp;</div>\n<div>&nbsp;</div>\n<div><u><em><strong>Kata Kata Jomblo Sejati</strong></em></u> - memang didalam urusan Asmara jomblo terbilang gagal, atau mungkin buat sebagian orang status asmara bukanlah menjadi tujuan utama saat ini. mereka lebih mementingkan karir terlebih dahulu baru deh mikirin soal Cinta, apa iya kalian bakalan makan cinta nantinya ? kalian pacaran juga masih minta uang orang tua kan? kalo emang pacaran membuat kamu lebih maju dan lebih sukses buat meraih masa depan ya good luck deh, nah tapi kalo pacar kamu malah melorotin kamu, malah mengganggu karir kamu gimana coba? kalian yang bakalan rugi sendiri, masa depan kalian ya tergantung pasanganmu sekarang. inget, kalian itu udah dewasa, bukan lagi pacaran buat seneng-seneng, buat gaya-gayaan, tapi buat merencanakan masa depan dan kehidupan bersama.</div>\n<div>&nbsp;</div>\n<div><a href="http://www.kalimatcinta.com/2014/04/kata-kata-mutiara-jomblo-bahagia.html" target="_blank" rel="nofollow"><u><strong>Kata Kata Bijak Jomblo</strong></u></a> - buat kamu yang Jomblo usahakan ya dipikirin lah dari sekarang mengenai Kondisi Asmaramu, memang mengejar karir itu sangatlah penting agar hidup kita ngga bakalan susah nantinya, tapi kalau kamu selalu melewatkan kesempatan yang ada, nanti malah kamu kehabisan umur dan terjebak dengan pasangan yang seadanya mau? ya diimbangi lah usaha sama doa, karena kalian juga butuh sosok penyemangat dan pemberi perhatian agar hidup kalian itu lebih berwarna.</div>\n<div>&nbsp;</div>\n<table class="tr-caption-container" cellspacing="0" cellpadding="0" align="center">\n<tbody>\n<tr>\n<td><a href="http://1.bp.blogspot.com/-DYpEnKxLsr4/U0z_i0BRo6I/AAAAAAAAAbY/3Mxxza_oSlM/s1600/Kata+Kata+Mutiara+Jomblo+Bahagia.gif"><img title="Kata Kata Mutiara Jomblo Bahagia " src="https://1.bp.blogspot.com/-DYpEnKxLsr4/U0z_i0BRo6I/AAAAAAAAAbY/3Mxxza_oSlM/s1600/Kata+Kata+Mutiara+Jomblo+Bahagia.gif" alt="Kata Kata Mutiara Jomblo Bahagia " width="320" height="128" border="0" /></a></td>\n</tr>\n<tr>\n<td class="tr-caption">Sumber : <span class="_Uk"><span class="irc_ho" dir="ltr">www.thedailytouch.com</span></span></td>\n</tr>\n</tbody>\n</table>\n<div>&nbsp;</div>\n<div>Nah, buat kalian yang sedang <u>Jomblo atau Single</u> jangan terlalu bersedih berikut silahkan disimak <u><strong>Kata Kata Mutiara Indah Jomblo Sejati</strong></u> :</div>\n<div>&nbsp;</div>\n<div>\n<blockquote class="tr_bq">Yang penting mulia disisi Allah,nikah memang mulia tapi blum brani mengambil kputusan tuk mnikah,mending jomblo gar tetap mulia disisi Allah<br /><br />Menjadi kebiasaan terdiam di rumah bukan hanya malam minggu,bukan karna jomblo,tp memang wanita muslimah hendaknya tdk keluar malam<br /><br />Jomblo?ada dua alasan: apa memang dia nggak laku atau memang dia selektif.<br /><br />kamu jomblo itu memang bukan maunya kamu. tapi maunya tuhan.<br /><br />jomblo itu gak boleh ngeluh. kita harus menjadi pemicu semangat untuk orang-orang yang sedang patah hati.<br /><br />Single atau jomblo selalu diidentikkan dengan kesendirian dan kegalauan padahal menjadi single tidak selalu jelek loh<br /><br />Jomblo bukanlah aib, jikalau saat ini itu menjadi pilihan yang tepat maka pilihlah pilihan itu, karena Jomblo lebih mulia daripada pacaran<br /><br />Menjadi lajang/single/jomblo bukan berarti tidak bahagia dan tidak laku. Mungkin hanya sedang tidak ingin terlibat dengan drama berlebihan<br /><br />Jomblo Pasti Berlalu... Semua ada saatnya, saat semua kesendirian menjadi sebuah kebersamaan dengannya kekasih halal. Bersabarlah<br /><br />Untuk apa aku melakukan hal yang dilarang Tuhanku? Aku senang menjadi jomblo karena menurutku ini adlh cara Tuhan dlm melindungi keimananku</blockquote>\n</div>\n</div>\n<div class="googlepublisherads">&nbsp;</div>\n<div id="post25636463192754320261">Menjadi jomblo ternyata membuat Anda lebih ekonomis. Sehingga anda bisa lebih irit dan anda juga bisa menyimpan/menabung uang anda. <br /><br />Saat menjadi JOMBLO anda bisa lebih fokus mengejar karier dan meraih impian anda tanpa gangguan yg bernama cinta dan asmara.<br /><br />Jomblo bukan hal menyedihkan nak, jika punya waktu untuk berkarya kenapa tidak? Kekasih terbaik datang saat dirimu menjadi terbaik<br /><br />Kecemasan menjadi jomblo tidak akan membuatmu menjadi tidak jomblo. Lebih baik dewasakan hidupmu, sembari menunggu dia datang.<br /><br />Sebenarnya banyak keuntungan menjadi Jomblo. Salah satu keuntungannya, kamu bebas memilih mana calon pasangan yang cocok buat kamu. Betul?<br /><br />Jomblo: ingin pacaran tapi tak ada yang bisa dipacarin. Single: tak ingin pacaran tapi banyak yang siap menjadi pacarnya<br /><br />Bangga menjadi jomblo. Tidak malam mingguan. Tidak menghabiskan uang. Dan mengisi aktivitas bermanfaat.<br /><br />Saat jomblo, Anda akan punya banyak untuk bertemu dengan teman atau orang baru. Hal ini bisa menjadi satu cara untuk menemukan cinta baru.<br /><br />Nikmati aja status kamu saat ini dan jangan iri. Karena ada orang yg bosan menjadi jomblo dan ada juga orang yg bosan saat pacaran.<br /><br />Banggalah menjadi jomblo berkualitas yang menghasilkan karya, daripada pacaran galau yang menghambat kamu berkarya.<br /><br />Banggalah menjadi jomblo. Tunjukkan sikap produktif dan mental sukses. Lalu nikahilah wanita anggun yg lebih hebat dari pacar kawan2mu.<br /><br />Dengan Jomblo. Kamu bisa fokus sama diri sendiri. Fokus perbaikan diri, memantaskan diri menjadi yang terbaik untuk sang halal nanti.<br /><br />Karena jomblo tidak jomblo biarlah menjadi urusan masing-masing darimu. Karena kebahagiaan bagi tiap-tiap kamu adalah berbeda.<br /><br />jomblo mengajarkanmu bagaimana membenahi diri dan menjadi lebih baik lagi, mblo<br /><br />menjadi jomblo itu bukanlah sebuah kekurangan, tetapi proses yg harus dilewati untuk menemukan pasangan sejatinya<br /><br />Lebih baik menjadi jomblo, untuk bernafas sejenak karena cinta itu melelahkan; saat orang yang tepat tak kunjung didapatkan.<br /><br />seorang jomblo itu di jaga Allah. jomblo itu di sayang Allah. ia terhindar dari nafsu syetan yang menjelma menjadi &ldquo;cinta&rdquo;<br /><br />Meratapi nasib menjadi jomblo adalah hal ''cengeng'' yang gak pantas dilakukan bagi manusia istimewa sepertimu. Move on kawan :)<br /><br />Jodoh tidak serta merta menjadi dekat hanya karena kamu pacaran, pun tidak akan menjadi sangat jauh hanya gara-gara kamu jomblo<br /><br />Memilih menjadi jomblowati memang tak mudah ditengah kemajuan zaman yg menganggap JOMBLO ketinggalan zaman. Tapi untuk Allah, apa yg sulit?<br /><br />Yang mesti kamu takuti bukanlah saat menjadi Jomblo, tapi saat kamu punya pasangan namun tak mampu membahagiakan...<br /><br />Memilih JOMBLO itu bahagia. Karena menjadi pribadi tak mudah tergoda.<br /><br />Jomblo bahagia itu bisa diusahakan. Tapi berusaha menjadi jomblo tabah lebih mudah.<br /><br />Pacarmu belum tentu mnjadi jodohmu! Tapi jodohmu sudah pasti menjadi pacarmu, berbanggalah menjadi seorang Jomblo.. Sudahi atau Nikahi!<br /><br />Single/Jomblo! Syukuri dulu aja. Nikmati waktu" bebasnya. Sebelum kebebasan kalian direnggut ketika menjadi couple!<br /><br />Ngejomblo itu enak kok.Krn dgn menjadi jomblo lo bebas menjalani aktifitas banyak tanpa hrs mikirin cewek lo dan bebas berteman dgn sapa aja<br /><br />Jadilah jomblo yang ikhlas. Menjadi jomblo karena benar-benar ingin mendapatkan kebaikan di sisi-Nya<br /><br />Menjadi jomblo itu gak perlu sedih atau menangis dan hal" yg gak penting menjadi jomblo itu lebih baik bahagiain org lain lebih asik<br /><br />Menjadi jomblo itu bukanlah merupakan suatu dosa, karena di alam kubur nanti yang ditanya adalah siapa Tuhanmu, bukan siapa pacarmu ?<br /><br />Menjadi Jomblo itu lebih sehat. Bisa tidur lebih awal, juga ga ada keharusan ngangkat Telp malam-malam.<br /><br />Jangan sedih menjadi jomblo ataupun single. Karena jodoh ada di tangan Tuhan. Lagipula, jomblo/single seru kok. Bisa bebas :D<br /><br />Gpp masih jomblo dan status ga rubah juga, yg penting sikap dan akhlak kita berubah menjadi lebih baik.<br /><br />Ketika Jomblo Bertasbih, ga ada lagi hati yang sedih, yang ada semangat memperpantaskan diri menjadi makin gigih..<br /><br />Kita ngak harus melakukan apapun untuk bertahan menjadi jomblo sejati.. Pasrah dan sabar aja.. itu udah lebih dari cukup kok&hellip;<br /><br />Jodoh tidak serta merta menjadi dekat hanya karena kamu pacaran, pun tidak akan menjadi sangat jauh hanya gara-gara kamu jomblo<br /><br />Jangan sedih menjadi jomblo, seharusnya yg sedih itu mereka yg punya pacar, karena mereka iri dengan kebebasan kaum jomblo\n<div>&nbsp;</div>\n<div>Itulah informasi terbaru seputar <a href="http://www.kalimatcinta.com/2014/04/kata-kata-mutiara-jomblo-bahagia.html" target="_blank" rel="nofollow"><em><strong>Kata Kata Mutiara Jomblo Bahagia</strong></em></a>, semoga artikel diatas dapat bermanfaat buat kalian semuanya. jadikan kata-kata diatas untuk inspirasi dan motivasi agar kehidupan kalian menjadi lebih baik. inget, jangan terlalu bersedih dengan status kamu yang masih Jomblo, tunjukin lah kalau kamu bisa berkarya dan bermanfaat, tunjukin kalau Jomblo itu ngga seburuk yang dibayangkan kok. tetep semangat jadikan<strong>Jomblo</strong> ini sebagai waktu kamu mengeksplore diri kamu.</div>\n</div>'),
('2016-07-01T08:11:10.140Z-31-9', 31, 'jomblo ??', '<div id="post15636463192754320261">\n<div>menjadi Jomblo memang suatu pilihan hidup. buat kalian yang Jomblo jangan terlalu sedih memikirkan perasaan yang kadang mengiris hati, memang <strong>Jomblo</strong> selalu dikait-kaitkan dengan rasa Kesepian dan Kesendirian, tapi ngga jarang juga kok yang pacaran masih galau terus-terusan. apa kalian ngga malu menghina jomblo terus-terusan sampai kalian ngga sadar kalau kebahagiaan kalian pun ngga jelas ? kalian yang menghina para jomblo pasti bakalan ngerasain gimana sih jadi jomblo, sebelum kalian pacaran juga pasti <em>Jomblo </em>dulu kan? jadi jangan terlalu sombong untuk memamerkan statusnya, ibaratkan kacang lupa kulitnya, ingat sob, dunia ini bulat dan selalu berputar kadang kamu berada diatas dan kadang kamu berada dibawah, jangan merendahkan siapapun didalam hidup. malah orang-orang yang Jomblo itu justru lebih kreatif mereka lebih mandiri, ya ngga jarang juga yang Jomblo malah sukses duluan.&nbsp;</div>\n<div>&nbsp;</div>\n<div><u><em><strong>Kata Kata Jomblo Sejati</strong></em></u> - memang didalam urusan Asmara jomblo terbilang gagal, atau mungkin buat sebagian orang status asmara bukanlah menjadi tujuan utama saat ini. mereka lebih mementingkan karir terlebih dahulu baru deh mikirin soal Cinta, apa iya kalian bakalan makan cinta nantinya ? kalian pacaran juga masih minta uang orang tua kan? kalo emang pacaran membuat kamu lebih maju dan lebih sukses buat meraih masa depan ya good luck deh, nah tapi kalo pacar kamu malah melorotin kamu, malah mengganggu karir kamu gimana coba? kalian yang bakalan rugi sendiri, masa depan kalian ya tergantung pasanganmu sekarang. inget, kalian itu udah dewasa, bukan lagi pacaran buat seneng-seneng, buat gaya-gayaan, tapi buat merencanakan masa depan dan kehidupan bersama.</div>\n<div>&nbsp;</div>\n<div><a href="http://www.kalimatcinta.com/2014/04/kata-kata-mutiara-jomblo-bahagia.html" target="_blank" rel="nofollow"><u><strong>Kata Kata Bijak Jomblo</strong></u></a> - buat kamu yang Jomblo usahakan ya dipikirin lah dari sekarang mengenai Kondisi Asmaramu, memang mengejar karir itu sangatlah penting agar hidup kita ngga bakalan susah nantinya, tapi kalau kamu selalu melewatkan kesempatan yang ada, nanti malah kamu kehabisan umur dan terjebak dengan pasangan yang seadanya mau? ya diimbangi lah usaha sama doa, karena kalian juga butuh sosok penyemangat dan pemberi perhatian agar hidup kalian itu lebih berwarna.</div>\n<div>&nbsp;</div>\n<table class="tr-caption-container" cellspacing="0" cellpadding="0" align="center">\n<tbody>\n<tr>\n<td><a href="http://1.bp.blogspot.com/-DYpEnKxLsr4/U0z_i0BRo6I/AAAAAAAAAbY/3Mxxza_oSlM/s1600/Kata+Kata+Mutiara+Jomblo+Bahagia.gif"><img title="Kata Kata Mutiara Jomblo Bahagia " src="https://1.bp.blogspot.com/-DYpEnKxLsr4/U0z_i0BRo6I/AAAAAAAAAbY/3Mxxza_oSlM/s1600/Kata+Kata+Mutiara+Jomblo+Bahagia.gif" alt="Kata Kata Mutiara Jomblo Bahagia " width="320" height="128" border="0" /></a></td>\n</tr>\n<tr>\n<td class="tr-caption">Sumber : <span class="_Uk"><span class="irc_ho" dir="ltr">www.thedailytouch.com</span></span></td>\n</tr>\n</tbody>\n</table>\n<div>&nbsp;</div>\n<div>Nah, buat kalian yang sedang <u>Jomblo atau Single</u> jangan terlalu bersedih berikut silahkan disimak <u><strong>Kata Kata Mutiara Indah Jomblo Sejati</strong></u> :</div>\n<div>&nbsp;</div>\n<div>\n<blockquote class="tr_bq">Yang penting mulia disisi Allah,nikah memang mulia tapi blum brani mengambil kputusan tuk mnikah,mending jomblo gar tetap mulia disisi Allah<br /><br />Menjadi kebiasaan terdiam di rumah bukan hanya malam minggu,bukan karna jomblo,tp memang wanita muslimah hendaknya tdk keluar malam<br /><br />Jomblo?ada dua alasan: apa memang dia nggak laku atau memang dia selektif.<br /><br />kamu jomblo itu memang bukan maunya kamu. tapi maunya tuhan.<br /><br />jomblo itu gak boleh ngeluh. kita harus menjadi pemicu semangat untuk orang-orang yang sedang patah hati.<br /><br />Single atau jomblo selalu diidentikkan dengan kesendirian dan kegalauan padahal menjadi single tidak selalu jelek loh<br /><br />Jomblo bukanlah aib, jikalau saat ini itu menjadi pilihan yang tepat maka pilihlah pilihan itu, karena Jomblo lebih mulia daripada pacaran<br /><br />Menjadi lajang/single/jomblo bukan berarti tidak bahagia dan tidak laku. Mungkin hanya sedang tidak ingin terlibat dengan drama berlebihan<br /><br />Jomblo Pasti Berlalu... Semua ada saatnya, saat semua kesendirian menjadi sebuah kebersamaan dengannya kekasih halal. Bersabarlah<br /><br />Untuk apa aku melakukan hal yang dilarang Tuhanku? Aku senang menjadi jomblo karena menurutku ini adlh cara Tuhan dlm melindungi keimananku</blockquote>\n</div>\n</div>\n<div class="googlepublisherads">&nbsp;</div>\n<div id="post25636463192754320261">Menjadi jomblo ternyata membuat Anda lebih ekonomis. Sehingga anda bisa lebih irit dan anda juga bisa menyimpan/menabung uang anda. <br /><br />Saat menjadi JOMBLO anda bisa lebih fokus mengejar karier dan meraih impian anda tanpa gangguan yg bernama cinta dan asmara.<br /><br />Jomblo bukan hal menyedihkan nak, jika punya waktu untuk berkarya kenapa tidak? Kekasih terbaik datang saat dirimu menjadi terbaik<br /><br />Kecemasan menjadi jomblo tidak akan membuatmu menjadi tidak jomblo. Lebih baik dewasakan hidupmu, sembari menunggu dia datang.<br /><br />Sebenarnya banyak keuntungan menjadi Jomblo. Salah satu keuntungannya, kamu bebas memilih mana calon pasangan yang cocok buat kamu. Betul?<br /><br />Jomblo: ingin pacaran tapi tak ada yang bisa dipacarin. Single: tak ingin pacaran tapi banyak yang siap menjadi pacarnya<br /><br />Bangga menjadi jomblo. Tidak malam mingguan. Tidak menghabiskan uang. Dan mengisi aktivitas bermanfaat.<br /><br />Saat jomblo, Anda akan punya banyak untuk bertemu dengan teman atau orang baru. Hal ini bisa menjadi satu cara untuk menemukan cinta baru.<br /><br />Nikmati aja status kamu saat ini dan jangan iri. Karena ada orang yg bosan menjadi jomblo dan ada juga orang yg bosan saat pacaran.<br /><br />Banggalah menjadi jomblo berkualitas yang menghasilkan karya, daripada pacaran galau yang menghambat kamu berkarya.<br /><br />Banggalah menjadi jomblo. Tunjukkan sikap produktif dan mental sukses. Lalu nikahilah wanita anggun yg lebih hebat dari pacar kawan2mu.<br /><br />Dengan Jomblo. Kamu bisa fokus sama diri sendiri. Fokus perbaikan diri, memantaskan diri menjadi yang terbaik untuk sang halal nanti.<br /><br />Karena jomblo tidak jomblo biarlah menjadi urusan masing-masing darimu. Karena kebahagiaan bagi tiap-tiap kamu adalah berbeda.<br /><br />jomblo mengajarkanmu bagaimana membenahi diri dan menjadi lebih baik lagi, mblo<br /><br />menjadi jomblo itu bukanlah sebuah kekurangan, tetapi proses yg harus dilewati untuk menemukan pasangan sejatinya<br /><br />Lebih baik menjadi jomblo, untuk bernafas sejenak karena cinta itu melelahkan; saat orang yang tepat tak kunjung didapatkan.<br /><br />seorang jomblo itu di jaga Allah. jomblo itu di sayang Allah. ia terhindar dari nafsu syetan yang menjelma menjadi &ldquo;cinta&rdquo;<br /><br />Meratapi nasib menjadi jomblo adalah hal ''cengeng'' yang gak pantas dilakukan bagi manusia istimewa sepertimu. Move on kawan :)<br /><br />Jodoh tidak serta merta menjadi dekat hanya karena kamu pacaran, pun tidak akan menjadi sangat jauh hanya gara-gara kamu jomblo<br /><br />Memilih menjadi jomblowati memang tak mudah ditengah kemajuan zaman yg menganggap JOMBLO ketinggalan zaman. Tapi untuk Allah, apa yg sulit?<br /><br />Yang mesti kamu takuti bukanlah saat menjadi Jomblo, tapi saat kamu punya pasangan namun tak mampu membahagiakan...<br /><br />Memilih JOMBLO itu bahagia. Karena menjadi pribadi tak mudah tergoda.<br /><br />Jomblo bahagia itu bisa diusahakan. Tapi berusaha menjadi jomblo tabah lebih mudah.<br /><br />Pacarmu belum tentu mnjadi jodohmu! Tapi jodohmu sudah pasti menjadi pacarmu, berbanggalah menjadi seorang Jomblo.. Sudahi atau Nikahi!<br /><br />Single/Jomblo! Syukuri dulu aja. Nikmati waktu" bebasnya. Sebelum kebebasan kalian direnggut ketika menjadi couple!<br /><br />Ngejomblo itu enak kok.Krn dgn menjadi jomblo lo bebas menjalani aktifitas banyak tanpa hrs mikirin cewek lo dan bebas berteman dgn sapa aja<br /><br />Jadilah jomblo yang ikhlas. Menjadi jomblo karena benar-benar ingin mendapatkan kebaikan di sisi-Nya<br /><br />Menjadi jomblo itu gak perlu sedih atau menangis dan hal" yg gak penting menjadi jomblo itu lebih baik bahagiain org lain lebih asik<br /><br />Menjadi jomblo itu bukanlah merupakan suatu dosa, karena di alam kubur nanti yang ditanya adalah siapa Tuhanmu, bukan siapa pacarmu ?<br /><br />Menjadi Jomblo itu lebih sehat. Bisa tidur lebih awal, juga ga ada keharusan ngangkat Telp malam-malam.<br /><br />Jangan sedih menjadi jomblo ataupun single. Karena jodoh ada di tangan Tuhan. Lagipula, jomblo/single seru kok. Bisa bebas :D<br /><br />Gpp masih jomblo dan status ga rubah juga, yg penting sikap dan akhlak kita berubah menjadi lebih baik.<br /><br />Ketika Jomblo Bertasbih, ga ada lagi hati yang sedih, yang ada semangat memperpantaskan diri menjadi makin gigih..<br /><br />Kita ngak harus melakukan apapun untuk bertahan menjadi jomblo sejati.. Pasrah dan sabar aja.. itu udah lebih dari cukup kok&hellip;<br /><br />Jodoh tidak serta merta menjadi dekat hanya karena kamu pacaran, pun tidak akan menjadi sangat jauh hanya gara-gara kamu jomblo<br /><br />Jangan sedih menjadi jomblo, seharusnya yg sedih itu mereka yg punya pacar, karena mereka iri dengan kebebasan kaum jomblo\n<div>&nbsp;</div>\n<div>Itulah informasi terbaru seputar <a href="http://www.kalimatcinta.com/2014/04/kata-kata-mutiara-jomblo-bahagia.html" target="_blank" rel="nofollow"><em><strong>Kata Kata Mutiara Jomblo Bahagia</strong></em></a>, semoga artikel diatas dapat bermanfaat buat kalian semuanya. jadikan kata-kata diatas untuk inspirasi dan motivasi agar kehidupan kalian menjadi lebih baik. inget, jangan terlalu bersedih dengan status kamu yang masih Jomblo, tunjukin lah kalau kamu bisa berkarya dan bermanfaat, tunjukin kalau Jomblo itu ngga seburuk yang dibayangkan kok. tetep semangat jadikan<strong>Jomblo</strong> ini sebagai waktu kamu mengeksplore diri kamu.</div>\n</div>'),
('2016-07-02T06:58:30.480Z-44-0', 44, 'Thirsty?', '<p>Thirsty????</p>'),
('2016-07-02T07:00:36.529Z-44-1', 44, 'Thirsty?', '<p>Thirsty????</p>');

-- --------------------------------------------------------

--
-- Table structure for table `post_kategori`
--

CREATE TABLE IF NOT EXISTS `post_kategori` (
  `id` int(9) unsigned NOT NULL,
  `id_post` varchar(299) NOT NULL,
  `id_kategori` int(9) unsigned NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `post_kategori`
--

INSERT INTO `post_kategori` (`id`, `id_post`, `id_kategori`) VALUES
(10, '2016-07-01T03:03:21.494Z-32-1', 5),
(11, '2016-07-01T03:09:14.399Z-33-0', 2),
(13, '2016-07-01T03:12:03.118Z-31-1', 3),
(14, '2016-07-01T03:16:39.369Z-34-0', 3),
(16, '2016-07-01T03:23:33.147Z-34-2', 4),
(25, '2016-07-01T06:24:31.779Z-34-5', 2),
(34, '2016-07-01T08:11:10.140Z-31-9', 4),
(36, '2016-07-02T07:00:36.529Z-44-1', 2);

-- --------------------------------------------------------

--
-- Table structure for table `status_id`
--

CREATE TABLE IF NOT EXISTS `status_id` (
  `id` int(9) unsigned NOT NULL,
  `nama` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `status_id`
--

INSERT INTO `status_id` (`id`, `nama`) VALUES
(1, 'admin'),
(2, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(9) unsigned NOT NULL,
  `nama` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `status_id` int(9) unsigned DEFAULT NULL,
  `fotoprofil` varchar(255) DEFAULT NULL,
  `fotokronologi` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `nama`, `password`, `status_id`, `fotoprofil`, `fotokronologi`, `email`) VALUES
(31, 'gerald', 'gerald', 1, '/images/app/fotoprofil-1468982443944.jpg', '/images/app/fotokronologi-1467437878206.jpg', 'geralddevoper95@gmail.com'),
(32, 'WL', '123', 1, '/images/app/fotoprofil-1467437150525.jpg', '/images/app/fotokronologi-1467437908064.jpg', '123@gmail.com'),
(33, 'javent_test', 'javent_test', 2, '/images/app/default-profilepic.jpg', '/images/app/default-coverpic.jpg', 'javent_test@gmail.com'),
(34, 'jealvin', 'a3f6hjn0', 2, '/images/app/fotoprofil-1467342693818.jpg', '/images/app/fotokronologi-1467350905727.jpg', 'jealvin.wang95@gmail.com'),
(35, 'Johanes', 'apaansih', 2, '/images/app/fotoprofil-1467457805421.jpg', '/images/app/fotokronologi-1467457808567.jpg', 'nesdejavu@gmail.com'),
(36, 'blabla', '1234', 2, '/images/app/default-profilepic.jpg', '/images/app/default-coverpic.jpg', 'aaaa@gmail.com'),
(37, 'blabla', '1234', 2, '/images/app/default-profilepic.jpg', '/images/app/default-coverpic.jpg', 'aaaa@gmail.com'),
(38, 'Monkey freedom', 'gakada93', 2, '/images/app/default-profilepic.jpg', '/images/app/default-coverpic.jpg', 'f.bags@rocketmail.com'),
(39, 'Louislim', 'kaboooooom', 2, '/images/app/default-profilepic.jpg', '/images/app/default-coverpic.jpg', 'lin_louis66@yahoo.com'),
(40, 'Herman', 'herman888', 2, '/images/app/default-profilepic.jpg', '/images/app/default-coverpic.jpg', 'gajah@mail.com'),
(41, 'Nico Limbara', 'nico', 2, '/images/app/default-profilepic.jpg', '/images/app/default-coverpic.jpg', 'limbaranico@yahoo.com'),
(42, 'boroboro', '1234', 2, '/images/app/default-profilepic.jpg', '/images/app/default-coverpic.jpg', 'lionardo@mikro.com'),
(43, 'Kgriffinsu', '12345678', 2, '/images/app/fotoprofil-1467436483172.jpg', '/images/app/default-coverpic.jpg', 'kgriffinsu8@gmail.com'),
(44, 'HerrisSuhendra', 'qwerty', 2, '/images/app/fotoprofil-1467442420838.jpg', '/images/app/default-coverpic.jpg', 'herris.pm@gmail.com'),
(45, 'anakSingkong', '12345677aa', 2, '/images/app/default-profilepic.jpg', '/images/app/default-coverpic.jpg', 'anaksingkong@gmail.com'),
(46, 'luminiscence', 'Luminiscence', 2, '/images/app/fotoprofil-1467636348391.jpg', '/images/app/default-coverpic.jpg', 'luminiscence@gmail.com'),
(47, 'Nico', 'nico', 2, '/images/app/default-profilepic.jpg', '/images/app/default-coverpic.jpg', 'limbaranico@yahoo.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_image_post` (`id_post`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `like_post`
--
ALTER TABLE `like_post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_post_like` (`id_post`),
  ADD KEY `fk_user_like` (`id_user_like`);

--
-- Indexes for table `pertemanan`
--
ALTER TABLE `pertemanan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_add` (`id_yang_add`),
  ADD KEY `fk_aprove` (`id_yang_aprove`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_byuser` (`id_user`);

--
-- Indexes for table `post_kategori`
--
ALTER TABLE `post_kategori`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_postkategory_post` (`id_post`),
  ADD KEY `fk_postkategory_kategori` (`id_kategori`);

--
-- Indexes for table `status_id`
--
ALTER TABLE `status_id`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_userstatus` (`status_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(9) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id` int(9) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `like_post`
--
ALTER TABLE `like_post`
  MODIFY `id` int(9) unsigned NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `pertemanan`
--
ALTER TABLE `pertemanan`
  MODIFY `id` int(9) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT for table `post_kategori`
--
ALTER TABLE `post_kategori`
  MODIFY `id` int(9) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT for table `status_id`
--
ALTER TABLE `status_id`
  MODIFY `id` int(9) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(9) unsigned NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=48;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `fk_image_post` FOREIGN KEY (`id_post`) REFERENCES `post` (`id`);

--
-- Constraints for table `like_post`
--
ALTER TABLE `like_post`
  ADD CONSTRAINT `fk_post_like` FOREIGN KEY (`id_post`) REFERENCES `post` (`id`),
  ADD CONSTRAINT `fk_user_like` FOREIGN KEY (`id_user_like`) REFERENCES `user` (`id`);

--
-- Constraints for table `pertemanan`
--
ALTER TABLE `pertemanan`
  ADD CONSTRAINT `fk_add` FOREIGN KEY (`id_yang_add`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `fk_aprove` FOREIGN KEY (`id_yang_aprove`) REFERENCES `user` (`id`);

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `fk_byuser` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`);

--
-- Constraints for table `post_kategori`
--
ALTER TABLE `post_kategori`
  ADD CONSTRAINT `fk_postkategory_kategori` FOREIGN KEY (`id_kategori`) REFERENCES `kategori` (`id`),
  ADD CONSTRAINT `fk_postkategory_post` FOREIGN KEY (`id_post`) REFERENCES `post` (`id`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_userstatus` FOREIGN KEY (`status_id`) REFERENCES `status_id` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
