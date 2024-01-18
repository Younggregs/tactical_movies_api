import { DataTypes, Model } from "sequelize";
import FullSequelize from "../utils/full-sequelize";

class Movie extends Model {
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public title!: string;
  public publishingYear!: string;
  public imageUrl!: string;
}

Movie.init(
  {
    title: DataTypes.TEXT,
    publishingYear: DataTypes.TEXT,
    imageUrl: DataTypes.TEXT,
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  },
  {
    sequelize: FullSequelize,
    modelName: "Movie",
  }
);

Movie.sync({ alter: true });

export default Movie;
