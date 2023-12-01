import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Switch } from "@material-tailwind/react";
import { info } from "../info"
import {IconBrandGithubFilled} from "@tabler/icons-react"

import CanvasMain from "../components/canvasMain"
import CanvasCurves from "../components/canvasCurves"



export default function Dashboard(){

    const [degreeRange, setDegreeRange] = React.useState(45);
    const [radioRange, setRadioRange] = React.useState(200);
    
    const [showTexts, setShowTexts] = React.useState(true);
    const [fullNames, setFullNames] = React.useState(true);

    const [radBool, setRadBool] = React.useState(true)
    const [xBool, setXBool] = React.useState(true)
    const [yBool, setYBool] = React.useState(true)
    const [sinBool, setSinBool] = React.useState(true)
    const [cosBool, setCosBool] = React.useState(true)
    const [tanBool, setTanBool] = React.useState(true)
    const [cotBool, setCotBool] = React.useState(true)
    const [secBool, setSecBool] = React.useState(true)
    const [cscBool, setCscBool] = React.useState(true)

    const [sinCursorBool, setSinCursorBool] = React.useState(true)
    const [cosCursorBool, setCosCursorBool] = React.useState(true)
    const [tanCursorBool, setTanCursorBool] = React.useState(true)
    const [cotCursorBool, setCotCursorBool] = React.useState(true)
    const [secCursorBool, setSecCursorBool] = React.useState(true)
    const [cscCursorBool, setCscCursorBool] = React.useState(true)

    const BUTTONS = [
        {name:'Rad', color: '#FFFFFF', bool: radBool, setBool: setRadBool},
        {name:'X', color: '#FFFFFF', bool: xBool, setBool: setXBool},
        {name:'Y', color: '#FFFFFF', bool: yBool, setBool: setYBool},
        {name:'Sin', color: '#7BF179', bool: sinBool, setBool: setSinBool, cursorBool: sinCursorBool, setCursorBool: setSinCursorBool},
        {name:'Cos', color: '#F46413', bool: cosBool, setBool: setCosBool, cursorBool: cosCursorBool, setCursorBool: setCosCursorBool},
        {name:'Tan', color: '#F4C313', bool: tanBool, setBool: setTanBool, cursorBool: tanCursorBool, setCursorBool: setTanCursorBool},
        {name:'Cot', color: '#5B13F4', bool: cotBool, setBool: setCotBool, cursorBool: cotCursorBool, setCursorBool: setCotCursorBool},
        {name:'Sec', color: '#13F4BE', bool: secBool, setBool: setSecBool, cursorBool: secCursorBool, setCursorBool: setSecCursorBool},
        {name:'Csc', color: '#F413B5', bool: cscBool, setBool: setCscBool, cursorBool: cscCursorBool, setCursorBool: setCscCursorBool},
      ]
    

    const btns = BUTTONS.map((item, index)=>{
        const styleOn = {
            color: item.color
            
        };
        const styleOff = {
            color: "#6F706F"
            
        };

        return(
            <button key={index} id={`${item.name}-btn`} className="bg-lightBlack p-2 rounded-md cursor-pointer items-center  text-md text-center font-medium p-2" style={item.bool ? styleOn : styleOff}  onClick={()=> item.setBool((prevState) => !prevState)}>{item.name}</button>
        )
    })

    const btnsCursors = BUTTONS.map((item, index)=>{
        if (item.cursorBool != undefined) {
            const styleOn = {
                color: item.color
                
            };
            const styleOff = {
                color: "#6F706F"
                
            };
    
            return(
                <button key={index} id={`${item.name}-btn`} className="bg-lightBlack p-2 rounded-md cursor-pointer items-center  text-md text-center font-medium p-2" style={item.cursorBool ? styleOn : styleOff}  onClick={()=> item.setCursorBool((prevState) => !prevState)}>{item.name}</button>
            )
        }else{
            return
        }
    
    })


    function setRange(rangeID, setState) {

        var rangeSlide = document.getElementById(rangeID)
        setState(rangeSlide.value)
        
    }
    
    React.useEffect(()=>{
        const degreeElem = document.getElementById('degree-range')
        degreeElem.value = Math.round(degreeRange)

        const radioElem = document.getElementById('radio-range')
        radioElem.value = Math.round(radioRange)

    }, [degreeRange, radioRange])


    const inputs = info.INPUTS.map((item, index)=>{

        return(
            <div key={index} className="flex flex-col md:flex-row justify-between bg-lightBlack p-2">
                <label htmlFor={`${item.name}-input`} style={{color: item.color}} className="font-medium text-lg -mb-px">{item.name}</label>
                <input type="text" id={`${item.name}-input`} value={Math.round((item.value + Number.EPSILON) * 100) / 100} readOnly className="bg-transparent text-lg text-left md:text-center font-medium text-white md:ml-2 md:w-[50px]"/>
            </div>
        )
    })
    
    return(
        <div className="w-full h-[100vh] p-2 md:p-6">

            <div className="flex flex-col md:flex-row h-[75%] md:h-[65%] gap-5">
                <CanvasMain 
                    degree={degreeRange} 
                    radio={radioRange}
                    showTexts={showTexts}
                    fullNames={fullNames}

                    setDegree={setDegreeRange}

                    radBool={radBool}
                    xBool={xBool}
                    yBool={yBool}
                    sinBool={sinBool}
                    cosBool={cosBool}
                    tanBool={tanBool}
                    cotBool={cotBool}
                    cscBool={cscBool}
                    secBool={secBool}
                />

                <CanvasCurves
                    degree={degreeRange} 
                    radio={radioRange}
                    showTexts={showTexts}
                    fullNames={fullNames}

                    setDegree={setDegreeRange}

                    radBool={radBool}
                    xBool={xBool}
                    yBool={yBool}
                    sinBool={sinBool}
                    cosBool={cosBool}
                    tanBool={tanBool}
                    cotBool={cotBool}
                    cscBool={cscBool}
                    secBool={secBool}

                    sinCursorBool={sinCursorBool}
                    cosCursorBool={cosCursorBool}
                    tanCursorBool={tanCursorBool}
                    cotCursorBool={cotCursorBool}
                    secCursorBool={secCursorBool}
                    cscCursorBool={cscCursorBool}
                />
                
               
            </div>
            <div className="flex flex-col md:flex-row rounded-xl bg-mainBlack drop-shadow-lg py-6 mt-4">

                <div className="basis-1/4 min-h-[22vh] border-solid border-r-0 md:border-r-2 border-darkerGray px-6"> 
                    <h3 className="text-darkerGray font-medium text-2xl mb-4">Modificators</h3>
                    <div className="flex justify-between">
                        <label htmlFor="degree-range" className="block text-lg font-medium text-white dark:text-white">Degree</label>
                        <label htmlFor="degree-range" className="block text-lg font-medium -mb-2 text-mainGray">{Math.round(degreeRange)}</label>
                    </div>
                    <input id="degree-range" readOnly onMouseMove={()=>{setRange('degree-range', setDegreeRange)}} type="range" min="0" max="360" className="range-custom"/>

                    <div className="flex justify-between mt-4">
                        <label htmlFor="radio-range" className="block text-lg font-medium text-white dark:text-white">Radius Size</label>
                        <label htmlFor="radio-range" className="-mb-2 block text-lg font-medium text-mainGray">{radioRange}</label>
                    </div>
                    <input id="radio-range" readOnly onMouseMove={()=>{setRange('radio-range', setRadioRange)}} type="range" min="50" max="500" className="range-custom"/>
                </div> 

                <div className="flex-1 border-solid border-r-0 md:border-r-2  border-darkerGray px-6 mt-5 md:mt-0">
                    <h3 className="text-darkerGray font-medium text-2xl mb-4">Values</h3>
                    <div className="grid grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-3">
                        {inputs}
                    </div>

                </div> 

                <div className="flex-1 px-6 mt-5 md:mt-0">
                    <h3 className="text-darkerGray font-medium text-2xl mb-4">Options</h3>
                    <div className="flex flex-col sm:flex-row md:flex-col xl:flex-row gap-9 md:gap-3 justify-between">
                        <div className="flex flex-col">
                            <h5 className="block text-lg font-medium text-white dark:text-white mb-2">Draw Lines:</h5>

                            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3 gap-3">
                                {btns}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <h5 className="block text-lg font-medium text-white dark:text-white mb-2">Draw Cursors:</h5>
                            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3 gap-3">
                                {btnsCursors}
                            </div>
                        </div>


                        <div className="flex flex-col">
                            <h5 className="block text-lg font-medium text-white dark:text-white mb-2">Options:</h5>

                                <Switch
                                    label="Draw Texts"
                                    className="bg-darkerGray checked:bg-trigoPurple"
                                    labelProps={{
                                        className:"font-medium font-Inter text-xs text-white"
                                    }}
                                    onClick={()=>setShowTexts((prevState) => !prevState)}
                                    defaultChecked
                                    />
                                <Switch
                                    label="Full Names"
                                    className="bg-darkerGray checked:bg-trigoYellow"
                                    labelProps={{
                                        className:"font-medium font-Inter text-xs text-white mt-3"
                                    }}
                                    containerProps={{
                                        className:"mt-3"
                                    }}
                                    onClick={()=>setFullNames((prevState) => !prevState)}
                                    defaultChecked
                                />
                        </div>

                       
                    </div>
                </div> 
            </div>
            <div className="flex flex-col md:flex-row py-2 justify-between items-center">
                <div className="flex flex-col md:flex-row items-center gap-3 px-3">
                    <StaticImage src="../images/VisualTrig.png" alt="VisualTrig Logo" className="drop-shadow-2xl w-[200px] h-full"/>
                    <div dangerouslySetInnerHTML={{__html: info.madeBy}} ></div>
                </div>

                <a href="https://github.com/AlejandroDagobah/VisualTrig" target="_blank" className="text-mainGreen text-sm underline-none transition-all duration-100 hover:-translate-y-[5px]">
                    <span className="flex justify-between items-center">
                    {info.repo}
                    <IconBrandGithubFilled size={15} color="#13F4BE" className="ml-px"/>
                    </span> 
                </a>
            </div>
        </div>
    )
    
}
