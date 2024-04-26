
document.addEventListener('DOMContentLoaded', () => {
    const uploadimg = document.querySelector('.right-box');
    const inputfile = document.querySelector('input[type=file]');
    const imageContainer = document.querySelector('#image-div');
    const clearButton = document.querySelector('#btnclear');
    const downloadButton = document.querySelector('#btndownload');
    const fileFormatLabel = document.querySelector('.select');

    // Trigger file input click
    uploadimg.addEventListener('click', () => inputfile.click());

    // Handle file input change
    inputfile.addEventListener('change', function (event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const img = new Image();
                img.src = event.target.result;

                img.onload = function () {
                    imageContainer.innerHTML = '';
                    imageContainer.appendChild(img);

                    // Automatically detect image format
                    const fileExtension = file.type.split('/').pop().toLowerCase();
                    if (['jpg', 'jpeg', 'png', 'gif'].includes(fileExtension)) {
                        fileFormatLabel.textContent = fileExtension.toUpperCase();
                    } else {
                        alert('Unsupported image format. Please select a file with JPG, JPEG, PNG, or GIF format.');
                        inputfile.value = '';
                        fileFormatLabel.textContent = '';
                    }
                };
            };

            reader.readAsDataURL(file);
        }
    });

    // Clear all values
    clearButton.addEventListener('click', function () {
        inputfile.value = '';
        imageContainer.innerHTML = '';
        fileFormatLabel.textContent = '';
    });

    // Create PDF when download button is clicked
    downloadButton.addEventListener('click', function () {
        const imgElement = imageContainer.querySelector('img');

        if (!imgElement) {
            alert('No image to download.');
            return;
        }

        const imgData = imgElement.src;
        const jsPDF = window.jspdf.jsPDF;

        const pdf = new jsPDF('p', 'mm', 'a4'); // Set PDF to A4 size

        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297); // A4 dimensions: 210mm x 297mm
        pdf.save(`customized_image.${fileFormatLabel.textContent.toLowerCase()}.pdf`);
    });
});

