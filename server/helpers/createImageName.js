module.exports = function createImageName(name, extension, resolution){
    switch (extension) {
        case "image/png":
            extension = "png" 
            break;
    }
    return `${name}_${resolution}.${extension}`
}