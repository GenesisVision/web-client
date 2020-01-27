import dotenv from "dotenv";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

dotenv.config({ path: ".env.local" });
configure({ adapter: new Adapter() });
