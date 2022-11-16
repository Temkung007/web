-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 15, 2022 at 04:23 PM
-- Server version: 5.7.24
-- PHP Version: 8.1.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `blog`
--

-- --------------------------------------------------------

--
-- Table structure for table `contents`
--

CREATE TABLE `contents` (
  `id` int(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL,
  `data` longtext NOT NULL,
  `category` varchar(255) NOT NULL,
  `img_url` varchar(255) DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `contents`
--

INSERT INTO `contents` (`id`, `title`, `description`, `data`, `category`, `img_url`, `create_at`) VALUES
(22, 'gggg', 'asdasdasdasd', '{\"ops\":[{\"insert\":\"asdfsdfsdf\\nsdfsdf\"},{\"attributes\":{\"align\":\"center\"},\"insert\":\"\\n\"},{\"insert\":{\"image\":\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAABXElEQVRogWNgGAWjYBSMgoEEjLgkTGbc/g9jf31xD6uadjseqjmk5ZYYsqM6T2eoVhCjj4lqLqAi+M/AUG4643YHMWpZaO0YGCgrKUbhd/X04lUP9QQDoZgYlDEAA8TExKD2AAMDYU8Meg8wMEA8gUtuSHgAHxj1wECDIe8BouoBRmYWhv9//2CIf/z5j4GfnbgwwFfuf/rNTJQZ2ABRtrPziTAwMmP6dd2tnwwff/4j23IGBojjt77iJVs/UTHAzM7FwCUqhyH+lIGBYfJDsu2mChjyeWDUAwMNRj0w0ICoUmhugAyDnjgHrd2CAi6++MGQsvEJQXVExQC9Hc/AwMCgL0GcnSMjCaGDCzfvUtsdDAwMDAwG6sok6xmZMUBOSNEKjMwYGM0DVASjeWCgwWgeGGgwmgcGGhDlgYsvftDaHRjgApF2EpWEiGmXDxQY8kloFIyCUTAKBhYAAEvUTIshBoCmAAAAAElFTkSuQmCC\"}},{\"insert\":\"asdfasfasdfasdf\"},{\"attributes\":{\"align\":\"center\"},\"insert\":\"\\n\"},{\"insert\":\"sdfgsdfgdfg\"},{\"attributes\":{\"align\":\"center\"},\"insert\":\"\\n\"}]}', 'aaaa', 'images/image_1665247016517.jpg', '2022-10-08 23:34:20');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `images_header`
--

CREATE TABLE `images_header` (
  `id` int(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `images_header`
--

INSERT INTO `images_header` (`id`, `title`, `url`) VALUES
(4, 'ffff', 'images/image_1665223461137.jpg'),
(5, 'ggg', 'images/image_1665223467776.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `preferences`
--

CREATE TABLE `preferences` (
  `id` int(100) NOT NULL,
  `age` int(10) NOT NULL,
  `status` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `category` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
(1, 'admin1234@gmail.com', '123456789');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(10) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `visiting`
--

CREATE TABLE `visiting` (
  `id` int(100) NOT NULL,
  `time` int(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `visiting`
--

INSERT INTO `visiting` (`id`, `time`, `created_at`) VALUES
(4, 23, '2022-10-08 16:51:56'),
(5, 144, '2022-10-08 16:54:20'),
(6, 15, '2022-10-08 16:54:35'),
(7, 8, '2022-10-08 17:00:42'),
(8, 17, '2022-10-08 17:01:10'),
(9, 23, '2022-10-08 17:01:33'),
(10, 25, '2022-10-08 17:01:59'),
(11, 113, '2022-10-08 17:04:05'),
(12, 15, '2022-10-08 17:04:21'),
(13, 6, '2022-10-08 17:04:27'),
(14, 8, '2022-10-08 17:04:37'),
(15, 3, '2022-10-08 17:05:26'),
(16, 12, '2022-10-08 17:05:39'),
(17, 97, '2022-10-08 17:07:23'),
(18, 3, '2022-10-08 17:07:26'),
(19, 7, '2022-10-08 17:07:33'),
(20, 240, '2022-10-08 17:11:34'),
(21, 15, '2022-10-08 17:11:50'),
(22, 0, '2022-10-08 17:11:52'),
(23, 5, '2022-10-08 17:11:59'),
(24, 0, '2022-10-08 17:11:59'),
(25, 11, '2022-10-08 17:12:11'),
(26, 661, '2022-10-08 17:24:06'),
(27, 1, '2022-10-08 17:25:21'),
(28, 23, '2022-10-08 17:25:45'),
(29, 25, '2022-10-08 17:26:10'),
(30, 11, '2022-10-08 17:26:22'),
(31, 4, '2022-10-08 17:26:41'),
(32, 227, '2022-10-08 17:30:29'),
(33, 1, '2022-10-08 17:30:30'),
(34, 17, '2022-10-08 17:30:48'),
(35, 2, '2022-10-08 17:30:50'),
(36, 193, '2022-10-08 17:34:05'),
(37, 1, '2022-10-08 17:34:07'),
(38, 20, '2022-10-08 17:34:27'),
(39, 217, '2022-10-08 17:38:05'),
(40, 8, '2022-10-08 17:38:14'),
(41, 0, '2022-10-08 17:38:15'),
(42, 0, '2022-10-08 17:39:11'),
(43, 1, '2022-10-08 17:39:13'),
(44, 4, '2022-10-08 17:39:18'),
(45, 1, '2022-10-08 17:39:20'),
(46, 4, '2022-10-08 17:39:59'),
(47, 1, '2022-10-08 17:40:08'),
(48, 0, '2022-10-08 17:40:08'),
(49, 752, '2022-10-08 22:47:44'),
(50, 3, '2022-10-08 22:47:48'),
(51, 4, '2022-10-08 22:47:52'),
(52, 1098, '2022-10-08 23:19:58'),
(53, 0, '2022-10-08 23:19:59'),
(54, 6, '2022-10-08 23:20:06'),
(55, 5, '2022-10-08 23:20:12'),
(56, 6, '2022-10-08 23:20:19'),
(57, 32, '2022-10-08 23:20:52'),
(58, 7, '2022-10-08 23:20:59'),
(59, 3, '2022-10-08 23:21:03'),
(60, 23, '2022-10-08 23:21:27'),
(61, 9, '2022-10-08 23:22:44'),
(62, 6, '2022-10-08 23:22:52'),
(63, 107, '2022-10-08 23:24:39'),
(64, 17, '2022-10-08 23:24:56'),
(65, 35, '2022-10-08 23:25:32'),
(66, 1, '2022-10-08 23:25:34'),
(67, 6, '2022-10-08 23:25:41'),
(68, 106, '2022-10-08 23:27:27'),
(69, 0, '2022-10-08 23:27:28'),
(70, 5, '2022-10-08 23:27:33'),
(71, 29, '2022-10-08 23:28:03'),
(72, 9, '2022-10-08 23:28:13'),
(73, 35, '2022-10-08 23:28:49'),
(74, 0, '2022-10-08 23:28:50'),
(75, 5, '2022-10-08 23:28:55'),
(76, 14, '2022-10-08 23:29:10'),
(77, 0, '2022-10-08 23:29:11'),
(78, 4, '2022-10-08 23:29:16'),
(79, 34, '2022-10-08 23:29:50'),
(80, 1, '2022-10-08 23:29:52'),
(81, 4, '2022-10-08 23:29:57'),
(82, 1, '2022-10-08 23:29:59'),
(83, 20, '2022-10-08 23:30:19'),
(84, 75, '2022-10-08 23:31:35'),
(85, 6, '2022-10-08 23:31:41'),
(86, 1, '2022-10-08 23:31:43'),
(87, 3, '2022-10-08 23:31:47'),
(88, 0, '2022-10-08 23:31:48'),
(89, 2, '2022-10-08 23:31:51'),
(90, 0, '2022-10-08 23:31:52'),
(91, 2, '2022-10-08 23:31:54'),
(92, 43, '2022-10-08 23:32:37'),
(93, 9, '2022-10-08 23:32:48'),
(94, 2, '2022-10-08 23:32:50'),
(95, 43, '2022-10-08 23:33:34'),
(96, 45, '2022-10-08 23:34:20'),
(97, 2, '2022-10-08 23:36:19'),
(98, 1, '2022-10-08 23:36:21'),
(99, 1, '2022-10-08 23:36:22'),
(100, 5, '2022-10-08 23:36:28'),
(101, 19, '2022-10-08 23:36:48'),
(102, 8, '2022-10-08 23:36:56'),
(103, 5, '2022-10-08 23:37:01'),
(104, 1, '2022-10-08 23:37:03'),
(105, 55, '2022-10-08 23:37:58'),
(106, 1, '2022-10-08 23:38:00'),
(107, 13, '2022-10-08 23:38:14'),
(108, 516, '2022-10-08 23:47:03'),
(109, 2, '2022-10-08 23:47:06'),
(110, 5, '2022-10-08 23:47:11'),
(111, 0, '2022-10-08 23:47:12'),
(112, 2, '2022-10-08 23:47:15'),
(113, 125, '2022-10-08 23:49:21'),
(114, 1, '2022-10-08 23:49:22'),
(115, 1, '2022-10-08 23:52:10'),
(116, 5, '2022-10-08 23:52:15'),
(117, 1, '2022-10-08 23:52:16'),
(118, 1, '2022-10-08 23:52:19'),
(119, 5, '2022-10-08 23:52:24'),
(120, 15, '2022-10-08 23:52:57'),
(121, 18, '2022-10-08 23:53:17'),
(122, 162, '2022-10-08 23:55:59'),
(123, 64, '2022-10-08 23:57:04'),
(124, 251, '2022-10-09 00:01:15'),
(125, 65, '2022-10-09 00:02:20'),
(126, 51, '2022-10-09 00:03:12'),
(127, 161, '2022-10-09 00:05:54'),
(128, 1, '2022-10-09 00:05:56'),
(129, 1, '2022-10-09 00:05:57'),
(130, 2, '2022-10-09 00:07:58'),
(131, 0, '2022-10-09 00:07:58'),
(132, 5, '2022-10-09 00:08:04'),
(133, 1, '2022-10-09 00:08:06'),
(134, 2, '2022-10-09 00:08:09'),
(135, 1, '2022-10-09 00:08:10'),
(136, 1, '2022-10-09 00:08:11'),
(137, 9, '2022-10-09 00:08:21'),
(138, 1, '2022-10-09 00:08:23'),
(139, 33, '2022-10-09 00:08:56'),
(140, 1, '2022-10-09 00:08:58'),
(141, 4, '2022-10-09 00:09:04'),
(142, 0, '2022-10-09 00:09:05'),
(143, 0, '2022-10-09 00:09:06'),
(144, 1, '2022-10-09 00:09:07'),
(145, 5, '2022-10-09 00:09:13'),
(146, 0, '2022-10-09 00:09:14'),
(147, 133, '2022-10-09 00:11:28'),
(148, 1, '2022-10-09 00:11:30'),
(149, 5, '2022-10-09 00:11:35'),
(150, 1, '2022-10-09 00:11:37'),
(151, 1, '2022-10-09 00:11:38'),
(152, 0, '2022-10-09 00:11:39'),
(153, 4, '2022-10-09 00:11:44'),
(154, 0, '2022-10-09 00:11:45'),
(155, 37, '2022-10-09 00:12:23'),
(156, 1, '2022-10-09 00:12:25'),
(157, 3, '2022-10-09 00:12:29'),
(158, 0, '2022-10-09 00:12:30'),
(159, 1, '2022-10-09 00:12:32'),
(160, 0, '2022-10-09 00:12:33'),
(161, 4, '2022-10-09 00:12:37'),
(162, 0, '2022-10-09 00:12:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contents`
--
ALTER TABLE `contents`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images_header`
--
ALTER TABLE `images_header`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `preferences`
--
ALTER TABLE `preferences`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `visiting`
--
ALTER TABLE `visiting`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contents`
--
ALTER TABLE `contents`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `images_header`
--
ALTER TABLE `images_header`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `preferences`
--
ALTER TABLE `preferences`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `visiting`
--
ALTER TABLE `visiting`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=163;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
