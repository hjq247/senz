CREATE TABLE `articles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`wechatArticleId` varchar(128) NOT NULL,
	`title` varchar(512) NOT NULL,
	`summary` text,
	`coverUrl` varchar(2048),
	`link` varchar(2048) NOT NULL,
	`category` enum('stories','csr','media') NOT NULL DEFAULT 'stories',
	`publishedAt` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `articles_id` PRIMARY KEY(`id`),
	CONSTRAINT `articles_wechatArticleId_unique` UNIQUE(`wechatArticleId`)
);
