import * as tf from '@tensorflow/tfjs'
import * as fs from 'fs';
let inputHeight=50;
let inputWidth=50;
let imagenes=[{imagen:"img_Bichos/bee/bee-0.jpg", label:"abeja" , tensor: null},
{imagen:"img_Bichos/bee/bee-1.jpg", label:"abeja" , tensor: null},
{imagen:"img_Bichos/bee/bee-2.jpg", label:"abeja" , tensor: null},
{imagen:"img_Bichos/bee/bee-3.jpg", label:"abeja" , tensor: null},
{imagen:"img_Bichos/bee/bee-4.jpg", label:"abeja" , tensor: null},
{imagen:"img_Bichos/bee/bee-5.jpg", label:"abeja" , tensor: null},
{imagen:"img_Bichos/bee/bee-6.jpg", label:"abeja" , tensor: null},
{imagen:"img_Bichos/bee/bee-7.jpg", label:"abeja" , tensor: null},
{imagen:"img_Bichos/bee/bee-8.jpg", label:"abeja" , tensor: null},
{imagen:"img_Bichos/bee/bee-9.jpg", label:"abeja" , tensor: null},
{imagen:"img_Bichos/bee/bee-10.jpg", label:"abeja" , tensor: null},
{imagen:"img_Bichos/bee/bee-11.jpg", label:"abeja" , tensor: null},
{imagen:"img_Bichos/bee/bee-12.jpg", label:"abeja" , tensor: null},
{imagen:"img_Bichos/bee/bee-13.jpg", label:"abeja" , tensor: null},
{imagen:"img_Bichos/bee/bee-14.jpg", label:"abeja" , tensor: null},
{imagen:"img_Bichos/bee/bee-15.jpg", label:"abeja" , tensor: null},
{imagen:"img_Bichos/bee/bee-16.jpg", label:"abeja" , tensor: null},
{imagen:"img_Bichos/bee/bee-17.jpg", label:"abeja" , tensor: null},
{imagen:"img_Bichos/bee/bee-18.jpg", label:"abeja" , tensor: null},
{imagen:"img_Bichos/bee/bee-19.jpg", label:"abeja" , tensor: null},
{imagen:"img_Bichos/mosquito/mosquitos-0.jpg", label:"mosquito", tensor: null},
{imagen:"img_Bichos/mosquito/mosquitos-1.jpg", label:"mosquito", tensor: null},
{imagen:"img_Bichos/mosquito/mosquitos-2.jpg", label:"mosquito", tensor: null},
{imagen:"img_Bichos/mosquito/mosquitos-3.jpg", label:"mosquito", tensor: null},
{imagen:"img_Bichos/mosquito/mosquitos-4.jpg", label:"mosquito", tensor: null},
{imagen:"img_Bichos/mosquito/mosquitos-5.jpg", label:"mosquito", tensor: null},
{imagen:"img_Bichos/mosquito/mosquitos-6.jpg", label:"mosquito", tensor: null},
{imagen:"img_Bichos/mosquito/mosquitos-7.jpg", label:"mosquito", tensor: null},
{imagen:"img_Bichos/mosquito/mosquitos-8.jpg", label:"mosquito", tensor: null},
{imagen:"img_Bichos/mosquito/mosquitos-9.jpg", label:"mosquito", tensor: null},
{imagen:"img_Bichos/mosquito/mosquitos-10.jpg", label:"mosquito", tensor: null},
{imagen:"img_Bichos/mosquito/mosquitos-11.jpg", label:"mosquito", tensor: null},
{imagen:"img_Bichos/mosquito/mosquitos-12.jpg", label:"mosquito", tensor: null},
{imagen:"img_Bichos/mosquito/mosquitos-13.jpg", label:"mosquito", tensor: null},
{imagen:"img_Bichos/mosquito/mosquitos-14.jpg", label:"mosquito", tensor: null},
{imagen:"img_Bichos/mosquito/mosquitos-15.jpg", label:"mosquito", tensor: null},
{imagen:"img_Bichos/mosquito/mosquitos-16.jpg", label:"mosquito", tensor: null},
{imagen:"img_Bichos/mosquito/mosquitos-17.jpg", label:"mosquito", tensor: null},
{imagen:"img_Bichos/mosquito/mosquitos-18.jpg", label:"mosquito", tensor: null},
{imagen:"img_Bichos/mosquito/mosquitos-19.jpg", label:"mosquito", tensor: null},
{imagen:"img_Bichos/mosquito/mosquitos-0.jpg", label:"mosquito", tensor: null},
{imagen:"img_Bichos/none/none-0.jpg", label:"nada", tensor: null},
{imagen:"img_Bichos/none/none-1.jpg", label:"nada", tensor: null},
{imagen:"img_Bichos/none/none-2.jpg", label:"nada", tensor: null},
{imagen:"img_Bichos/none/none-3.jpg", label:"nada", tensor: null},
{imagen:"img_Bichos/none/none-4.jpg", label:"nada", tensor: null},
{imagen:"img_Bichos/none/none-5.jpg", label:"nada", tensor: null},
{imagen:"img_Bichos/none/none-6.jpg", label:"nada", tensor: null},
{imagen:"img_Bichos/none/none-7.jpg", label:"nada", tensor: null},
{imagen:"img_Bichos/none/none-8.jpg", label:"nada", tensor: null},
{imagen:"img_Bichos/none/none-9.jpg", label:"nada", tensor: null},
{imagen:"img_Bichos/none/none-10.jpg", label:"nada", tensor: null},
{imagen:"img_Bichos/none/none-11.jpg", label:"nada", tensor: null},
{imagen:"img_Bichos/none/none-12.jpg", label:"nada", tensor: null},
{imagen:"img_Bichos/none/none-13.jpg", label:"nada", tensor: null},
{imagen:"img_Bichos/none/none-14.jpg", label:"nada", tensor: null},
{imagen:"img_Bichos/none/none-15.jpg", label:"nada", tensor: null},
{imagen:"img_Bichos/none/none-16.jpg", label:"nada", tensor: null},
{imagen:"img_Bichos/none/none-17.jpg", label:"nada", tensor: null},
{imagen:"img_Bichos/none/none-18.jpg", label:"nada", tensor: null},
{imagen:"img_Bichos/none/none-19.jpg", label:"nada", tensor: null}
]
imagenes.map((picadura)=>{
  let buf = fs.readFileSync(picadura.imagen);
  picadura.tensor = tf.node.decodeImage(buf);
});





imagenes.map((picadura)=>{
  console.log("picadura");
  console.log(picadura);
  let pixeles = tf.browser.fromPixels(picadura.imagen);
  console.log("pixeles");
  console.log(pixeles);
  let imgModificada = pixeles.resizeNearestNeighbor([inputWidth, inputHeight]).toFloat().div(255.0).expandDims;
  picadura.tensor=imgModificada;
});
//todo lo que viene a partir de abajo probablemente haya que cambiarlo o agregar muchas cosas
const model = await tf.loadLayersModel('tensorflowProbando.js');
model.compile({ optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy'] });

const batchSize = 32;
const numEpochs = 10;

const dataset = tf.data.generator(function* () {
  let numPicaduras=imagenes.length;
  // Iterate through your training data
  for (let i = 0; i < numPicaduras-1; i++) {
    // Load and preprocess your image
    //const imgTensor = ...; // Load and preprocess your image tensor
    
    // Yield the image tensor and its label
    yield [imagenes[i].imagen, imagenes[i].label];
  }
}).batch(batchSize).shuffle(bufferSize);

var cosa=document.querySelector("#mostrar");
cosa.innerHTML+=`<image src=${imagenes[5].imagen}>`
export default {imagenes}