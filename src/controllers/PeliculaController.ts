import { Request,Response } from "express";
import AbstractController from "./AbstractController";
import db from "../models";
import PeliculaModel from "../modelsNOSQL/peliculaNOSQL";

class PeliculaController extends AbstractController{
    //Singleton
    //Atributos de clase
    private static _instance: PeliculaController;
    public static get instance():PeliculaController{
        if(this._instance){
            return this._instance;
        }
        this._instance = new PeliculaController("pelicula");
        return this._instance;
    }   

    protected initializeRoutes(): void {
        this.router.get("/test",this.getTest.bind(this));
        this.router.post("/crear", this.postCrearPelicula.bind(this));
        this.router.get("/consultar",this.getConsultaPelicula.bind(this));
    }
    private async getConsultaPelicula(req:Request,res:Response){
        try{
            const deptos = await PeliculaModel.scan().exec().promise();
            res.status(200).send(deptos[0].Items);
            console.log(deptos);
        }catch(err){
            console.error(err);
            res.status(500).send("Error al consultar peliculas");
        }
    }

    private async postCrearPelicula(req: Request, res: Response){
        try{    
            console.log(req.body);
            await PeliculaModel.create(req.body);
            console.log("Pelicula creada");
            res.status(200).send("Pelicula creada");
        }catch(err){
            console.log(err);
            res.status(500).send("Error al crear peliccula");
        }
    }

    private async getTest(req: Request, res: Response){
        try{
            console.log("PeliculaController works");
            res.status(200).send("PeliculaController works");
        }catch(err){
            console.error(err);
            res.status(500).send("Error en PeliculaController");
        }
    }
}

export default PeliculaController;