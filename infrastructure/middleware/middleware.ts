import { AppDataSource } from "../../shared/db";

export async function coreFunction(callback: Function) {
    await AppDataSource.initialize(); /// Stablish connection with DB
    await callback();
    await AppDataSource.destroy(); /// Finish DB connection
}