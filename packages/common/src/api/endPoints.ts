const baseUrl = "http://192.168.35.131:8085";

const ipWithPort = baseUrl.split("//")[1];

export const getProject = () => baseUrl + `/getproject`;

export const getPlan = (planId: string) => baseUrl + `/mnemonicscheme/${planId}`;

export const savePlan = () => baseUrl + `/mnemonicscheme`;

export const websocket = () => `ws://${ipWithPort}/websocket`;

export const socketTopic = (topic: string) => `/Projects/ProjectId1/${topic}`;

export const scadaEvent = () => baseUrl + `/scadaevent`;

export const getImage = () => baseUrl + `/images`;

export const saveImage = () => baseUrl + `/upload`;

export const deletePlan = (idPlan: string) => baseUrl + `/mnemonicscheme/delete/${idPlan}`;

export const deleteImage = (idImage: string) => baseUrl + `/images/delete/${idImage}`;
