## **Run backend without docker**
Make sure you are at **Backend** folder.
Create new user in mysql (username=tuantotti, password=12345). It will use for run **local**
```mysql
CREATE USER 'tuantotti'@'localhost' IDENTIFIED BY '12345';
```
Build project
```
./gradlew build
```
 Or run immediately by choose run in IntelliJ
