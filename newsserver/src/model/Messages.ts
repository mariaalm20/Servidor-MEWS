// src/model/Messages.ts
import hl7 from "hl7parser";
import { PatientModel } from "./Patient";
import axios from "axios";

const patientModel = PatientModel();
const SERVER_URL = "http://localhost:4000/hl7";

async function obterMensagemHL7() {
  try {
    const response = await axios.get(SERVER_URL);
    return response.data.message;
  } catch (error) {
    throw error; // Lançar o erro novamente para o chamador lidar
  }
}

const getResponses = async () => {
  let resp = {};
  let pressao = {};
  let ox = {};
  let temp = {};
  let heart = {};

  const responseMessage = await obterMensagemHL7();
  const message = hl7.create(responseMessage);

  if (message && message.get) {
    message.get("OBX").forEach((field: any) => {
      const id = field.get("OBX.3").toString().split("^")[0];

      switch (id) {
        case "151594":
          resp = {
            type: "Freq. respiratória",
            vitalSign: field.get("OBX.5").toString(),
            unitMeasurement: "rpm",
          };
          break;
        case "150033":
          pressao = {
            type: "Pressão arterial",
            vitalSign: field.get("OBX.5").toString(),
            unitMeasurement: "mmHG",
          };
          break;
        case "147842":
          heart = {
            type: "Freq. cardíaca",
            vitalSign: field.get("OBX.5").toString(),
            unitMeasurement: "bpm",
          };
          break;
        case "150456":
          ox = {
            type: "Saturação",
            vitalSign: field.get("OBX.5").toString(),
            unitMeasurement: "%",
          };
          break;
        case "150344":
          temp = {
            type: "Temperatura",
            vitalSign: field.get("OBX.5").toString(),
            unitMeasurement: "°C",
          };
          break;
        default:
          break;
      }
    });
  }

  return { resp, pressao, ox, temp, heart, message };
};

export const MessageModel = async () => {
  const { resp, pressao, ox, temp, heart, message } = await getResponses(); // Use 'await' aqui

  const patientName = message.get("PID.5").toString().split("^")[1];
  const patientSurname = message.get("PID.5").toString().split("^")[0];

  const patient = {
    id: message.get("PID.2").toString(),
    name: `${patientName} ${patientSurname}`,
  };

  patientModel.addPatient(patient);

  const getMessages = () => {
    return {
      patient,
      vitalSign: [resp, pressao, heart, ox, temp],
    };
  };

  return { getMessages };
};
