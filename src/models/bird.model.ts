export default interface Bird {
    "id": number,
    "Name": string,
    "HebrewName": string,
    "img": string,
    "mainSound": string,
    "isChosen"?: boolean,
    "description"?: { "en": string, "he": string }
}