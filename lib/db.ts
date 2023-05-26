import { createConnection, Connection } from "mysql2/promise";

export async function query(
  databaseName: string,
  query: string,
  values: any[]
) {
  try {
    const connection: Connection = await createConnection({
      host: "localhost",
      port: 3306,
      user: "guestprocess",
      password: "GuestProcess#88",
      database: databaseName,
    });

    const [results] = await connection.execute(query, values);
    connection.end();
    // console.log("Data successfully fetched:\n", results);
    return results;
  } catch (error) {
    console.error("Failed to fetch data from the database:\n\n\n", error);
    throw error;
  }
}
