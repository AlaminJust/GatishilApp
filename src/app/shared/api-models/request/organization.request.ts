import { PaginationOptions, PaginationRequest } from "../../models";

export class VehiclePaginationRequest extends PaginationRequest{

    constructor(options?: PaginationOptions){
        super(options);
    }

    private _search? : string;
    public get search() : string {
        return this._search ?? "";
    }
    public set search(v : string) {
        this._search = v;
    }

    
    private _code? : string;
    public get code() : string {
        return this._code ?? "";
    }
    public set code(v : string) {
        this._code = v;
    }
}