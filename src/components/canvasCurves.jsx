import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { info, seno, coseno, degToRad} from "../info"
import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"

export default function CanvasCurves(props){

    const global = {
        mouseDown: false,
        radian: 0, 
        x: 0, 
        y: 0,
        radio: 275,
    };

    const canvasRef = React.useRef(null)

    const [width, setWidth] = React.useState(0)
    const [height, setHeight] = React.useState(0)

    const getSec =(x)=>{return (1/Math.cos(x))}
    const getCot =(x)=>{return (1/Math.tan(x))}
    const getCsc =(x)=>{return (1/Math.sin(x))}


    function $drawText(ctx, x, y, text, options = {}){

        const {
            color = info.COLORS.white,
            size = 12,
            angle = 0,
            align = 'center',
            baseline = 'bottom'
        } = options
    
        ctx.save();
        ctx.translate(x, y)
        ctx.rotate(degToRad(angle))
        
        ctx.font = `${size}px Inter`
        ctx.textBaseline = baseline
        ctx.textAlign = align
        ctx.fillStyle = color
        ctx.fillText(text, -3, -2)
        ctx.restore();
    
    }

    function drawCurves(ctx) {

        var w = width,
        h = height;

        global.x = w/2
        global.y = h/2
        
        ctx.clearRect(0, 0, w, h);

        drawGuides(ctx, w, h)

        var counter = 0
        var increase = 90/180*Math.PI/90


        props.sinBool && $drawCurveReason(ctx, 'sin', Math.sin, 0, h/2, w, h, increase, info.COLORS.green)
        props.cosBool && $drawCurveReason(ctx, 'cos', Math.cos, 0, h/2 - props.radio, w, h, increase, info.COLORS.orange)
        props.tanBool && $drawCurveReason(ctx, 'tan', Math.tan, 0, h/2, w, h, increase, info.COLORS.yellow)
        
        props.secBool && $drawCurveReason(ctx, 'sec', getSec, 0, h/2 - props.radio, w, h, increase, info.COLORS.cyan)
        props.cotBool && $drawCurveReason(ctx, 'cot', getCot, 0, h/2 - getCot(counter), w, h, increase, info.COLORS.purple)
        props.cscBool && $drawCurveReason(ctx, 'csc', getCsc, 0, h/2 - getCsc(counter), w, h, increase, info.COLORS.pink)

        props.sinCursorBool && $drawCursor(ctx, props.degree*(w/360), h/2 - Math.sin(degToRad(props.degree)) * props.radio, 7, info.COLORS.green)
        props.cosCursorBool && $drawCursor(ctx, props.degree*(w/360), h/2 - Math.cos(degToRad(props.degree)) * props.radio, 7, info.COLORS.orange)
        props.tanCursorBool && $drawCursor(ctx, props.degree*(w/360), h/2 - Math.tan(degToRad(props.degree)) * props.radio, 7, info.COLORS.yellow)
        
        props.secCursorBool && $drawCursor(ctx, props.degree*(w/360), h/2 - getSec(degToRad(props.degree)) * props.radio, 7, info.COLORS.cyan)
        props.cotCursorBool && $drawCursor(ctx, props.degree*(w/360), h/2 - getCot(degToRad(props.degree)) * props.radio, 7, info.COLORS.purple)
        props.cscCursorBool && $drawCursor(ctx, props.degree*(w/360), h/2 - getCsc(degToRad(props.degree)) * props.radio, 7, info.COLORS.pink)
     



    }

    function drawGuides(ctx, w, h) {

        for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.lineWidth = info.CONFIG.lineWidth;
            ctx.strokeStyle = info.COLORS.gray;
            ctx.fillStyle = info.COLORS.black;
            ctx.moveTo(0, global.y + props.radio * i);
            ctx.lineTo(w, global.y + props.radio * i);
            ctx.stroke();
            ctx.closePath();

            ctx.beginPath();
            ctx.lineWidth = info.CONFIG.lineWidth;
            ctx.strokeStyle = info.COLORS.gray;
            ctx.fillStyle = info.COLORS.black;
            ctx.moveTo(0, global.y - props.radio * i);
            ctx.lineTo(w, global.y - props.radio * i);
            ctx.stroke();
            ctx.closePath();
                
                
        }

        for (let i = 0; i < 5; i++) {

            ctx.beginPath();
            ctx.lineWidth = info.CONFIG.lineWidth;
            ctx.strokeStyle = info.COLORS.gray;
            ctx.fillStyle = info.COLORS.black;
            ctx.moveTo((w/4 * i), global.y);
            ctx.lineTo((w/4 * i), global.y + 30);
            ctx.stroke();
            ctx.closePath();

            if (i<4) {
                $drawText(ctx, (w/4 * i) + 20, global.y + 30, i*0.5+"π")
                
            }else{
                $drawText(ctx, (w/4 * i) - 15, global.y + 30, i*0.5+"π")

            }
            
        }
    }

    function $drawCurveReason(ctx, currentReason, trigoFunction, initialX, initialY, w, h, increase, color) {
        
        //CURVA SENO
        var x = initialX
        var y = initialY
        var counter = 0

        ctx.beginPath();
        
        for (let i = 0; i <= 360; i++) {
            if( i === 90 && currentReason === 'tan' || i === 270 && currentReason === 'tan' ||
                i === 90 && currentReason === 'sec' || i === 270 && currentReason === 'sec' ||
                i === 180 && currentReason === 'cot' || i === 180 && currentReason === 'csc'){

                counter += increase
                y = h/2 - trigoFunction(counter) * props.radio

            }else{
                ctx.moveTo(x, y)
                x = i*(w/360)
                y = h/2 - trigoFunction(counter) * props.radio
                counter += increase
                ctx.lineTo(x, y)
            }

        }

        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
        ctx.stroke()
        ctx.closePath();
        
    }


    function $drawCursor(ctx, x, y, radius, color) {

        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI*2)

        ctx.fillStyle = color
        ctx.fill()
        ctx.closePath()
        
    }


    React.useEffect(()=>{
        const canvas = document.getElementById('canvasCurves')
        const canvasParent = document.getElementById('canvasCurvesContainer')
        // Set initial dimensions
        resize()
            
        function resize() {
            setWidth(canvasParent.offsetWidth)
            setHeight(canvasParent.offsetHeight)
            canvas.style.top = canvasParent.offsetTop + "px";
            canvas.style.left = canvasParent.offsetLeft + "px";

        }

        window.addEventListener('resize', resize)
    
        const ctx = canvas.getContext('2d')

        ctx.imageSmoothingQuality = "high"
        ctx.imageSmoothingEnabled = true

        drawCurves(ctx)

        return ()=>{   
            window.removeEventListener('resize', resize)
        }

    }, [width, 
        props.degree, 
        props.radio,
        props.showTexts,
        props.fullNames,
        props.radBool,
        props.xBool,
        props.yBool,
        props.sinBool,
        props.cosBool,
        props.tanBool,
        props.cotBool,
        props.cscBool,
        props.secBool,

        props.sinCursorBool,
        props.cosCursorBool,
        props.tanCursorBool,
        props.cotCursorBool,
        props.cscCursorBool,
        props.secCursorBool
    
    ])

return(
    <>
        <div className="bg-mainBlack basis-2/4 md:basis-1/3 rounded-xl drop-shadow-lg" id="canvasCurvesContainer"></div>
        <canvas id="canvasCurves" ref={canvasRef} width={width} height={height} className="absolute" />
    </>
)

}