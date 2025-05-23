import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: process.env.NODE_ENV === "development" ? false : true,
  });

  console.log("Credenciais do Postgress:", {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  });

  try {
    await client.connect();
    const result = await client.query(queryObject); // client.query ela retorna um objeto contendo informações sobre os resultados da consulta.
    return result;
  } catch (error) {
    console.error(error);
    throw error; // lanca o erro novamente continuar borbulhando ate o nextjs e devolver um erro 500 na requisicao
  } finally {
    await client.end();
  }
  const result = await client.query(queryObject); // client.query ela retorna um objeto contendo informações sobre os resultados da consulta.
  return result;
}
export default {
  query: query,
};
