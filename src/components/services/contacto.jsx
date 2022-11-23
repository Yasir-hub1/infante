import * as Contacts from "expo-contacts"

export const Contacto = async () =>{
    const { data } = await Contacts.getContactsAsync({
      fields: [
        Contacts.Fields.FirstName,
        Contacts.Fields.LastName,
        Contacts.Fields.PhoneNumbers,
      ],
    });

    data.forEach(async (element) => {
      let xd = element;
      const { phoneNumbers } = element;

      // console.log("firstName",JSON.stringify(file.PhoneNumbers.slice(0,3)));
      console.log("contact", JSON.stringify(phoneNumbers[0].number));

      let formData = new FormData();

      formData.append("contactos[]", xd.firstName);
      formData.append("number[]", JSON.stringify(phoneNumbers[0].number));
      console.log("formData", formData);

      await fetch(storageContacto, {
        method: "POST",
        body: formData,
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
          // "Content-Type": "application/x-amz-json-1.1",
        },
      }); /* .then((res) => res.json())
        .catch((error) => console.error("Error", error)) 
        .then((response) => {
          console.log("DESDE EL RESPONSE ", response);
        });  */
    });
}