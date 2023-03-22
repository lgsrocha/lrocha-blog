import { LoaderType } from "../Types/LoaderType";
export default function Loader ({ show } : LoaderType){
    return show ? <div className="loader"></div> : null;
}