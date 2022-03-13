import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { CarImage } from "./CarImage";
import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity("cars")
class Car {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    daily_rate: number;

    @Column()
    license_plate: string;

    @Column()
    available: boolean;

    @Column()
    fine_amount: number;

    @Column()
    brand: string;

    @ManyToOne(() => Category)
    @JoinColumn({ name: "category_id" })
    category: Category;

    @Column()
    category_id: string;

    // Este trecho de código cria o registro da relação de muitos para muitos
    @ManyToMany(() => Specification)
    @JoinTable({
        name: "specifications_cars",
        joinColumns: [{ name: "car_id" }],
        inverseJoinColumns: [{ name: "specification_id" }],
    })
    specifications: Specification[];
    //

    @OneToMany(() => CarImage, (cars_images) => cars_images.car)
    cars_images: CarImage[];

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
            this.available = true;
        }
    }
}

export { Car };
