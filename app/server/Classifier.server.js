export function classifyImage(imageFile) {

    const formData = new FormData();
    formData.append('image-to-clasify', imageFile);

    //return fetch("http://18.216.51.169:5000/classify", {
    fetch("https://51b9-18-216-51-169.ngrok-free.app/classify", {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return {
            message: response.json(),
            status: 200
        }
    })
    .catch(error => {
        console.error('Error classifying image:', error);
        return {
            message: error.message,
            status: 500
        };
    });

}