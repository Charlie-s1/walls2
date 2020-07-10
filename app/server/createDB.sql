create database if not exists Walls;

create table if not exists Walls.user (
  id int primary key auto_increment,
  userName varchar(30),
  password varchar(50)
);
create table if not exists Walls.message (
  id int primary key auto_increment,
  title varchar(30),
  message varchar(300),
  points int,
  posterName varchar(30)
)
