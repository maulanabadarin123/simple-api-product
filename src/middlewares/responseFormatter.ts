import { Request, Response, NextFunction } from "express";

export const responFormatter = (req:Request, res:Response, next:NextFunction) => {
  const originalSend = res.send

  res.send = function (body) {
    const statusCode = res.statusCode

    const formattedResponse = {
      status: statusCode < 400 ? "success" : "error",
      code: statusCode,
      data: statusCode < 400 ? body : null,
      message: statusCode >= 400 ? body : undefined
    }

    return originalSend.call(this, formattedResponse)
  }

  next()
}