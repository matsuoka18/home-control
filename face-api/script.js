const FILE_URL  = "sample_01.png";
const MODEL_URL = "./weights";

let img, canvas, context;

/*window.onload = (event)=>{
	console.log("onload!");
	loadModels();
}*/

async function loadModels(){
	console.log("loadModels");
	Promise.all([
		faceapi.loadSsdMobilenetv1Model(MODEL_URL),
		faceapi.loadFaceLandmarkModel(MODEL_URL),
		faceapi.loadFaceRecognitionModel(MODEL_URL),
		faceapi.loadFaceExpressionModel(MODEL_URL),
		faceapi.loadTinyFaceDetectorModel(MODEL_URL)
	])
	//.then(detectAllFaces);
	/*.then(()=>{
		detectFace()
	})*/
}

async function detectFace(){
	const img = FILE_URL;
	const faceData = await faceapi.detectAllFaces(img);
	if(!faceData.length) return;
	faceapi.draw.drawDetections(resultCvs, faceData);
 }

async function detectAllFaces(){
	//FILE_URL = document.getElementById("myCanvas");
	console.log("detectAllFaces");
	
	// 1, 画像の読み込み
	img = await faceapi.fetchImage(FILE_URL);

	// 2, HTMLからキャンバスを取得し画像を描画
	canvas = document.getElementById("myCanvas1");
	canvas.width = img.width;
	canvas.height = img.height;
	context = canvas.getContext("2d");
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.drawImage(img, 0, 0);// 画像の描画

	// 3, 顔認識の実行と認識結果の取得
	const iSize = {width: img.width, height: img.height};
	const fData = await faceapi.detectAllFaces(img).withFaceLandmarks();

	
	
	// 4, 認識結果のリサイズ
	const rData = await faceapi.resizeResults(fData, iSize);
	rData.forEach(data=>{drawResult(data);});
}

function drawResult(data){
	console.log("drawResult!!");
	//console.log(data);

	const box = data.detection.box;// 長方形のデータ
	const mrks = data.landmarks.positions;

	context.fillStyle = "red";
	context.strokeStyle = "red";
	context.lineWidth = 4;
	context.strokeRect(box.x, box.y, box.width, box.height);// 長方形の描画
	console.log(mrks)
	//next();
}
async function next(){
	const img = document.getElementById('myCanvas1')

	const app = async () => {
	  // モデルの読み込み
	  await faceapi.nets.tinyFaceDetector.load(MODEL_URL);
	  await faceapi.nets.faceExpressionNet.load(MODEL_URL);
  
	  // 顔の表情の分類
	  const detectionsWithExpressions = await faceapi.detectAllFaces(img,
		  new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()
  
	  // 結果の出力
	  console.log(detectionsWithExpressions);
	}
	app()
}
video = '';
function start(){
video = document.getElementById("hoge");
var setting = {
	audio:false,
	video:{
		width:1700,
		height:3000,
		facingMode:"user"
	}
}
navigator.mediaDevices.getUserMedia(setting)
.then((media)=>{
 video.srcObject = media;
 start2(video);
})
.catch((error)=>{
	alert(error);
})

}
function start2(video){

	var height2 = document.getElementById("hoge").getBoundingClientRect().height;
	var canvas2 = document.getElementById("myCanvas");
	
	//canvas2.style.height = 200;
	setInterval(()=>{

	

canvas2.width = 1700;
canvas2.height = 3000;
var stx = canvas2.getContext("2d");
stx.drawImage(
	video,
	0,
	0,
	1700,
	1000
)

FILE_URL = canvas2.toDataURL('image/png');
detectFace
},3000)
}

function start3(){
 loadModels();
}