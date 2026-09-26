CREATE TABLE `serviceEnquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(120) NOT NULL,
	`phone` varchar(30) NOT NULL,
	`email` varchar(320) NOT NULL,
	`serviceType` varchar(120) NOT NULL,
	`pincode` varchar(10) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `serviceEnquiries_id` PRIMARY KEY(`id`)
);
