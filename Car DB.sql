CREATE TABLE Car (
    Car_ID SERIAL PRIMARY KEY,
    Car_Model VARCHAR(100),
    Manufacturer VARCHAR(100),
    Year INT,
    Color VARCHAR(50),
    Rental_Rate DECIMAL(10, 2),
    Availability BOOLEAN
);

CREATE TABLE Customer (
    Customer_ID SERIAL PRIMARY KEY,
    First_Name VARCHAR(100),
    Last_Name VARCHAR(100),
    Email VARCHAR(100),
    Phone_Number VARCHAR(30),
    Address TEXT
);


CREATE TABLE Booking (
    Booking_ID SERIAL PRIMARY KEY,
    Car_ID INT REFERENCES Car(Car_ID),
    Customer_ID INT REFERENCES Customer(Customer_ID),
    Rental_Start_Date DATE,
    Rental_End_Date DATE,
    Total_Amount DECIMAL(10, 2)
);

CREATE TABLE Payment (
    Payment_ID SERIAL PRIMARY KEY,
    Booking_ID INT REFERENCES Booking(Booking_ID),
    Payment_Date DATE,
    Amount DECIMAL(10, 2),
    Payment_Method VARCHAR(50)
);

CREATE TABLE Insurance (
    Insurance_ID SERIAL PRIMARY KEY,
    Car_ID INT REFERENCES Car(Car_ID),
    Insurance_Provider VARCHAR(100),
    Policy_Number VARCHAR(100),
    Start_Date DATE,
    End_Date DATE
);

CREATE TABLE Location (
    Location_ID SERIAL PRIMARY KEY,
    Car_ID INT REFERENCES Car(Car_ID),
    Location_Name VARCHAR(100),
    Address TEXT,
    Contact_Number VARCHAR(20)
);

CREATE TABLE Reservation (
    Reservation_ID SERIAL PRIMARY KEY,
    Car_ID INT REFERENCES Car(Car_ID),
    Customer_ID INT REFERENCES Customer(Customer_ID),
    Reservation_Date DATE,
    Pickup_Date DATE,
    Return_Date DATE
);

CREATE TABLE Maintenance (
    Maintenance_ID SERIAL PRIMARY KEY,
    Car_ID INT REFERENCES Car(Car_ID),
    Maintenance_Date DATE,
    Description TEXT,
    Cost DECIMAL(10, 2)
);


INSERT INTO Car (Car_Model, Manufacturer, Year, Color, Rental_Rate, Availability) VALUES
('Bank Model', 'Campbell-Andrews', 2019, 'Blue', 107.52, FALSE),
('Garden Model', 'Oliver, Hernandez and Day', 2012, 'DarkKhaki', 20.03, FALSE),
('Together Model', 'Roberts-Smith', 2006, 'MintCream', 78.72, FALSE),
('Pass Model', 'Hicks-Jones', 2018, 'AntiqueWhite', 34.58, TRUE),
('Building Model', 'Glass-Johnson', 2013, 'DarkMagenta', 66.34, TRUE),
('Safe Model', 'Aguilar-Johns', 2013, 'Crimson', 84.22, TRUE),
('Room Model', 'Lewis-Reyes', 2012, 'Moccasin', 138.03, TRUE);

INSERT INTO Customer (First_Name, Last_Name, Email, Phone_Number, Address) VALUES
('Alexis', 'Chapman', 'michelle19@gmail.com', '6336779037', '6549 Jennifer Summit, Jasonstad, IN 02995'),
('Michael', 'Velazquez', 'qgarcia@hotmail.com', '(617)938-2136', '067 Johnson Ports, Steinstad, HI 06862'),
('Daniel', 'Peters', 'xdavila@wells-horne.biz', '8261x86089', '90695 Cooper Forest, Williamview, OH 43104'),
('Diana', 'Anderson', 'jamesbautista@moore.com', '8022883403', '92921 Mitchell Avenue, South Juanchester, ID 22074'),
('Misty', 'Edwards', 'nicholas31@gmail.com', '5283x78533', '872 Singh Well Suite 532, Andrewton, MA 77997'),
('Amy', 'Stanley', 'michelle45@davis-smith.info', '7561252502', '420 Barnes Islands, Port Collintown, MD 85631'),
('Courtney', 'Wright', 'ogutierrez@hotmail.com', '1649x4156', '2312 Stafford Mill, Anneshire, SD 90970');


