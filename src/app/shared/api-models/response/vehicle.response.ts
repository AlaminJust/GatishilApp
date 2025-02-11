import { VehicleTypes } from "../../enums";

export interface VehicleResponse {
    id: number;
    organizationId: number;
    name: string;
    photo?: string | null;
    address?: string | null;
    code: string;
    isFavourite: boolean;
    addedBy: number;
    schedule?: string | null;
    route?: string | null;
    totalMember: number;
    isPublic: boolean;
    aliceName: string,
    vehicleType: VehicleTypes;
    vehicleStoppages?: VehicleStoppageResponse[] | null;
}

export interface VehicleStoppageResponse {
    id: number;
    vechileRouteId: number;
    stoppageDistanceFromDhaka: number;
    vehicleStoppageId: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    applitude: number;
    photo?: string | null;
    departure?: string;
    order: number;
}