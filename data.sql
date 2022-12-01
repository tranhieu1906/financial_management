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






<div class="col shadow-sm p-3 mb-5 bg-body rounded">
                        <div class="row">
                            <div class="col-4 m-auto">
                              <img src="https://cdn0.iconfinder.com/data/icons/essential-pack-4/512/8-2-256.png" class="img-fluid rounded-circle">
                            </div>
                            <div class="col-8">
                                <h4>${element.name}</h4>
                                <p>Tiền mặt</p>
                                <h5>${element.totalMoney}</h5>
                                <a href="/detail?id=${element.id}">Detail</a>
                            </div>
                        </div>
                    </div>