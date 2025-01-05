import { response } from "../utils/response"

export const handler = async () => {
  return response(200, {
    name: "yan",
    email: "yansilvacerqueira@outlook.com",
  })
}