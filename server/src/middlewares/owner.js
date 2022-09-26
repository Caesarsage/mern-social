import { Memory } from "../models/memory.js";
import { errorHandler} from "../utils/expressError.js";

export const isOwner = async (req, res, next) => {
  const { id } = req.params;

  const memories = await Memory.findById(id);
  if (!memories) {
    return next(new errorHandler("No memories found", 404));
  }
  console.log(req.userId === memories.creator.toString());
  if (req.userId !== memories.creator.toString()) {
    return next(new ErrorResponse("Not authorized", 401));
  }
  next();
};
