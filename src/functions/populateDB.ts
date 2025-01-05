import { faker } from "@faker-js/faker";
import { response } from "../utils/response"
import { randomUUID } from "node:crypto"
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { dynamoClient } from "../clients/dynamo";

export const handler = async () => {
  const total = 5000;

  await Promise.allSettled(
  Array.from({ length: total }, async () => {
    const command =  new PutItemCommand({
      TableName: 'CostumersTable',
      Item: {
        id: {S: randomUUID()},
        name: {S: faker.person.fullName()},
        email: {S: faker.internet.email().toLocaleLowerCase()},
        job: {S: faker.person.jobTitle()},
      }
    })

    await dynamoClient.send(command);
  }))


  return response(200, {
    message: "customers sended",
  })
}