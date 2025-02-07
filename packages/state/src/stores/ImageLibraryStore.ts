import { deleteImage, getImage, IImageResponse, PictureModel, saveImage } from "@scada/common";
import axios from "axios";
import { makeAutoObservable } from "mobx";
import { IRequestDeleteImage } from "../interface/request/IRequestDeleteImage";
import { TypeImage } from "./../../../common/src/enums/TypeImage/TypeImage";
import { AppStore } from "./AppStore";

export class ImageLibraryStore {
    private _store: AppStore;
    imageMap: Map<string, PictureModel>;
    openDialog: boolean;

    constructor(store: AppStore) {
        this._store = store;
        this.imageMap = new Map([
            [
                "default",
                new PictureModel({
                    name: "Стандартная картинка",
                    id: "default",
                    url: "./gif/run.gif",
                    type: TypeImage.gif,
                }),
            ],
            [
                "test",
                new PictureModel({
                    name: "Тестовая картинка",
                    id: "test",
                    url: "./images/test.png",
                    type: TypeImage.png,
                }),
            ],
        ]);
        this.openDialog = false;
        makeAutoObservable(this);
    }

    deleteImage(idImage: string): void {
        this.imageMap.delete(idImage);
    }

    async fetchData() {
        try {
            const { data } = await axios.get<IImageResponse[]>(getImage());
            data.forEach((image) => {
                this.imageMap.set(image.id, new PictureModel(image));
            });
        } catch (e) {
            throw new Error("Ошибка получения картинок");
        }
    }

    async saveImage(file: File): Promise<void> {
        try {
            const body = { image_upload: file };
            const { data } = await axios.post<IImageResponse>(saveImage(), body, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            this.imageMap.set(data.id, new PictureModel(data));
        } catch (error) {
            console.log(error);
        }
    }

    async deleteImageFromServer(idImage: string): Promise<void> {
        try {
            await axios<IRequestDeleteImage>(deleteImage(idImage));
        } catch (error) {
            console.warn(error)
            throw new Error("Ошибка удаления")
        }
    }

    getImage(id: string): PictureModel {
        return this.imageMap.get(id) || this.imageMap.get("default")!;
    }

    getImageArray(): PictureModel[] {
        return [...this.imageMap.values()];
    }

    closeImageLibrary(): void {
        this.openDialog = false;
    }

    openImageLibrary(): void {
        this.openDialog = true;
    }
}
