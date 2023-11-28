import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { info } from "../info"
import CanvasMain from "../components/canvasMain"

export default function Dashboard(){

    return(
        <div className="w-full h-[100vh] p-6">
            

            <div className="flex flex-row h-[70%] gap-5">
                    <CanvasMain/>

                <div className="bg-mainBlack basis-1/3 rounded-xl drop-shadow-lg">

                </div>

            </div>
            <div className="flex flex-row h-[25%] pt-4">
                <div className="bg-mainBlack flex-1 rounded-xl drop-shadow-lg">
                    <canvas></canvas>

                </div>
            </div>
            <div className="flex flex-row py-2 justify-between items-center">
                <div className="flex flex-row items-center gap-3">
                    <StaticImage src="../images/VisualTrig.png" alt="VisualTrig Logo" className="drop-shadow-2xl w-[200px] h-full"/>
                    <p className="m-0 text-mainGray text-sm mt-px">{info.madeBy}</p>
                </div>
                <Link className="text-mainGreen text-sm underline-none">{info.repo}</Link>
            </div>
        </div>
    )
    
}
