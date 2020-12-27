-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 16, 2020 at 12:58 PM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sendwebdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `codes`
--

CREATE TABLE `codes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `pageId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(18, '2014_10_12_000000_create_users_table', 1),
(19, '2014_10_12_100000_create_password_resets_table', 1),
(20, '2019_08_19_000000_create_failed_jobs_table', 1),
(21, '2020_09_17_141459_orders', 1),
(22, '2020_09_17_141737_old_orders', 1),
(23, '2020_09_18_123259_codes', 1),
(24, '2020_09_18_130349_users', 1),
(25, '2020_10_11_173041_share_tofriends', 1),
(26, '2020_10_12_000757_system_info', 1);

-- --------------------------------------------------------

--
-- Table structure for table `oldorders`
--

CREATE TABLE `oldorders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `userId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `text` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `userId`, `number`, `text`, `created_at`, `updated_at`) VALUES
(6, NULL, '1080909t', 'Good', '2020-10-14 00:37:01', '2020-10-14 00:37:01'),
(7, NULL, '180909v', 'Good', '2020-10-14 00:37:01', '2020-10-14 00:37:01'),
(8, NULL, '1080909c', 'Good', '2020-10-14 00:37:01', '2020-10-14 00:37:01'),
(9, NULL, '208767', 'duisahdsa', '2020-10-14 12:59:39', '2020-10-14 12:59:39'),
(10, NULL, '208767', 'duisahdsa', '2020-10-14 12:59:45', '2020-10-14 12:59:45'),
(11, NULL, '1268sadsa', 'dasd', '2020-10-14 13:03:24', '2020-10-14 13:03:24'),
(12, NULL, '1268sadsa', 'dasd', '2020-10-14 13:17:35', '2020-10-14 13:17:35'),
(13, NULL, '1268sadsa', 'dasd', '2020-10-14 13:36:47', '2020-10-14 13:36:47'),
(14, NULL, '1268sadsa', 'dasd', '2020-10-14 13:40:42', '2020-10-14 13:40:42'),
(15, NULL, '1268sadsa', 'dasd', '2020-10-14 13:49:04', '2020-10-14 13:49:04'),
(16, NULL, '1268sadsa', 'dasd', '2020-10-14 13:49:05', '2020-10-14 13:49:05'),
(17, NULL, '1268sadsa', 'dasd', '2020-10-14 13:49:06', '2020-10-14 13:49:06'),
(18, NULL, '1268sadsa', 'dasd', '2020-10-14 13:49:07', '2020-10-14 13:49:07'),
(19, NULL, '1268sadsa', 'dasd', '2020-10-14 13:49:07', '2020-10-14 13:49:07'),
(20, NULL, '1268sadsa', 'dasd', '2020-10-14 13:49:08', '2020-10-14 13:49:08'),
(21, NULL, '1268sadsa', 'dasd', '2020-10-14 13:49:08', '2020-10-14 13:49:08'),
(22, NULL, '1268sadsa', 'dasd', '2020-10-14 13:49:09', '2020-10-14 13:49:09'),
(23, NULL, '1268sadsa', 'dasd', '2020-10-14 13:49:09', '2020-10-14 13:49:09'),
(24, NULL, '12647898789', 'jdsoafsaf', '2020-10-14 13:56:41', '2020-10-14 13:56:41'),
(25, NULL, '12647898789', 'jdsoafsaf', '2020-10-14 13:56:42', '2020-10-14 13:56:42'),
(26, NULL, '12647898789', 'jdsoafsaf', '2020-10-14 13:56:42', '2020-10-14 13:56:42'),
(27, NULL, '12647898789', 'jdsoafsaf', '2020-10-14 13:56:43', '2020-10-14 13:56:43'),
(28, NULL, '12647898789', 'jdsoafsaf', '2020-10-14 13:56:43', '2020-10-14 13:56:43'),
(29, NULL, '12647898789', 'jdsoafsaf', '2020-10-14 13:56:45', '2020-10-14 13:56:45'),
(30, NULL, '12647898789', 'jdsoafsaf', '2020-10-14 13:56:45', '2020-10-14 13:56:45'),
(31, NULL, '12647898789', 'jdsoafsaf', '2020-10-14 13:56:46', '2020-10-14 13:56:46'),
(32, NULL, '12647898789', 'jdsoafsaf', '2020-10-14 13:56:47', '2020-10-14 13:56:47');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sharetofriends`
--

CREATE TABLE `sharetofriends` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `timeZone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sharetofriends`
--

INSERT INTO `sharetofriends` (`id`, `key`, `email`, `timeZone`, `created_at`, `updated_at`) VALUES
(1, 'T@T.comkey881788702', 'T@T.com', 'Africa/Cairo', '2020-10-16 06:42:28', '2020-10-16 06:42:28');

-- --------------------------------------------------------

--
-- Table structure for table `systeminfo`
--

CREATE TABLE `systeminfo` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` longtext COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '{}',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `systeminfo`
--

