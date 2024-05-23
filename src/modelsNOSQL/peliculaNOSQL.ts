import dynamodb from "../services/dynamodbService";
import joi from "joi";
import {PREFIX_NAME} from "../config";

const PeliculaModel = dynamodb.define('pelicula',{
    hashKey:'peliculaId',
    timestamps:false,
    schema:{
        peliculaId:dynamodb.types.uuid(),
        Nombre:joi.string().required(),
        director:joi.string().required(),
        atores:joi.array().items(joi.object().keys({
            actorId:dynamodb.types.uuid(),
            nombre:joi.string().required(),
            nacionalidad:joi.string().required()
        }))
    },
    tableName:`Pelicula${PREFIX_NAME}`
})

dynamodb.createTables((err)=>{
    if(err)
        return console.log(err);
    console.log("Tabla creadas");
})

export default PeliculaModel;