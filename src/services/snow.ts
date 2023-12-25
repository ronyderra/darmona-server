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

  async countSkipTraffic(from, to, cmp) {
    try {
      return new Promise((resolve, reject) => {
        this.snowConnect.execute({
          sqlText:
            `SELECT 
          SUM(CASE WHEN skip = FALSE THEN 1 ELSE 0 END) AS passed,
          SUM(CASE WHEN skip = TRUE THEN 1 ELSE 0 END) AS not_passed
          
         FROM fire_sys.public.events as a left join fire_sys.public.skip_reasons_list as b on a.sr = b.id 
         WHERE DATE(ts) between '${from}' and '${to}' and event = 'tracked traffic' and cmp='${cmp}' ;`,
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
  // async executeSnow(from, to, cmp) {
  //   try {
  //     return new Promise((resolve, reject) => {
  //       this.snowConnect.execute({
  //         sqlText: `SELECT skip, COUNT(*) AS count FROM fire_sys.public.events as a left join fire_sys.public.skip_reasons_list as b on a.sr = b.id WHERE 
  //      DATE(ts) between '${from}' and '${to}' and event = 'tracked traffic' and cmp='${cmp}' and skip IN (TRUE, FALSE)
  //     GROUP BY skip;`,
  //         complete: function (err, stmt, rows) {
  //           if (err) {
  //             console.error(
  //               "Failed to execute statement due to the following error: " +
  //                 err.message
  //             );
  //             reject(err);
  //           } else {
  //             resolve(rows);
  //           }
  //         },
  //       });
  //     });
  //   } catch (err) {
  //     throw err;
  //   }
  // }
  // async getRows(from, to, cmp): Promise<[]> {
  //   try {
  //     return new Promise((resolve, reject) => {
  //       this.snowConnect.execute({
  //         sqlText: `SELECT * FROM fire_sys.public.events as a left join fire_sys.public.skip_reasons_list as b on a.sr = b.id where DATE(ts) between '${from}' and '${to}' and event = 'tracked traffic' and cmp='${cmp}' ORDER BY ts DESC;`,
  //         complete: function (err, stmt, rows) {
  //           if (err) {
  //             console.error(
  //               "Failed to execute statement due to the following error: " +
  //               err.message
  //             );
  //             reject(err);
  //           } else {
  //             resolve(rows);
  //           }
  //         },
  //       });
  //     });
  //   } catch (err) {
  //     throw err;
  //   }
  // }
  async getRows(from, to, cmp): Promise<[]> {
    try {
      return new Promise((resolve, reject) => {
        this.snowConnect.execute({
          sqlText: `SELECT 
          a.geo,
          b.reason ,
          COUNT(*) AS number 
      FROM 
          fire_sys.public.events as a 
          LEFT JOIN fire_sys.public.skip_reasons_list as b ON a.sr = b.id 
      WHERE 
      
      DATE(ts) between '${from}' and '${to}'
      
         AND a.event = 'tracked traffic' 
          AND a.cmp = '${cmp}'  
      GROUP BY 
          geo, REASON
      ORDER BY 
          number DESC;`,
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
  async countByDateAndParam(from, to, by, sort): Promise<[]> {
    try {
      return new Promise((resolve, reject) => {

        this.snowConnect.execute({
          sqlText: `SELECT  ${by},
          SUM(CASE WHEN skip = FALSE THEN 1 ELSE 0 END) AS passed,
          SUM(CASE WHEN skip = TRUE THEN 1 ELSE 0 END) AS not_passed,
          SUM(CASE WHEN skip = TRUE AND reason = 'first impressions skip' THEN 1 ELSE 0 END) AS impressions_skip,
          SUM(CASE WHEN skip = TRUE AND reason = 'query rules skip' THEN 1 ELSE 0 END) AS query_rules,
          SUM(CASE WHEN skip = TRUE AND reason = 'ip blocked' THEN 1 ELSE 0 END) AS ip_blocked,
          SUM(CASE WHEN skip = TRUE AND reason = 'no endpoint to deliver' THEN 1 ELSE 0 END) AS no_endpoint_to_deliver
         FROM fire_sys.public.events as a left join fire_sys.public.skip_reasons_list as b on a.sr = b.id 
         WHERE DATE(ts) between '${from}' and '${to}' and event = 'tracked traffic'
         GROUP BY ${by} ORDER BY ${sort} DESC;`,
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

  async trkAnalytics(cmps: string[], dateFrom: string, dateTo: string, groupBy = "cmp"): Promise<any[]> {
    try {
      const placeholders = cmps.map(() => '?').join(', ');
      const sqlText = `
        SELECT
          ${groupBy},
          COUNT(CASE WHEN event = 'tracked traffic' THEN 1 END) AS total_clicks,
          COUNT(CASE WHEN event = 'tracked traffic' AND skip = false THEN 1 END) AS got_to_bp,
          COUNT(CASE WHEN event = 'tracked traffic' AND skip = true THEN 1 END) AS got_to_wp,
          COUNT(CASE WHEN event LIKE 'event:lpclick' THEN 1 END) AS clicked_on_bp,
          COUNT(CASE WHEN event = 'event:conv' THEN 1 END) AS conv
        FROM
          fire_sys.public.events
        WHERE
          cmp IN (${placeholders}) 
          AND (event = 'tracked traffic' OR event LIKE 'event:lpclick' OR event LIKE 'event:conv')
          AND DATE(ts) BETWEEN '${dateFrom}' and '${dateTo}'
        GROUP BY
        ${groupBy};`;

      return new Promise((resolve, reject) => {
        this.snowConnect.execute({
          sqlText: sqlText,
          binds: cmps,
          complete: function (err, stmt, rows) {
            if (err) {
              console.error("Failed to execute statement due to the following error: " + err.message);
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
