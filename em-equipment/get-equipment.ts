import { Context, HttpRequest } from "@azure/functions";
import { Equipment } from "../core/entities/equipment.entity";
import { responseFactory } from "../shared/response-factory";

export async function getEquipment(context: Context, req: HttpRequest) {
  try {
    const { id } = req.params;
    const equipment = await Equipment.findOne({
      where: { id: parseInt(id) },
      relations: ["user"],
    });
    if (!equipment) {
      context.res = responseFactory({ message: "Equipment not found" }, 404);
    } else {
      context.res = responseFactory(equipment, 200);
    }
  } catch (error) {
    context.res = responseFactory({ message: error.message }, 500);
  }
}
