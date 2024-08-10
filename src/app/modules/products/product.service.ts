/* eslint-disable @typescript-eslint/no-explicit-any */
import { TFilterOptions, TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

export const getAllProductFromDB = async (filterOptions: TFilterOptions) => {
  const { minPrice, maxPrice, sortBy, searchTerm } = filterOptions;

  let query = Product.find();

  if (minPrice !== undefined) {
    query = query.where("price").gte(minPrice);
  }

  if (maxPrice !== undefined) {
    query = query.where("price").lte(maxPrice);
  }

  if (searchTerm) {
    query = query.or([
      { name: { $regex: searchTerm, $options: "i" } },
      { brand: { $regex: searchTerm, $options: "i" } },
    ]);
  }

  switch (sortBy) {
    case "Price - Low to High":
      query = query.sort({ price: 1 });
      break;
    case "Price - High to Low":
      query = query.sort({ price: -1 });
      break;
    case "Default":
      query = query.sort({});
      break;
    default:
      query = query.sort({});
  }

  const result = await query.exec();
  return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  const result = await Product.findByIdAndUpdate(
    id,
    { $set: payload },
    {
      new: true,
      runValidators: true,
    }
  );
  return result;
};

const deleteProductFromDB = async (id: string) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

const decreaseProductQuantity = async (id: string) => {
  // পণ্যের পরিমাণ ১ কমান এবং আপডেট করুন
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    { $inc: { quantity: -1 } },
    { new: true, runValidators: true }
  );
  return updatedProduct;
};

export const productSerivces = {
  createProductIntoDB,
  getSingleProductFromDB,
  getAllProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
  decreaseProductQuantity,
};
