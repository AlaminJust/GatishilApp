import { VehicleTypes } from "../../enums";

export interface VehicleStoppageRequest {
    order: number,
    vehicleStoppageId: number,
    vehicleId: number,
    departure?: string | null;
}

export interface VehicleRouteMapRequest {
    vehicleId: number,
    routeMapId: number
}

export interface VehicleRequest {
    name: string;
    aliceName: string;
    photo: string;
    address: string;
    code: string;
    isPublic: boolean;
    schedule: string;
    route: string;
    vehicleType: VehicleTypes;
}