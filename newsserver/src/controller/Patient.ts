import { Request, Response } from "express";

import { PatientModel } from "../model/Patient";

const Model = PatientModel();

export const PatientController = () => {
  const getAllPatients = (req: Request, res: Response) => {
    const patients = Model.getPatients();
    res.json({ patients });
  };

  const getPatientById = (req: Request, res: Response) => {
    const { id } = req.params;
    const patient = Model.getPatient(id);
    res.json({ patient });
  };

  return { getPatientById, getAllPatients };
};
