import { PaginationRequest } from "../../models";

export interface RouteMapRequest {
    name: string;
    originId: number;
    destinationId: number;
}

export interface RouteLocationRequest {
    latitude: number;
    longitude: number;
    city?: string | null;
}

export interface VehicleRouteMapRequest {
    vehicleId: number;
    routeMapId: number;
    order: number;
}

export class OrganizationPaginationRequest extends PaginationRequest{
    private _search? : string;
    public get search() : string {
        return this._search ?? "";
    }
    public set search(v : string) {
        this._search = v;
    }
}