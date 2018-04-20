const now = Date.now();
const container = document.getElementsByClassName("content")

function fetchImages() {
    fetch("/update")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setTimeout(fetchImages, 2000);
        })
        
}
fetchImages(); 