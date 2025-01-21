// Import service functions
import UserModel from "../model/userModel.js";

// Standard response function
const handleResponse = (res, status, message, data = null) => {
  res.status(status).json({
    status,
    message,
    data,
  });
};

class UserController {
  static async createUser(req, res, next) {
    try {
      const { name, email } = req.body;
      const user = await UserModel.create(name, email);

      res.status(201).json({
        status: "success",
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const users = await UserModel.findAll();

      res.status(200).json({
        status: "success",
        message: "Users retrieved successfully",
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);

      if (!user) {
        return res.status(404).json({
          status: "fail",
          message: "User not found",
        });
      }

      res.status(200).json({
        status: "success",
        message: "User retrieved successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      const user = await UserModel.update(id, name, email);

      if (!user) {
        return res.status(404).json({
          status: "fail",
          message: "User not found",
        });
      }

      res.status(200).json({
        status: "success",
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const user = await UserModel.delete(id);

      if (!user) {
        return res.status(404).json({
          status: "fail",
          message: "User not found",
        });
      }

      res.status(200).json({
        status: "success",
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
