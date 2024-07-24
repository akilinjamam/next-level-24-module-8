import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../app/utils/catchAsync';
import { AdminServices } from './admin.service';
import { Request, RequestHandler, Response } from 'express';
import sendRespone from '../../app/utils/sendRespone';

const getSingleAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AdminServices.getSingleAdminFromDB(id);

    sendRespone(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Admin is retrieved succesfully',
      data: result,
    });
  },
);

const getAllAdmins: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const result = await AdminServices.getAllAdminsFromDB(req.query);

    sendRespone(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Admins are retrieved succesfully',
      meta: result.meta,
      data: result.data,
    });
  },
);

const updateAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { admin } = req.body;
    const result = await AdminServices.updateAdminIntoDB(id, admin);

    sendRespone(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Admin is updated succesfully',
      data: result,
    });
  },
);

const deleteAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AdminServices.deleteAdminFromDB(id);

    sendRespone(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: 'Admin is deleted succesfully',
      data: result,
    });
  },
);

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
};
