import { Request, Response } from 'express';

const allAccess = (req: Request, res: Response) => {
  res.status(200).send({
    payload: 'Public Content.',
  });
};

const userBoard = (req: Request, res: Response) => {
  res.status(200).send({
    payload: 'User Content.',
  });
};

const adminBoard = (req: Request, res: Response) => {
  res.status(200).send({
    payload: 'Admin Content.',
  });
};

export { allAccess, userBoard, adminBoard };
