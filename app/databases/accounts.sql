DROP TABLE IF EXISTS ORDERS;

DROP TABLE IF EXISTS CART_CROP;

DROP TABLE IF EXISTS SHOPPING_CART;

DROP TABLE IF EXISTS HARVEST_CROP;

DROP TABLE IF EXISTS RATING;

DROP TABLE IF EXISTS SPECIFIC_CROP;

DROP TABLE IF EXISTS CROP;

DROP TABLE IF EXISTS RATING_OF_FARMER;

DROP TABLE IF EXISTS HARVEST_EVENT_ATTENDANTS;

DROP TABLE IF EXISTS HARVEST_EVENT;

DROP TABLE IF EXISTS FARMERS;

DROP TABLE IF EXISTS ACCOUNTS;

DROP TABLE IF EXISTS SUGGESTED_CROP;

DROP TABLE IF EXISTS CATEGORY;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";

SET TIME_ZONE = "+02:00";

CREATE TABLE ACCOUNTS (
    ID INT(64) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    LOGIN VARCHAR(64) NOT NULL UNIQUE KEY,
    PASSWORD VARCHAR(128) NOT NULL,
    FULLNAME VARCHAR(64) NOT NULL,
    EMAIL VARCHAR(64) NOT NULL,
    MODERATE INT(1) NOT NULL DEFAULT 0
);

CREATE TABLE FARMERS (
    LOGIN VARCHAR(64) NOT NULL PRIMARY KEY,
    ADDRESS VARCHAR(64) NOT NULL,
    ICO VARCHAR(8) NOT NULL,
    PHONE VARCHAR(13) NOT NULL,
    IBAN VARCHAR(32) NOT NULL,
    FOREIGN KEY (LOGIN) REFERENCES ACCOUNTS(LOGIN)
);

CREATE TABLE HARVEST_EVENT(
    EVENTID INT(64) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    DATE_FROM DATE NOT NULL,
    DATE_TO DATE NOT NULL,
    PLACE VARCHAR(64) NOT NULL,
    DESCRIPTION VARCHAR(300) NOT NULL,
    POSTEDBY VARCHAR(64) NOT NULL,
    FOREIGN KEY (POSTEDBY) REFERENCES FARMERS(LOGIN)
);

CREATE TABLE HARVEST_EVENT_ATTENDANTS(
    EVENTID INT(64) NOT NULL,
    LOGIN VARCHAR(64) NOT NULL,
    FOREIGN KEY (EVENTID) REFERENCES HARVEST_EVENT(EVENTID),
    FOREIGN KEY (LOGIN) REFERENCES ACCOUNTS(LOGIN),
    PRIMARY KEY (EVENTID, LOGIN)
);

CREATE TABLE RATING_OF_FARMER(
    RATINGID INT(64) NOT NULL PRIMARY KEY,
    AVG_RATING FLOAT(3) NOT NULL,
    FARMER VARCHAR(64) NOT NULL,
    FOREIGN KEY (FARMER) REFERENCES FARMERS(LOGIN),
    UNIQUE KEY (FARMER)
);

CREATE TABLE CATEGORY(
    CATEGORY VARCHAR(64) PRIMARY KEY
);

CREATE TABLE CROP(
    CROPTYPE VARCHAR(64) NOT NULL PRIMARY KEY,
    CATEGORY VARCHAR(64) NOT NULL,
    FOREIGN KEY (CATEGORY) REFERENCES CATEGORY(CATEGORY)
);

CREATE TABLE SUGGESTED_CROP(
    S_CROPTYPE VARCHAR(64) NOT NULL PRIMARY KEY,
    CATEGORY VARCHAR(64) NOT NULL,
    FOREIGN KEY (CATEGORY) REFERENCES CATEGORY(CATEGORY)
);

CREATE TABLE SPECIFIC_CROP(
    CROPID INT(64) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    CROP_NAME VARCHAR(64) NOT NULL,
    CROP VARCHAR(64) NOT NULL,
    CATEGORY VARCHAR(64) NOT NULL,
    AMOUNT INT(64) DEFAULT 0,
    PRICE FLOAT(10) DEFAULT 0,
    PER_UNIT VARCHAR(2) NOT NULL DEFAULT "kg",
    PHOTO_URL VARCHAR(128),
    DESCRIPTION VARCHAR(128),
    CROPLOCATION VARCHAR(64) NOT NULL,
    FARMER VARCHAR(64) NOT NULL,
    FOREIGN KEY (FARMER) REFERENCES FARMERS(LOGIN),
    FOREIGN KEY (CATEGORY) REFERENCES CATEGORY(CATEGORY),
    FOREIGN KEY (FARMER) REFERENCES FARMERS(LOGIN)
);

