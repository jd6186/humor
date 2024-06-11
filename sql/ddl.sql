CREATE TABLE User (
                            userId INT AUTO_INCREMENT PRIMARY KEY,
                            firstName VARCHAR(255) NOT NULL,
                            lastName VARCHAR(255) NOT NULL,
                            isActive BOOLEAN DEFAULT TRUE,
                            loginId VARCHAR(255) NOT NULL,
                            password VARCHAR(255) NOT NULL,
                            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) DEFAULT CHARSET=utf8;