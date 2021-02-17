-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 29, 2020 at 03:22 PM
-- Server version: 5.7.26
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `library`
--

-- --------------------------------------------------------

--
-- Table structure for table `clans`
--

DROP TABLE IF EXISTS `clans`;
CREATE TABLE IF NOT EXISTS `clans` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ime_prezime` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `broj` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  `mail` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `clans`
--

INSERT INTO `clans` (`id`, `ime_prezime`, `broj`, `status`, `mail`, `created_at`, `updated_at`) VALUES
(1, 'Imran Isak', '+38761028589', 1, 'imran1701d@gmail.com', '2020-06-29 09:00:20', '2020-06-29 09:00:20'),
(2, 'Ismet Isakovic', '+387555218', 1, 'ismet@isakovic.com', '2020-06-29 10:48:56', '2020-06-29 10:48:56'),
(3, 'Fadil Zahirovic', '061-284-555', 1, 'f.z@mail.com', '2020-06-29 10:49:13', '2020-06-29 10:49:13');

-- --------------------------------------------------------

--
-- Table structure for table `knjiges`
--

DROP TABLE IF EXISTS `knjiges`;
CREATE TABLE IF NOT EXISTS `knjiges` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `naslov` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pisac_id` int(11) NOT NULL,
  `količina` int(11) NOT NULL,
  `godina` int(11) NOT NULL,
  `vrsta_id` int(11) NOT NULL,
  `lokacija_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `naslovna_slika` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `knjiges`
--

INSERT INTO `knjiges` (`id`, `naslov`, `pisac_id`, `količina`, `godina`, `vrsta_id`, `lokacija_id`, `created_at`, `updated_at`, `naslovna_slika`) VALUES
(1, 'Bašta sljezove boje', 2, 17, 1970, 1, 1, '2020-06-29 08:59:48', '2020-06-29 10:52:41', 'slikaND.jpg'),
(2, 'Bašta sljezove boje', 2, 20, 1966, 1, 1, '2020-06-29 10:35:51', '2020-06-29 10:36:01', 'slikaND.jpg'),
(3, 'Hamlet', 1, 63, 1609, 2, 1, '2020-06-29 10:49:50', '2020-06-29 10:52:54', 'slikaND.jpg'),
(4, 'Romeo i Julija', 1, 32, 1597, 2, 2, '2020-06-29 10:51:41', '2020-06-29 10:51:41', 'slikaND.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `lokacijes`
--

DROP TABLE IF EXISTS `lokacijes`;
CREATE TABLE IF NOT EXISTS `lokacijes` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ime` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `adresa` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lokacijes`
--

INSERT INTO `lokacijes` (`id`, `ime`, `adresa`, `created_at`, `updated_at`) VALUES
(1, 'Blatusa', 'Zije Dizdarevica 24', '2020-06-29 08:59:33', '2020-06-29 08:59:33'),
(2, 'Jalija', 'Sejmenski put 2', '2020-06-29 10:51:15', '2020-06-29 10:51:15');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2018_01_13_134754_create_knjiges_table', 1),
(4, '2018_01_13_135848_create_piscis_table', 1),
(5, '2018_01_13_135902_create_vrstes_table', 1),
(6, '2018_02_18_113926_create_lokacijes_table', 1),
(7, '2018_02_18_122244_create_clans_table', 1),
(8, '2018_02_18_122310_create_zaduzenjas_table', 1),
(9, '2018_07_20_122928_naslovna_slika', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `piscis`
--

DROP TABLE IF EXISTS `piscis`;
CREATE TABLE IF NOT EXISTS `piscis` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `ime_prezime` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `rodjenje` int(11) NOT NULL,
  `smrt` int(11) NOT NULL,
  `nacionalnost` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `piscis`
--

INSERT INTO `piscis` (`id`, `ime_prezime`, `rodjenje`, `smrt`, `nacionalnost`, `created_at`, `updated_at`) VALUES
(1, 'William Shakespeare', 1582, 1616, 'Englez', '2020-06-29 08:57:43', '2020-06-29 08:57:43'),
(2, 'Branko Ćopić', 1915, 1984, 'Bosnian Serb, Yugoslav', '2020-06-29 08:58:48', '2020-06-29 08:58:48');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'imran1701d@gmail.com', '$2y$12$JcXctl5EEF4.6Az4juto/.luQFDYJAsYAdtjHNCiK3rB85XWMXOSi', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vrstes`
--

DROP TABLE IF EXISTS `vrstes`;
CREATE TABLE IF NOT EXISTS `vrstes` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `vrsta` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vrstes`
--

INSERT INTO `vrstes` (`id`, `vrsta`, `created_at`, `updated_at`) VALUES
(1, 'Fikcija', '2020-06-29 08:59:17', '2020-06-29 08:59:17'),
(2, 'Drama', '2020-06-29 08:59:21', '2020-06-29 08:59:21');

-- --------------------------------------------------------

--
-- Table structure for table `zaduzenjas`
--

DROP TABLE IF EXISTS `zaduzenjas`;
CREATE TABLE IF NOT EXISTS `zaduzenjas` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `clan_id` int(11) NOT NULL,
  `knjiga_id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `datum_zaduzenja` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `datum_vracanja` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `rok_vracanja` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `zaduzenjas`
--

INSERT INTO `zaduzenjas` (`id`, `clan_id`, `knjiga_id`, `status`, `datum_zaduzenja`, `datum_vracanja`, `rok_vracanja`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 0, '2020-06-29', '2020-06-29', '2020-07-13', '2020-06-29 10:37:13', '2020-06-29 10:52:41'),
(2, 2, 3, 1, '2020-06-29', NULL, '2020-07-17', '2020-06-29 10:51:53', '2020-06-29 10:51:53'),
(4, 2, 3, 1, '2020-06-28', NULL, '2020-07-12', '2020-06-29 10:52:54', '2020-06-29 10:52:54');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