CREATE TABLE RATING(
    RATINGID INT(64) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    STARS FLOAT(3) NOT NULL,
    DESCRIPTION VARCHAR(100) DEFAULT NULL,
    USER VARCHAR(64) NOT NULL,
    FARMER VARCHAR(64) NOT NULL,
    CROP INT(64) NOT NULL,
    FOREIGN KEY (USER) REFERENCES ACCOUNTS(LOGIN),
    FOREIGN KEY (FARMER) REFERENCES FARMERS(LOGIN),
    FOREIGN KEY (CROP) REFERENCES SPECIFIC_CROP(CROPID)
);

CREATE TABLE HARVEST_CROP(
    CROPID INT(64) NOT NULL,
    EVENTID INT(64) NOT NULL,
    FOREIGN KEY (CROPID) REFERENCES SPECIFIC_CROP(CROPID),
    FOREIGN KEY (EVENTID) REFERENCES HARVEST_EVENT(EVENTID),
    PRIMARY KEY (EVENTID, CROPID)
);

CREATE TABLE SHOPPING_CART(
    CARTID INT(64) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    USER VARCHAR(64) NOT NULL,
    CART_VALUE INT(64) DEFAULT 0,
    ITEM_COUNT INT(64) DEFAULT 0,
    IN_USE BOOLEAN DEFAULT 1,
    FOREIGN KEY (USER) REFERENCES ACCOUNTS(LOGIN)
);

CREATE TABLE CART_CROP(
    CARTID INT(64) NOT NULL,
    CROPID INT(64) NOT NULL,
    AMOUNT INT(64) NOT NULL DEFAULT 1,
    FOREIGN KEY (CARTID) REFERENCES SHOPPING_CART(CARTID),
    FOREIGN KEY (CROPID) REFERENCES SPECIFIC_CROP(CROPID),
    PRIMARY KEY (CARTID, CROPID)
);

CREATE TABLE ORDERS(
    ORDERID INT(64) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    CARTID INT(64) NOT NULL,
    DUE_DATE DATE NOT NULL,
    ORIGIN_DATE DATE NOT NULL,
    FARMER VARCHAR(64) NOT NULL,
    CROPID INT(64) NOT NULL,
    AMOUNT INT(64) NOT NULL,
    PROCESSED BOOL DEFAULT FALSE,
    FOREIGN KEY (FARMER) REFERENCES FARMERS(LOGIN),
    FOREIGN KEY (CARTID) REFERENCES SHOPPING_CART(CARTID),
    FOREIGN KEY (CROPID) REFERENCES CART_CROP(CROPID)
);

INSERT INTO `ACCOUNTS` (
    `ID`,
    `LOGIN`,
    `PASSWORD`,
    `FULLNAME`,
    `EMAIL`,
    `MODERATE`
) VALUES (
    NULL,
    'admin',
    '$2y$10$4s5KYVpsgRKmMNMbdo6zOOev4UrLTmp5ocq4B0j4VCZ0BaYNrxCMi',
    '',
    '',
    '1'
);

INSERT INTO `ACCOUNTS` (
    `ID`,
    `LOGIN`,
    `PASSWORD`,
    `FULLNAME`,
    `EMAIL`,
    `MODERATE`
) VALUES (
    NULL,
    'moderate',
    '$2y$10$qqvyUvnQOg9Ev8bSOml6LePFcNUeq2IDZZnnrjDm8zafCKG9J3gVa',
    '',
    '',
    '2'
);

INSERT INTO `CATEGORY` (
    `CATEGORY`
) VALUES (
    'Ovocie'
);

INSERT INTO `CATEGORY` (
    `CATEGORY`
) VALUES (
    'Zelenina'
);

INSERT INTO `CROP` (
    `CROPTYPE`,
    `CATEGORY`
) VALUES (
    'Jablko',
    'Ovocie'
);

INSERT INTO `CROP` (
    `CROPTYPE`,
    `CATEGORY`
) VALUES (
    'Slivka',
    'Ovocie'
);

INSERT INTO `CROP` (
    `CROPTYPE`,
    `CATEGORY`
) VALUES (
    'Ostružina',
    'Ovocie'
);

INSERT INTO `CROP` (
    `CROPTYPE`,
    `CATEGORY`
) VALUES (
    'Kukurica',
    'Zelenina'
);

INSERT INTO `CROP` (
    `CROPTYPE`,
    `CATEGORY`
) VALUES (
    'Uhorka',
    'Zelenina'
);

INSERT INTO `CROP` (
    `CROPTYPE`,
    `CATEGORY`
) VALUES (
    'Mrkva',
    'Zelenina'
);

INSERT INTO `SUGGESTED_CROP` (
    `S_CROPTYPE`,
    `CATEGORY`
) VALUES (
    'Kedlubna',
    'Zelenina'
);

