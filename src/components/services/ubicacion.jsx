import * as Location from "expo-location"

export const Ubicacion = async () => {

    // Asegúrese de que el seguimiento de la ubicación en primer plano no se esté ejecutando
    foregroundSubscription?.remove();

    // Empezar a ver la posición en tiempo real
    foregroundSubscription = await Location.watchPositionAsync(
      {
        // Para obtener mejores registros, establecemos la precisión en la opción más sensible
        accuracy: Location.Accuracy.High,
        /* distanceInterval: 5  /* actualización de coordenadas cada 5 metros */
        timeInterval: 5000 /* intervalo de tiempo de espera en cada actualización */,
        /* mayShowUserSettingsDialog:true, */
      },
      async (location) => {
        setCoord({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        })
        console.log("location: " + JSON.stringify(location));

        let formData = new FormData();
        formData.append("latitude", [
          location.coords.latitude,

        ]);
        formData.append("longitude", [

          location.coords.longitude,
        ]);
        await fetch(storageUbicacion, {
          method: "POST",
          body: formData,
          header: {
            Accept: "application/json",
            "Content-Type": "application/json",
            // "Content-Type": "application/x-amz-json-1.1",
          },
        })
          .then((res) => res.json())
          .catch((error) => console.error("Error", error))
          .then((response) => {
            console.log("DESDE EL RESPONSE ", response);
          });
      }
    );
  };