INSERT INTO `systeminfo` (`id`, `key`, `value`, `created_at`, `updated_at`) VALUES
(1, 'FooterData', '{\"Webtitle\":\"webssmss\",\"fb\":\"#fb\",\"tw\":\"#tw\",\"gplus\":\"#gplus\",\"ins\":\"#ins\",\"lin\":\"#lin\",\"email\":\"dsads\",\"fax\":\"-2-2-2-2-\",\"phone\":\"32423432342243\",\"address\":\"New York, NY 10012, US\",\"desc\":\"..... ....... ........ ....... ....... ..... ....... ....... .........\",\"side1\":[[\"google\",\"www.google.com\"],[\"google\",\"www.google.com\"]],\"side2\":[[\"google2\",\"www.google.com\"],[\"google2\",\"www.google.com\"],[\"google2\",\"www.google.com\"]],\"newSizeOneTitle\":null,\"newSizeOneURL\":null,\"newSizeTwoTitle\":null,\"newSizeTwoURL\":null,\"success\":null,\"emaik\":\"#email\"}', '0000-00-00 00:00:00', '2020-10-14 14:21:38'),
(2, 'LoginToday', '{\"5-10-2020\":12,\"8-1-2020\":9,\"9-10-2020\":44,\"10-1-2020\":3,\"10-7-2020\":27,\"10-14-2020\":1,\"10-15-2020\":3,\"10-16-2020\":3}', '0000-00-00 00:00:00', '2020-10-16 07:31:29'),
(3, 'MessagesSendedToday', '{\"5-10-2020\":12,\"6-10-2020\":6,\"7-10-2020\":42,\"8-1-2020\":9,\"9-10-2020\":44,\"10-1-2020\":3,\"10-7-2020\":27,\"10-14-2020\":19}', '0000-00-00 00:00:00', '2020-10-14 13:56:47'),
(4, 'products', '[{\"id\":2,\"title\":\"super package\",\"desc\":\"You can now get promotion for your website \\/ mobile App \\/ product by sending messages to real clients interiset in your product.\",\"num\":1000},{\"id\":4,\"title\":\"super package\",\"desc\":\"You can now get promotion for your website \\/ mobile App \\/ product by sending messages to real clients interiset in your product.\",\"num\":1000},{\"id\":6,\"title\":\"super package\",\"desc\":\"You can now get promotion for your website \\/ mobile App \\/ product by sending messages to real clients interiset in your product.\",\"num\":1000},{\"num\":\"1002\",\"title\":\"test\",\"desc\":\"test\",\"id\":7.22557796292094e+22},{\"num\":\"10011\",\"title\":\"test1\",\"desc\":\"test1\",\"id\":5.837520675463288e+23}]', '0000-00-00 00:00:00', '2020-10-15 15:40:31');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pass` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `number` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `block` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'false',
  `history` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '[]',
  `isAdmin` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'false',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `fname`, `pass`, `number`, `block`, `history`, `isAdmin`, `created_at`, `updated_at`) VALUES
(1, 'T@T.com', 'Fname', '1234', '1080909t', 'false', '{\"2020-10-14\":31,\"2020-10-15\":5,\"2020-10-16\":5}', 'false', '0000-00-00 00:00:00', '2020-10-16 06:28:43'),
(2, 'T@T.com', 'Fname', '1234', '180909v', 'false', '{}', 'false', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'T@T.com', 'Fname', '1234', '1080909c', 'false', '{}', 'false', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'T@T.com', 'Fname', '1234', '+1080909', 'false', '{}', 'false', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'T@T.com', 'Fname', '1234', '+1080909', 'false', '{}', 'false', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'T@T.com', 'Fname', '1234', '+1080909', 'false', '{}', 'false', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'T@T.com', 'Fname', '1234', '+1080909', 'false', '{}', 'false', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'T@T.com', 'Fname', '1234', '+1080909', 'false', '{}', 'false', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 'T@T.com', 'Fname', '1234', '+20343808953', 'false', '{}', 'false', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 'T@T.com', 'Fname', '1234', '+20343808953', 'false', '{}', 'false', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 'T@T.com', 'Fname', '1234', '+20343808953', 'false', '{}', 'false', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 'T@T.com', 'Fname', '1234', '+20343808953', 'false', '{}', 'false', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 'T@T.com', 'Fname', '1234', '+20343808953', 'false', '{}', 'false', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, 'T@T.com', 'Fname', '1234', '+20343808953', 'false', '{}', 'false', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 'T@T.com', 'Fname', '1234', '+20343808953', 'false', '{}', 'false', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 'T@T.com', 'Fname', '1234', '+20343808953', 'false', '{}', 'false', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 'T@T.com', 'Fname', '1234', '+20343808953', 'false', '{}', 'false', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, 'T@T.com', 'Fname', '1234', '+20343808953', 'false', '{}', 'false', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(19, 'qandilafa@gmail.com', 'qandil abdel fadil awayn', '6yqNWfSXmcq6E9j', '44131242412', 'false', '{\"2020-10-14\":5,\"2020-10-15\":5,\"2020-10-16\":5}', 'true', '2020-10-13 22:47:25', '2020-10-16 06:20:16');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `codes`
--
ALTER TABLE `codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `oldorders`
--
ALTER TABLE `oldorders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `sharetofriends`
--
ALTER TABLE `sharetofriends`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `systeminfo`
--
ALTER TABLE `systeminfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `codes`
--
ALTER TABLE `codes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `oldorders`
--
ALTER TABLE `oldorders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `sharetofriends`
--
ALTER TABLE `sharetofriends`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `systeminfo`
--
ALTER TABLE `systeminfo`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
