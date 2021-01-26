create database homework1;
use homework1;

create table utente(
	username varchar(20) primary key,
    nome varchar(20) not null,
    cognome varchar(20) not null,
    email varchar(30) not null,
    telefono varchar (20),
    genere varchar(10),
    password varchar(50) not null
) Engine = InnoDB;

create table playlist(
    id integer primary key auto_increment,
    nome varchar(100) not null,
    preview_pic varchar(100),
    username varchar(20),
    index indxUser(username),
    foreign key(username) references utente(username) on delete cascade
) Engine = InnoDB;

create table canzone(
    id varchar(50) primary key,
    album varchar(30) not null,
    immagine varchar (100) not null,
    titolo varchar(100) not null,
    artisti varchar(100), /*ho volontariamente tralasciato l'associazione ad artisti*/
    durata varchar(20),
    preview varchar (150),
    link varchar(100)
) Engine = InnoDB;

create table playlistCanzone(
    id_playlist integer,
    id_canzone varchar(50),
    index indxPlaylist(id_playlist),
    index indxCanzone(id_canzone),
    foreign key (id_playlist) references playlist(id) on delete cascade,
    foreign key (id_canzone) references canzone(id) on delete cascade,
    primary key (id_playlist, id_canzone)
) Engine = InnoDB;

/*cookie*/
create table cookie(
    token varchar(50) primary key,
    username varchar(20) not null,
    indirizzo varchar (15) not null
)