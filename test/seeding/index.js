import 'dotenv/config';
import { db } from '../src/config/db';

export const createAdmin = async () => {
    await db.query({
      text: `INSERT INTO "admin"(
              "id",
              "fullname",
              "email"
          )
          VALUES(
             'af13b394-b357-11ed-8123-2b077ea032e0',
             'Super Admin'
             'folakemi@enyata.com',
         );`
    });
  };