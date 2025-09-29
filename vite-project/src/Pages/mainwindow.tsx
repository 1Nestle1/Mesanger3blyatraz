import ContourAnimation from "./sosal";
import { Link } from "react-router-dom";
import './mainwindow.module.css'
import style from './mainwindow.module.css'
const companion = {

}
const CurCompanion = (companion) =>{ 
    const curcomp=(
        <div className={style.curcomp}>
            <div className={style.curcompimg}>
                <img  className="curcompimg" src="" alt="" />
            </div>
            <div className="curcompname">
                <h1 className="curcomp">current companion</h1>
            </div>
        </div>
    )
    return curcomp
}
export default function MainWindow() {
    return (
        <div  id="chatPage">
            <ContourAnimation />
            <div className={style.header}>      
                <CurCompanion companion={companion} />          
            </div>
            <div className={style.searchbar}>
                        <div className={style.searchinput}>
                            <input className={style.search} type="text" />
                        </div>
                        <div className={style.searchbutton}>
                        
                        </div>
                        <div className={style.menu}>

                        </div>
            </div>

        </div>
    );
}