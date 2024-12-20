function send(){
    let description, phone, image;
    description= document.getElementById("description").value;
    image=document.getElementById("image").files[0]
    phone=document.getElementById("phone").value;
console.log(document.getElementById("image").files)

let reader= new FileReader();
reader.readAsDataURL(image);
addPost(description, phone, reader.result);

}

function addPost(description, phone, image){
    let phoneElement=document.createElement("p");
    let descriptionElement=document.createElement("p");
    let imageElement=document.createElement("img");

    phoneElement.innerText=phone;
    descriptionElement.innerText=description
    imageElement.src=image;

    document.body.appendChild(imageElement)
    document.body.appendChild(descriptionElement)
    document.body.appendChild(phoneElement)
}