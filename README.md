Este proyecto se desarrolló con Next.js y contiene los ejercicios prácticos de la prueba técnica, tanto
de Frontend como de Backend. Utiliza prisma como ORM y SQLite de motor de almacenamiento.

2.2 FrontEnd UserList
2.2 Manejo de estado de autenticación con Redux
2.1.1 API Backend para tasks

3 Proyecto pequeño "Task Manager"


Instalación en Dev:
1 Copiar .env.dev.example a .env
2 Instalar los módulos de node
3 aplicar migraciones `npx prisma migrate dev --name init` 
4 ejecutar `npx prisma generate` para generar el cliente prisma
5 aplicar el seed para insertar un usuario inicial en la tabla user `npx prisma db seed`
6 ejecutar la aplicación en modo dev 


El api backend se encuentra en /api/ del mismo host local y puerto que el resto de la aplicación, para usar con postman, y tiene los endpoints
/api/auth/login
/api/tasks

Al entrar en la aplicación se solicitará acceso y se accede con las credenciales
usuario: "admin". password:"admin123"

