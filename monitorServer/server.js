
const express = require('express');
const app = express();
const PORT = 4000;

function getConsciousnessLevel(value) {
  if (value >= 70) {
      return "A";
  } else if (value >= 50) {
      return "F";
  } else if (value >= 30) {
      return "D";
  } else {
      return "Inconsciente";
  }
}

const randomConsciousness = Math.floor(Math.random() * 101);
const consciousnessLevel = getConsciousnessLevel(randomConsciousness);



const generateHL7Message = () => {
  const randomPressure = Math.floor(Math.random() * 120) + 60; // Pressão entre 60 e 180
  const randomHeartRate = Math.floor(Math.random() * 100) + 60; // Freqüência cardíaca entre 60 e 160
  const randomTemp = (Math.random() * 5 + 36).toFixed(1); // Temperatura entre 36.0 e 41.0
  const randomRespRate = Math.floor(Math.random() * 30) + 10; // Freq. respiratória entre 10 e 40
  const randomOxygen = Math.floor(Math.random() * 101); // Saturação de oxigênio entre 0 e 100

  return (
    "MSH|^~&|VSP^080019FFFE0B4020^EUI-64|GE Healthcare|||20211129084800+0100||ORU^R01^ORU_R01|000C290B4020|P|2.6|||NE|AL||UNICODE|||PCD_DEC_001^IHE PCD^1.3.6.1.4.1.19376.1.6.1.1.1^ISO\r" +
    "PID||1|HED12^^^PID^MR||LAZY^KITTY^^^^^L|||\r" +
    "PV1||E|ICU^^79874\r" +
    "OBR|1|080019FFFE0B402020121109160900^VSP^080019FFFE0B4020^EUI-64|080019FFFE0B402020121109160900^VSP^080019FFFE0B4020^EUI-64|182777000^monitoring of patient^SCT|||20121109160900\r" +
    "OBX|1||69965^MDC_DEV_MON_PHYSIO_MULTI_PARAM_MDS^MDC|1.0.0.0|||||||X\r" +
    "OBX|2||69854^MDC_DEV_METER_PRESS_BLD_VMD^MDC|1.13.0.0|||||||X\r" +
    `OBX|4|NM|150033^MDC_PRESS_BLD_ART_SYS^MDC|1.13.1.1|${randomPressure}|266016^MDC_DIM_MMHG^MDC|||||R||||||080019FFFE0B4020^B1X5_GE\r` +
    `OBX|5|NM|150034^MDC_PRESS_BLD_ART_DIA^MDC|1.13.1.2|${Math.floor(randomPressure * 0.7)}|266016^MDC_DIM_MMHG^MDC|||||R||||||080019FFFE0B4020^B1X5_GE\r` +
    `OBX|6|NM|150035^MDC_PRESS_BLD_ART_MEAN^MDC|1.13.1.3|${Math.floor(randomPressure * 0.85)}|266016^MDC_DIM_MMHG^MDC|||||R||||||080019FFFE0B4020^B1X5_GE\r` +
    `OBX|11|NM|147842^MDC_ECG_HEART_RATE^MDC|1.5.1.1|${randomHeartRate}|264864^MDC_DIM_BEAT_PER_MIN^MDC|||||R||||||080019FFFE0B4020^B1X5_GE\r` +
    `OBX|50|NM|150344^MDC_TEMP^MDC|1.26.1.1|${randomTemp}|268192^MDC_DIM_DEGC^MDC|||||R|\r`  +
    `OBX|28|NM|151594^MDC_CO2_RESP_RATE^MDC|1.11.1.3|${randomRespRate}|264928^MDC_DIM_RESP_PER_MIN^MDC|||||R|\r` + 
    `OBX|32|NM|150456^MDC_PULS_OXIM_SAT_O2^MDC|1.22.1.2|${randomOxygen}|262688^MDC_DIM_PERCENT^MDC|||||R|`
  );
};

// Rota para obter a mensagem HL7
app.get('/hl7', (req, res) => {
  const mensagem = generateHL7Message();
  res.send({message: mensagem});
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}/hl7`)
});


