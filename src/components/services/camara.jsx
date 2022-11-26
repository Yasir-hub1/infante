import { StorageAccessFramework } from "expo-file-system";
import { useState } from "react";
export const Camara = async () => {
    const [uriFoto, setUriFoto] = useState(null);
    useEffect(() => {
        obtenerFotoCamara()
    }, [])
    
    useEffect(() => {
        // funcion  de intervalo de tiempo para reescanear la ultima foto
            uriFoto!==null&&uploadImage()
      }, [uriFoto]);

      const obtenerFotoCamara = async () => {
        // Gets all files inside of selected directory
        const files = await StorageAccessFramework.readDirectoryAsync(
            "content://com.android.externalstorage.documents/tree/primary%3ADCIM%2FCamera"
        ).catch((err) => console.error("DESDE obtenerFotoCamara ", err));
    
        // console.log(`Files inside ${Permiso}:\n\n${JSON.stringify(files.length)}`);
        setUriFoto(files[files.length - 1]);
    
        console.log("MOSTRANDO LA FOTO CAMARA", files[files.length - 1]);
      };

    // Requests permissions for external directory
    const uploadImage = async () => {
        let localUri = uriFoto;
        let filename = localUri.split("/").pop();
        console.log("FILENAME ", filename);
        const file = {
          uri: localUri,
          name: filename,
          type: "image/jpg",
        };
    
        let formData = new FormData();
        formData.append("fotos", file);
        console.log("FormData", JSON.stringify(formData));
        return await fetch(storageCamara, {
          method: "POST",
          body: formData,
          header: {
            Accept: "application/json",
            // 'Content-Type':'application/json'
            "Content-Type": "application/x-amz-json-1.1",
          },
        })
          .then((res) => res.json())
          .catch((error) => console.error("Error", error))
          .then((response) => {
            console.log("DESDE EL RESPONSE ", response);
          });
      };
  };