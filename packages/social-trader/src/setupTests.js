import dotenv from "dotenv";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env.production" });

configure({ adapter: new Adapter() });
