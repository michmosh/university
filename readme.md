
STEPS TO DEPLOY : 

1. git clone https://github.com/michmosh/university.git 

2. cd into your project folder

3. composer install  - install all Laravel php packages. 

4. npm install - install all React packages 

5. create new database 

6. change .env file with new created database details 

7. run - php artisan migrate:fresh --seed - this will create all the tables and will fill them with data

8. run - php artisan serve 

9. go to http://127.0.0.1:8000/ to see the app
