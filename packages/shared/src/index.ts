export type UserRole = "PASSENGER" | "DRIVER" | "ADMIN";
export type VerificationStatus = "PENDING" | "UNDER_REVIEW" | "APPROVED" | "REJECTED";
export type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
export type RideStatus = "DRAFT" | "PUBLISHED" | "ONGOING" | "COMPLETED" | "CANCELLED";

export interface GeoPoint {
  address: string;
  lat: number;
  lng: number;
}

export interface RideSearchQuery {
  source?: string;
  destination?: string;
  date?: string;
  seats?: number;
  verifiedOnly?: boolean;
  minRating?: number;
  maxPrice?: number;
  vehicleType?: string;
  sort?: "price" | "rating" | "departure" | "fastest";
}

export interface ApiResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
}
