docker run -d --name mariadb -p 3307:3306 -e MARIADB_ROOT_PASSWORD=1234  -e MARIADB_DATABASE=appointmentdb -e MARIADB_USER=appuser -e MARIADB_PASSWORD=apppass  mariadb:11

docker exec -it mariadb mariadb -u root -p

```aiignore
USE appointmentdb;
SHOW TABLES;
DESCRIBE appointment;
SELECT * FROM appointment;

```