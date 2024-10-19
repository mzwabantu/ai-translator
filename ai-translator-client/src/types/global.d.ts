/* eslint-disable @typescript-eslint/no-explicit-any */
interface Window {
  SpeechRecognition: any;
  webkitSpeechRecognition: any;
}

interface SpeechRecognitionEvent {
  readonly results: SpeechRecognitionResultList;
}

interface Language {
  label: string;
  code: string;
}

type Direction = "to" | "from" | null;

interface LanguageButton {
  direction: Direction;
  lang: Language;
}
