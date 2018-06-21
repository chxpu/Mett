import {FaceAttributes} from "./FaceAttributes";

export class DetectResponseData {
  faceId: string;
  faceRectangle: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  faceAttributes: FaceAttributes;

}

