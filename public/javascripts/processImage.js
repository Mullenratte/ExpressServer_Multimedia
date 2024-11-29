for (let i = 1; i <= 5; i++) {
    let canvas = document.getElementById('canvas' + i);
    let ctx = canvas.getContext('2d');

    const img = new Image();
    setImgSourcePerCanvas(img, canvas);

    img.onload = () => {
      // resize image based on shortest dimension
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
      const resizedWidth = img.width * scale;
      const resizedHeight = img.height * scale;

      const centerPosX = canvas.width / 2 - resizedWidth / 2;
      const centerPosY = canvas.height / 2 - resizedHeight / 2;
      
      ctx.drawImage(img, centerPosX, centerPosY, resizedWidth, resizedHeight);

      const pixelData = ctx.getImageData(centerPosX, centerPosY, resizedWidth, resizedHeight).data;
      const averageColor = getAverageColorRGB(pixelData);

      canvas.style.background = "rgb(" + averageColor[0] + ", " + averageColor[1] + ", " + averageColor[2] + ")";
    };
  }

  function setImgSourcePerCanvas(img, canvas) {
    switch (canvas.id) {
      case 'canvas1':
        img.src = "/images/impulse_red.png"
        break;
      case 'canvas2':
        img.src = "../images/impulse_green.png"
        break;
      case 'canvas3':
        img.src = "../images/impulse_blue.png"
        break;
      case 'canvas4':
        img.src = "../images/HP-Lovecraft.png"
        break;
      case 'canvas5':
        img.src = "../images/abysswatchers.jpg"
        break;
      default:
        break;
    }
  }
  
  function getAverageColorRGB(pixelData) {
    let redAvg = 0;
    let greenAvg = 0;
    let blueAvg = 0;

    const totalPixels = pixelData.length / 4;

    for (let i = 0; i < pixelData.length; i += 4) {
      redAvg += pixelData[i];
      greenAvg += pixelData[i + 1];
      blueAvg += pixelData[i + 2];
    }

    redAvg /= totalPixels;
    greenAvg /= totalPixels;
    blueAvg /= totalPixels;

    return [redAvg, greenAvg, blueAvg]
  }