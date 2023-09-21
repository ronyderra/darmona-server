import { config } from "dotenv";
import axios from "axios";
config();

class NameCom {
  NAME_USERNAME: string = process.env.NAME_USERNAME;
  NAME_TOKEN: string = process.env.NAME_TOKEN;
  NAME_BASEURL: string = process.env.NAME_BASEURL;
  auth = {
    username: this.NAME_USERNAME,
    password: this.NAME_TOKEN,
  };
  headers = {
    "Content-Type": "application/json",
  };
  constructor() {}

  async checkAvailability(domainName: string) {
    try {
      console.log(this.auth);

      const data = {
        domainNames: [domainName],
      };
      const resp = await axios.post(this.NAME_BASEURL + "/domains:checkAvailability", data, {
        auth: this.auth,
        headers: this.headers,
      });
      console.log(resp.data);
    } catch (err) {
      console.log(err.message);
      return err;
    }
  }
}

const domainManager = new NameCom();
export default domainManager;
