import { Context, HttpRequest } from "@azure/functions";
import { User } from "../core/entities/user.entity";
import { responseFactory } from "../shared/response-factory";

export async function updateUser(context: Context, req: HttpRequest) {
  try {
    const { id } = req.params;
    const foundUser = await User.findOneBy({ id: parseInt(id) });
    if (!foundUser) {
      context.res = responseFactory({ message: "User not found" }, 404);
    } else {
      await User.update({ id: parseInt(id) }, req.body);
      context.res = responseFactory(null, 204);
    }
  } catch (error) {
    context.res = responseFactory({ message: error.message }, 500);
  }
}
