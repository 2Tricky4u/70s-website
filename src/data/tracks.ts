import { asset } from "../lib/asset";

export interface Track {
  title: string;
  meta: string;
  src: string;
}

/** playlist — drop an mp3 in /public/music and add an entry to extend */
export const TRACKS: Track[] = [
  {
    title: "BASEMENT TRANSMISSION",
    meta: "NN.001 · WAREHOUSE TECHNO",
    src: asset("music/track-01.m4a"),
  },
  {
    title: "WAREHOUSE 04:00",
    meta: "NN.002 · ACID HOUSE",
    src: asset("music/track-02.m4a"),
  },
  {
    title: "ANALOG DECAY",
    meta: "NN.003 · DUSTED BREAKS",
    src: asset("music/track-03.m4a"),
  },
];
