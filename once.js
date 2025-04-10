import { CreateTableCommand } from "@aws-sdk/client-dynamodb";
import { dynamodbClient } from "./dynamodb.js";

async function createTable() {
  const params = {
    TableName: "Posts",
    KeySchema: [
      { AttributeName: "id", KeyType: "HASH" }, // Partition key
    ],
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "S" }, // String type for id
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  };

  try {
    const data = await dynamodbClient.send(new CreateTableCommand(params));
    console.log("Table created successfully:", data);
  } catch (error) {
    console.error("Error creating table:", error);
  }
}

createTable();