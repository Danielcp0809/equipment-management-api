import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import "reflect-metadata";
import { createUser } from "../em-users/create-user";
import { coreFunction } from "../infrastructure/middleware/middleware";
import { responseFactory } from "../shared/response-factory";
import { deleteUser } from "./delete-user";
import { getUser } from "./get-user";
import { updateUser } from "./update-user";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log(`${req.method} User Handler`);
  await coreFunction(async () => {
    switch (req.method) {
      case "GET":
        await getUser(context, req)
        break;
      case "PUT":
        await updateUser(context, req)
        break;
      case "DELETE":
        await deleteUser(context, req)
        break;

      default:
        context.res = responseFactory({message:`Method not supported: ${req.method}`}, 500)
        break;
    }
  });
};

export default httpTrigger;
