import { Context, HttpRequest } from "@azure/functions";
import { Equipment } from "../core/entities/equipment.entity";
import { responseFactory } from "../shared/response-factory";

export async function getAllEquipments(context: Context, req: HttpRequest) {
  try {
    const equipments = await Equipment.find({
        relations:['user']
    });
    context.res = responseFactory(equipments, 200);
  } catch (error) {
    context.res = responseFactory({ message: error.message }, 500);
  }
}