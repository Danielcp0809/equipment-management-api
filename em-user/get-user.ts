import { Context, HttpRequest } from "@azure/functions";
import { User } from "../core/entities/user.entity";
import { responseFactory } from "../shared/response-factory";

export async function getUser(context: Context, req: HttpRequest) {
  try {
    const { id } = req.params;
    const foundUser = await User.findOneBy({ id: parseInt(id) });
    if (!foundUser) {
      context.res = responseFactory({ message: "User not found" }, 404);
    } else {
      context.res = responseFactory(foundUser, 200);
    }
  } catch (error) {
    context.res = responseFactory({ message: error.message }, 500);
  }
}
