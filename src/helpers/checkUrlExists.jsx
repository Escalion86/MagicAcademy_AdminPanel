// export default function checkUrlExists(url) {
//   if (window.XMLHttpRequest) {
//     // code for IE7+, Firefox, Chrome, Opera, Safari
//     var http = new XMLHttpRequest()
//   } else {
//     // code for IE6, IE5
//     var http = new ActiveXObject('Microsoft.XMLHTTP')
//   }
//   http.open('HEAD', url, false)
//   http.send()
//   return http.status != 404
// }

export default async function checkUrlExists(url, onSuccess, onError) {
  const response = await fetch(url, {
    method: 'head',
    mode: 'no-cors',
  })
  if (response.status == 200) {
    onSuccess()
  } else {
    onError()
  }
}
// export default function checkUrlExists(url) {
//   let img = new Image()
//   img.src = url
//   let exist
//   img.onload = function () {
//     exist = true
//   }
//   img.onerror = function () {
//     exist = false
//   }
//   return exist
// }
