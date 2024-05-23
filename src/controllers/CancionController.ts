import { Request,Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";

class CancionController extends AbstractController{
    //Singleton
    //Atributos de clase
    private static _instance: CancionController;
    public static get instance():CancionController{
        if(this._instance){
            return this._instance;
        }
        this._instance = new CancionController("cancion");
        return this._instance;
    }   

    protected initializeRoutes(): void {
        this.router.get("/test",this.getTest.bind(this));
        //CRUD
        this.router.get("/consultar",this.getConsultar.bind(this));
        this.router.post("/crear",this.postCrear.bind(this));      
    }

    private async getConsultar(req:Request,res:Response){
        try{
            console.log("Consultar Canciones");
            let canciones = await db["Cancion"].findAll();
            res.status(200).json(canciones);
        }catch(err){
            console.error(err);
            res.status(500).send("Error al consultar canciones");
        }
    }

    private async postCrear(req: Request, res: Response){
        try{
            console.log(req.body);
            await db.Cancion.create(req.body);
            console.log("Cancion creado")
            res.status(200).send("Cancion creado");
        }catch(err){
            console.error(err);
            res.status(500).send("Error al crear cancion");
        }
    }

    private async getTest(req: Request, res: Response){
        try{
            console.log("CancionController works");
            res.status(200).send("CancionController works");
        }catch(err){
            console.error(err);
            res.status(500).send("Error en CancionController");
        }
    }
}

export default CancionController;