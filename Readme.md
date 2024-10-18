Setelah dilakukan proses

```
npm install
```

Migrasi database dan jalankan seeder:

`npx prisma migrate dev --name init `

`npx ts-node prisma/seed.ts `

Setiap kali melakukan unit testing, harus dilakukan reset migrasi dan jalankan seeder kembali:

`npx prisma migrate reset`

`npx ts-node prisma/seed.ts `
