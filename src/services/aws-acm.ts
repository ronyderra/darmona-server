import AWS from "aws-sdk";
import { config } from "dotenv";
config();

class CertificateManager {
  acm: AWS.ACM;
  constructor() {
    AWS.config.update({
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
      accessKeyId: process.env.ACCESS_KEY_ID,
      region: process.env.REGION,
    });
    this.acm = new AWS.ACM();
  }

  async requestCertificateForDomains(domainNames) {
    if (domainNames.length < 1) return;
    const params = {
      DomainName: domainNames[0], // Primary domain
      SubjectAlternativeNames: domainNames.slice(1), // SANs (Alternative domains)
      ValidationMethod: "DNS", // 'EMAIL' is also an option
    };

    try {
      const response = await this.acm.requestCertificate(params).promise();
      return response.CertificateArn; // Return the Certificate ARN
    } catch (error) {
      console.error("Error requesting certificate:", error);
      throw error;
    }
  }
}
// Export a single instance of the class
export const acmManager = new CertificateManager();

// // Example usage:
// const certificateManager = new CertificateManager("us-west-2");
// const domains = ["example.com", "www.example.com"];

// certificateManager
//   .requestCertificateForDomains(domains)
//   .then((certificateArn) => {
//     console.log("Requested certificate with ARN:", certificateArn);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });
