import AWS from "aws-sdk";
import { config } from "dotenv";
config();

class Route53Manager {
  route53: AWS.Route53;
  constructor() {
    AWS.config.update({
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
      accessKeyId: process.env.ACCESS_KEY_ID,
      region: process.env.REGION,
    });

    this.route53 = new AWS.Route53();
  }

  async createHostedZone(domainName) {
    try {
      const params = {
        Name: domainName,
        CallerReference: new Date().getTime().toString(),
      };
      return await this.route53.createHostedZone(params).promise();
    } catch (err) {
      return err;
    }
  }

  async getHostedZoneByName(domainName) {
    try {
      const params = {
        DNSName: domainName,
      };
      const zones = await this.route53.listHostedZonesByName(params).promise();
      if (zones.HostedZones && zones.HostedZones.length > 0) {
        return zones.HostedZones[0];
      } else {
        throw new Error("Hosted zone not found.");
      }
    } catch (err) {
      return err;
    }
  }

  // async createRecordInHostedZone(
  //   domainName,
  //   recordName,
  //   recordType,
  //   recordValue
  // ) {
  //   try {
  //     const hostedZone = await this.getHostedZoneByName(domainName);
  //     const hostedZoneId = hostedZone.Id.split("/").pop();

  //     const params = {
  //       HostedZoneId: hostedZoneId,
  //       ChangeBatch: {
  //         Changes: [
  //           {
  //             Action: "CREATE",
  //             ResourceRecordSet: {
  //               Name: recordName,
  //               Type: "A",
  //               AliasTarget: {
  //                 DNSName: aliasTarget.DNSName,
  //                 EvaluateTargetHealth: aliasTarget.EvaluateTargetHealth,
  //                 HostedZoneId: aliasTarget.HostedZoneId,
  //               },
  //             },
  //           },
  //         ],
  //       },
  //     };
  //     return await this.route53.changeResourceRecordSets(params).promise();
  //   } catch (err) {
  //     return err;
  //   }
  // }

  async getAllRecordsInHostedZone(domainName) {
    try {
      const hostedZone = await this.getHostedZoneByName(domainName);
      const hostedZoneId = hostedZone.Id.split("/").pop();
      const params = {
        HostedZoneId: hostedZoneId,
        MaxItems: "300",
      };
      return await this.route53.listResourceRecordSets(params).promise();
    } catch (err) {
      return err;
    }
  }
}

// Export a single instance of the class
export const route53Manager = new Route53Manager();
