import { Response, NextFunction } from 'express';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';
import { NotFoundError } from '../utils/errors';

// Get User Profile
export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

// Update Profile
export const updateProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, phone } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

// Add Address
export const addAddress = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const addressData = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    // If this is the first address or marked as default, make it default
    if (user.addresses.length === 0 || addressData.isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    user.addresses.push(addressData);
    await user.save();

    res.status(201).json({
      success: true,
      message: 'Address added successfully',
      data: { addresses: user.addresses },
    });
  } catch (error) {
    next(error);
  }
};

// Update Address
export const updateAddress = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { addressId } = req.params;
    const addressData = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    const address = user.addresses.find(
      (addr) => String((addr as any)._id) === addressId
    );

    if (!address) {
      throw new NotFoundError('Address not found');
    }

    // If setting as default, unset others
    if (addressData.isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }

    Object.assign(address, addressData);
    await user.save();

    res.json({
      success: true,
      message: 'Address updated successfully',
      data: { addresses: user.addresses },
    });
  } catch (error) {
    next(error);
  }
};

// Delete Address
export const deleteAddress = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { addressId } = req.params;

    const user = await User.findById(req.user.id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    user.addresses = user.addresses.filter(
      (addr) => String((addr as any)._id) !== addressId
    );

    await user.save();

    res.json({
      success: true,
      message: 'Address deleted successfully',
      data: { addresses: user.addresses },
    });
  } catch (error) {
    next(error);
  }
};

// Get All Addresses
export const getAddresses = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    res.json({
      success: true,
      data: { addresses: user.addresses },
    });
  } catch (error) {
    next(error);
  }
};
