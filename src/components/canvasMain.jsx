import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { info } from "../info"
import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"


export default function CanvasMain() {

    const global = {
        mouseDown: false,
        degree: 45, 
        radian: 0, 
        x: 0, 
        y: 0,
        radio: 275,
        sin: 0,
        cos: 0,
        tan: 0,
        cot: 0,
        sec: 0,
        cosec: 0,
    };
    
    
    
  
    var degree = global.degree;

    const canvasRef = React.useRef(null)
    let ctx
    const [width, setWidth] = React.useState(0)
    const [height, setHeight] = React.useState(0)


    function degToRad(degree) {
        var radian = degree * ((Math.PI*2) / 360);
        return radian
    };
    
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

    function setDegreeByMousePosition(ctx, catetoAdyacente, catetoOpuesto) {
    
        var longitudY = - (catetoOpuesto - global.y),
            longitudX = catetoAdyacente - global.x;  
        
        var degree = Math.atan(longitudY/longitudX) * 360 / (Math.PI*2)
        
        if(catetoAdyacente < global.x){
            degree += 180
    
        }else if(catetoOpuesto > global.y){
            degree += 360
    
        };
    
        global.degree = degree;
    
        draw(ctx, true)
        // drawCurves()
    
    };
    
    function elevar(num, power){
    
        var result = 1 // 5
    
        for (let i = 0; i < power; i++) {
            result *= num
        }
        
        return result
    }
    
    function factorial(x) {
        let n = 1
    
        for (let i = 2; i <= x; i++) {
            n *= i
        }
    
        return n
        
    }
    
    function seno(x, iter) {
        var result = 0
    
        for (let n = 0; n < iter; n++) {
            
            result += elevar((-1), n)/factorial(2*n + 1)* elevar(x, (2*n+1))
            
        }
    
        return result
    
    }
    
    function coseno(x, iter) {
        var result = 0
    
        for (let n = 0; n < iter; n++) {
            
            result += elevar((-1), n)/factorial(2*n) * elevar(x, (2*n))
            
        }
    
        return result
    
    }
    
    const draw = (ctx, once = false) =>{

        var w = ctx.canvas.offsetWidth,
            h = ctx.canvas.offsetHeight
        
        ctx.clearRect(0, 0, w, h);

        global.x = (w/2)
        global.y = (h/2)
        

        
        const radio = info.CONFIG.radius
        const startAngle = 0
        const endAngle = 2 * Math.PI
        const degree = global.degree;
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

        global.radio = radio
        global.radian = degreeInRad
        global.sin = sin
        global.cos = cos
        global.tan = tan
        global.cot = cotan
        global.sec = Math.sqrt(1 + elevar(tan, 2))
        global.csc = Math.sqrt(1 + elevar(cotan, 2))

        //para dibujar la circunferencia
        ctx.beginPath();
        ctx.lineWidth = info.CONFIG.lineWidth;
        ctx.strokeStyle = info.COLORS.gray;
        ctx.fillStyle = info.COLORS.black;
        ctx.arc(global.x, global.y, radio, startAngle, endAngle);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();


        //para dibujar el eje X
        ctx.beginPath();
        ctx.moveTo(0, global.y);
        ctx.lineTo(w, global.y);
        ctx.stroke();
        ctx.closePath();

        //para dibujar el eje Y
        ctx.beginPath();
        ctx.moveTo(global.x, 0);
        ctx.lineTo(global.x, h);
        ctx.stroke();
        ctx.closePath();

        info.CONFIG.drawRadius && $drawLine(ctx, global.x, global.y, cosenoLength, senoLength, info.COLORS.white, info.CONFIG.lineWidth)
        info.CONFIG.drawNameRad && $drawText(ctx, global.x + (cosenoLength - global.x) / 2, global.y + ((senoLength - global.y)/2), info.NAMES.full.rad, {color: info.COLORS.white , angle: -degree})
        
        //SENO
        info.CONFIG.drawSin && $drawLine(ctx, cosenoLength, global.y, cosenoLength, senoLength, info.COLORS.green, 3)
        info.CONFIG.drawNameSin && $drawText(ctx, cosenoLength + 1, global.y + ((senoLength - global.y)/2), info.NAMES.full.sin, {color: info.COLORS.green, angle: 90})
        
        //COSENO
        info.CONFIG.drawCos && $drawLine(ctx, global.x, senoLength, cosenoLength, senoLength, info.COLORS.orange, 3)
        info.CONFIG.drawNameSin && $drawText(ctx, global.x + (cosenoLength - global.x)/2, senoLength - 1, info.NAMES.full.cos, {color: info.COLORS.orange, angle: 0})

        //TAN
        info.CONFIG.drawTan && $drawLine(ctx, secantLength, global.y, cosenoLength, senoLength, info.COLORS.yellow, 3)
        info.CONFIG.drawNameTan && $drawText(ctx, cosenoLength + (tanX/2), global.y - 5 + (senoLength - global.y)/2, info.NAMES.full.tan, {color: info.COLORS.yellow, angle: tanCotAngle})
        
        //SEC
        info.CONFIG.drawSec && $drawLine(ctx, global.x, global.y, secantLength, global.y, info.COLORS.cyan, 3)
        info.CONFIG.drawNameSec && $drawText(ctx, global.x + (secantLength - global.x)/2, global.y + 17 , info.NAMES.full.sec, {color: info.COLORS.cyan, angle: 0})

        //COTAN
        info.CONFIG.drawCot && $drawLine(ctx, global.x, cosecanteLength, cosenoLength, senoLength, info.COLORS.purple, 3)
        info.CONFIG.drawNameCot && $drawText(ctx, global.x + (cosenoLength - global.x)/2, senoLength - 5 + (cosecanteLength - senoLength)/2, info.NAMES.full.cot, {color: info.COLORS.purple, angle: tanCotAngle})
        
        //COSEC
        info.CONFIG.drawCsc && $drawLine(ctx, global.x, global.y, global.x, cosecanteLength, info.COLORS.pink, 3)
        info.CONFIG.drawNameCsc && $drawText(ctx, global.x - 17, global.y + (cosecanteLength - global.y)/2 , info.NAMES.full.csc, {color: info.COLORS.pink, angle: 90})

        // info.CONFIG.play && !global.mouseDown && (global.degree += info.CONFIG.step)

        // Reset at the end of circle.
        if (global.degree > 360) {
            global.degree %= 360;
          } else if (global.degree < 0) {
            global.degree += 360;
          }
      
        // Set other states.
        global.degreeInRad = degreeInRad;
        global.sin = sin;
        global.cos = cos;
        global.quadrant = quadrant;


        // !once && window.requestAnimationFrame(() => draw(ctx));



}


    React.useEffect(()=>{

        const canvas = document.getElementById('canvasMain')
        const ctx = canvas.getContext('2d')


            canvas.addEventListener("mousedown", function (e) {
        
                global.mouseDown = true;
                var mouseX = e.offsetX
                var mouseY = e.offsetY 
                setDegreeByMousePosition(ctx, mouseX, mouseY)
            
            });
            
            canvas.addEventListener("mousemove", function (e) {
                
                if(global.mouseDown == true){
            
                    setDegreeByMousePosition(ctx, e.offsetX, e.offsetY)
                    
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
                setDegreeByMousePosition(ctx, mouseX, mouseY)
            
            })
            
            canvas.removeEventListener("mousemove", function (e) {
                
                if(global.mouseDown == true){
            
                    setDegreeByMousePosition(ctx, e.offsetX, e.offsetY)
                }    
            });
            
            canvas.removeEventListener("mouseup", function (e) {
                global.mouseDown = false;
            });
            
        })

        console.log("LISTENERS EJECUTADO")



    }, [])

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

        console.log("DRAW EJECUTADO")


        return ()=>{   
            window.removeEventListener('resize', resize)
        }


    }, [width, draw]) 
    


    return(
        <>
            <div className="bg-mainBlack basis-3/4 rounded-xl drop-shadow-lg" id="canvasContainer"></div>
            <canvas id="canvasMain" ref={canvasRef} width={width} height={height} className="absolute" />
        </>
    )
    
}