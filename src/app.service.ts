import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    getHello() {
        return { message: "Spedi Warehouse Inventory Api" };
    }
}
