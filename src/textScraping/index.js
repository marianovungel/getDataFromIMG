const path = require('path');
const vision = require("@google-cloud/vision");

const client = new vision.ImageAnnotatorClient({
  keyFilename: path.resolve('src', 'config', 'keyss.json'),
})

/**
 *
 * Receive two Strings and returns the greater one.
 *
 * @param {String} text1
 * @param {String} text2
 * @returns The greater String
 */
function greaterString(text1, text2){
  if (text1.length > text2.length || text1.length == text2.length) {
    return text1;
  } else {
    return text2;
  }
}

/**
 *
 * Receive an image from the current directory and detect the text in it.
 *
 * @param {String} image Path to the image file.
 * @returns The text from the image.
 * @example await textScraping("image.png");
 */
async function textScraping(image){
  try {
    const text1 = await client.textDetection(image);
    const text2 = await client.documentTextDetection(image);

    Promise.all([text1,text2]);

    // const result1 = text1[0].fullTextAnnotation.text.replace(/ /g, "").replace(/\n/g, "");
    const result1 = text1[0].fullTextAnnotation.text.replace(/ /g, "").replace(/\n/g, "");
    const result2 = text2[0].fullTextAnnotation.text.replace(/ /g, "").replace(/\n/g, "");

    //Test
//     var newdata = result2.split("NomeCompleto:")[1]
// var nomeCompleto = newdata.split("Filiação:")[0]
// newdata = newdata.split("Filiação:")[1]
// var pais = newdata.split("BilhetedeIdentidadeNº:")[0]
// var pai = pais.split("e")[0]
// var mae = pais.split("e")[1]
// newdata = newdata.split("BilhetedeIdentidadeNº:")[1]
// var bi = newdata.match(/.{1,14}/g)[0]
// newdata = newdata.split("Residência:")[1]
// console.log(newdata)
// var residencia = newdata.split("Naturalde:")[0]
// newdata = newdata.split("Naturalde:")[1]
// var naturalidade = newdata.split("Provinciade:")[0]
// newdata = newdata.split("Provinciade:")[1]
// var provincia = newdata.split("DatadeNascimento:")[0]
// newdata = newdata.split("DatadeNascimento:")[1]
// newdata = newdata.split("Sexo:")[1]
// var sexo = newdata.split("EstadoCivil:")[0]
// newdata = newdata.split("EstadoCivil:")[1]
// var estadoCivil = newdata.split("Emitidoem:")[0]
// newdata = newdata.split("Emitidoem:")[1]
// var emitido = newdata.match(/.{1,10}/g)[0]
// newdata = newdata.split(emitido)[1]
//  var validade = " "
//  var dataDeNascimento = " "
//  var altura = " "
// if(newdata.match(/.{1,10}/g)[0] === "Válidoaté:"){
//     newdata = newdata.split("Válidoaté:")[1]
//     validade = newdata.match(/.{1,10}/g)[0]
//     newdata = newdata.split(validade)[1]
//     dataDeNascimento = newdata.match(/.{1,10}/g)[0]
//     newdata = newdata.split("Altura(m):")[1]
//     // altura = newdata.match(/.{1,4}/g)[0]
// }else{
//     dataDeNascimento = newdata.match(/.{1,10}/g)[0]
//     newdata = newdata.split("Altura(m):")[1]
//     altura = newdata.split("Válidoaté:")[0]
//     newdata = newdata.split("Válidoaté:")[1]
//     var validade = newdata.match(/.{1,10}/g)[0]
//     console.log(newdata)
// }
// console.log({bi: bi, nome_completo:nomeCompleto, pai:pai, mãe:mae, residencia:residencia, naturalidade:naturalidade, provincia:provincia, sexo:sexo, estadoCivil:estadoCivil, emitido: emitido, dataDeNascimento:dataDeNascimento, altura:altura, validade:validade});

    // return greaterString(result1, result2);
    return [result2, result1]
  } catch (error) {
    console.error(error);
    throw error;
  }
}

module.exports = textScraping;