INSERT INTO Booking (Car_ID, Customer_ID, Rental_Start_Date, Rental_End_Date, Total_Amount) VALUES
(2, 6, '2023-05-26', '2023-06-06', 437.72),
(7, 7, '2023-08-01', '2023-08-13', 1098.61),
(4, 1, '2024-06-25', '2024-07-09', 988.58),
(5, 1, '2024-06-04', '2024-06-18', 1048.70),
(7, 4, '2024-03-18', '2024-03-20', 1150.20),
(1, 5, '2023-08-22', '2023-08-28', 1086.79),
(5, 3, '2024-02-16', '2024-02-23', 784.27);


INSERT INTO Payment (Booking_ID, Payment_Date, Amount, Payment_Method) VALUES
(4, '2025-01-04', 831.81, 'Credit Card'),
(3, '2024-05-22', 1814.49, 'Debit Card'),
(6, '2025-02-24', 1718.38, 'Credit Card'),
(7, '2024-11-30', 1951.57, 'Online'),
(1, '2024-05-23', 764.91, 'Credit Card'),
(4, '2024-06-26', 372.93, 'Online'),
(7, '2025-02-18', 312.25, 'Online');

INSERT INTO Insurance (Car_ID, Insurance_Provider, Policy_Number, Start_Date, End_Date) VALUES
(6, 'Wright Group', 'dL21549', '2022-09-07', '2023-05-04'),
(2, 'Gonzalez, Stevenson and Hayes', 'Yj00852', '2024-02-11', '2024-09-24'),
(6, 'Watson Ltd', 'WR66792', '2022-07-09', '2023-04-23'),
(7, 'Carlson and Sons', 'Bb10005', '2023-05-12', '2023-11-22'),
(1, 'Thomas-Suarez', 'mJ69274', '2024-04-06', '2024-10-21'),
(1, 'Foster, Thompson and Diaz', 'iV79353', '2023-10-10', '2024-07-20'),
(6, 'Lucas-Clark', 'qy84101', '2022-11-12', '2023-06-21');

INSERT INTO Location (Car_ID, Location_Name, Address, Contact_Number) VALUES
(4, 'Lake Taylor Location', '440 Ethan Place Suite 571, Port Jeffery, ID 54565', '435.070.9432x182'),
(6, 'Faulknerberg Location', '224 Nicole Mountains, South Stevenberg, IA 33210', '088.658.3905x487'),
(7, 'Port Kaitlynbury Location', '76882 Donna Coves Apt. 487, Lisaland, AK 82534', '811-8545x98748'),
(7, 'Lake Kyleborough Location', '422 Richard Green, Brandonland, OR 42349', '(946)124-0716x0694'),
(7, 'East Gabrielaberg Location', '02738 Le Landing Suite 554, Stevensbury, VT 05500', '706.160.6935'),
(3, 'Carmentown Location', '78691 Harrison Lakes Apt. 547, Port Erikmouth, WA 92274', '(464)347-8152x836'),
(3, 'West Jonathan Location', '3293 Nicholas Cove Suite 956, Martinshire, SC 54165', '3100x0764');


INSERT INTO Reservation (Car_ID, Customer_ID, Reservation_Date, Pickup_Date, Return_Date) VALUES
(1, 3, '2025-02-18', '2025-02-20', '2025-02-22'),
(2, 4, '2025-02-07', '2025-02-11', '2025-02-19'),
(6, 5, '2025-02-21', '2025-02-25', '2025-03-06'),
(6, 6, '2025-03-02', '2025-03-03', '2025-03-04'),
(7, 5, '2024-12-15', '2024-12-17', '2024-12-21'),
(5, 4, '2025-01-03', '2025-01-04', '2025-01-06'),
(4, 6, '2025-01-17', '2025-01-19', '2025-01-23');


INSERT INTO Maintenance (Car_ID, Maintenance_Date, Description, Cost) VALUES
(6, '2024-08-19', 'Various realize everybody them cell great.', 378.01),
(2, '2023-12-04', 'Democratic six occur.', 760.19),
(1, '2024-07-22', 'Share thank why usually process trade tree.', 854.69),
(1, '2024-01-28', 'By physical sport student scene thought Republican.', 866.63),
(1, '2023-08-28', 'Suggest natural police various apply.', 968.83),
(3, '2023-11-25', 'Bring sometimes world must.', 251.74),
(4, '2025-02-24', 'Late picture career which.', 818.76);


SELECT * FROM Car;
SELECT * FROM Customer;
SELECT * FROM Booking;
SELECT * FROM Payment;
SELECT * FROM Insurance;
SELECT * FROM Location;
SELECT * FROM Reservation;
SELECT * FROM Maintenance;
