const { Client } = require("@opensearch-project/opensearch");
const fs = require("fs");

var host = "localhost";
var protocol = "https";
var port = 9200;
var auth = "admin:admin"; // For testing only. Don't store credentials in code.
// var ca_certs_path = "/full/path/to/root-ca.pem";

var client = new Client({
  node: protocol + "://" + auth + "@" + host + ":" + port,
  // ssl: {
  //     ca: fs.readFileSync(ca_certs_path)
  // }
});
