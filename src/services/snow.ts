import { config } from "dotenv";
import * as snowflake from "snowflake-sdk";
config();

class SnowManager {
  snowConnect: any;
  constructor() {
    const snowConnect = snowflake.createConnection({
      account: process.env.DATABASE_SNOW_ACCOUNT,
      username: process.env.DATABASE_SNOW_USER,
      password: process.env.DATABASE_SNOW_PASSWORD,
      warehouse: process.env.DATABASE_SNOW_WAREHOUSE,
      database: process.env.DATABASE_SNOW_DATABASE,
      clientSessionKeepAlive: true,
    });

    this.snowConnect = snowConnect.connect(function (err, conn) {
      if (err) {
        console.error("Unable to connect: " + err.message);
      } else {
        const connection_ID = conn.getId();
        console.log("Successfully connected to Snowflake.", connection_ID);
      }
    });
  }

  async executeSnow(from, to, cmp) {
    try {
      return new Promise((resolve, reject) => {
        this.snowConnect.execute({
          sqlText: `SELECT skip, COUNT(*) AS count FROM fire_sys.public.events as a left join fire_sys.public.skip_reasons_list as b on a.sr = b.id WHERE 
       DATE(ts) between '${from}' and '${to}' and event = 'tracked traffic' and cmp='${cmp}' and skip IN (TRUE, FALSE)
      GROUP BY skip;`,
          complete: function (err, stmt, rows) {
            if (err) {
              console.error(
                "Failed to execute statement due to the following error: " +
                  err.message
              );
              reject(err);
            } else {
              resolve(rows);
            }
          },
        });
      });
    } catch (err) {
      throw err;
    }
  }
  async getRows(from, to, cmp):Promise<[]> {
    try {
      return new Promise((resolve, reject) => {
        this.snowConnect.execute({
          sqlText: `SELECT * FROM fire_sys.public.events as a left join fire_sys.public.skip_reasons_list as b on a.sr = b.id where DATE(ts) between '${from}' and '${to}' and event = 'tracked traffic' and cmp='${cmp}' ;`,
          complete: function (err, stmt, rows) {
            if (err) {
              console.error(
                "Failed to execute statement due to the following error: " +
                  err.message
              );
              reject(err);
            } else {
              resolve(rows);
            }
          },
        });
      });
    } catch (err) {
      throw err;
    }
  }
}

const snowManager = new SnowManager();
export default snowManager;
