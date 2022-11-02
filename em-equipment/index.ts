import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { coreFunction } from "../infrastructure/middleware/middleware";
import { responseFactory } from "../shared/response-factory";
import { deleteEquipment } from "./delete-equipment";
import { getEquipment } from "./get-equipment";
import { updateEquipment } from "./update-equipment";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log(`${req.method} Equipment Handler`);
  await coreFunction(async () => {
    switch (req.method) {
      case "GET":
        await getEquipment(context, req);
        break;
      case "PUT":
        await updateEquipment(context, req);
        break;
      case "DELETE":
        await deleteEquipment(context, req);
        break;

      default:
        context.res = responseFactory({ message: `Method not supported: ${req.method}` },500);
      break;
    }
  });
};

export default httpTrigger;
