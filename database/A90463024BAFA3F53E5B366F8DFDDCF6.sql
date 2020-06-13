-- MySQL dump 10.13  Distrib 5.6.47, for Linux (x86_64)
--
-- Host: localhost    Database: heroku_c84e6c7b285209f
-- ------------------------------------------------------
-- Server version	5.6.47-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bucket`
--

DROP TABLE IF EXISTS `bucket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bucket` (
  `id` int(11) NOT NULL,
  `user_email` varchar(255) COLLATE latin1_general_cs NOT NULL,
  PRIMARY KEY (`id`,`user_email`),
  KEY `user_email` (`user_email`),
  CONSTRAINT `bucket_ibfk_1` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bucket`
--

LOCK TABLES `bucket` WRITE;
/*!40000 ALTER TABLE `bucket` DISABLE KEYS */;
INSERT INTO `bucket` VALUES (1,'abdullah@gmail.com'),(2,'abdullah@gmail.com'),(1,'demouser@dewamke.com');
/*!40000 ALTER TABLE `bucket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'HISTORY'),(3,'CHILDREN\'S BOOK'),(4,'EDUCATION & TEACHING'),(5,'HEALTH, FITNESS & DIETING'),(6,'MEDICAL BOOKS'),(7,'SCIENCE FICTION & FANTASY'),(8,'ROMANCE'),(9,'HUMOR & ENTARTAINMENT'),(10,'ENGINEERING & TRANSPORTATION');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cc`
--

DROP TABLE IF EXISTS `cc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cc` (
  `user_email` varchar(255) COLLATE latin1_general_cs NOT NULL,
  `bucket_id` int(11) NOT NULL,
  `card_num` int(11) DEFAULT NULL,
  `cvc` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_email`,`bucket_id`),
  CONSTRAINT `cc_ibfk_1` FOREIGN KEY (`user_email`, `bucket_id`) REFERENCES `payment` (`user_email`, `bucket_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cc`
--

LOCK TABLES `cc` WRITE;
/*!40000 ALTER TABLE `cc` DISABLE KEYS */;
/*!40000 ALTER TABLE `cc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `has_addresses`
--

DROP TABLE IF EXISTS `has_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `has_addresses` (
  `user_email` varchar(255) COLLATE latin1_general_cs NOT NULL,
  `address` varchar(255) COLLATE latin1_general_cs DEFAULT NULL,
  `id` int(11) NOT NULL,
  PRIMARY KEY (`user_email`,`id`),
  CONSTRAINT `has_addresses_ibfk_1` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `has_addresses`
--

LOCK TABLES `has_addresses` WRITE;
/*!40000 ALTER TABLE `has_addresses` DISABLE KEYS */;
INSERT INTO `has_addresses` VALUES ('abdullah@gmail.com','mamak',1);
/*!40000 ALTER TABLE `has_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hibernate_sequence`
--

DROP TABLE IF EXISTS `hibernate_sequence`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hibernate_sequence`
--

LOCK TABLES `hibernate_sequence` WRITE;
/*!40000 ALTER TABLE `hibernate_sequence` DISABLE KEYS */;
INSERT INTO `hibernate_sequence` VALUES (16),(1),(1),(1);
/*!40000 ALTER TABLE `hibernate_sequence` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `includes_bucket`
--

DROP TABLE IF EXISTS `includes_bucket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `includes_bucket` (
  `user_email` varchar(255) COLLATE latin1_general_cs NOT NULL DEFAULT '',
  `bucket_id` int(11) NOT NULL,
  `product_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_turkish_ci NOT NULL,
  `product_printer` varchar(255) CHARACTER SET utf8 COLLATE utf8_turkish_ci NOT NULL,
  `product_author` varchar(255) CHARACTER SET utf8 COLLATE utf8_turkish_ci NOT NULL,
  `product_volume` int(11) NOT NULL,
  `amount` int(11) DEFAULT NULL,
  `unit_price` double DEFAULT NULL,
  PRIMARY KEY (`user_email`,`bucket_id`,`product_name`,`product_printer`,`product_author`,`product_volume`),
  KEY `product_name` (`product_name`,`product_printer`,`product_author`,`product_volume`),
  CONSTRAINT `includes_bucket_ibfk_1` FOREIGN KEY (`user_email`, `bucket_id`) REFERENCES `bucket` (`user_email`, `id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `includes_bucket_ibfk_2` FOREIGN KEY (`product_name`, `product_printer`, `product_author`, `product_volume`) REFERENCES `product` (`name`, `printer`, `writter`, `volume`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `includes_bucket`
--

LOCK TABLES `includes_bucket` WRITE;
/*!40000 ALTER TABLE `includes_bucket` DISABLE KEYS */;
INSERT INTO `includes_bucket` VALUES ('abdullah@gmail.com',1,'1984','General Press','George Orwell',10,2,23.99),('abdullah@gmail.com',2,'1984','General Press','George Orwell',10,2,23.99);
/*!40000 ALTER TABLE `includes_bucket` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logdb`
--

DROP TABLE IF EXISTS `logdb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logdb` (
  `user_email` varchar(255) COLLATE latin1_general_cs NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`user_email`,`date`),
  CONSTRAINT `logdb_ibfk_1` FOREIGN KEY (`user_email`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logdb`
--

LOCK TABLES `logdb` WRITE;
/*!40000 ALTER TABLE `logdb` DISABLE KEYS */;
INSERT INTO `logdb` VALUES ('abdullah@gmail.com','1998-01-30 00:00:00'),('alikayadibi11@gmail.com','2020-05-30 20:25:27'),('demouser@dewamke.com','2020-05-31 18:30:46'),('emrehanci11@gmail.com','2020-05-30 19:57:03'),('emrehanci11@gmail.com','2020-05-30 20:06:06'),('emrehanci11@gmail.com','2020-05-30 20:17:20'),('emrehanci11@gmail.com','2020-05-30 20:17:55'),('emrehanci11@gmail.com','2020-05-30 20:25:02'),('emrehanci11@gmail.com','2020-05-31 12:21:40'),('emrehanci11@gmail.com','2020-05-31 18:01:19'),('emrehanci11@gmail.com','2020-05-31 18:03:22'),('emrehanci11@gmail.com','2020-05-31 18:26:16');
/*!40000 ALTER TABLE `logdb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payment` (
  `user_email` varchar(255) COLLATE latin1_general_cs NOT NULL,
  `bucket_id` int(11) NOT NULL,
  `payment_date` date DEFAULT NULL,
  `payment_time` time DEFAULT NULL,
  `total_price` double DEFAULT NULL,
  `type` tinyint(1) DEFAULT NULL,
  `address_id` int(11) NOT NULL,
  `stat_time` date DEFAULT NULL,
  `firm_code` varchar(255) COLLATE latin1_general_cs DEFAULT NULL,
  `stat` varchar(100) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`user_email`,`bucket_id`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`user_email`, `bucket_id`) REFERENCES `bucket` (`user_email`, `id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES ('abdullah@gmail.com',1,NULL,NULL,15,1,1,NULL,NULL,NULL);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pp`
--

DROP TABLE IF EXISTS `pp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pp` (
  `user_email` varchar(255) COLLATE latin1_general_cs NOT NULL,
  `bucket_id` int(11) NOT NULL,
  `acc_num` int(11) DEFAULT NULL,
  PRIMARY KEY (`user_email`,`bucket_id`),
  CONSTRAINT `pp_ibfk_1` FOREIGN KEY (`user_email`, `bucket_id`) REFERENCES `payment` (`user_email`, `bucket_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pp`
--

LOCK TABLES `pp` WRITE;
/*!40000 ALTER TABLE `pp` DISABLE KEYS */;
/*!40000 ALTER TABLE `pp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `name` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `printer` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `writter` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `volume` int(11) NOT NULL,
  `brief` varchar(1000) CHARACTER SET latin1 COLLATE latin1_general_cs DEFAULT NULL,
  `product_pic` longblob,
  `cat_id` int(11) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  PRIMARY KEY (`name`,`printer`,`writter`,`volume`),
  KEY `cat_id` (`cat_id`),
  CONSTRAINT `product_ibfk_1` FOREIGN KEY (`cat_id`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('1984','General Press','George Orwell',10,'1984, published in 1949, is a dystopian and satirical novel. It revolves around Winston Smith, who lives in a nation called Oceania, in a province called Airstrip One, which represents present-day England. This state is controlled by the Party, headed by a mysterious leader who is addressed as Emmanuel Goldstein, also known as the Big Brother. The Party watches every single move that Smith and other citizens make.','https://m.media-amazon.com/images/I/51M74buZQaL._SY346_.jpg',7,259,140),('Clean Code: A Handbook of Agile Software Craftsmanship','Kindle Edition','Robert C. Martin',1,'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn’t have to be that way.','https://images-na.ssl-images-amazon.com/images/I/41SH-SvWPxL._SX376_BO1,204,203,200_.jpg',4,30,755),('Homo Deus: A Brief History of Tomorrow','Penguin Random House Grupo Editorial','Yuval Noah Harari',6,'After the success of Sapiens . From animals to gods, Yuval Noah Harari turns his gaze to the future to see where we are headed. War is somewhat obsolete. It is more probable to kill oneself than to die in a warlike conflict. The famine is disappearing. Obesity is more common than starvation. Death is just a technical problem. Goodbye equality. Hello immortality. What does the future hold?','https://m.media-amazon.com/images/I/41EjplseI7L.jpg',7,20,2000),('Human, All-Too-Human: Parts One and Two','Dover','Friedrich Nietzsche',1,'Offers dazzling observations of human psychology, social interaction, esthetics and religion.\"—New York Times Book Review With Human, All-Too-Human, Nietzsche challenges the metaphysical and psychological assumptions behind his previous works. The philosopher reviews his usual subjects—morality, religion, government, society—with his characteristic depth of perception, unflinching honesty, and iconoclastic wit. His manner of expression, however, takes a new turn.','https://m.media-amazon.com/images/I/51FLyzcvOnL.jpg',7,75,152),('Incognito: The Secret Lives of the Brain','Random House Audio','David Eagleman',11,'If the conscious mind - the part you consider to be you - is just the tip of the iceberg, what is the rest doing? Taking in brain damage, plane spotting, dating, drugs, beauty, infidelity, synesthesia, criminal law, artificial intelligence, and visual illusions, Incognito is a thrilling subsurface exploration of the mind and all its contradictions.','https://m.media-amazon.com/images/I/41UB0ib46uL.jpg',7,13,1500),('Programming Pearls','Mariner Books','Jon Bentley',2,'When programmers list their favorite books, Jon Bentley’s collection of programming pearls is commonly included among the classics. Just as natural pearls grow from grains of sand that irritate oysters, programming pearls have grown from real problems that have irritated real programmers.','https://images-na.ssl-images-amazon.com/images/I/41KHvfm4-fL._SX347_BO1,204,203,200_.jpg',4,28,650),('Sapiens: A Brief History of Humankind','HarperAudio','Yuval Noah Harari',8,'From a renowned historian comes a groundbreaking narrative of humanity\'s creation and evolution - a number one international best seller - that explores the ways in which biology and history have defined us and enhanced our understanding of what it means to be \"human\". One hundred thousand years ago, at least six different species of humans inhabited Earth. Yet today there is only one - Homo sapiens. What happened to the others? And what may happen to us?','https://m.media-amazon.com/images/I/51XyWW6zEXL.jpg',7,20,1450),('The Fall of Public Man','','Richard Sennet',10,'A landmark study of urban society, reissued for the 40th anniversary of the original publication with a new epilogue by the author.  A sweeping, farsighted study of the changing nature of public culture and urban society, The Fall of Public Man spans more than two centuries of Western sociopolitical evolution and investigates the causes of our declining involvement in political life. Richard Sennett’s insights into the danger of the cult of individualism remain thoroughly relevant to our world today. In a new epilogue, he extends his analysis to the new “public” realm of social media, questioning how public culture has fared since the digital revolution.','https://images-na.ssl-images-amazon.com/images/I/51FJNFROeCL._SX334_BO1,204,203,200_.jpg',8,78,1500),('The Fellowship of the Ring: Being the First Part of The Lord of the Rings','Aragon Press','J.R.R. Tolkien',1,'One Ring to rule them all, One Ring to find them, One Ring to bring them all and in the darkness bind them  In ancient times the Rings of Power were crafted by the Elven-smiths, and Sauron, the Dark Lord, forged the One Ring, filling it with his own power so that he could rule all others. But the One Ring was taken from him, and though he sought it throughout Middle-earth, it remained lost to him. After many ages it fell into the hands of Bilbo Baggins, as told in The Hobbit. In a sleepy village in the Shire, young Frodo Baggins finds himself faced with an immense task, as his elderly cousin Bilbo entrusts the Ring to his care. Frodo must leave his home and make a perilous journey across Middle-earth to the Cracks of Doom, there to destroy the Ring and foil the Dark Lord in his evil purpose.','https://images-na.ssl-images-amazon.com/images/I/51tW-UJVfHL._SX321_BO1,204,203,200_.jpg',7,200,120),('The Lord of the Rings: The Return of the King','Aragon Press','J.R.R. Tolkien',1,'Tolkien’s classic epic fantasy trilogy The Lord of the Rings, updated with a fresh new package forBook 3, The Return of the King  As the Shadow of Mordor grows across the land, the Companions of the Ring have become involved in separate adventures. Aragorn, revealed as the hidden heir of the ancient Kings of the West, has joined with the Riders of Rohan against the forces of Isengard and takes part in the desperate victory of the Hornburg. Merry and Pippin, captured by Orcs, escape into Fangorn Forest and there encounter the Ents. Gandalf has miraculously returned and defeated the evil wizard, Saruman. Sam has left his master for dead after a battle with the giant spider, Shelob; but Frodo is still alive—now in the foul hands of the Orcs. And all the while the armies of the Dark Lord are massing as the One Ring draws ever nearer to the Cracks of Doom.','https://images-na.ssl-images-amazon.com/images/I/51ZMrv2d8SL._SX331_BO1,204,203,200_.jpg',7,175,750),('The Two Towers: Being the Second Part of The Lord of the Rings','Aragon Press','J.R.R. Tolkien',1,'Tolkien’s classic epic fantasy trilogy The Lord of the Rings, updated with a fresh new package for Book 2, The Two Towers  Frodo and his Companions of the Ring have been beset by danger during their quest to prevent the Ruling Ring from falling into the hands of the Dark Lord by destroying it in the Cracks of Doom. They lost the wizard Gandalf in the Mines of Moria. And Boromir, seduced by the power of the Ring, tried to seize it by force. While Frodo and Sam made their escape, the rest of the company was attacked by Orcs.  Now they continue their journey alone down the great River Anduin—alone, that is, save for the mysterious creeping figure that follows wherever they go.','https://images-na.ssl-images-amazon.com/images/I/51MCZQ7pj1L._SX331_BO1,204,203,200_.jpg',7,150,10),('The Wisdom of Psychopaths','Macmillan Audio','Kevin Dutton',11,'In this engrossing journey into the lives of psychopaths and their infamously crafty behaviors, the renowned psychologist Kevin Dutton reveals that there is a scale of “madness” along which we all sit. Incorporating the latest advances in brain scanning and neuroscience, Dutton demonstrates that the brilliant neurosurgeon who lacks empathy has more in common with a Ted Bundy who kills for pleasure than we may wish to admit, and that a mugger in a dimly lit parking lot may well, in fact, have the same nerveless poise as a titan of industry.','https://m.media-amazon.com/images/I/41gyZYpn1cL.jpg',7,12,1250);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rate`
--

DROP TABLE IF EXISTS `rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rate` (
  `user_email` varchar(255) COLLATE latin1_general_cs NOT NULL DEFAULT '',
  `bucket_id` int(11) NOT NULL,
  `product_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_turkish_ci NOT NULL,
  `product_printer` varchar(255) CHARACTER SET utf8 COLLATE utf8_turkish_ci NOT NULL,
  `product_author` varchar(255) CHARACTER SET utf8 COLLATE utf8_turkish_ci NOT NULL,
  `product_volume` int(11) NOT NULL,
  `rate` int(11) DEFAULT NULL,
  `explanation` varchar(500) COLLATE latin1_general_cs DEFAULT NULL,
  PRIMARY KEY (`user_email`,`bucket_id`,`product_name`,`product_printer`,`product_author`,`product_volume`),
  KEY `product_name` (`product_name`,`product_printer`,`product_author`,`product_volume`),
  CONSTRAINT `rate_ibfk_1` FOREIGN KEY (`user_email`, `bucket_id`) REFERENCES `bucket` (`user_email`, `id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `rate_ibfk_2` FOREIGN KEY (`product_name`, `product_printer`, `product_author`, `product_volume`) REFERENCES `product` (`name`, `printer`, `writter`, `volume`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rate`
--

LOCK TABLES `rate` WRITE;
/*!40000 ALTER TABLE `rate` DISABLE KEYS */;
INSERT INTO `rate` VALUES ('abdullah@gmail.com',1,'1984','General Press','George Orwell',10,1,'WTF DUDE AWFUL'),('abdullah@gmail.com',1,'Clean Code: A Handbook of Agile Software Craftsmanship','Kindle Edition','Robert C. Martin',1,5,'');
/*!40000 ALTER TABLE `rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `email` varchar(255) COLLATE latin1_general_cs NOT NULL,
  `password` varchar(255) COLLATE latin1_general_cs NOT NULL,
  `name` varchar(255) COLLATE latin1_general_cs DEFAULT NULL,
  `gender` tinyint(4) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `phone_first3` int(11) DEFAULT NULL,
  `phone_rest` int(11) DEFAULT NULL,
  `profil_pic` longblob,
  `is_admin` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_cs;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('abdullah@gmail.com','D88EA461ADAB9A5D6D2D760F82BBD6B1BA81452E','Abdullahs',1,'2007-07-19',535,7952319,'https://instagram.fesb4-2.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p640x640/18581410_1094565703979049_8863981173664120832_n.jpg?_nc_ht=instagram.fesb4-2.fna.fbcdn.net&_nc_cat=109&_nc_ohc=Je5oVMIer94AX_WMcx4&oh=a417272053a530a51ffb2104eea42099&oe=5EFAE06D',0),('alikayadibi11@gmail.com','81CC9EFC2469C58CB788184B35AFCDF5D6C0B0AA','Ali Kayadibi',1,NULL,0,0,NULL,1),('demouser@dewamke.com','417F093B156E4D6B6D21E6B0C27D0954AEA058DD',NULL,0,NULL,0,0,NULL,0),('emre@hanci.com','C53255317BB11707D0F614696B3CE6F221D0E2F2','Emre Hanci',1,'1995-11-15',551,2583307,'https://instagram.fbtz1-4.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/101427270_546533812680206_6371415423085573882_n.jpg?_nc_ht=instagram.fbtz1-4.fna.fbcdn.net&_nc_cat=102&_nc_ohc=v4tinilCYhYAX8m-ze4&oh=0ebfde0dcec91e2f35f66fe1a971b797&oe=5EFB5122',1),('emrehanci11@gmail.com','81CC9EFC2469C58CB788184B35AFCDF5D6C0B0AA','Emre Hanci',1,'1995-11-15',551,2583307,'https://instagram.fbtz1-4.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/101427270_546533812680206_6371415423085573882_n.jpg?_nc_ht=instagram.fbtz1-4.fna.fbcdn.net&_nc_cat=102&_nc_ohc=v4tinilCYhYAX8m-ze4&oh=0ebfde0dcec91e2f35f66fe1a971b797&oe=5EFB5122',1),('erenkun11@gmail.com','81CC9EFC2469C58CB788184B35AFCDF5D6C0B0AA','Eren Kun',1,NULL,0,0,NULL,1),('ihsankaya11@gmail.com','81CC9EFC2469C58CB788184B35AFCDF5D6C0B0AA','Ihsan Kaya',1,NULL,0,0,NULL,1),('saidkaya11@gmail.com','81CC9EFC2469C58CB788184B35AFCDF5D6C0B0AA','Said Kaya',1,NULL,0,0,NULL,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'heroku_c84e6c7b285209f'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-01  4:51:55
