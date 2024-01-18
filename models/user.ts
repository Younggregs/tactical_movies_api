import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";
import FullSequelize from "../utils/full-sequelize";

class User extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;

  public toJSON() {
    const values = Object.assign({}, this.get());

    delete values.password;
    return values;
  }

  public validPassword(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
}

User.init(
  {
    firstName: DataTypes.TEXT,
    lastName: DataTypes.TEXT,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      set(value: string) {
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue("password", hash);
      },
    },
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize: FullSequelize,
    modelName: "User",
  }
);

User.sync({ alter: true });

export default User;
