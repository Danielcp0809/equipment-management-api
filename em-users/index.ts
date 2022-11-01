import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { coreFunction } from "../infrastructure/middleware/middleware";
import { responseFactory } from "../shared/response-factory";
import { createUser } from "./create-user";
import { getAllUsers } from "./get-users";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log(`${req.method} User Handler`);
  await coreFunction(async () => {
    switch (req.method) {
      case "POST":
        await createUser(context, req);
        break;
      case "GET":
        await getAllUsers(context, req);
        break;
      default:
        context.res = responseFactory({message:`Method not supported: ${req.method}`}, 500)
        break;
    }
  });
};

export default httpTrigger;
