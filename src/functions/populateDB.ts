import { faker } from "@faker-js/faker";
import { response } from "../utils/response"
import { randomUUID } from "node:crypto"
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { dynamoClient } from "../clients/dynamo";

export const handler = async () => {
  const total = 5000;

  try {
    await Promise.allSettled(
      Array.from({ length: total }, async () => {
        const command =  new PutItemCommand({
          TableName: 'CustomersTable',
          Item: {
            id: {S: randomUUID()},
            name: {S: faker.person.fullName()},
            email: {S: faker.internet.email().toLocaleLowerCase()},
            job: {S: faker.person.jobTitle()},
          }
        })

        const response = await dynamoClient.send(command);

        console.log(response.Attributes, '\n')
      }))
  } catch (error) {
    console.log(error)
  }

  return response(200, {
    message: "customers sended",
  })
}