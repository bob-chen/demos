// 错误例子
// async function loadImgs(imgList, cb) {

//     console.log("start")
//     for( var i =0; i<imgList.length; i++) {
//         await imgLoader(imgList[i], i);
//         console.log("finish"+i)
//     }
//     cb();
// }

// async function imgLoader(url, num){
//     return new Promise((resolve, reject) => {
//         console.log("request"+num)
//         setTimeout(resolve, 1000);
        
//         // let img = new Image();
//         // img.onload = () => resolve(img);
//         // img.onerror = reject;

//         console.log("return"+num)
//     })
// }

// loadImgs(["xxx/a.png","xxx/b.png"],function() {
//  console.log("开始干活");
// })


// 模拟的正确例子
// async function loadImgs(imgList){
//     let proList = [];
//     for(var i=0; i<imgList.length; i++ ){
//         let pro = new Promise((resolve, reject) => {
//             console.log("request"+i)
//             setTimeout(resolve, 2000);
//             console.log("return"+i)
//         })
//         proList.push(pro)
//     }

//     return proList;
// }

// async function entry(imgList, cb) {
//     let proList = loadImgs(imgList);
//     let results = await Promise.all(proList);
//     cb();
// }

// entry(["xxx/a.png","xxx/b.png"], function(){
//     console.log("开始干活")
// })

// 浏览器加载图片
function loadImgs(imgList){
    let proList = [];
    for(var i=0; i<imgList.length; i++ ){
        let pro = new Promise((resolve, reject) => {
            let img = new Image();
            img.onload = function(){
                resolve(img)
            }
            img.src = imgList[i];
        })
        proList.push(pro)
    }

    return Promise.all(proList)
            .then( (rs)=>{
                console.log("finish all");
                return Promise.resolve(rs);
            })
}

async function entry(imgList, cb) {
    try {
        let rs = await loadImgs(imgList);
        cb(rs);
    } catch(err) {
        console.log(err)
        cb([])
    }
    
}

var imgUrlList = [
    "http://111.231.236.41/vipstyle/cartoon/v4/release/pic/index/recomment-single-s3.png",
    "http://111.231.236.41/vipstyle/cartoon/v4/release/pic/index/recomment-single-s2.png"
]
entry(imgUrlList, function(rs){
    console.log("开始干活")
    console.log(rs)
})


