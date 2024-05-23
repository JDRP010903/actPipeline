import { Model, Sequelize } from "sequelize";

interface CancionAttributes {
    id: number;
    nombre: string;
    artista: string;
    duracion: string;
}

module.exports = (sequelize:any,DataTypes:any) => {
    class Cancion extends Model<CancionAttributes> implements CancionAttributes {
        public id!: number;
        public nombre!: string;
        public artista!: string;
        public duracion!: string;

        static associate(models:any) {
            // define association here
        }
    }
    Cancion.init({
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        nombre:{
            type:DataTypes.STRING,
            allowNull:false
        },
        artista:{
            type:DataTypes.STRING(50),
            allowNull:false        
        },
        duracion:{
            type:DataTypes.STRING(50),
            allowNull:false
        }
    },{
        sequelize,
        modelName:'Cancion'
    });
    return Cancion;
};
        