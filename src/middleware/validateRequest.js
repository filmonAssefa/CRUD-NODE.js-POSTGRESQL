const validateRequest = (schema) => {
  return (req, res, next) => {
    const validationOptions = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };

    // Determine what to validate based on request method
    let dataToValidate = {};
    if (req.method === "GET" || req.method === "DELETE") {
      dataToValidate = req.params;
    } else {
      dataToValidate = req.body;
    }

    const { error, value } = schema.validate(dataToValidate, validationOptions);

    if (error) {
      const errors = error.details.map((x) => x.message).join(", ");
      return res.status(400).json({
        status: 400,
        message: "Validation error",
        errors,
      });
    }

    // Replace request data with validated data
    if (req.method === "GET" || req.method === "DELETE") {
      req.params = value;
    } else {
      req.body = value;
    }

    next();
  };
};

export default validateRequest;