INSERT INTO `SUGGESTED_CROP` (
    `S_CROPTYPE`,
    `CATEGORY`
) VALUES (
    'Granátové jablko',
    'Ovocie'
);

INSERT INTO `ACCOUNTS` (
    `ID`,
    `LOGIN`,
    `PASSWORD`,
    `FULLNAME`,
    `EMAIL`,
    `MODERATE`
) VALUES (
    NULL,
    'Farmár_Ferko',
    '$2y$10$.p9UWiZXNWLJ1rJVRDELXOG77MUsqNO7Oa0b1xo8DXmhS4lTpqpRW',
    'Ferko Vyšný',
    'fero@gmail.com',
    0
);

INSERT INTO `ACCOUNTS` (
    `ID`,
    `LOGIN`,
    `PASSWORD`,
    `FULLNAME`,
    `EMAIL`,
    `MODERATE`
) VALUES (
    NULL,
    'Farmárka_Anička',
    '$2y$10$PT.SfOS.oxFCCLDU2anlDut2Gm9B1gYrUp/gAny40/h9ZvHNv50HC',
    'Anča Turanová',
    'xx@gmail.com',
    0
);

INSERT INTO `FARMERS` (
    `LOGIN`,
    `ADDRESS`,
    `ICO`,
    `PHONE`,
    `IBAN`
) VALUES (
    'Farmár_Ferko',
    'Nerudova 33, 602 00 Brno-střed',
    '58734261',
    '+421401520363',
    'CZ36 0100 0000 0001 2345 6789'
);

INSERT INTO `FARMERS` (
    `LOGIN`,
    `ADDRESS`,
    `ICO`,
    `PHONE`,
    `IBAN`
) VALUES (
    'Farmárka_Anička',
    'Schodová 305/2, 602 00 Brno-střed',
    '32165487',
    '+420903503505',
    'CZ36 0100 0000 0002 3333 6789'
);

INSERT INTO `SPECIFIC_CROP` (
    `CROPID`,
    `CROP_NAME`,
    `CROP`,
    `CATEGORY`,
    `AMOUNT`,
    `PRICE`,
    `PER_UNIT`,
    `PHOTO_URL`,
    `DESCRIPTION`,
    `CROPLOCATION`,
    `FARMER`
) VALUES (
    NULL,
    'Granny Smith',
    'Jablko',
    'Ovocie',
    '45',
    '22',
    'kg',
    'https://publish.purewow.net/wp-content/uploads/sites/2/2021/03/types-of-apples-mutsu.jpg?fit=400%2C400',
    'Sladká odroda zeleného jabĺčka.',
    'Orava',
    'Farmár_Ferko'
);

INSERT INTO `SPECIFIC_CROP` (
    `CROPID`,
    `CROP_NAME`,
    `CROP`,
    `CATEGORY`,
    `AMOUNT`,
    `PRICE`,
    `PER_UNIT`,
    `PHOTO_URL`,
    `DESCRIPTION`,
    `CROPLOCATION`,
    `FARMER`
) VALUES (
    NULL,
    'Golden Delicious',
    'Jablko',
    'Ovocie',
    '25',
    '26',
    'kg',
    'https://cdn.britannica.com/22/187222-050-07B17FB6/apples-on-a-tree-branch.jpg?w=400&h=200&c=crop',
    'Nestriekané, priamo zo záhrady.',
    'Orava',
    'Farmár_Ferko'
);

INSERT INTO `SPECIFIC_CROP` (
    `CROPID`,
    `CROP_NAME`,
    `CROP`,
    `CATEGORY`,
    `AMOUNT`,
    `PRICE`,
    `PER_UNIT`,
    `PHOTO_URL`,
    `DESCRIPTION`,
    `CROPLOCATION`,
    `FARMER`
) VALUES (
    NULL,
    'Lesné Maliny',
    'Ostružina',
    'Ovocie',
    '8',
    '63',
    'kg',
    'https://i1.wp.com/ceskozdrave.cz/wp-content/uploads/2015/12/maliny.png?resize=400%2C255&ssl=1',
    'Nazbierané v miestnom lesíku.',
    'Morava',
    'Farmárka_Anička'
);

INSERT INTO `SPECIFIC_CROP` (
    `CROPID`,
    `CROP_NAME`,
    `CROP`,
    `CATEGORY`,
    `AMOUNT`,
    `PRICE`,
    `PER_UNIT`,
    `PHOTO_URL`,
    `DESCRIPTION`,
    `CROPLOCATION`,
    `FARMER`
) VALUES (
    NULL,
    'Baby mrkvičky',
    'Mrkva',
    'Zelenina',
    '88',
    '15',
    'ks',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Baby_Carrots_2.jpg/400px-Baby_Carrots_2.jpg',
    '...',
    'Morava',
    'Farmárka_Anička'
);
