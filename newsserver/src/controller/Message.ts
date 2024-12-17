import { Request, Response } from "express";

import { MessageModel } from "../model/Messages";
//const Model = MessageModel();

export const MessageController = () => {
  const getAllMessages = async (req: Request, res: Response) => {
    const model = await MessageModel(); // Use 'await' para obter o resultado
    const { getMessages } = model; // Desestruture o método getMessages

    const { vitalSign, patient } = getMessages();
    res.json({ message: vitalSign, patient });
  };

  return {
    getAllMessages,
  };
};
