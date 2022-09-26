export const isAdmin = async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(401).json({ message: "Protected Route, admin only" });
    }
    return next();
  } catch (error) {
    res.status(501).json({ message: "An Error Occur", err: error });
  }
};
