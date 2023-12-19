import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const __dirname = dirname(fileURLToPath(import.meta.url));


import MongoStore from "connect-mongo";
import { connectionString } from './daos/mongoseDb/connection.Mongose.js';

export const mongoStoreOptions = {
  store: MongoStore.create({
    mongoUrl: connectionString,
    ttl: 120, // Tiempo de vida de la sesión en segundos
    autoRemove: 'interval', // Eliminar sesiones caducadas automáticamente
    autoRemoveInterval: 10, // Intervalo en minutos para eliminar sesiones caducadas
  }),
  secret: "1234",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000,
    secure: false, // Cambia a true en entornos de producción con HTTPS
  },
};