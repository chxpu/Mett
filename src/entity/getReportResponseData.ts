export class getReportResponseData {
  id: string;
  type: string;
  gender: string;
  age: number;
  practice_time: string;
  score: number;
  emotion: {
    anger: number;
    contempt: number;
    disgust: number;
    fear: number;
    happiness: number;
    neutral: number;
    sadness: number;
    surprise: number
  }

}
