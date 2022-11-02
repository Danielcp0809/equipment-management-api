import { Context, HttpRequest } from "@azure/functions";
import { Equipment } from "../core/entities/equipment.entity";
import { responseFactory } from "../shared/response-factory";

export async function updateEquipment(context: Context, req: HttpRequest) {
  try {
    const { id } = req.params;
    const equipment = await Equipment.findOneBy({ id: parseInt(id) });
    if (!equipment) {
      context.res = responseFactory({ message: "Equipment not found" }, 404);
    } else {
      await Equipment.update({ id: parseInt(id) }, req.body);
      context.res = responseFactory(null, 204);
    }
  } catch (error) {
    context.res = responseFactory({ message: error.message }, 500);
  }
}
