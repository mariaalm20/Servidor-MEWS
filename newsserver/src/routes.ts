import express from "express";
import { MessageController } from "./controller/Message";
import { PatientController } from "./controller/Patient";

const messageController = MessageController();
const patientController = PatientController();

const routes = express.Router();

routes.get("/messages", messageController.getAllMessages);
routes.get("/patients", patientController.getAllPatients);
routes.get("/patients/:id", patientController.getPatientById);

export default routes;
