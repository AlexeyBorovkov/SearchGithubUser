Приложение поиска пользователей Github
Это приложение на React, которое позволяет пользователям искать пользователей Github и отображать их информацию в постраничном списке. Приложение также предоставляет функцию сортировки списка пользователей по количеству публичных репозиториев в порядке возрастания или убывания.

Функции
Поиск пользователей Github по имени пользователя
Отображение постраничного списка результатов поиска
Сортировка списка пользователей по количеству публичных репозиториев в порядке возрастания или убывания
Просмотр подробной информации о каждом пользователе, включая аватар, логин, количество публичных репозиториев, подписчиков и подписок
Компоненты
App: Основной компонент приложения, который обрабатывает запрос поиска, постраничность и сортировку.
SearchInput: Компонент ввода поиска с debounce, который позволяет пользователям искать пользователей Github.
User  List: Компонент, который отображает постраничный список результатов поиска, с возможностью сортировки списка по количеству публичных репозиториев.
UserInfo: Компонент, который отображает подробную информацию о каждом пользователе.
API
Приложение использует API Github для поиска пользователей и получения их информации. Используется конечная точка API https://api.github.com/search/users.

Установка
Чтобы запустить приложение, клонируйте репозиторий и установите зависимости с помощью npm install. Затем запустите приложение с помощью npm start.