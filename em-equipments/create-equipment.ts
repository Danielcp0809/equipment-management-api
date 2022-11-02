import { Context, HttpRequest } from "@azure/functions";
import { Equipment } from "../core/entities/equipment.entity";
import { User } from "../core/entities/user.entity";
import { responseFactory } from "../shared/response-factory";

export async function createEquipment(context: Context, req: HttpRequest) {
  try {
    const { brand, model, serial, user_id } = req.body;
    const user = await User.findOneBy({ id: parseInt(user_id) });
    if(!user) throw new Error("User not found");
    const newEquipment = new Equipment();
    newEquipment.brand = brand;
    newEquipment.model = model;
    newEquipment.serial = serial;
    newEquipment.user = user;
    if (!brand || !model || !serial || !user_id)
      throw new Error("Missing some equipment parameters");
    await newEquipment.save();
    context.res = responseFactory(newEquipment, 200);
  } catch (error) {
    context.res = responseFactory({ message: error.message }, 404);
  }
}
