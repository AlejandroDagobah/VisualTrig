
var info = {
    title:'Una manera fácil de visualizar trigonometría en tiempo real.',
    logo:'./img/logoVisualTrig.png',
    buttonText:'Ir a VisualTrig',
    buttonURL:'/dashboard',
    mainImg:'',
    modImg:'',
    modTitle:'Modifica Radio y Grados.',
    modText:'Modifica en tiempo real el radio del circulo unitario, además de modificar los grados sexagesimales de la hipotenusa o radio.',
    
    sections:{
      first:{title:"Círculo Unitario", desc:"El círculo unitario, es una circunferencia de radio uno, normalmente con su centro en el origen (0, 0). Se utiliza con el fin de poder estudiar fácilmente las razones trigonométricas, la hipotenusa en el círculo unitario siempre tiene longitud de 1 lo que facilita la visualización de las razones y el teorema de Pitágoras.", img:"../images/unit-circle.png"},
      second:{title:"Funciones Trigonométricas", desc:"Representación de las funciones trigonométricas en el plano cartesiano (x,y), los valores en el eje x expresados en radianes.", img:"../images/trigo-func.png"},
      third:{title:"Modifica los Grados y el Radio.", desc:"Modifica en tiempo real el radio del círculo unitario, además de modificar los grados sexagesimales de la hipotenusa o radio.", img:"../images/modificators.png"},
      fourth:{title:"Valores en tiempo real.", desc:"Revisa los valores de las funciones trigonométricas en tiempo real.", img:"../images/values.png"},
      fiveth:{title:"Opciones de visualización", desc:"Revisa una por una o varias razones trigonométricas, activa los cursores de las curvas de cada razón y activa o desactiva los nombres de estos.", img:"../images/options.png"},
    },

    madeBy:'<p style="margin:0;">Made by <a href="https://aledevelops.me/" style="color:#13F4BE; text-decoration: none;">Aledevelops</a> for Cultural Corporation MCD</p>',
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
      },

    INPUTS:[
      {name:'Sin', color: '#7BF179', value: 0.00},
      {name:'Cot', color: '#5B13F4', value: 0.00},
      {name:'Degrees', color: '#6F706F', value: 0.00},
      {name:'Cos', color: '#F46413', value: 0.00},
      {name:'Sec', color: '#13F4BE', value: 0.00},
      {name:'Radians', color: '#6F706F', value: 0.00},
      {name:'Tan', color: '#F4C313', value: 0.00},
      {name:'Csc', color: '#F413B5', value: 0.00},
    ],
    BUTTONS:[
      {name:'Rad', color: '#FFFFFF'},
      {name:'X', color: '#FFFFFF'},
      {name:'Y', color: '#FFFFFF'},
      {name:'Sin', color: '#7BF179'},
      {name:'Cot', color: '#5B13F4'},
      {name:'Cos', color: '#F46413'},
      {name:'Sec', color: '#13F4BE'},
      {name:'Tan', color: '#F4C313'},
      {name:'Csc', color: '#F413B5'},
    ]
}

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


const seno = (x, iter) => {
  var result = 0

  for (let n = 0; n < iter; n++) {
      
      result += elevar((-1), n)/factorial(2*n + 1)* elevar(x, (2*n+1))
      
  }

  return result

}

const coseno = (x, iter) => {
  var result = 0

  for (let n = 0; n < iter; n++) {
      
      result += elevar((-1), n)/factorial(2*n) * elevar(x, (2*n))
      
  }

  return result

}


function degToRad(degree) {
  var radian = degree * ((Math.PI*2) / 360);
  return radian
};


export {info, seno, coseno, elevar, factorial, degToRad}