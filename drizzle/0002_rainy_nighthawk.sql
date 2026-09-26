CREATE TABLE `shopReviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`displayName` varchar(80) NOT NULL,
	`rating` int NOT NULL,
	`reviewText` text NOT NULL,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`reviewedByUserId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`reviewedAt` timestamp,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `shopReviews_id` PRIMARY KEY(`id`)
);
