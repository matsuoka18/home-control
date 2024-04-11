const image = document.getElementById("up_pic");
//ライブラリ読み込み
Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('./weights'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./weights'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('./weights')
]).then(start)
//処理スタート
async function start(){
    const container = document.createElement('div');
    container.style.position = "relative";
    document.body.append(container);
    const labeledFaceDescriptors = await loadLabeledImages()
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors,0.6);
    let image2;
    let canvas;
    document.body.append('Loaded');
    image.addEventListener('change',async ()=>{
        if(image2)image.remove();
        //if(canvas) canvas.remove();
        image2 = await faceapi.bufferToImage(image.files[0])
        container.append(image2);
        /*canvas = faceapi.createCanvasFromMedia(image2)
        container.append(canvas);*/
        canvas = document.getElementById("canvas");
        const displaySize = {width: image2.width, height:image2.height};
        faceapi.matchDimensions(canvas,displaySize);
        const detections = await faceapi.detectAllFaces(image2).withFaceLandmarks().withFaceDescriptors();
        const resizeDetections = faceapi.resizeResults(detections,displaySize);
        const results = resizeDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
        results.forEach( (result, i) =>{
          const box = resizeDetections[i].detection.box;
          const drawBox = new faceapi.draw.DrawBox(box ,{label:result.toString()})
          drawBox.draw(canvas);

        })
    })
}
function loadLabeledImages(){
    const labels = ['kazuya','other'];
    return Promise.all(
        labels.map(async label =>{
            const descriptions = [];
            for(var i=1; i<=2; i++){
                const img = await faceapi.fetchImage('http://192.168.3.102/apache_server/face-api/'+label+'/'+i+'.jpg');
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
                descriptions.push(detections.descriptor)
            }
            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
}