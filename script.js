const apiUrl = 'https://api.onenet.hk.chinamobile.com/devices/161379916/datapoints';
const apiKey = '7Nvk6zxDmTRJ2tjKz8yXStogHRI=';  // 

async function fetchData() {
    const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': apiKey
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched data:", data);  // Log the fetched data
    return data;
}

function decodeBase64Image(base64Str) {
    const img = document.createElement('img');
    img.src = `data:image/jpeg;base64,${base64Str}`;
    document.getElementById('imageContainer').appendChild(img);
}

async function init() {
    try {
        const data = await fetchData();
        if (data.errno === 0 && data.data.datastreams.length > 0) {
            const imageData = data.data.datastreams[0].datapoints[0].value;
            decodeBase64Image(imageData);
        } else {
            console.error("No image data found in the response.");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

init();
