//Inserting images
function insertImage() {
    document.querySelectorAll('.box').forEach(image => { //selexts all elements in index.html

        if (image.innerText.length !==0) { //!==0 menas if not zero, i.e. if no pieces are in the square, then the below if/else statement is ran
            if (image.innerText == "Wpawn" || image.innerText == "Bpawn") {
                image.innerHTML `${image.innerText} < img class=allImg allSpawn' src="${image.innerText}.png" alt="">`
            }

            else {
                image.innerHTML =`${image.innerText} <img clas='allImg' src="${image.innerText}.png" alt="">`
                image.style.cursor = 'pointer'
            }
        }
    })
}