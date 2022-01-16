import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsProvider } from "./DateProvider/implementations/DayjsProvider";

container.registerSingleton<IDateProvider>("DatejsProvider", DayjsProvider);
