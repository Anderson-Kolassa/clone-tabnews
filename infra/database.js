import { Client } from "pg";

async function query(queryObject) {
  let client;
  try {
    client = await getNewClient(); // cria uma nova conexao com o banco de dados
    const result = await client.query(queryObject); // client.query ela retorna um objeto contendo informações sobre os resultados da consulta.
    return result;
  } catch (error) {
    console.error(error);
    throw error; // lanca o erro novamente continuar borbulhando ate o nextjs e devolver um erro 500 na requisicao
  } finally {
    await client.end();
  }
}

async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: getSSLValues(),
  });

  await client.connect();
  return client;
}

const database = { query, getNewClient };
export default database;

function getSSLValues() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }
  //console.log("NODE_ENV: " + process.env.NODE_ENV);
  return process.env.NODE_ENV === "production" ? true : false;
}
