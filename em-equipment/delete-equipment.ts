import { Context, HttpRequest } from "@azure/functions";
import { Equipment } from "../core/entities/equipment.entity";
import { responseFactory } from "../shared/response-factory";

export async function deleteEquipment(context: Context, req: HttpRequest) {
  try {
    const { id } = req.params;
    const result = await Equipment.delete({ id: parseInt(id) });
    if (result.affected === 0) {
      context.res = responseFactory({ message: "Equipment not found" }, 404);
    } else {
      context.res = responseFactory(null, 204);
    }
  } catch (error) {
    context.res = responseFactory({ message: error.message }, 500);
  }
}
