import { axiosInstance } from "@/lib/axios";

export type Category = {
  _id: string;
  name: string;
  catImage: string;
  isActive?: boolean;
};

export type ServiceDetail = {
  title: string;
  perSessionPrice?: number;
  hourlyPrice?: number;
  details?: string;
  isActive?: boolean;
  address?: string;
  serviceThumbnails: string[];
  serviceType: "per session" | "hourly";
};

export type Provider = {
  _id: string;
  name: string;
  profileImage?: string;
  email?: string;
};

export type Review = {
  rating: number;
  message?: string;
};

export type Service = {
  _id: string;
  category: Category | string;
  notes?: string;
  serviceDetails: ServiceDetail;
  providerId: Provider | string;
  reviews: Review[];
  averageRating: number;
};

type ApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
};

export type SearchResults = {
  categories: Category[];
  services: Service[];
};

export const searchCatalog = async (q: string): Promise<SearchResults> => {
  const { data } = await axiosInstance.get<ApiResponse<SearchResults>>(
    "/search",
    { params: { q } }
  );
  return data.data;
};

export const getCategories = async (): Promise<Category[]> => {
  const { data } = await axiosInstance.get<ApiResponse<Category[]>>("/categories");
  return data.data;
};

export const getCategoryWiseServices = async (categoryId: string): Promise<Service[]> => {
  const { data } = await axiosInstance.get<ApiResponse<Service[]>>(
    `/services/categoryWise/${categoryId}`
  );
  return data.data;
};

export const getServiceById = async (serviceId: string): Promise<Service> => {
  const { data } = await axiosInstance.get<ApiResponse<Service>>(`/services/${serviceId}`);
  return data.data;
};

export function getServicePrice(service: Service): string | null {
  const details = service.serviceDetails;
  const value =
    details.serviceType === "hourly" ? details.hourlyPrice : details.perSessionPrice;
  if (value == null) return null;
  return `$${value}${details.serviceType === "hourly" ? "/hr" : "/session"}`;
}