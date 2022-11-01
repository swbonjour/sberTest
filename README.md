## 1. Вопросы для разогрева

  1. Опишите самую интересную задачу в программировании, которую вам приходилось решать?
    Однажды я решил написать свой openGL и тут началось... До 3д я еще не успел дойти, но 2д уже успело принести множество интересных задач.
    Такие как: Алогоритм отрисовки линий, растаризация, fill-algorithms (алогоритмы заливки), интерполяция цвета (градиент), перемещение объектов в пространстве,
    слои, опасити, освещение и многое другое.
    Также сюда можно добавить написание мини mmo с использованием сокетов.
  2. Расскажите о своем самом большом факапе? Что вы предприняли для решения проблемы?
    Так как на данной момент я занимаю фронтед разработкой, то самым большим факапом было, когда меня поставили на full stack разработку и заставили писать микросервисы с использование кафки за неделю, с началием минимального кол ва знание о бэкенде.
  3. Каковы ваши ожидания от участия в буткемпе?
    Бэкед меня всегда интересовал больше чем фронт, отпугивал больше чем фронт, но сейчас я заинтересован в нем, как в выборе профессии на будущие года в it, поэтому от буткемпа я ожидаю получения практических знаний разработки и современных паттерном бэкенда.
  
## 2. Distributed config

- [x] typescript
- [x] json
- [x] персистентность
- [x] CRUD
- [x] версионирование
- [x] удаление, в случае использования другим приложением
- [x] docker
- [x] unit test
- [x] test example https://github.com/swbonjour/sberTestExample

## How to use the api
 
 - GET - http://localhost:3000/config/(serviceName)?version=(serviceVersion) можно не указывать версию, тогда вернется последняя версия данного конфига
         http://localhost:3000/config/test?version=1

 - POST - http://localhost:3000/config должно передаваться тело запроса вида (весрия указывается автоматически, нельзя создать 2 конфига с 1 именем, для того, чтобы создать конфиг с таким же именем, его следует обновить):
          {
            service: "test",
            data: {
              backgroundColor: "black",
              color: "white"
            }
          }

 - PUT - http://lcoalhost:3000/config должно передаваться тело запроса вида (версия конфига обновится автоматически version + 1)
         {
          service: "test",
          data: {
            backgroundColor: "white",
            color: "black"
          }
         }

 - DELETE - http://localhost:3000/config должно передаваться тело запроса вида (нельзя удалить конфиг, если последний get относился к удаляемому конифгу)
            {
              version: "1"
              service: "test"
            }

## Installation

```bash
$ npm install // "if" you start locally you need to change src/config/db.config.ts variables
$ or you can use docker-compose up to start the project
```

## Running the app

```bash
# development
$ npm run start // "if" you start locally you need to change src/config/db.config.ts variables
$ or you can use docker-compose up to start the project
```

## Test

```bash
# unit tests
$ npm run test

## License

  Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
