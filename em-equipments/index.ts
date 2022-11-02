import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { coreFunction } from "../infrastructure/middleware/middleware";
import { responseFactory } from "../shared/response-factory";
import { createEquipment } from "./create-equipment";
import { getAllEquipments } from "./get-equipments";

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log(`${req.method} Equipment Handler`);
  await coreFunction(async () => {
    switch (req.method) {
      case "POST":
        await createEquipment(context, req);
        break;
      case "GET":
        await getAllEquipments(context, req);
        break;
      default:
        context.res = responseFactory(
          { message: `Method not supported: ${req.method}` },
          500
        );
        break;
    }
  });
};

export default httpTrigger;
