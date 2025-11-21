import { Request, Response, NextFunction } from 'express';
import Service from '../models/Service';
import { AuthRequest } from '../middleware/auth';
import { NotFoundError } from '../utils/errors';

// Get All Services
export const getAllServices = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { category, isActive = true } = req.query;

    const query: any = {};
    if (category) query.category = category;
    if (isActive !== undefined) query.isActive = isActive;

    const services = await Service.find(query).sort({ name: 1 });

    res.json({
      success: true,
      data: { services },
    });
  } catch (error) {
    next(error);
  }
};

// Get Service By ID
export const getServiceById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { serviceId } = req.params;

    const service = await Service.findById(serviceId);

    if (!service) {
      throw new NotFoundError('Service not found');
    }

    res.json({
      success: true,
      data: { service },
    });
  } catch (error) {
    next(error);
  }
};

// Create Service (Admin)
export const createService = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const service = await Service.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: { service },
    });
  } catch (error) {
    next(error);
  }
};

// Update Service (Admin)
export const updateService = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { serviceId } = req.params;

    const service = await Service.findByIdAndUpdate(serviceId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      throw new NotFoundError('Service not found');
    }

    res.json({
      success: true,
      message: 'Service updated successfully',
      data: { service },
    });
  } catch (error) {
    next(error);
  }
};

// Delete Service (Admin)
export const deleteService = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { serviceId } = req.params;

    const service = await Service.findByIdAndDelete(serviceId);

    if (!service) {
      throw new NotFoundError('Service not found');
    }

    res.json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
