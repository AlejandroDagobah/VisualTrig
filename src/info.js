
var info = {
    title:'Una manera fácil de visualizar trigonometría en tiempo real.',
    logo:'./img/logoVisualTrig.png',
    buttonText:'Ir a VisualTrig',
    buttonURL:'/dashboard',
    mainImg:'',
    modImg:'',
    modTitle:'Modifica Radio y Grados.',
    modText:'Modifica en tiempo real el radio del circulo unitario, además de modificar los grados sexagesimales de la hipotenusa o radio.',
    
    madeBy:'Made by Aledevelops for Cultural Corporation MCD',
    repo: 'Check the Repo',

    CONFIG:{
        play: true,
        radius: 150,
        step: 0.03,
        lineWidth: 2,
        
        roundNumbers: true,
        
        drawRadius: true,
        drawXAxis: true,
        drawYAxis: true,
        drawSin: true,
        drawCos: true,
        drawTan: true,
        drawCot: true,
        drawSec: true,
        drawCsc: true,
        drawNames: true,
        drawTheta: true,

        drawCursorSin: true,
        drawCursorCos: true,
        drawCursorTan: true,

        drawCursorCot: true,
        drawCursorSec: true,
        drawCursorCsc: true,

        drawNameRad: true,
        drawNameSin: true,
        drawNameCos: true,
        drawNameTan: true,

        drawNameCot: true,
        drawNameSec: true,
        drawNameCsc: true,
    },
    COLORS:{
        white: '#FFFFFF',
        black: '#1C1E1B',
        gray: '#4E4E4E',
        green: '#7BF179',
        orange: '#F46413',
        yellow: '#F4C313',
        cyan : '#13F4BE',
        blue: '#132AF4',
        pink: '#F413B5',
        purple: '#5B13F4'
    },
    NAMES:{
        full: {
          sin: 'sinus',
          cos: 'cosinus',
          tan: 'tangent',
          cot: 'cotangent',
          sec: 'secant',
          csc: 'cosecant',
          rad: 'radius',
        },
        short: {
          sin: 'sin',
          cos: 'cos',
          tan: 'tan',
          cot: 'cot',
          sec: 'sec',
          csc: 'csc',
          rad: 'r',
        },
      }
}

export {info}