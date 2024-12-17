import { patients } from "./bd-mock";

export const PatientModel = () => {
  const getPatients = () => patients;
  const getPatient = (id: string) => {
    const patient = patients.find((item) => item.id == id);
    return patient;
  };

  const addPatient = (patient: any) => {
    patients.push(patient);
  };

  return {
    getPatients,
    getPatient,
    addPatient,
  };
};
