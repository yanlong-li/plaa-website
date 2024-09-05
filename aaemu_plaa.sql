CREATE TABLE `activities`
(
    `id`           INT unsigned AUTO_INCREMENT PRIMARY KEY,
    `name`         VARCHAR(255) NOT NULL COMMENT '活动名称',
    `target_group` ENUM ('account', 'role') DEFAULT 'role' COMMENT '面向群体，账户还是角色',
    `claim_limit`  INT unsigned             DEFAULT 1 COMMENT '领取次数限制，默认1次',
    `description`  TEXT COMMENT '活动描述',
    `created_at`   DATETIME                 DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `start_time`   DATETIME     NULL COMMENT '活动开始时间',
    `end_time`     DATETIME     NULL COMMENT '活动结束时间'
) ENGINE = InnoDB comment '活动表'
  DEFAULT CHARSET = utf8mb4;


CREATE TABLE `activity_options`
(
    `id`          INT unsigned AUTO_INCREMENT PRIMARY KEY,
    `activity_id` INT unsigned NOT NULL COMMENT '关联的活动ID',
    `title`       VARCHAR(255) NOT NULL COMMENT '选项标题',
    `description` TEXT COMMENT '选项描述',
    `hidden_data` TEXT COMMENT '内部数据交互的隐藏字段',
    FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB
    COMMENT '活动记录表'
  DEFAULT CHARSET = utf8mb4;


CREATE TABLE `activity_participation`
(
    `id`                 INT unsigned AUTO_INCREMENT PRIMARY KEY,
    `account_id`         INT unsigned NOT NULL COMMENT '账户ID',
    `role_id`            INT unsigned DEFAULT NULL COMMENT '角色ID',
    `activity_id`        INT unsigned NOT NULL COMMENT '关联的活动ID',
    `option_id`          INT unsigned DEFAULT NULL COMMENT '选择的选项ID（套餐）',
    `participation_time` DATETIME     DEFAULT CURRENT_TIMESTAMP COMMENT '参与时间',
    FOREIGN KEY (`activity_id`) REFERENCES `activities` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`option_id`) REFERENCES `activity_options` (`id`) ON DELETE SET NULL
) ENGINE = InnoDB
    COMMENT '领取记录表'
  DEFAULT CHARSET = utf8mb4;

