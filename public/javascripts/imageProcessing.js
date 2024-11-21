for (let i = 1; i <= 5; i++) {
    let canvas = document.getElementById('canvas' + i);
    let ctx = canvas.getContext('2d');

    const img = new Image();
    setImgSourcePerCanvas(img, canvas);
    img.onload = () => {
      const scale = Math.min(canvas.width / img.width, canvas.height / img.height);

      let resizedWidth = img.width * scale;
      let resizedHeight = img.height * scale;

      let offsetX = canvas.width / 2 - resizedWidth / 2;
      let offsetY = canvas.height / 2 - resizedHeight / 2;
      
      ctx.drawImage(img, offsetX, offsetY, resizedWidth, resizedHeight);

      let pixelData = ctx.getImageData(offsetX, offsetY, resizedWidth, resizedHeight).data;
      averageColor = getAverageColorRGB(pixelData);

      canvas.style.background = "rgb(" + averageColor[0] + ", " + averageColor[1] + ", " + averageColor[2] + ")";
    };
  }

  function setImgSourcePerCanvas(img, canvas) {
    switch (canvas.id) {
      case 'canvas1':
        img.src = "/images/impulse_red.png"
        break;
      case 'canvas2':
        img.src = "/images/impulse_green.png"

        break;
      case 'canvas3':
        img.src = "/images/impulse_blue.png"

        break;
      case 'canvas4':
        img.src = "/images/HP-Lovecraft.png"

        break;
      case 'canvas5':
        img.src = "/images/abysswatchers.jpg"

        break;
      default:
        break;
    }
  }
  function getAverageColorRGB(pixelData) {


    let red = new Array(pixelData.length / 4);
    let green = [...red]
    let blue = [...red]

    let redAvg = 0;
    let greenAvg = 0;
    let blueAvg = 0;

    let pixel = 0;

    for (let i = 0; i < pixelData.length; i += 4) {
      red[pixel] = pixelData[i];
      redAvg += pixelData[i];
      green[pixel] = pixelData[i + 1];
      greenAvg += pixelData[i + 1];
      blue[pixel] = pixelData[i + 2];
      blueAvg += pixelData[i + 2];
      pixel++;
    }

    redAvg /= red.length;
    greenAvg /= green.length;
    blueAvg /= blue.length;

    return [redAvg, greenAvg, blueAvg]
  }