// src/Controllers/messcontroller.ts
import { Request, Response } from "express";
import prisma from "../db/prisma";

export const Sendmessage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const senderid = req.user.id;
    const { body } = req.body;
    const { id: receiverid } = req.params;

    let conversation = await prisma.conversation.findFirst({
      where: {
        participatesid: {
          hasEvery: [senderid, receiverid],
        },
      },
    });
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participatesid: {
            set: [senderid, receiverid],
          },
        },
      });
    }
    const newmessage = await prisma.messages.create({
      data: {
        senderid,
        body,
        conversationids: conversation.id,
      },
    });
    if (newmessage) {
      conversation = await prisma.conversation.update({
        where: { id: conversation.id },
        data: {
          messages: {
            connect: { id: newmessage.id },
          },
        },
      });
      res.status(201).json({
        msg: "succesfully sent",
      });
    }
  } catch (error: any) {
    console.error("Error sending message:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

export const Getmsg = async (req: Request, res: Response): Promise<void> => {
  const senderid = req.user.id;
  const { id: chatwith } = req.params;

  try {
    const conversation = await prisma.conversation.findFirst({
      where: {
        participatesid: {
          hasEvery: [senderid, chatwith],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdat: "asc",
          },
        },
      },
    });

    if (!conversation) {
      res.status(200).json([]); // Return early if no conversation is found
      return;
    }

    res.status(200).json(conversation.messages); // Return messages if conversation exists
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ msg: "Internal server error" }); // Return error response
  }
};

export const Sidebar = async (req: Request, res: Response): Promise<void> => {
  const users = await prisma.user.findMany({
    select: {
      fullname: true,
      id: true,
      profile: true,
    },
  });
  res.status(200).json(users);
};
