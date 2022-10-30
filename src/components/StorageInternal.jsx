import { StyleSheet, Text, View } from "react-native";
import React,{useEffect,useState} from "react";
import * as FileSystem from "expo-file-system";
import { StorageAccessFramework } from 'expo-file-system';

const StorageInternal = () => {
   const [Url, setUrl] = useState(null);


   /*  useEffect(() => {
        (async() => {
            // Requests permissions for external directory
            const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();
            console.log("desde files ",permissions);

            if (permissions.granted) {
                // Gets SAF URI from response
                const uri = permissions.directoryUri;
                setUrl(uri);
                // Gets all files inside of selected directory
                const files = await StorageAccessFramework.readDirectoryAsync(uri);
                alert(`Files inside ${uri}:\n\n${JSON.stringify(files)}`);

            }

            
        })()

    }, []); */

  /*    useEffect(() => {
        async function migrateAlbum(albumName) {
            // Gets SAF URI to the album
            const albumUri = StorageAccessFramework.getUriForDirectoryInRoot(albumName);

            const all=await StorageAccessFramework.requestDirectoryPermissionsAsync();
            console.log('ALLOW', all);
            // Requests permissions
            const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync(albumUri);
            console.log('DESDE ALBUN ',albumUri)
            
            if (permissions!== 'granted' && all!== 'granted') {
                console.log('PERMMISOS ',permissions,"DESDE ALL ",all)
              return;
            }
     }
     migrateAlbum();
    }, []) */
     

   /*  useEffect(() => {

        (async()=>{

            let options = { encoding: FileSystem.EncodingType.Base64 };
           await FileSystem.readAsStringAsync(Url, options)
                .then((data) => {
                    const base64 = "data:image/jpg;base64" + data;
                    resolve(base64); // are you sure you want to resolve the data and not the base64 string?
                })
                .catch((err) => {
                    console.log("​getFile -> err", err);
                    reject(err);
                });
        })()
    
    }, []) */
    


    return (
        <View>
            <Text>StorageInternal</Text>
        </View>
    );
};

export default StorageInternal;

const styles = StyleSheet.create({});
