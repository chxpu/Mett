import {FaceAttributes} from "./FaceAttributes";

export class ResponseData {
  faceId: string;
  faceRectangle: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  faceAttributes: FaceAttributes;

}

