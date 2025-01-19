const key="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";
const inputText= document.getElementById("input");
const image= document.getElementById("image");
const genBtn=document.getElementById("btn");
const svg= document.getElementById("svg");
const load =document.getElementById("loading");
const resetbtn=document.getElementById("reset");
const downloadbtn= document.getElementById("download");
async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
		{
			headers: {
				Authorization: `Bearer ${key}`
				
			},
			method: "POST",
			body: JSON.stringify({"inputs":inputText.value}),
		}
	);
	const result = await response.blob();
    image.style.display="block";
load.style.display="none"
	return result;
}
async function generate(){
    load.style.display="block";
    query().then((response) => {
        const objectUrl= URL.createObjectURL(response);
        image.src=objectUrl;
        downloadbtn.addEventListener("click",()=>{
            download(objectUrl);
        })
    });
}

genBtn.addEventListener("click",()=>{
generate();
svg.style.display="none";
})
inputText.addEventListener("keydown",(e)=>{
if(e.key=="Enter"){
    generate();
    svg.style.display="none"
}
})
resetbtn.addEventListener("click",()=>{
    inputText.value="";
    window.location.reload();
})
 function download(objectUrl){
    fetch(objectUrl).then(res=>res.blob())
    .then(File=>{
        let a=document.createElement("a");
        a.href=URL.createObjectURL(File);
        a.download=new Date().getTime();
        a.click()
    })
    .catch(()=>alert("download failed"));

 }