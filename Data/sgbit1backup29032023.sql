-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 29, 2023 at 03:24 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `makemymarriage1`
--

-- --------------------------------------------------------

--
-- Table structure for table `servporders`
--

CREATE TABLE `servporders` (
  `sid` int(11) NOT NULL,
  `cid` int(11) NOT NULL,
  `qtty` int(11) NOT NULL,
  `servDate` date NOT NULL,
  `mhName` varchar(100) NOT NULL,
  `mhAddr` varchar(150) NOT NULL,
  `area` varchar(50) NOT NULL,
  `custCellNum` char(10) NOT NULL,
  `Timing` char(30) NOT NULL,
  `custName` char(50) NOT NULL DEFAULT 'Ajay Acharya',
  `servName` varchar(50) NOT NULL DEFAULT 'Photographer'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `servporders`
--

INSERT INTO `servporders` (`sid`, `cid`, `qtty`, `servDate`, `mhName`, `mhAddr`, `area`, `custCellNum`, `Timing`, `custName`, `servName`) VALUES
(101, 101, 5, '2023-03-22', 'Ashirvad Mangal Karyala', 'Anagol main road, Opp. Shri Harimandir\r\n590006', 'Anagol', '98373822', '9.00 am', 'Suraj Sinha', 'Beatician'),
(102, 1007, 10, '2023-03-24', 'Sant Tukaram, Marriage Hall, near Railway\r\nBridge, near Maratha Managal karyalay', 'Railway Bridge near, Fire Brigade,\r\nTilakwadi', 'Tilakwadi', '9988776655', '9.00 am', 'Ajay Acharya', 'Photographer');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
