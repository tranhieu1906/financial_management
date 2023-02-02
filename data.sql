use Wallets;

create table User(
	userId int not null auto_increment primary key,
    nameUser  varchar(20),
    address varchar(50),
    phone varchar(20),
    passwordUser varchar(20),
    email varchar(70),
    cccd varchar(20),
    dateDK TIMESTAMP default CURRENT_TIMESTAMP,
    gender varchar(20)
);
create table Wallets(
    id int not null auto_increment primary key,
    userId int,
    name varchar(255) ,
    totalMoney int,
    foreign key (userId) references User (userId)
);
create table transaction(
   id int not null auto_increment primary key,
   date datetime,
   money int,
   id_Wallets int,
   id_Category int,
   note varchar(255),
   foreign key (id_Category) references Category(id),
   foreign key (id_Wallets) references Wallets(id)
);

create table Category(
    id int not null auto_increment primary key,
    name varchar(255)
)
