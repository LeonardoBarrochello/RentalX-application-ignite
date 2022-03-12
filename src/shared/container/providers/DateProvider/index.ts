import { container } from "tsyringe";

import { IDateProvider } from "./IDateProvider";
import { DayjsProvider } from "./implementations/DayjsProvider";

container.registerSingleton<IDateProvider>("DatejsProvider", DayjsProvider);
