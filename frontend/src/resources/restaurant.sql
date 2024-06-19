-- database name: "restaurant"
#CREATE DATABASE `restaurant`;
USE `restaurant`;
/*CREATE TABLE food( 
    food_id INT(11) PRIMARY KEY AUTO_INCREMENT, 
    food_name VARCHAR(255), 
    food_price VARCHAR(255),
    food_discount VARCHAR(255),
    food_desc VARCHAR(255),
    food_status VARCHAR(255),
    food_type VARCHAR(255),
    food_category VARCHAR(255),
    food_src VARCHAR(255)
) ENGINE=INNODB;*/

/*INSERT INTO food (food_name, food_price, food_discount, food_desc, food_status, food_type, food_category, food_src)
VALUES("滷肉飯", "45.00", "0.00", "滷汁醇厚，肉香四溢", "best seller", "meat" ,"飯", "food/401.jpg"),
	  ("蚵仔煎", "75.00", "5.00", "外酥內嫩，鮮甜多汁", "best seller", "meat", "其他", "food/401.jpg");*/
/*INSERT INTO food (food_name, food_price, food_discount, food_desc, food_status, food_type, food_category, food_src)
VALUES
      ("炒飯", "85.00", "5.00", "粒粒分明，香氣四溢", "best seller new dishes", "meat", "飯", "food/401.jpg"),
      ("雞肉飯", "55.00", "0.00", "香味俱佳，鮮嫩多汁", "best seller", "meat", "飯", "food/401.jpg"),
      ("牛肉燴飯", "105.00", "5.00", "肉質鮮嫩，飯粒飽滿香滑", "best seller new dishes", "meat", "飯", "food/401.jpg"),
      ("赤肉羹飯", "65.00", "0.00", "湯頭鮮美，肉質彈牙不柴", "best seller new dishes", "meat", "飯", "food/401.jpg");*/
      
      
      
      

#SELECT * FROM `food`;

/*CREATE TABLE user( 
    user_id INT(11) PRIMARY KEY AUTO_INCREMENT, 
    user_name VARCHAR(255), 
    user_email VARCHAR(255),
    user_phone VARCHAR(255),
    user_password VARCHAR(255),
    user_birth VARCHAR(255),
    user_gender VARCHAR(255)
) ENGINE=INNODB;*/

#SELECT * FROM `user`;

/*CREATE TABLE staff( 
    staff_id INT(11) AUTO_INCREMENT, 
	staff_sn INT(20),
    staff_name VARCHAR(255), 
    staff_phone VARCHAR(255),
    staff_password VARCHAR(255),
    staff_birth VARCHAR(255),
    staff_gender VARCHAR(255),
    primary key (staff_id, staff_sn)
) ENGINE=INNODB;*/

#SELECT * FROM `staff`;

/*CREATE TABLE cart (
  user_id INT,
  food_id INT,
  item_qty INT,
  primary key (user_id, food_id)
);*/


/*CREATE TABLE booktable( 
    book_id INT(11) PRIMARY KEY AUTO_INCREMENT, 
    book_name VARCHAR(255), 
    book_phone VARCHAR(255),
    book_people INT,
    book_tables INT,
    book_when VARCHAR(255),
    book_note TEXT
) ENGINE=INNODB;*/


/*CREATE TABLE billdetails (
  details_id INT AUTO_INCREMENT,
  bill_id INT,
  food_id INT,
  item_qty INT,
  primary key (details_id, bill_id, food_id)
);*/

#select * from `billdetails`;
#select * from `billstatus`;
#select * from `user`;

/*CREATE TABLE billstatus (
  bill_id INT,
  user_id INT,
  seat_id INT,
  bill_when VARCHAR(255),
  bill_method VARCHAR(255),
  bill_discount INT,
  bill_delivery INT,
  bill_total INT,
  bill_paid VARCHAR(255),
  bill_status INT,
  primary key (bill_id)
);*/

/*CREATE TABLE `seat` (
	seat_id INT,
    user_id INT(11),
    seat_name VARCHAR(255),
    seat_status INT,
    primary key (seat_id)
);*/
/*INSERT INTO seat (seat_id, seat_name, user_id, seat_status)
VALUES("1","1號桌",null,"0"),
("2","2號桌",null,"0"),
("3","3號桌",null,"0"),
("4","4號桌",null,"0"),
("5","5號桌",null,"0"),
("6","6號桌",null,"0"),
("7","7號桌",null,"0"),
("8","8號桌",null,"0"),
("9","9號桌",null,"0"),
("10","10號桌",null,"0"),
("11","11號桌",null,"0"),
("12","12號桌",null,"0");*/

SELECT * FROM `seat`;
SELECT * FROM `billstatus`;
SELECT billstatus.*, seat.seat_status 
    FROM billstatus 
    LEFT JOIN seat ON billstatus.seat_id = seat.seat_id;
