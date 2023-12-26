const checkrole = (roles) => (req, res, next) => {
  const tipoDoUser = req.tipo;

  if (!roles.includes(tipoDoUser)) {
    return res
      .status(401)
      .send({ message: "Você não tem autorização para acessar essa página" });
  }

  return next();
};

export { checkrole };
