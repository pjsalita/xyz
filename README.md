# XYZ MACHINE PROBLEM

**Direction**: Create a program that translates the input (any combination of X, Y, or Z) to their low-resolution ascii art-like representation (use letter ‘O’ as the character to draw the letters)

**Used**:
- Laravel
- Vue + Vuex + Vue Router
- Laravel Sanctum for token authentication

**Setup**:
1. Clone Repository
    ```sh
    $ git clone https://github.com/pjsalita/xyz.git
    ```
2. Install and compile dependencies
    ```sh
    $ composer install
    $ npm install
    $ npm run dev
    ```
3. Create .env file and generate app key
    ```sh
    $ cp .env.example .env
    $ php artisan key:generate
    ```
4. Update database credentials in .env file
    ```
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=
    DB_USERNAME=
    DB_PASSWORD=
    ```
5. Run migrations
    ```
    $ php artisan migrate
    ```
6. Serve
    ```
    $ php artisan serve
    ```
7. Visit the served app to check the front-end.

Sample endpoint:
- http://xyz.test/api/xyz?direction=horizontal&size=5

Need authentication!!!
