import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Car } from "./Car";

@Entity("car_images")
class CarImage {
    @PrimaryColumn()
    id: string;
    @Column()
    car_id: string;

    @ManyToOne(() => Car, (car) => car.cars_images)
    @JoinColumn({ name: "car_id" })
    car: Car;

    @Column()
    image_name: string;
    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}

export { CarImage };
