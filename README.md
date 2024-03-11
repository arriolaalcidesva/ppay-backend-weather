<img src="https://github.com/damiancipolat/node-bff/blob/master/doc/node.png?raw=true" width="150px" align="right" />

# Node Developer Applicant Interview Test

### **Configuración**:
Dentro del directorio /config se encuentran los archivos json de cada entorno, por defecto se usa "default.json".

```console
{
  "openWeather":{
    "baseUrl":"https://api.openweathermap.org/data/2.5/",
    "apiKey":"xxxxxxxxxxxxxxxxxxxxx"
  },
  "server":{
    "port":8080,
    "killTimeout":100
  }
}
```

### **Comandos** (Windows 10):

- Ejecutar test:
```console
 npm test
```
- Ejecutar revisión de cobertura de codigo:
```console
 npm run coverage
```
- Ejecutar servidor:
```console
 npm start
```

- Crear imagén de docker:
```console
 npm run build
```

- Ejecutar contenedor de la ultima imagén subida:
```console
 npm run docker
```

### **Stack usado**:
- Node.js v12
- swagger-ui-express
- Docker
- Test: mocha / chai / sinon / proxyquire / nyc
  (Opte por usar estas librerias por que me resulta más cómodo trabajar con ellas que las recomendadas).
- config: Para manejar diferentes archivos de configuración por cada entorno.
- express.js
- pino: Para logear en forma de json al stdout.
- node-fetch: Para realizar request.

### **API REST**
Para observar la documentacion del api rest, el proyecto cuenta con un modulo de swagger, puede accederlo desde:
http://localhost:8080/doc/

### **Decisiones de arquitectura**
El api fue dividida en tres capas:
```bash
├── src
    ├── lib               // Para codigo compartido o integraciones
    ├── server            // Contiene el codigo para ejecutar un servidor rest
    ├── services          // Resuelve logica de negocio
```

Se opto por dividir la comunicación a travez de red de la logica de negocio por este motivo /services y /server estan al mismo nivel, este diseño esta pensado para que en un escenario productivo poder cambiar la forma en que se comunica un microservicio sin tener que realizar mayores cambios.

### Endpoints

| Verb | Endpoint | Description |
|:----|:-------------|:-----|
| GET | /health | Información de salud en el servidor |
| GET | /not-found| Si un endpoint es desconocido se redirecciona aquí |
| GET | /location | Ubicación del servidor del servicio Ip Api |
| GET | /current | Ubicación actual del servidor con datos meteorológicos |
| GET | /current/city | Datos meteorológicos de una ciudad especificada |
| GET | /forecast | Ubicación actual del servidor con previsión de 5 días |
| GET | /forecast/city | Datos de pronóstico de una ciudad especificada |

**Middlewares**:
- Swagger: Genera un sandbox de prueba del api.
- Error Handler: Este fue desarrollado para resolver en un único punto todos las excepciones recibidas, para logearlas y retornar la respuesta. /src/server/middleware.js

### **Versionado**:
Utilizo el campo "version" del archivo package.json del proyecto para registrar los cambios de versiones en el proyecto, este campo es el unico lugar en donde se registra la versión en todo el proyecto.

**Docker**: Al momento de buildear la imagén de docker, se puede observar en el archivo package.json
```console
"build": "docker build . -t \"ppay-backend-weather:<version>\""

### Unit test:
El proyecto contiene un script de analisis y reporte de cobertura del codigo usando el modulo npm "nyc" de istanbuljs.

```console
 npm run coverage

-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------|---------|----------|---------|---------|-------------------
All files          |     100 |     92.1 |     100 |     100 |
 lib               |     100 |      100 |     100 |     100 |
  http.js          |     100 |      100 |     100 |     100 |
  ipdata.js        |     100 |      100 |     100 |     100 |
  weather.js       |     100 |      100 |     100 |     100 |
 server            |     100 |      100 |     100 |     100 |
  middleware.js    |     100 |      100 |     100 |     100 |
 server/controller |     100 |     62.5 |     100 |     100 |
  current.js       |     100 |    66.66 |     100 |     100 | 17
  forecast.js      |     100 |    66.66 |     100 |     100 | 16
  health.js        |     100 |      100 |     100 |     100 |
  location.js      |     100 |       50 |     100 |     100 | 17
  not-found.js     |     100 |      100 |     100 |     100 |
 services          |     100 |      100 |     100 |     100 |
  current.js       |     100 |      100 |     100 |     100 |
  forecast.js      |     100 |      100 |     100 |     100 |
  location.js      |     100 |      100 |     100 |     100 |
-------------------|---------|----------|---------|---------|-------------------
```

El unit test es ejecutado dentro del archivo Dockerfile en el proceso de build de la imagén en caso de encontrar algún error en los test no nos permitirá realizarlo.