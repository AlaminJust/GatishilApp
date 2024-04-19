import { OrganizationTypes } from "../../enums";

export interface AllRouteResponse {
    name: string;
    id: number;
    originId: number;
    destinationId: number;
}

export interface VehicleRouteResponse extends AllRouteResponse {
    order: number,
    routeMapId: number
}

export interface VehicleRouteMapResponse {
    id: number;
    vehicleId: number;
    routeMapId: number;
    order: number;
}

export interface RouteLocationResponse {
    id: number;
    latitude: number;
    longitude: number;
    city?: string;
}

export interface OrganizationResponse {
    id: number;
    name: string;
    photo?: string | null;
    address: string;
    organizationType: OrganizationTypes;
    isAllowedPublicToAddVehicle: boolean;
}
