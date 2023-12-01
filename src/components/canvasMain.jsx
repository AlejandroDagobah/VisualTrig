import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { info, seno, coseno, elevar, degToRad} from "../info"
import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"


export default function CanvasMain(props) {

    const global = {
        mouseDown: false,
        radian: 0, 
        x: 0, 
        y: 0,
        radio: 275,
        sin: 0,
        cos: 0,
        tan: 0,
        cot: 0,
        sec: 0,
        csc: 0,
    };
    
    const canvasRef = React.useRef(null)

    const [width, setWidth] = React.useState(0)
    const [height, setHeight] = React.useState(0)

    function setInputValues() {
   
        info.INPUTS.forEach(input => {
            switch (input.name) {
                case 'Sin':
                    input.value = global.sin
                    break;
                case 'Cot':
                    input.value = global.cot
                    break;
                case 'Degrees':
                    input.value = props.degree
                    break;
                case 'Cos':
                    input.value = global.cos
                    break;
                case 'Sec':
                    input.value = global.sec
                    break;
                case 'Radians':
                    input.value = global.radian
                    break;
                case 'Tan':
                    input.value = global.tan
                    break;
                case 'Csc':
                    input.value = global.csc
                    break;
            
                default:
                    break;
            }
        });


    }

    function $drawLine(ctx, startX, startY, endX, endY, color, lineWidth) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY)
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
        ctx.closePath();
    }

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

    function setDegreeByMousePosition(catetoAdyacente, catetoOpuesto) {
    
        var longitudY = - (catetoOpuesto - global.y),
            longitudX = catetoAdyacente - global.x;  
        
        var currentDegree = Math.atan(longitudY/longitudX) * 360 / (Math.PI*2)
        
        if(catetoAdyacente < global.x){
            currentDegree += 180            
        }
        else if(catetoOpuesto > global.y){
            currentDegree += 360
    
        };

        props.setDegree(currentDegree)

        // drawCurves()
    
    };
    
  
    
    const draw = (ctx) =>{  

        const w = ctx.canvas.offsetWidth,
        h = ctx.canvas.offsetHeight
    
        ctx.clearRect(0, 0, w, h);

        const x = w/2
        const y = h/2

        global.x = x
        global.y = y
        
        const radio = props.radio
        const startAngle = 0
        const endAngle = 2 * Math.PI
        const degree = props.degree;
        const degreeInRad = degToRad(degree);
        

        const sin = seno(degreeInRad, 12)
        const cos = coseno(degreeInRad, 12)
        
        const tan = Math.abs(sin/cos)
        const cotan = Math.abs(cos/sin) 
    
        const cosenoLength = global.x + (cos * radio)
        const senoLength = global.y - (sin * radio);
        
        const tanLenght = tan * radio
        const cotanLength = cotan * radio

        let tanX
        let cotY
        let secantLength
        let cosecanteLength

        if(degree > 90 && degree < 270){
            secantLength = global.x - Math.sqrt(elevar(radio, 2) + elevar(tanLenght, 2))
            tanX = tanLenght * -1
            cotY = cotanLength * -1
        }else{
            secantLength = global.x + Math.sqrt(elevar(radio, 2) + elevar(tanLenght, 2))
            tanX = tanLenght * 1
            cotY = cotanLength * 1
        }
    
        if(degree > 0 && degree < 180){
            cosecanteLength = global.y - Math.sqrt(elevar(radio, 2) + elevar(cotanLength, 2))
    
        }else{
            cosecanteLength = global.y + Math.sqrt(elevar(radio, 2) + elevar(cotanLength, 2))
        }
    
        // Findout the quadrant we are in.
        const yQuadrant = sin < 0 ? '0' : '1'
        const xQuadrant = cos < 0 ? '0' : '1'

        const quadrant = { '11': 1, '10': 2, '00': 3, '01': 4 };

        const evenQuad = (quadrant[yQuadrant + xQuadrant] % 2);

        // Calculate complementary degree of main angle.
        const coDegree = evenQuad ? (90 - (degree % 90)) : (degree % 90);
        
        // Calculate tangent & cotangent angle.
        const tanCotAngle = evenQuad ? coDegree : -coDegree;

        //para dibujar la circunferencia
        ctx.beginPath();
        ctx.lineWidth = info.CONFIG.lineWidth;
        ctx.strokeStyle = info.COLORS.gray;
        ctx.fillStyle = info.COLORS.black;
        ctx.arc(global.x, global.y, radio, startAngle, endAngle);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
      
        
        
        //eje X
        props.xBool && $drawLine(ctx, global.x, 0, global.x, h, info.COLORS.gray, info.CONFIG.lineWidth)
        //eje Y
        props.yBool && $drawLine(ctx, 0, global.y, w, global.y, info.COLORS.gray, info.CONFIG.lineWidth)
        
        //RADIO
        props.radBool && $drawLine(ctx, global.x, global.y, cosenoLength, senoLength, info.COLORS.white, info.CONFIG.lineWidth)       
        //SENO
        props.sinBool && $drawLine(ctx, cosenoLength, global.y, cosenoLength, senoLength, info.COLORS.green, 3)
        //COSENO
        props.cosBool && $drawLine(ctx, global.x, senoLength, cosenoLength, senoLength, info.COLORS.orange, 3)
        //TAN
        props.tanBool && $drawLine(ctx, secantLength, global.y, cosenoLength, senoLength, info.COLORS.yellow, 3)
        //SEC
        props.secBool && $drawLine(ctx, global.x, global.y, secantLength, global.y, info.COLORS.cyan, 3)
        //COT
        props.cotBool && $drawLine(ctx, global.x, cosecanteLength, cosenoLength, senoLength, info.COLORS.purple, 3)
        //CSC
        props.cscBool && $drawLine(ctx, global.x, global.y, global.x, cosecanteLength, info.COLORS.pink, 3)
        
        //Drawing Texts
        props.radBool && props.showTexts && $drawText(ctx, global.x + (cosenoLength - global.x) / 2, global.y + ((senoLength - global.y)/2), props.fullNames ? info.NAMES.full.rad : info.NAMES.short.rad, {color: info.COLORS.white , angle: -degree})
        props.sinBool && props.showTexts && $drawText(ctx, cosenoLength + 1, global.y + ((senoLength - global.y)/2), props.fullNames ? info.NAMES.full.sin : info.NAMES.short.sin, {color: info.COLORS.green, angle: 90})
        props.cosBool && props.showTexts && $drawText(ctx, global.x + (cosenoLength - global.x)/2, senoLength - 1, props.fullNames ? info.NAMES.full.cos : info.NAMES.short.cos, {color: info.COLORS.orange, angle: 0})
        props.tanBool && props.showTexts && $drawText(ctx, cosenoLength + (tanX/2), global.y + (senoLength - global.y)/2,  props.fullNames ? info.NAMES.full.tan:info.NAMES.short.tan, {color: info.COLORS.yellow, angle: tanCotAngle})
        props.secBool && props.showTexts && $drawText(ctx, global.x + (secantLength - global.x)/2, global.y + 17 ,  props.fullNames ? info.NAMES.full.sec:info.NAMES.short.sec, {color: info.COLORS.cyan, angle: 0})
        props.cotBool && props.showTexts && $drawText(ctx, global.x + (cosenoLength - global.x)/2, senoLength - 5 + (cosecanteLength - senoLength)/2,  props.fullNames ? info.NAMES.full.cot:info.NAMES.short.cot, {color: info.COLORS.purple, angle: tanCotAngle})
        props.cscBool && props.showTexts && $drawText(ctx, global.x - 17, global.y + (cosecanteLength - global.y)/2 ,  props.fullNames ? info.NAMES.full.csc:info.NAMES.short.csc, {color: info.COLORS.pink, angle: 90})
        // info.CONFIG.play && !global.mouseDown && (global.degree += info.CONFIG.step)

              
        // Set other states.
        global.degreeInRad = degreeInRad;
        global.quadrant = quadrant;

        global.radio = radio
        global.radian = degreeInRad
        global.sin = sin
        global.cos = cos
        global.tan = tan
        global.cot = cotan
        global.sec = Math.sqrt(1 + elevar(tan, 2))
        global.csc = Math.sqrt(1 + elevar(cotan, 2))

        // info.INPUTS['].value = sin

        // !once && window.requestAnimationFrame(() => draw(ctx));



}



    React.useEffect(()=>{

        const canvas = document.getElementById('canvasMain')
        const canvasParent = document.getElementById('canvasContainer')
        
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
    

        draw(ctx)
        setInputValues()
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
        props.secBool]) 
    

    React.useEffect(()=>{

        const canvas = document.getElementById('canvasMain')
        const ctx = canvas.getContext('2d')

            canvas.addEventListener("mousedown", function (e) {
        
                global.mouseDown = true;
                var mouseX = e.offsetX
                var mouseY = e.offsetY 
                setDegreeByMousePosition(mouseX, mouseY)
            
            });
            
            canvas.addEventListener("mousemove", function (e) {
                
                if(global.mouseDown == true){
            
                    setDegreeByMousePosition(e.offsetX, e.offsetY)
                    
                }    
            });
            
            canvas.addEventListener("mouseup", function (e) {
                global.mouseDown = false;
            });
            
        
        return(()=>{
            canvas.removeEventListener("mousedown", function (e) {
                global.mouseDown = true;
                var mouseX = e.offsetX
                var mouseY = e.offsetY 
                setDegreeByMousePosition(mouseX, mouseY)
            
            })
            
            canvas.removeEventListener("mousemove", function (e) {
                
                if(global.mouseDown == true){
            
                    setDegreeByMousePosition(e.offsetX, e.offsetY)
                }    
            });
            
            canvas.removeEventListener("mouseup", function (e) {
                global.mouseDown = false;
            });
            
        })

    }, [draw])


    return(
        <>
            <div className="bg-mainBlack basis-2/3 md:basis-3/4 rounded-xl drop-shadow-lg" id="canvasContainer"></div>
            <canvas id="canvasMain" ref={canvasRef} width={width} height={height} className="absolute" />
        </>
    )
    
}