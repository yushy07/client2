ALTER TABLE `shopReviews` ADD COLUMN `reviewVisibility` enum('published','private') NOT NULL DEFAULT 'private';--> statement-breakpoint
UPDATE `shopReviews` SET `reviewVisibility` = CASE WHEN `rating` >= 3 THEN 'published' ELSE 'private' END;--> statement-breakpoint
ALTER TABLE `shopReviews` DROP COLUMN `status`;--> statement-breakpoint
ALTER TABLE `shopReviews` CHANGE COLUMN `reviewVisibility` `status` enum('published','private') NOT NULL DEFAULT 'private';--> statement-breakpoint
ALTER TABLE `shopReviews` DROP COLUMN `reviewedByUserId`;--> statement-breakpoint
ALTER TABLE `shopReviews` DROP COLUMN `reviewedAt`;
