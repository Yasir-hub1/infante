import { captureScreen, releaseCapture } from "react-native-view-shot"

export const Captura = async() => {
    captureScreen({
      format: "jpg",
      quality: 0.8,
    }).then(
      async(uri) => {
        let localUri = uri
        let filename = localUri.split("/").pop();
      console.log("uri ", uri);
      const file = {
        uri: localUri,
        name: filename,
        type: "image/jpg",
      }
      let formData = new FormData();
      formData.append("fotos", file);
      console.log("FormData", JSON.stringify(formData));
      await fetch(storageCaptura, {
        method: "POST",
        body: formData,
        header: {
          Accept: "application/json",
          // 'Content-Type':'application/json'
          "Content-Type": "application/x-amz-json-1.1",
        },
      }).then((res) => res.json())
      .catch((error) => console.error("ErrorCAPTURA", error))
      .then((response) => {
        console.log("DESDE EL RESPONSE CAPTURA ", response);
      });
      },
      (error) => console.error("Oops, no se pudo capturar la pantalla", error)
    )
    }