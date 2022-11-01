import { Context, HttpRequest } from "@azure/functions";
import { User } from "../core/entities/user.entity";
import { responseFactory } from "../shared/response-factory";

export async function deleteUser(context: Context, req: HttpRequest) {
  try {
    const { id } = req.params;
    const result = await User.delete({ id: parseInt(id) });
    if (result.affected === 0) {
      context.res = responseFactory({ message: "User not found" }, 404);
    } else {
      context.res = responseFactory(null, 204);
    }
  } catch (error) {
    context.res = responseFactory({ message: error.message }, 500);
  }
}
